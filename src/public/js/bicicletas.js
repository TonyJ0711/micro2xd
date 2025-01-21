// Datos simulados
let bicicletas = [
    { id: 1, marca: "Bicicross", total: 10 },
    { id: 2, marca: "Mountain Bike", total: 8 },
    { id: 3, marca: "Bicicleta de Paseo", total: 5 },
];

let alquileres = [
    { id: 1, tipo: "Bicicross", cliente: "Juan Pérez", fechaAlquiler: "2025-01-15", disponibles: 5, enUso: 5 },
    { id: 2, tipo: "Mountain Bike", cliente: "Ana García", fechaAlquiler: "2025-01-18", disponibles: 3, enUso: 5 },
];

let mantenimientos = [
    { id: 1, tipo: "Bicicross", mecanico: "Carlos López", fechaEntrega: "2025-01-10" },
    { id: 2, tipo: "Mountain Bike", mecanico: "Sofia Martínez", fechaEntrega: "2025-01-12" },
];

// Variable global para guardar el id del objeto que estamos editando
let currentId = null;

// Función para escapar texto y prevenir XSS (Seguridad)
function escapeHTML(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Función para validar campos de entrada
function validateField(value, fieldName) {
    if (!value || !value.trim()) {
        alert(`El campo ${fieldName} no puede estar vacío.`);
        return false;
    }
    return true;
}

// Función para renderizar las tablas
function renderTables() {
    // Renderizar tabla de inventario
    const tablaInventario = document.getElementById('tabla-inventario').getElementsByTagName('tbody')[0];
    tablaInventario.innerHTML = ''; // Limpiar contenido de la tabla
    bicicletas.forEach(bicicleta => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${escapeHTML(bicicleta.id)}</td> <!-- Escapado para prevenir XSS -->
            <td>${escapeHTML(bicicleta.marca)}</td>
            <td>${escapeHTML(bicicleta.total)}</td>
            <td>
                <button class="edit" onclick="openEditModal('bicicleta', ${bicicleta.id})">Editar</button>
                <button class="delete" onclick="deleteBicicleta(${bicicleta.id})">Eliminar</button>
            </td>
        `;
        tablaInventario.appendChild(tr);
    });

    // Renderizar tabla de alquiler
    const tablaAlquiladas = document.getElementById('tabla-alquiladas').getElementsByTagName('tbody')[0];
    tablaAlquiladas.innerHTML = ''; // Limpiar contenido de la tabla
    alquileres.forEach(alquiler => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${escapeHTML(alquiler.id)}</td>
            <td>${escapeHTML(alquiler.tipo)}</td>
            <td>${escapeHTML(alquiler.cliente)}</td>
            <td>${escapeHTML(alquiler.fechaAlquiler)}</td>
            <td>${escapeHTML(alquiler.disponibles)}</td>
            <td>${escapeHTML(alquiler.enUso)}</td>
            <td>
                <button class="edit" onclick="openEditModal('alquiler', ${alquiler.id})">Editar</button>
                <button class="delete" onclick="deleteAlquiler(${alquiler.id})">Eliminar</button>
            </td>
        `;
        tablaAlquiladas.appendChild(tr);
    });

    // Renderizar tabla de mantenimiento
    const tablaMantenimiento = document.getElementById('tabla-mantenimiento').getElementsByTagName('tbody')[0];
    tablaMantenimiento.innerHTML = ''; // Limpiar contenido de la tabla
    mantenimientos.forEach(mantenimiento => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${escapeHTML(mantenimiento.id)}</td>
            <td>${escapeHTML(mantenimiento.tipo)}</td>
            <td>${escapeHTML(mantenimiento.mecanico)}</td>
            <td>${escapeHTML(mantenimiento.fechaEntrega)}</td>
            <td>
                <button class="edit" onclick="openEditModal('mantenimiento', ${mantenimiento.id})">Editar</button>
                <button class="delete" onclick="deleteMantenimiento(${mantenimiento.id})">Eliminar</button>
            </td>
        `;
        tablaMantenimiento.appendChild(tr);
    });
}

// Función para abrir el modal de editar
function openEditModal(tipo, id) {
    currentId = id; // Guardamos el id del item que estamos editando

    if (tipo === 'alquiler') {
        const alquiler = alquileres.find(a => a.id === id);
        if (!alquiler) { // Verificar existencia
            alert('Alquiler no encontrado.');
            return;
        }
        document.getElementById('edit-tipo').value = alquiler.tipo;
        document.getElementById('edit-cliente').value = alquiler.cliente;
        document.getElementById('edit-fecha').value = alquiler.fechaAlquiler;
        document.getElementById('edit-disponibles').value = alquiler.disponibles;
        document.getElementById('edit-enUso').value = alquiler.enUso;
        openModal('modal-editar-alquiler');
    }

    if (tipo === 'mantenimiento') {
        const mantenimiento = mantenimientos.find(m => m.id === id);
        if (!mantenimiento) { // Verificar existencia
            alert('Mantenimiento no encontrado.');
            return;
        }
        document.getElementById('edit-mantenimiento-tipo').value = mantenimiento.tipo;
        document.getElementById('edit-mecanico').value = mantenimiento.mecanico;
        document.getElementById('edit-fecha-entrega').value = mantenimiento.fechaEntrega;
        openModal('modal-editar-mantenimiento');
    }

    if (tipo === 'bicicleta') {
        const bicicleta = bicicletas.find(b => b.id === id);
        if (!bicicleta) { // Verificar existencia
            alert('Bicicleta no encontrada.');
            return;
        }
        document.getElementById('edit-marca').value = bicicleta.marca;
        document.getElementById('edit-total').value = bicicleta.total;
        openModal('modal-editar-bicicleta');
    }
}

// Función para abrir un modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

// Función para cerrar el modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Función para guardar cambios del alquiler
document.getElementById('form-editar-alquiler').addEventListener('submit', function(event) {
    event.preventDefault();
    const alquiler = alquileres.find(a => a.id === currentId);
    if (!alquiler) return; // Validación adicional
    alquiler.tipo = escapeHTML(document.getElementById('edit-tipo').value);
    alquiler.cliente = escapeHTML(document.getElementById('edit-cliente').value);
    alquiler.fechaAlquiler = escapeHTML(document.getElementById('edit-fecha').value);
    alquiler.disponibles = escapeHTML(document.getElementById('edit-disponibles').value);
    alquiler.enUso = escapeHTML(document.getElementById('edit-enUso').value);
    renderTables();
    closeModal('modal-editar-alquiler');
});

// Función para guardar cambios del mantenimiento
document.getElementById('form-editar-mantenimiento').addEventListener('submit', function(event) {
    event.preventDefault();
    const mantenimiento = mantenimientos.find(m => m.id === currentId);
    if (!mantenimiento) return; // Validación adicional
    mantenimiento.tipo = escapeHTML(document.getElementById('edit-mantenimiento-tipo').value);
    mantenimiento.mecanico = escapeHTML(document.getElementById('edit-mecanico').value);
    mantenimiento.fechaEntrega = escapeHTML(document.getElementById('edit-fecha-entrega').value);
    renderTables();
    closeModal('modal-editar-mantenimiento');
});

// Función para guardar cambios de bicicleta
document.getElementById('form-editar-bicicleta').addEventListener('submit', function(event) {
    event.preventDefault();
    const bicicleta = bicicletas.find(b => b.id === currentId);
    if (!bicicleta) return; // Validación adicional
    bicicleta.marca = escapeHTML(document.getElementById('edit-marca').value);
    bicicleta.total = escapeHTML(document.getElementById('edit-total').value);
    renderTables();
    closeModal('modal-editar-bicicleta');
});

// Funciones para eliminar
function deleteBicicleta(id) {
    if (!confirm('¿Está seguro de que desea eliminar esta bicicleta?')) return; // Confirmación
    bicicletas = bicicletas.filter(b => b.id !== id);
    renderTables();
}

function deleteAlquiler(id) {
    if (!confirm('¿Está seguro de que desea eliminar este alquiler?')) return; // Confirmación
    alquileres = alquileres.filter(a => a.id !== id);
    renderTables();
}

function deleteMantenimiento(id) {
    if (!confirm('¿Está seguro de que desea eliminar este mantenimiento?')) return; // Confirmación
    mantenimientos = mantenimientos.filter(m => m.id !== id);
    renderTables();
}

// Llamar la función para renderizar las tablas cuando la página se cargue
document.addEventListener('DOMContentLoaded', renderTables);
