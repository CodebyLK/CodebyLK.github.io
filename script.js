document.addEventListener("DOMContentLoaded", () => {

    // 1. Mobile Menu Toggling
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('is-active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. Smooth Scroll Logic
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    // 3. Navbar Section Tracker
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id], header[id]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }, { rootMargin: '-30% 0px -60% 0px' });

    sections.forEach(section => observer.observe(section));

    // 4. Skill Filter + Staggered Animation
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillItems = document.querySelectorAll('.skill-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            skillItems.forEach((item, index) => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'flex';
                    item.style.animation = 'none';
                    item.offsetHeight;
                    item.style.animation = `atomicFadeIn 0.4s ease forwards ${index * 0.05}s`;
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 5. Contact Form Submission
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        // Inside your contactForm listener:
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const statusMsg = document.getElementById("status");
            statusMsg.textContent = "Sending...";

            const form = e.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                // We use text/plain to avoid CORS preflight issues with Google Scripts
                const response = await fetch("https://script.google.com/macros/s/AKfycbzNhovcOi9ZrB8QzBsqnaywrJJdMeNBE0T1caJPTyKFtSG_QJR0zp_joC1ZOFOk0LUAAQ/exec", {
                    method: "POST",
                    mode: "no-cors", // This is key for Google Apps Script
                    cache: "no-cache",
                    body: JSON.stringify(data)
                });

                // Note: with "no-cors", response.ok will be false and status will be 0
                // even if it works. This is an intentional browser security feature.
                statusMsg.textContent = "Message sent!";
                form.reset();

            } catch (err) {
                console.error(err);
                statusMsg.textContent = "Network error. Please try again.";
            }
        });
    }

});
