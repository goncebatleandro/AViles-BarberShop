// Función para enviar email
document.getElementById('reservaForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    fetch('http://localhost:3000/enviar-correo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
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
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
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