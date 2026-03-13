document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));

        const headerOffset = 120;
        const elementsToAdjust = ['about', 'skills', 'projects', 'education'];
        const extraOffset = elementsToAdjust.includes(this.getAttribute('href')) ? 50 : -20;

        const elementPosition = target.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset - extraOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});
