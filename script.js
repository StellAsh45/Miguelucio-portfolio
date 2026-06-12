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

    // Función para generar sombras (estrellas) aleatorias
    function generarEstrellas(cantidad) {
        let sombras = [];
        for (let i = 0; i < cantidad; i++) {
            const x = Math.floor(Math.random() * 120) - 10; // -10 a 110vw para cubrir bordes
            const y = Math.floor(Math.random() * 120) - 10; // -10 a 110vh
            const opacidad = Math.random() * 0.5 + 0.5; // Opacidad aleatoria para que brillen distinto
            // Alternar colores entre blanco, cian claro y morado claro para el efecto premium
            const colores = [`rgba(255, 255, 255, ${opacidad})`, `rgba(0, 243, 255, ${opacidad * 0.8})`, `rgba(188, 19, 254, ${opacidad * 0.8})`];
            const color = colores[Math.floor(Math.random() * colores.length)];
            sombras.push(`${x}vw ${y}vh ${color}`);
        }
        return sombras.join(', ');
    }

    // Asignar las sombras generadas a cada capa (ahora más cantidad)
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
        
        // Colores aleatorios (Cian, Morado o Blanco)
        const coloresFugaces = [
            { // Cian
                bg: 'linear-gradient(90deg, rgba(0,243,255,1) 0%, rgba(0,243,255,0.5) 50%, rgba(0,0,0,0) 100%)',
                shadow: 'drop-shadow(0 0 10px rgba(0, 243, 255, 1))'
            },
            { // Morado
                bg: 'linear-gradient(90deg, rgba(188,19,254,1) 0%, rgba(188,19,254,0.5) 50%, rgba(0,0,0,0) 100%)',
                shadow: 'drop-shadow(0 0 10px rgba(188, 19, 254, 1))'
            },
            { // Blanco brillante
                bg: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.5) 50%, rgba(0,0,0,0) 100%)',
                shadow: 'drop-shadow(0 0 10px rgba(255, 255, 255, 1))'
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
