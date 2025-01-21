// sidebarController.js

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    // Toggle sidebar
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // Navigation redirection
    const menuItems = document.querySelectorAll('nav ul li');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute('data-page');
            if (page) {
                window.location.href = page;
            }
        });
    });
});
