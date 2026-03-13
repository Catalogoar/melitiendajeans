// Estado del carrito
let cart = [];

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    loadCartFromStorage();
    updateCartDisplay();
});

// Renderizar productos
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    PRODUCTS.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22300%22%3E%3Crect fill=%22%23f3f4f6%22 width=%22300%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%239ca3af%22 font-family=%22sans-serif%22 font-size=%2216%22%3EImagen no disponible%3C/text%3E%3C/svg%3E'">
            <div class="product-content">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price.toLocaleString('es-AR')}</div>
                <div class="product-controls">
                    <input type="number" min="1" value="1" class="quantity-input" data-product-id="${product.id}">
                    <button class="add-btn" onclick="addToCart(${product.id})">
                        <span>+</span> Agregar
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Agregar al carrito
function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    const quantityInput = document.querySelector(`input[data-product-id="${productId}"]`);
    const quantity = parseInt(quantityInput.value) || 1;

    const existingItem = cart.find(item => item.product.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            product: product,
            quantity: quantity
        });
    }

    // Resetear cantidad a 1
    quantityInput.value = 1;

    saveCartToStorage();
    updateCartDisplay();
}

// Actualizar cantidad en el carrito
function updateQuantity(productId, newQuantity) {
    newQuantity = parseInt(newQuantity) || 1;

    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.product.id === productId);
    if (item) {
        item.quantity = newQuantity;
        saveCartToStorage();
        updateCartDisplay();
    }
}

// Eliminar del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    saveCartToStorage();
    updateCartDisplay();
}

// Actualizar la vista del carrito
function updateCartDisplay() {
    const cartContainer = document.getElementById('cartContainer');

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="cart-empty">
                <p>Tu carrito está vacío. Selecciona productos para comenzar.</p>
            </div>
        `;
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    let cartHTML = `
        <div class="cart-header">Tu Carrito (${cart.length} ${cart.length === 1 ? 'producto' : 'productos'})
        </div>
        <div class="cart-items">
    `;

    cart.forEach(item => {
        const subtotal = item.product.price * item.quantity;
        cartHTML += `
            <div class="cart-item">
                <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%2280%22%3E%3Crect fill=%22%23f3f4f6%22 width=%2280%22 height=%2280%22/%3E%3C/svg%3E'">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.product.name}</div>
                    <div class="cart-item-price">$${item.product.price.toLocaleString('es-AR')} c/u</div>
                    <div class="cart-item-quantity">
                        <label>Cantidad:</label>
                        <input type="number" min="1" value="${item.quantity}" class="quantity-input-small" onchange="updateQuantity(${item.product.id}, this.value)">
                    </div>
                    <div class="cart-item-subtotal">Subtotal: $${subtotal.toLocaleString('es-AR')}</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.product.id})" title="Eliminar del carrito">🗑️</button>
            </div>
        `;
    });

    cartHTML += `
        </div>
        <div class="cart-observations">
            <label class="observations-label">Observaciones (opcional)</label>
            <textarea class="observations-textarea" id="observationsText" placeholder="Ej: Colores preferidos, medidas especiales, etc."></textarea>
        </div>
        <div class="cart-footer">
            <div class="cart-total">
                <span class="cart-total-label">Total:</span>
                <span class="cart-total-amount">$${total.toLocaleString('es-AR')}</span>
            </div>
            <button class="send-btn" onclick="sendToWhatsApp()">
                <span>💬</span> Enviar pedido por WhatsApp
            </button>
        </div>
    `;

    cartContainer.innerHTML = cartHTML;

    // Restaurar observaciones si existen
    const savedObservations = localStorage.getItem('cartObservations');
    if (savedObservations) {
        document.getElementById('observationsText').value = savedObservations;
    }

    // Guardar observaciones al escribir
    document.getElementById('observationsText').addEventListener('input', function() {
        localStorage.setItem('cartObservations', this.value);
    });
}

// Enviar pedido por WhatsApp
function sendToWhatsApp() {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const observations = document.getElementById('observationsText').value;

    // Construir mensaje
    let message = 'Hola! Quiero hacer el siguiente pedido:\n\n';

    cart.forEach(item => {
        message += `- ${item.product.name} x${item.quantity}\n`;
    });

    message += `\nTotal del pedido: $${total.toLocaleString('es-AR')}`;

    if (observations.trim()) {
        message += `\n\nObservaciones: ${observations}`;
    }

    // Codificar mensaje
    const encodedMessage = encodeURIComponent(message);

    // Número de WhatsApp sin espacios
    const whatsappNumber = WHATSAPP_NUMBER.replace(/\D/g, '');

    // URL de WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Abrir en nueva pestaña
    window.open(whatsappUrl, '_blank');
}

// Guardar carrito en localStorage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Cargar carrito desde localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (e) {
            cart = [];
        }
    }
}
