// Datos de ejemplo para las filas de la tabla
const mantenimientoData = [
    { id: 1, fecha: "10-01-2025", tipo: "Mantenimiento de llantas", estacionId: "123", descripcion: "Fallo llanta frontal" },
    { id: 2, fecha: "11-01-2025", tipo: "Mantenimiento de frenos", estacionId: "124", descripcion: "Freno trasero dañado" },
    { id: 3, fecha: "12-01-2025", tipo: "Mantenimiento de cadena", estacionId: "125", descripcion: "Cadena rota" },
];

// Función para escapar caracteres maliciosos y prevenir XSS
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

// Función para cargar los datos en la tabla
function loadTable() {
    const tableBody = document.querySelector('#mantenimiento-table tbody');
    tableBody.innerHTML = ''; // Limpiar la tabla antes de llenarla

    mantenimientoData.forEach(mantenimiento => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${escapeHTML(String(mantenimiento.id))}</td>
            <td>${escapeHTML(mantenimiento.fecha)}</td>
            <td>${escapeHTML(mantenimiento.tipo)}</td>
            <td>${escapeHTML(mantenimiento.estacionId)}</td>
            <td>${escapeHTML(mantenimiento.descripcion)}</td>
            <td class="actions">
                <button class="edit" data-id="${escapeHTML(String(mantenimiento.id))}">✏️ Editar</button>
                <button class="delete" data-id="${escapeHTML(String(mantenimiento.id))}">🗑️ Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Añadir event listeners a los botones de editar y eliminar
    document.querySelectorAll('.edit').forEach(button => {
        button.addEventListener('click', openEditModal);
    });

    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', deleteMantenimiento);
    });
}

// Función para abrir el modal de edición y cargar los datos
function openEditModal(event) {
    const mantenimientoId = event.target.getAttribute('data-id');
    const mantenimiento = mantenimientoData.find(item => item.id == mantenimientoId);

    if (mantenimiento) {
        document.getElementById('edit-id').value = escapeHTML(String(mantenimiento.id));
        document.getElementById('edit-date').value = escapeHTML(mantenimiento.fecha);
        document.getElementById('edit-type').value = escapeHTML(mantenimiento.tipo);
        document.getElementById('edit-station-id').value = escapeHTML(mantenimiento.estacionId);
        document.getElementById('edit-description').value = escapeHTML(mantenimiento.descripcion);

        // Mostrar el modal
        document.getElementById('edit-modal').style.display = 'block';
    }
}

// Función para cerrar el modal
document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('edit-modal').style.display = 'none';
});

// Función para eliminar un mantenimiento
function deleteMantenimiento(event) {
    const mantenimientoId = event.target.getAttribute('data-id');
    const index = mantenimientoData.findIndex(item => item.id == mantenimientoId);

    if (index !== -1) {
        mantenimientoData.splice(index, 1); // Eliminar el mantenimiento
        loadTable(); // Volver a cargar la tabla sin el mantenimiento eliminado
    }
}

// Función para guardar los cambios en el mantenimiento editado
document.getElementById('edit-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe

    const id = document.getElementById('edit-id').value;
    const fecha = document.getElementById('edit-date').value;
    const tipo = document.getElementById('edit-type').value;
    const estacionId = document.getElementById('edit-station-id').value;
    const descripcion = document.getElementById('edit-description').value;

    const mantenimiento = mantenimientoData.find(item => item.id == id);

    if (mantenimiento) {
        mantenimiento.fecha = fecha;
        mantenimiento.tipo = tipo;
        mantenimiento.estacionId = estacionId;
        mantenimiento.descripcion = descripcion;

        loadTable(); // Volver a cargar la tabla con los cambios
        document.getElementById('edit-modal').style.display = 'none'; // Cerrar el modal
    }
});

// Inicializar la tabla al cargar la página
loadTable();
