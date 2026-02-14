# Nuestra Historia - Sitio Web de San Valentín

Un sitio web romántico e interactivo para contar su historia de amor.

## Cómo Personalizar

### 1. Agregar Fotos

Crea una carpeta llamada `fotos` dentro de la carpeta del proyecto y agrega tus imágenes:

```
regalo/
├── index.html
├── styles.css
├── script.js
├── fotos/
│   ├── foto1.jpg
│   ├── foto2.jpg
│   ├── foto3.jpg
│   └── ...
└── musica/
    └── cancion.mp3 (opcional)
```

Luego, en el archivo `index.html`, busca los `<div class="photo-placeholder">` y reemplázalos con:

```html
<div class="photo-placeholder">
    <img src="fotos/tu-foto.jpg" alt="Descripción de la foto">
</div>
```

### 2. Personalizar los Textos

Abre `index.html` y busca los textos dentro de las etiquetas `<p>` en cada capítulo. 
Reemplázalos con tu propia historia:

- **Capítulo I**: Cómo se conocieron
- **Capítulo II**: Sus primeras conversaciones y momentos
- **Capítulo III**: Cuándo supiste que era "la indicada"
- **Capítulo IV**: Sus aventuras y viajes juntos
- **Capítulo V**: Las cosas que amas de ella
- **Capítulo Final**: Tu mensaje y promesas

### 3. Agregar Música (Opcional)

1. Crea una carpeta `musica` y agrega tu canción favorita
2. En `index.html`, busca el elemento `<audio>` y descomenta la línea:

```html
<audio id="backgroundMusic" loop>
    <source src="musica/tu-cancion.mp3" type="audio/mpeg">
</audio>
```

### 4. Cambiar la Fecha

En el capítulo final, busca la clase `.date` y cambia la fecha si lo deseas.

## Cómo Ver el Sitio

### Opción 1: Abrir directamente
Simplemente haz doble clic en `index.html` para abrirlo en tu navegador.

### Opción 2: Usar un servidor local (recomendado)
Para una mejor experiencia, puedes usar un servidor local:

**Con VS Code:**
- Instala la extensión "Live Server"
- Click derecho en `index.html` > "Open with Live Server"

**Con Python:**
```bash
cd c:\regalo
python -m http.server 8000
```
Luego abre http://localhost:8000 en tu navegador.

## Características

- Diseño minimalista y elegante con colores vino
- Animaciones de rosas, tulipanes y lirios cayendo suavemente
- Navegación fluida entre capítulos con scroll
- Espacios para fotos con marcos elegantes
- Grid de memorias para múltiples fotos
- Lista animada de "Lo que amo de ti"
- Soporte para música de fondo
- Efectos especiales al hacer click en el capítulo final
- Totalmente responsive (funciona en móviles y tablets)

## Colores Utilizados

- Vino principal: #722F37
- Vino oscuro: #4A1C23
- Burgundy: #800020
- Crema: #FDF5E6
- Marfil: #FFFFF0

## Consejos

1. **Fotos**: Usa fotos de buena calidad pero optimizadas para web (máximo 1-2MB cada una)
2. **Textos**: Escribe desde el corazón, no tiene que ser perfecto
3. **Música**: Elige una canción que sea especial para ambos
4. **Presentación**: Muéstrale el sitio en un momento especial

¡Feliz San Valentín!
