/* ========================================
   Nuestra Historia - Script Principal
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initFlowers();
    initScrollAnimations();
    initNavigation();
    initMusicToggle();
});

/* ========================================
   Sistema de Flores Animadas
   ======================================== */
function initFlowers() {
    const container = document.getElementById('flowersContainer');
    const flowerTypes = ['rose', 'tulip', 'lily'];
    
    // SVGs de las flores
    const flowerSVGs = {
        rose: `<svg viewBox="0 0 50 50">
            <path d="M25 10 Q30 15 25 22 Q20 15 25 10" fill="currentColor" opacity="0.9"/>
            <path d="M25 12 Q33 18 25 28 Q17 18 25 12" fill="currentColor" opacity="0.7"/>
            <path d="M25 14 Q36 22 25 34 Q14 22 25 14" fill="currentColor" opacity="0.5"/>
            <path d="M25 34 Q25 42 25 48" stroke="currentColor" stroke-width="1.5" fill="none" opacity="0.6"/>
            <path d="M22 40 Q20 38 18 40" stroke="currentColor" stroke-width="1" fill="none" opacity="0.4"/>
            <path d="M28 42 Q30 40 32 42" stroke="currentColor" stroke-width="1" fill="none" opacity="0.4"/>
        </svg>`,
        tulip: `<svg viewBox="0 0 50 50">
            <ellipse cx="25" cy="18" rx="8" ry="14" fill="currentColor" opacity="0.8"/>
            <ellipse cx="20" cy="20" rx="6" ry="12" fill="currentColor" opacity="0.6"/>
            <ellipse cx="30" cy="20" rx="6" ry="12" fill="currentColor" opacity="0.6"/>
            <path d="M25 32 L25 48" stroke="currentColor" stroke-width="2" opacity="0.5"/>
            <path d="M25 40 Q20 38 18 42" stroke="currentColor" stroke-width="1" fill="none" opacity="0.4"/>
        </svg>`,
        lily: `<svg viewBox="0 0 50 50">
            <path d="M25 8 Q28 15 25 22 Q22 15 25 8" fill="currentColor" opacity="0.9"/>
            <path d="M18 12 Q22 18 20 26 Q15 18 18 12" fill="currentColor" opacity="0.7"/>
            <path d="M32 12 Q28 18 30 26 Q35 18 32 12" fill="currentColor" opacity="0.7"/>
            <path d="M12 18 Q18 22 18 30 Q10 24 12 18" fill="currentColor" opacity="0.5"/>
            <path d="M38 18 Q32 22 32 30 Q40 24 38 18" fill="currentColor" opacity="0.5"/>
            <circle cx="25" cy="20" r="3" fill="currentColor" opacity="0.3"/>
            <path d="M25 30 L25 48" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
        </svg>`
    };
    
    // Crear flores iniciales
    createFlowers(container, flowerSVGs, flowerTypes, 15);
    
    // Continuar creando flores periódicamente
    setInterval(() => {
        createFlowers(container, flowerSVGs, flowerTypes, 3);
    }, 3000);
}

function createFlowers(container, flowerSVGs, flowerTypes, count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const flower = document.createElement('div');
            const type = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
            
            flower.className = `flower ${type}`;
            flower.innerHTML = flowerSVGs[type];
            
            // Posición horizontal aleatoria
            flower.style.left = Math.random() * 100 + '%';
            
            // Tamaño aleatorio
            const scale = 0.5 + Math.random() * 1;
            flower.style.transform = `scale(${scale})`;
            
            // Duración de animación aleatoria
            const duration = 12 + Math.random() * 10;
            flower.style.animationDuration = duration + 's';
            
            // Retraso aleatorio
            flower.style.animationDelay = Math.random() * 5 + 's';
            
            container.appendChild(flower);
            
            // Eliminar después de la animación
            setTimeout(() => {
                flower.remove();
            }, (duration + 5) * 1000);
            
        }, i * 200);
    }
}

/* ========================================
   Animaciones de Scroll
   ======================================== */
function initScrollAnimations() {
    const chapters = document.querySelectorAll('.chapter');
    const introScreen = document.getElementById('introScreen');
    
    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -10% 0px',
        threshold: 0.3
    };
    
    const chapterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                updateNavigation(entry.target.dataset.chapter);
            }
        });
    }, observerOptions);
    
    chapters.forEach(chapter => {
        chapterObserver.observe(chapter);
    });
    
    // Ocultar indicador de scroll cuando se hace scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator && window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        }
        
        // Efecto parallax sutil para el título
        if (window.scrollY < window.innerHeight) {
            const title = document.querySelector('.main-title');
            const subtitle = document.querySelector('.intro-subtitle');
            if (title && subtitle) {
                const offset = window.scrollY * 0.3;
                title.style.transform = `translateY(${offset}px)`;
                subtitle.style.transform = `translateY(${offset * 0.5}px)`;
            }
        }
    });
}

