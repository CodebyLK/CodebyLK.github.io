// 1. Mobile Menu Toggling
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

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
                item.offsetHeight; /* trigger reflow */
                item.style.animation = `atomicFadeIn 0.4s ease forwards ${index * 0.05}s`;
            } else {
                item.style.display = 'none';
            }
        });
    });
});

document.getElementById("contact-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbzNhovcOi9ZrB8QzBsqnaywrJJdMeNBE0T1caJPTyKFtSG_QJR0zp_joC1ZOFOk0LUAAQ/exec", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            document.getElementById("status").textContent = "Message sent!";
            form.reset();
        } else {
            document.getElementById("status").textContent = "Error sending message.";
        }
    } catch (err) {
        document.getElementById("status").textContent = "Network error.";
    }
});

