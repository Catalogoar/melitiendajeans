# Manualidades Ale - Catálogo Online Estático

Catálogo online completamente estático para vender productos textiles artesanales por WhatsApp. **Sin frameworks, sin dependencias, sin compilación.**

## 🎯 Características

- ✅ **Completamente estático** - Solo HTML, CSS y JavaScript vanilla
- ✅ **Sin dependencias** - No necesita npm, node_modules ni compilación
- ✅ **Optimizado para celular** - Diseño responsivo perfecto en móviles
- ✅ **Carrito interactivo** - Agregar/eliminar productos, cambiar cantidades
- ✅ **Integración WhatsApp** - Envío automático de pedidos
- ✅ **Observaciones opcionales** - Campo para pedidos personalizados
- ✅ **Persistencia** - El carrito se guarda en localStorage
- ✅ **Imágenes configurables** - Edita fácilmente las URLs en `products.js`

## 📁 Estructura

```
manualidades-ale-static/
├── index.html          # Página principal
├── styles.css          # Estilos (limpio, responsivo)
├── products.js         # Datos de productos (EDITA AQUÍ LAS IMÁGENES)
├── app.js             # Lógica de la aplicación
└── README.md          # Este archivo
```

## 🚀 Cómo usar

### 1. Descargar los archivos
Descarga todos los archivos en una carpeta.

### 2. Configurar las imágenes
Abre `products.js` y reemplaza las URLs:

```javascript
const PRODUCTS = [
    {
        id: 1,
        name: "Agarraderas Estampadas",
        description: "Variedades de colores y diseños",
        price: 4000,
        image: "https://tu-dominio.com/imagenes/agarradera.jpg"  // ← EDITA AQUÍ
    },
    // ... más productos
];
```

### 3. Cambiar el número de WhatsApp
En `products.js`, busca:
```javascript
const WHATSAPP_NUMBER = "+54 3482 557798";
```

### 4. Cambiar el logo
En `index.html`, busca:
```html
<img src="https://tu-dominio.com/logo.jpg" alt="Manualidades Ale" class="logo">
```

### 5. Probar localmente
Abre `index.html` en tu navegador. ¡Listo!

## 📤 Desplegar en GitHub Pages (Gratis)

### Opción 1: Desde GitHub Web

1. Crea un repositorio en GitHub llamado `manualidades-ale`
2. Sube los archivos (index.html, styles.css, products.js, app.js)
3. Ve a Settings → Pages
4. Selecciona "Deploy from a branch"
5. Elige "main" y "/root"
6. ¡Listo! Tu sitio estará en: `https://tu-usuario.github.io/manualidades-ale`

### Opción 2: Desde la terminal

```bash
# Crear repositorio local
git init
git add .
git commit -m "Catálogo online inicial"

# Agregar repositorio remoto
git remote add origin https://github.com/tu-usuario/manualidades-ale.git

# Subir a GitHub
git branch -M main
git push -u origin main

# Habilitar GitHub Pages en Settings
```

## 🌐 Desplegar en Vercel (También gratis)

1. Ve a https://vercel.com
2. Haz clic en "New Project"
3. Importa tu repositorio de GitHub
4. Vercel detectará que es un sitio estático
5. ¡Haz clic en Deploy!

Tu sitio estará en: `https://manualidades-ale.vercel.app`

## 📋 Cargar imágenes

### Opción A: Cloudinary (Recomendado - Gratuito)
1. Crea cuenta en https://cloudinary.com
2. Sube tus imágenes
3. Copia la URL de cada imagen
4. Pega en `products.js`

### Opción B: GitHub
1. Crea carpeta `images` en tu repositorio
2. Sube las imágenes
3. Usa las URLs raw de GitHub

### Opción C: Tu servidor
Sube las imágenes a tu servidor web y usa las URLs públicas.

## ✏️ Editar productos

Abre `products.js` y modifica el array `PRODUCTS`:

```javascript
{
    id: 1,
    name: "Nombre del producto",
    description: "Descripción corta",
    price: 4000,
    image: "https://url-de-la-imagen.jpg"
}
```

## 🎨 Personalizar colores

Abre `styles.css` y busca `:root`:

```css
:root {
    --primary-color: #16a34a;      /* Color verde del botón */
    --primary-hover: #15803d;      /* Verde oscuro al pasar mouse */
    --text-dark: #1f2937;          /* Texto oscuro */
    --text-light: #6b7280;         /* Texto gris */
    --border-color: #e5e7eb;       /* Bordes */
    --bg-light: #f9fafb;           /* Fondo gris claro */
    --bg-white: #ffffff;           /* Fondo blanco */
}
```

## 🔧 Cambiar tipografía

En `styles.css`, busca `font-family` y cambia `'Poppins'` por otra fuente.

## 📱 Características técnicas

- **Almacenamiento local**: El carrito se guarda en localStorage
- **Imágenes fallback**: Si una imagen no carga, muestra un placeholder
- **Números formateados**: Los precios se muestran con separador de miles
- **Responsive**: Funciona perfectamente en celular, tablet y desktop
- **Sin conexión**: Funciona sin conexión a internet (excepto WhatsApp)

## 🐛 Solución de problemas

### Las imágenes no cargan
- Verifica que las URLs sean correctas
- Asegúrate de que el servidor permita acceso público
- Revisa la consola del navegador (F12) para errores

### El carrito no se guarda
- Asegúrate de que localStorage esté habilitado
- Prueba en modo incógnito

### WhatsApp no abre
- Verifica que el número esté en formato correcto
- Asegúrate de que el navegador permita abrir nuevas pestañas

## 📊 Estadísticas

- **Tamaño total**: ~50 KB (sin imágenes)
- **Tiempo de carga**: < 1 segundo
- **Compatibilidad**: Todos los navegadores modernos
- **Dependencias**: 0 (cero)

## 📝 Licencia

Este proyecto es propiedad de Manualidades Ale.

---

**Creado**: Marzo 2026  
**Versión**: 1.0  
**Tipo**: Estático (HTML + CSS + JavaScript vanilla)