/* ========================================
   Navegación entre Capítulos
   ======================================== */
function initNavigation() {
    const navDots = document.querySelectorAll('.nav-dot');
    const chapters = document.querySelectorAll('.chapter');
    
    navDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const chapterNum = dot.dataset.chapter;
            const targetChapter = document.querySelector(`[data-chapter="${chapterNum}"]`);
            
            if (targetChapter) {
                targetChapter.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function updateNavigation(chapterNum) {
    const navDots = document.querySelectorAll('.nav-dot');
    
    navDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.dataset.chapter === chapterNum) {
            dot.classList.add('active');
        }
    });
}

/* ========================================
   Control de Música
   ======================================== */
function initMusicToggle() {
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    let isPlaying = false;
    
    // Intentar reproducir automáticamente al cargar
    function tryAutoPlay() {
        backgroundMusic.play().then(() => {
            isPlaying = true;
            musicToggle.classList.add('playing');
        }).catch(() => {
            // Si falla el autoplay, esperar interacción del usuario
            document.addEventListener('click', function playOnClick() {
                backgroundMusic.play().then(() => {
                    isPlaying = true;
                    musicToggle.classList.add('playing');
                }).catch(() => {});
                document.removeEventListener('click', playOnClick);
            }, { once: true });
        });
    }
    
    tryAutoPlay();
    
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            backgroundMusic.pause();
            musicToggle.classList.remove('playing');
        } else {
            backgroundMusic.play().catch(() => {
                console.log('No se pudo reproducir la música automáticamente');
            });
            musicToggle.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });
}

/* ========================================
   Efecto de Máquina de Escribir (opcional)
   ======================================== */
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

/* ========================================
   Efectos de Hover para Fotos
   ======================================== */
document.querySelectorAll('.photo-placeholder').forEach(photo => {
    photo.addEventListener('mouseenter', () => {
        // Crear efecto de brillo
        const shine = document.createElement('div');
        shine.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                90deg,
                transparent,
                rgba(255,255,255,0.2),
                transparent
            );
            animation: shine 0.6s ease;
            pointer-events: none;
        `;
        photo.style.position = 'relative';
        photo.appendChild(shine);
        
        setTimeout(() => shine.remove(), 600);
    });
});

// Agregar keyframes para el efecto shine
const style = document.createElement('style');
style.textContent = `
    @keyframes shine {
        to {
            left: 100%;
        }
    }
`;
document.head.appendChild(style);

/* ========================================
   Animaciones Adicionales
   ======================================== */

// Efecto de corazones al hacer click (sorpresa)
document.addEventListener('click', (e) => {
    // Solo en el capítulo final
    if (e.target.closest('.final-chapter')) {
        createHeartBurst(e.clientX, e.clientY);
    }
});

function createHeartBurst(x, y) {
    const colors = ['#722F37', '#800020', '#8B3A42', '#C4A484'];
    
    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = `<svg viewBox="0 0 24 24" fill="${colors[Math.floor(Math.random() * colors.length)]}">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>`;
        
        heart.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 20px;
            height: 20px;
            pointer-events: none;
            z-index: 9999;
            animation: heartFloat 1s ease-out forwards;
            transform: translate(-50%, -50%) rotate(${Math.random() * 360}deg);
        `;
        
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1000);
    }
}

// Agregar animación de corazones
const heartStyle = document.createElement('style');
heartStyle.textContent = `
    @keyframes heartFloat {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: translate(calc(-50% + ${(Math.random() - 0.5) * 100}px), calc(-50% - 50px)) scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: translate(calc(-50% + ${(Math.random() - 0.5) * 150}px), calc(-50% - 100px)) scale(0.5) rotate(360deg);
        }
    }
`;
document.head.appendChild(heartStyle);

/* ========================================
   Precarga de Imágenes (cuando agregues fotos)
   ======================================== */
