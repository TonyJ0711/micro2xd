const users = [
    { id: 123, nombre: 'Carolina Ramos', email: 'caro123@gmail.com', telefono: '0998789896', cargo: 'Supervisora', estado: 'Activo' },
    { id: 124, nombre: 'Elian Perez', email: 'elian@gmail.com', telefono: '0998563214', cargo: 'Mecánico', estado: 'Activo' },
    { id: 125, nombre: 'José Manuel', email: 'Jose@gmail.com', telefono: '0698745321', cargo: 'Ayudante', estado: 'Inactivo' }
];

// Función para escapar HTML y prevenir XSS
function escapeHTML(str) {
    return str.replace(/[&<>'"`]/g, (char) => {
        const escapeChars = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;',
            '`': '&#96;'
        };
        return escapeChars[char] || char;
    });
}

// Función para actualizar la tabla con usuarios
function updateTable() {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = ""; // Limpiar la tabla antes de volver a agregar filas

    users.forEach(user => {
        const row = document.createElement("tr");

        // Determinar el estado y la clase a aplicar (activo o inactivo)
        const statusClass = user.estado === 'Activo' ? 'active' : 'inactive'; // 'active' o 'inactive'
        const statusText = escapeHTML(user.estado);

        row.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${escapeHTML(String(user.id))}</td>
            <td>${escapeHTML(user.nombre)}</td>
            <td>${escapeHTML(user.email)}</td>
            <td>${escapeHTML(user.telefono)}</td>
            <td>${escapeHTML(user.cargo)}</td>
            <td><button class="status ${statusClass}" onclick="toggleStatus(${user.id})">${statusText}</button></td>
            <td class="actions">
                <button class="edit" onclick="openModal(${user.id})">✏️ Editar</button>
                <button class="delete" onclick="confirmDeleteUser(${user.id})">🗑️ Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Función para cambiar el estado de un usuario
function toggleStatus(userId) {
    const user = users.find(user => user.id === userId);
    if (user) {
        // Cambiar el estado
        user.estado = (user.estado === 'Activo') ? 'Inactivo' : 'Activo';
        // Actualizar la tabla para reflejar el cambio de color
        updateTable();
    }
}

// Función para confirmar y eliminar un usuario
function confirmDeleteUser(userId) {
    if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
        deleteUser(userId);
    }
}

function deleteUser(userId) {
    users = users.filter(user => user.id !== userId);
    updateTable();
}

// Función para abrir el modal de edición
function openModal(userId) {
    const user = users.find(user => user.id === userId);
    if (user) {
        document.getElementById('edit-name').value = user.nombre;
        document.getElementById('edit-email').value = user.email;
        document.getElementById('edit-phone').value = user.telefono;
        document.getElementById('edit-role').value = user.cargo;
        document.getElementById('edit-modal').style.display = 'block';

        // Configurar el formulario para guardar cambios
        document.getElementById('edit-form').onsubmit = function(event) {
            event.preventDefault();

            const nombre = document.getElementById('edit-name').value.trim();
            const email = document.getElementById('edit-email').value.trim();
            const telefono = document.getElementById('edit-phone').value.trim();
            const cargo = document.getElementById('edit-role').value.trim();

            if (!nombre || !email || !telefono || !cargo) {
                alert("Por favor, completa todos los campos correctamente.");
                return;
            }

            user.nombre = nombre;
            user.email = email;
            user.telefono = telefono;
            user.cargo = cargo;

            updateTable();
            document.getElementById('edit-modal').style.display = 'none';
        };
    }
}

// Cierra el modal cuando se hace clic en el botón de cerrar
document.querySelector(".close-button").addEventListener("click", function() {
    document.getElementById('edit-modal').style.display = 'none';
});

// Inicializa la tabla al cargar la página
window.onload = updateTable;
