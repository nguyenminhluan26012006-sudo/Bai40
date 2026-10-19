document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const dropdown = document.querySelector('.dropdown');
    const dropdownBtn = document.querySelector('.dropdown-btn');

    // Toggle Mobile Menu
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    
    dropdownBtn.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });

    const navLinks = document.querySelectorAll('.nav-menu a:not(.dropdown-btn)');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });
});