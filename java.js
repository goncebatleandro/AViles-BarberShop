// Pantalla de carga
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');

    // Simula un tiempo de carga de 3 segundos
    setTimeout(function() {
        // Aplica el efecto de desvanecimiento
        loadingScreen.style.animation = 'fadeOut 1s ease-in-out forwards';

        // Oculta la pantalla de carga después del desvanecimiento
        setTimeout(function() {
            loadingScreen.style.display = 'none';
        }, 1000); // 1 segundo para el desvanecimiento
    }, 3000); // 3 segundos de carga
});

// Enviar Email
document.getElementById('reservaForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    console.log("Datos del formulario:", data);

    fetch('http://localhost:3000/enviar-correo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        console.log("Respuesta del servidor:", response);
        return response.json();
    })
    .then(result => {
        console.log("Resultado:", result);
        const confirmation = document.createElement('div');
        confirmation.className = 'confirmation-message';
        confirmation.textContent = '¡Gracias! Tu reserva ha sido enviada.';
        document.querySelector('.form').appendChild(confirmation);

        setTimeout(() => {
            confirmation.remove();
        }, 3000);
    })
    .catch(error => {
        console.error('Error:', error);
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = 'Hubo un error al enviar la reserva. Inténtalo de nuevo.';
        document.querySelector('.form').appendChild(errorMessage);

        setTimeout(() => {
            errorMessage.remove();
        }, 3000);
    });
});

// Función para el scroll suave
document.querySelectorAll('.navbar-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Previene el comportamiento por defecto del enlace
        const targetId = this.getAttribute('href').substring(1); // Obtiene el ID de la sección
        const targetElement = document.getElementById(targetId); // Encuentra el elemento de la sección
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' }); // Desplazamiento suave
        }
        // Cierra el menú hamburguesa después de hacer clic (si es necesario)
        const navbarLinks = document.getElementById('navbar-links');
        if (navbarLinks.classList.contains('active')) {
            navbarLinks.classList.remove('active');
        }
    });
});

// Función para el navbar scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Función para el menú hamburguesa
document.getElementById('mobile-menu').addEventListener('click', function () {
    const navbarLinks = document.getElementById('navbar-links');
    navbarLinks.classList.toggle('active');
});

// Función cierre menú hamburguesa
document.querySelectorAll('.navbar-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        // Cierra el menú hamburguesa después de hacer clic
        const navbarLinks = document.getElementById('navbar-links');
        navbarLinks.classList.remove('active');
    });
});

// Función para cambiar el tema
document.getElementById('theme-toggle').addEventListener('click', function () {
    const body = document.body;
    body.classList.toggle('light-mode'); // Alternar entre dark mode y light mode

    // Cambiar el ícono según el tema
    const themeIcon = document.querySelector('#theme-toggle i');
    if (body.classList.contains('light-mode')) {
        themeIcon.style.color = '#1a1a1a'; // Texto oscuro en light mode
    } else {
        themeIcon.style.color = '#ffffff'; // Texto blanco en dark mode
    }
});

// GALERIA
// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const dotsContainer = document.querySelector('.carousel-dots');

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    // Set slide width
    const slideWidth = slides[0].getBoundingClientRect().width;
    
    // Arrange slides next to each other
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);

    let currentSlide = 0;

    // Move to slide
    const moveToSlide = (targetIndex) => {
        if (targetIndex < 0) {
            targetIndex = slides.length - 1;
        } else if (targetIndex >= slides.length) {
            targetIndex = 0;
        }

        track.style.transform = `translateX(-${targetIndex * slideWidth}px)`;
        
        // Update active dot
        dots[currentSlide].classList.remove('active');
        dots[targetIndex].classList.add('active');
        
        currentSlide = targetIndex;
    };

    // Next button click
    nextButton.addEventListener('click', () => {
        moveToSlide(currentSlide + 1);
    });

    // Previous button click
    prevButton.addEventListener('click', () => {
        moveToSlide(currentSlide - 1);
    });

    // Dot click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            moveToSlide(index);
        });
    });

    // Auto-play
    setInterval(() => {
        moveToSlide(currentSlide + 1);
    }, 5000);
});

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('reservaForm');
    const overlay = document.getElementById('overlay');
    const closeOverlay = document.getElementById('close-overlay');

    // Función para mostrar el overlay
    function showOverlay(message) {
        const overlayMessage = document.getElementById('overlay-message');
        overlayMessage.textContent = message;
        overlay.style.display = 'flex';
    }

    // Función para cerrar el overlay
    function closeOverlayFunc() {
        overlay.style.display = 'none';
    }

    // Evento para cerrar el overlay con el botón
    closeOverlay.addEventListener('click', closeOverlayFunc);

    // Validación del formulario
    function validateForm() {
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const celular = document.getElementById('celular').value;
        const dni = document.getElementById('dni').value;
        const fecha = document.getElementById('fecha').value;
        const hora = document.getElementById('hora').value;
        const servicio = document.getElementById('servicio').value;

        // Validar campos vacíos
        if (!nombre || !email || !celular || !dni || !fecha || !hora || !servicio) {
            showOverlay('Por favor, complete todos los campos obligatorios');
            return false;
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showOverlay('Por favor, ingrese un email válido');
            return false;
        }

        // Validar celular (10 dígitos)
        const celularRegex = /^[0-9]{10}$/;
        if (!celularRegex.test(celular)) {
            showOverlay('El número de celular debe tener 10 dígitos');
            return false;
        }

        // Validar DNI (7-8 dígitos)
        const dniRegex = /^[0-9]{7,8}$/;
        if (!dniRegex.test(dni)) {
            showOverlay('El DNI debe tener entre 7 y 8 dígitos');
            return false;
        }

        return true;
    }

    // Manejar el envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm()) {
            // Aquí puedes usar fetch para enviar los datos
            fetch('http://localhost:3000/enviar-correo', {
                method: 'POST',
                body: new FormData(form)
            })
            .then(response => response.json())
            .then(data => {
                showOverlay('¡Reserva enviada con éxito!');
                form.reset(); // Limpiar el formulario
            })
            .catch(error => {
                showOverlay('Error al enviar la reserva. Por favor, intente nuevamente.');
                console.error('Error:', error);
            });
        }
    });

    // Cerrar overlay al hacer clic fuera del contenido
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeOverlayFunc();
        }
    });

    // Cerrar overlay con la tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeOverlayFunc();
        }
    });
});