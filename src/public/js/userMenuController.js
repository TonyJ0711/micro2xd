// userMenuController.js

document.addEventListener('DOMContentLoaded', function () {
    const userInfo = document.querySelector('.user-info');
    const dropdownMenu = document.createElement('div');
    dropdownMenu.classList.add('dropdown-menu');
    dropdownMenu.innerHTML = `
        <ul>
            <li id="view-profile">Ver Perfil</li>
            <li id="logout">Cerrar Sesión</li>
        </ul>
    `;
    userInfo.appendChild(dropdownMenu);

    // Estilo para que el dropdown se oculte por defecto y se muestre abajo
    dropdownMenu.style.position = 'absolute';
    dropdownMenu.style.top = '100%'; // Esto hace que aparezca debajo del nombre del usuario
    dropdownMenu.style.left = '0';
    dropdownMenu.style.display = 'none'; // Se oculta por defecto

    // Toggle dropdown menu
    userInfo.addEventListener('click', () => {
        // Verificar si ya está visible
        if (dropdownMenu.style.display === 'block') {
            dropdownMenu.style.display = 'none'; // Ocultar el menú
        } else {
            dropdownMenu.style.display = 'block'; // Mostrar el menú
        }
    });

    // Handle dropdown menu options
    document.getElementById('view-profile').addEventListener('click', () => {
        window.location.href = 'perfil.html';
    });

    document.getElementById('logout').addEventListener('click', () => {
        window.location.href = 'login.html';
    });

    // Close dropdown when clicking outside
    window.addEventListener('click', (event) => {
        if (!userInfo.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = 'none'; // Cerrar el menú si se hace clic fuera
        }
    });
});
