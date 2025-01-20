let users = [
    { id: 123, nombre: 'Carolina Ramos', email: 'caro123@gmail.com', telefono: '0998789896', cargo: 'Supervisora', estado: 'Activo' },
    { id: 124, nombre: 'Elian Perez', email: 'elian@gmail.com', telefono: '0998563214', cargo: 'Mecánico', estado: 'Activo' },
    { id: 125, nombre: 'José Manuel', email: 'Jose@gmail.com', telefono: '0698745321', cargo: 'Ayudante', estado: 'Inactivo' }
];

// Función para actualizar la tabla con usuarios
function updateTable() {
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = ""; // Limpiar la tabla antes de volver a agregar filas

    users.forEach(user => {
        const row = document.createElement("tr");

        // Determinar el estado y la clase a aplicar (activo o inactivo)
        const statusClass = user.estado === 'Activo' ? 'active' : 'inactive'; // 'active' o 'inactive'
        const statusText = user.estado;

        row.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${user.id}</td>
            <td>${user.nombre}</td>
            <td>${user.email}</td>
            <td>${user.telefono}</td>
            <td>${user.cargo}</td>
            <td><button class="status ${statusClass}" onclick="toggleStatus(${user.id})">${statusText}</button></td>
            <td class="actions">
                <button class="edit" onclick="openModal(${user.id})">✏️ Editar</button>
                <button class="delete" onclick="deleteUser(${user.id})">🗑️ Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Función para cambiar el estado de un usuario
function toggleStatus(userId) {
    const user = users.find(user => user.id === userId);
    // Cambiar el estado
    user.estado = (user.estado === 'Activo') ? 'Inactivo' : 'Activo';
    // Actualizar la tabla para reflejar el cambio de color
    updateTable();
}

// Función para eliminar un usuario
function deleteUser(userId) {
    users = users.filter(user => user.id !== userId);
    updateTable();
}

// Función para abrir el modal de edición
function openModal(userId) {
    const user = users.find(user => user.id === userId);
    document.getElementById('edit-name').value = user.nombre;
    document.getElementById('edit-email').value = user.email;
    document.getElementById('edit-phone').value = user.telefono;
    document.getElementById('edit-role').value = user.cargo;
    document.getElementById('edit-modal').style.display = 'block';
}

// Cierra el modal cuando se hace clic en el botón de cerrar
document.querySelector(".close-button").addEventListener("click", function() {
    document.getElementById('edit-modal').style.display = 'none';
});

// Inicializa la tabla al cargar la página
window.onload = updateTable;
