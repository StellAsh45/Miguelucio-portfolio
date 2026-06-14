// Generador de Fondo de Estrellas y Sparkles
document.addEventListener('DOMContentLoaded', () => {
    // Crear el contenedor principal del fondo
    const bgContainer = document.createElement('div');
    bgContainer.className = 'fondo-estrellas';

    // Crear las 3 capas de estrellas
    const capa1 = document.createElement('div');
    capa1.className = 'capa-estrellas pequena';
    const capa2 = document.createElement('div');
    capa2.className = 'capa-estrellas mediana';
    const capa3 = document.createElement('div');
    capa3.className = 'capa-estrellas grande';

    // Función para generar estrellas aleatorias
    function generarEstrellas(cantidad) {
        let sombras = [];
        for (let i = 0; i < cantidad; i++) {
            const x = Math.floor(Math.random() * 120) - 10; // -10 a 110vw para cubrir bordes
            const y = Math.floor(Math.random() * 120) - 10; // -10 a 110vh
            const opacidad = Math.random() * 0.5 + 0.5; // Opacidad aleatoria para que brillen distinto
            // Alternar colores entre blanco, cian claro y morado claro
            const colores = [`rgba(255, 255, 255, ${opacidad})`, `rgba(0, 243, 255, ${opacidad * 0.8})`, `rgba(188, 19, 254, ${opacidad * 0.8})`];
            const color = colores[Math.floor(Math.random() * colores.length)];
            sombras.push(`${x}vw ${y}vh ${color}`);
        }
        return sombras.join(', ');
    }

    // Asignar las sombras generadas a cada capa
    capa1.style.boxShadow = generarEstrellas(250); // 400 estrellas pequeñas
    capa2.style.boxShadow = generarEstrellas(150);  // 150 estrellas medianas
    capa3.style.boxShadow = generarEstrellas(80);  // 70 estrellas grandes

    // Ensamblar el DOM
    bgContainer.appendChild(capa1);
    bgContainer.appendChild(capa2);
    bgContainer.appendChild(capa3);

    // Función para crear estrellas fugaces
    function crearEstrellaFugaz() {
        const estrellaFugaz = document.createElement('div');
        estrellaFugaz.className = 'estrella-fugaz';
        // Posición aleatoria en toda la pantalla
        estrellaFugaz.style.top = Math.floor(Math.random() * 100) + 'vh';
        estrellaFugaz.style.left = Math.floor(Math.random() * 100) + 'vw';
        // Retraso aleatorio
        estrellaFugaz.style.animationDelay = Math.random() * 2 + 's';

        // Profundidades
        const profundidades = [
            { width: '300px', height: '3px', filterScale: 20, animationDuration: '4s', zIndex: 3 }, // Cerca (4 segundos)
            { width: '150px', height: '2px', filterScale: 10, animationDuration: '6s', zIndex: 2 }, // Media (6 segundos)
            { width: '80px', height: '1px', filterScale: 5, animationDuration: '6s', zIndex: 1 }    // Lejos (6 segundos)
        ];
        const prof = profundidades[Math.floor(Math.random() * profundidades.length)];

        estrellaFugaz.style.width = prof.width;
        estrellaFugaz.style.height = prof.height;
        estrellaFugaz.style.animationDuration = prof.animationDuration;
        estrellaFugaz.style.zIndex = prof.zIndex;

        // Colores aleatorios
        const coloresFugaces = [
            {
                bg: 'linear-gradient(90deg, rgba(0,243,255,1) 0%, rgba(0,243,255,0.5) 50%, rgba(0,0,0,0) 100%)',
                shadow: `drop-shadow(0 0 ${prof.filterScale}px rgba(0, 243, 255, 1))`
            },
            {
                bg: 'linear-gradient(90deg, rgba(188,19,254,1) 0%, rgba(188,19,254,0.5) 50%, rgba(0,0,0,0) 100%)',
                shadow: `drop-shadow(0 0 ${prof.filterScale}px rgba(188, 19, 254, 1))`
            },
            {
                bg: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 50%, rgba(0,0,0,0) 100%)',
                shadow: `drop-shadow(0 0 ${prof.filterScale}px rgba(255, 255, 255, 1))`
            }
        ];
        const tema = coloresFugaces[Math.floor(Math.random() * coloresFugaces.length)];
        estrellaFugaz.style.background = tema.bg;
        estrellaFugaz.style.filter = tema.shadow;

        bgContainer.appendChild(estrellaFugaz);

        // Removerla y crear una nueva después de un tiempo más corto
        setTimeout(() => {
            estrellaFugaz.remove();
            crearEstrellaFugaz();
        }, 3000 + Math.random() * 2000); // Más frecuente (entre 3 y 5 segundos)
    }

    // Crear más estrellas fugaces simultáneas
    for (let i = 0; i < 6; i++) {
        setTimeout(crearEstrellaFugaz, i * 800);
    }

    // Insertarlo al principio del body para que quede de fondo en todas las páginas
    document.body.prepend(bgContainer);
});

