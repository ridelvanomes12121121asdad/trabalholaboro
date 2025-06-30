document.addEventListener('DOMContentLoaded', function() {
    
    // --- Lógica da Apresentação ---
    const slidesWrapper = document.getElementById('slides-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicatorsContainer = document.getElementById('slide-indicators');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    function goToSlide(slideIndex) {
        if (slideIndex < 0 || slideIndex >= totalSlides) return;
        currentSlide = slideIndex;
        slidesWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        slides.forEach((slide, index) => slide.classList.toggle('active', index === currentSlide));
        
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });

        prevBtn.style.visibility = currentSlide === 0 ? 'hidden' : 'visible';
        nextBtn.style.visibility = currentSlide === totalSlides - 1 ? 'hidden' : 'visible';
    }

    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        indicator.dataset.slideTo = i;
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }

    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
        else if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
    });

    goToSlide(0);

    // --- LÓGICA DE NAVEGAÇÃO POR TOQUE (SWIPE) ---
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;

    slidesWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slidesWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - swipeThreshold) {
            goToSlide(currentSlide + 1);
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            goToSlide(currentSlide - 1);
        }
    }

    // --- Lógica da Brincadeira com o Pablo ---
    const pabloTarget = document.getElementById('pablo-prank-target');
    if (pabloTarget) {
        setTimeout(() => {
            const prankElement = document.createElement('span');
            prankElement.textContent = 'viado';
            prankElement.className = 'prank-text';
            pabloTarget.appendChild(prankElement);
            setTimeout(() => prankElement.classList.add('visible'), 50);
            setTimeout(() => {
                prankElement.classList.remove('visible');
                setTimeout(() => prankElement.remove(), 300);
            }, 2000);
        }, 1500);
    }

    // --- Lógica do Fundo de Partículas (Canvas) ---
    const canvas = document.getElementById('particles-js');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    let particlesArray; const particleColors = ['rgba(147, 51, 234, 0.6)', 'rgba(168, 85, 247, 0.6)', 'rgba(255, 255, 255, 0.3)'];
    class Particle { constructor(x, y, dX, dY, size, color) { this.x = x; this.y = y; this.directionX = dX; this.directionY = dY; this.size = size; this.color = color; } draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); ctx.fillStyle = this.color; ctx.fill(); } update() { if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX; if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY; this.x += this.directionX; this.y += this.directionY; this.draw(); } }
    function init() { particlesArray = []; let num = (canvas.height * canvas.width) / 9000; for (let i = 0; i < num; i++) { let size = (Math.random() * 2) + 1; let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2); let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2); let dX = (Math.random() * 0.4) - 0.2; let dY = (Math.random() * 0.4) - 0.2; let color = particleColors[Math.floor(Math.random() * particleColors.length)]; particlesArray.push(new Particle(x, y, dX, dY, size, color)); } }
    function animate() { requestAnimationFrame(animate); ctx.clearRect(0, 0, innerWidth, innerHeight); for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); } }
    window.addEventListener('resize', () => { canvas.width = innerWidth; canvas.height = innerHeight; init(); });
    init(); animate();
});