function preloadImages(imageUrls) {
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Ejemplo de uso:
// preloadImages(['fotos/foto1.jpg', 'fotos/foto2.jpg', ...]);

/* ========================================
   Contador de Tiempo Juntos (opcional)
   ======================================== */
function calculateTimeTogether(startDate) {
    const start = new Date(startDate);
    const now = new Date();
    const diff = now - start;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    
    return {
        days,
        months,
        years,
        formatted: `${years} años, ${months % 12} meses y ${days % 30} días`
    };
}

// Ejemplo: calculateTimeTogether('2022-02-14')

console.log('💕 Sitio cargado con amor');

/* ========================================
   Animación del Lirio Pixel a Pixel
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    const thanksButton = document.getElementById('thanksButton');
    const lilyCanvas = document.getElementById('lilyCanvas');
    const thanksMessage = document.getElementById('thanksMessage');
    
    if (thanksButton && lilyCanvas) {
        thanksButton.addEventListener('click', () => {
            thanksButton.classList.add('hidden');
            lilyCanvas.classList.add('visible');
            drawLilyPixelByPixel(lilyCanvas, () => {
                thanksMessage.classList.add('visible');
            });
        });
    }
});

function drawLilyPixelByPixel(canvas, onComplete) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Colores del lirio
    const petalColor = '#E8B4BC'; // Rosa claro
    const petalDark = '#C78A92';  // Rosa oscuro
    const centerColor = '#FFD700'; // Amarillo dorado
    const stemColor = '#228B22';   // Verde
    const leafColor = '#32CD32';   // Verde claro
    
    // Definir los pixels del lirio
    const lilyPixels = [];
    const centerX = width / 2;
    const centerY = height / 2 - 50;
    const pixelSize = 4;
    
    // Función para agregar un pétalo
    function addPetal(startX, startY, angle, length, widthPetal) {
        for (let i = 0; i < length; i++) {
            const progress = i / length;
            const currentWidth = widthPetal * Math.sin(progress * Math.PI);
            
            for (let w = -currentWidth; w <= currentWidth; w++) {
                const x = startX + Math.cos(angle) * i * pixelSize + Math.cos(angle + Math.PI/2) * w * pixelSize;
                const y = startY + Math.sin(angle) * i * pixelSize + Math.sin(angle + Math.PI/2) * w * pixelSize;
                const color = Math.random() > 0.3 ? petalColor : petalDark;
                lilyPixels.push({ x, y, color });
            }
        }
    }
    
    // Crear 6 pétalos del lirio
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 / 6) * i - Math.PI / 2;
        addPetal(centerX, centerY, angle, 25, 6);
    }
    
    // Centro del lirio
    for (let i = -3; i <= 3; i++) {
        for (let j = -3; j <= 3; j++) {
            if (i*i + j*j <= 12) {
                lilyPixels.push({
                    x: centerX + i * pixelSize,
                    y: centerY + j * pixelSize,
                    color: centerColor
                });
            }
        }
    }
    
    // Tallo
    for (let i = 0; i < 50; i++) {
        lilyPixels.push({
            x: centerX + (Math.sin(i * 0.1) * 3),
            y: centerY + 30 + i * pixelSize,
            color: stemColor
        });
        lilyPixels.push({
            x: centerX + (Math.sin(i * 0.1) * 3) + pixelSize,
            y: centerY + 30 + i * pixelSize,
            color: stemColor
        });
    }
    
    // Hojas
    for (let i = 0; i < 15; i++) {
        const leafWidth = Math.sin(i / 15 * Math.PI) * 4;
        for (let w = 0; w < leafWidth; w++) {
            lilyPixels.push({
                x: centerX + 10 + i * pixelSize * 0.8 + w * pixelSize,
                y: centerY + 100 + i * pixelSize * 0.5,
                color: leafColor
            });
            lilyPixels.push({
                x: centerX - 10 - i * pixelSize * 0.8 - w * pixelSize,
                y: centerY + 120 + i * pixelSize * 0.5,
                color: leafColor
            });
        }
    }
    
    // Mezclar aleatoriamente para efecto más natural
    lilyPixels.sort(() => Math.random() - 0.5);
    
    // Dibujar pixel a pixel con animación
    let currentPixel = 0;
    const pixelsPerFrame = 8;
    
    function drawNext() {
        for (let i = 0; i < pixelsPerFrame && currentPixel < lilyPixels.length; i++) {
            const pixel = lilyPixels[currentPixel];
            ctx.fillStyle = pixel.color;
            ctx.fillRect(pixel.x, pixel.y, pixelSize, pixelSize);
            currentPixel++;
        }
        
        if (currentPixel < lilyPixels.length) {
            requestAnimationFrame(drawNext);
        } else {
            // Animación completada
            if (onComplete) onComplete();
        }
    }
    
    drawNext();
}