// Lógica del Carrusel de Proyectos (Si existe en la página)
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('track-proyectos');
    if (!track) return;

    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    let autoSlideInterval;
    const AUTO_SLIDE_DELAY = 4000;
    let isTransitioning = false;

    function getItemWidth() {
        const item = track.querySelector('.carrusel-item');
        if (!item) return 0;
        return item.getBoundingClientRect().width + 30;
    }

    function moveNext() {
        if (isTransitioning) return;
        const items = track.querySelectorAll('.carrusel-item');
        if (items.length === 0) return;

        isTransitioning = true;
        const width = getItemWidth();

        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = `translateX(-${width}px)`;

        setTimeout(() => {
            track.style.transition = 'none';
            const firstItem = track.querySelector('.carrusel-item');
            track.appendChild(firstItem);

            track.style.transform = 'translateX(0)';
            isTransitioning = false;
        }, 500);
    }

    function movePrev() {
        if (isTransitioning) return;
        const items = track.querySelectorAll('.carrusel-item');
        if (items.length === 0) return;

        isTransitioning = true;
        const width = getItemWidth();

        const lastItem = items[items.length - 1];
        track.prepend(lastItem);

        track.style.transition = 'none';
        track.style.transform = `translateX(-${width}px)`;

        void track.offsetWidth;

        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = 'translateX(0)';

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(moveNext, AUTO_SLIDE_DELAY);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    btnNext.addEventListener('click', () => {
        moveNext();
        resetAutoSlide();
    });

    btnPrev.addEventListener('click', () => {
        movePrev();
        resetAutoSlide();
    });

    track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    track.addEventListener('mouseleave', startAutoSlide);

    setTimeout(() => {
        startAutoSlide();
    }, 100);
});

// Animación de scroll para las tarjetas de proyectos
document.addEventListener('DOMContentLoaded', () => {
    const tarjetas = document.querySelectorAll('.tarjeta-proyecto-extendida');

    if (tarjetas.length === 0) return;

    let delayCounter = 0;
    let delayTimer = null;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Aplicar retraso
                const delay = delayCounter * 0.2;
                entry.target.style.transitionDelay = `${delay}s, ${delay}s, ${delay}s`; // Para all, opacity, transform
                void entry.target.offsetWidth;
                entry.target.classList.add('visible');

                // Quitar el retraso una vez terminada la animación
                // para que el hover instantáneo siga funcionando perfectamente.
                setTimeout(() => {
                    if (entry.target.classList.contains('visible')) {
                        entry.target.style.transitionDelay = '';
                    }
                }, (delay * 1000) + 800);

                delayCounter++;
                // Reiniciar el contador de cascada si dejan de entrar elementos al mismo tiempo
                clearTimeout(delayTimer);
                delayTimer = setTimeout(() => {
                    delayCounter = 0;
                }, 100);
            } else {
                // Quitar la clase visible y el delay para que desaparezca y pueda volver a animarse
                entry.target.classList.remove('visible');
                entry.target.style.transitionDelay = '';
            }
        });
    }, {
        // Se dispara cuando el 20% de la tarjeta ya es visible en la pantalla
        threshold: 0.2
    });

    tarjetas.forEach(tarjeta => {
        observer.observe(tarjeta);
    });
});

// Animación de scroll para elementos
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.scroll-fade-up');
    if (fadeElements.length === 0) return;

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => fadeObserver.observe(el));
});
