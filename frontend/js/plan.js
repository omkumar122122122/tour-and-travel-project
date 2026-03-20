// plan.js - Trip Planning Page Animations & Scroll

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for main content
    const mainContent = document.querySelector('.main-content');
    mainContent.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            mainContent.scrollBy({
                top: e.deltaY,
                behavior: 'smooth'
            });
            e.preventDefault();
        }
    }, { passive: false });

    // Animate categories on scroll
    const categories = document.querySelector('.category-list');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                categories.classList.add('popIn');
            }
        });
    }, { threshold: 0.2 });
    observer.observe(categories);

    // Animate places on scroll
    const places = document.querySelectorAll('.place');
    places.forEach(place => {
        place.style.opacity = 0;
        place.style.transform = 'scale(0.8)';
    });
    const placesObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'scale(1)';
                entry.target.style.transition = 'opacity 0.6s, transform 0.6s';
            }
        });
    }, { threshold: 0.3 });
    places.forEach(place => placesObserver.observe(place));

    // Robot animation (already handled by CSS)
});