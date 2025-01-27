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

// Función para renderizar las tablas
function renderTables() {
    // Renderizar tabla de inventario
    const tablaInventario = document.getElementById('tabla-inventario').getElementsByTagName('tbody')[0];
    tablaInventario.innerHTML = ''; // Limpiar contenido de la tabla
    bicicletas.forEach(bicicleta => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${bicicleta.id}</td>
            <td>${bicicleta.marca}</td>
            <td>${bicicleta.total}</td>
            <td>
                <button class="edit" onclick="openEditModal('bicicleta', ${bicicleta.id})">✏️ Editar</button>
                <button class="delete" onclick="deleteBicicleta(${bicicleta.id})">🗑️ Eliminar</button>
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
            <td>${alquiler.id}</td>
            <td>${alquiler.tipo}</td>
            <td>${alquiler.cliente}</td>
            <td>${alquiler.fechaAlquiler}</td>
            <td>${alquiler.disponibles}</td>
            <td>${alquiler.enUso}</td>
            <td>
                <button class="edit" onclick="openEditModal('alquiler', ${alquiler.id})">✏️ Editar</button>
                <button class="delete" onclick="deleteAlquiler(${alquiler.id})">🗑️ Eliminar</button>
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
            <td>${mantenimiento.id}</td>
            <td>${mantenimiento.tipo}</td>
            <td>${mantenimiento.mecanico}</td>
            <td>${mantenimiento.fechaEntrega}</td>
            <td>
                <button class="edit" onclick="openEditModal('mantenimiento', ${mantenimiento.id})">✏️ Editar</button>
                <button class="delete" onclick="deleteMantenimiento(${mantenimiento.id})">🗑️ Eliminar</button>
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
        document.getElementById('edit-tipo').value = alquiler.tipo;
        document.getElementById('edit-cliente').value = alquiler.cliente;
        document.getElementById('edit-fecha').value = alquiler.fechaAlquiler;
        document.getElementById('edit-disponibles').value = alquiler.disponibles;
        document.getElementById('edit-enUso').value = alquiler.enUso;
        openModal('modal-editar-alquiler');
    }

    if (tipo === 'mantenimiento') {
        const mantenimiento = mantenimientos.find(m => m.id === id);
        document.getElementById('edit-mantenimiento-tipo').value = mantenimiento.tipo;
        document.getElementById('edit-mecanico').value = mantenimiento.mecanico;
        document.getElementById('edit-fecha-entrega').value = mantenimiento.fechaEntrega;
        openModal('modal-editar-mantenimiento');
    }

    if (tipo === 'bicicleta') {
        const bicicleta = bicicletas.find(b => b.id === id);
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
    alquiler.tipo = document.getElementById('edit-tipo').value;
    alquiler.cliente = document.getElementById('edit-cliente').value;
    alquiler.fechaAlquiler = document.getElementById('edit-fecha').value;
    alquiler.disponibles = document.getElementById('edit-disponibles').value;
    alquiler.enUso = document.getElementById('edit-enUso').value;
    renderTables();
    closeModal('modal-editar-alquiler');
});

// Función para guardar cambios del mantenimiento
document.getElementById('form-editar-mantenimiento').addEventListener('submit', function(event) {
    event.preventDefault();
    const mantenimiento = mantenimientos.find(m => m.id === currentId);
    mantenimiento.tipo = document.getElementById('edit-mantenimiento-tipo').value;
    mantenimiento.mecanico = document.getElementById('edit-mecanico').value;
    mantenimiento.fechaEntrega = document.getElementById('edit-fecha-entrega').value;
    renderTables();
    closeModal('modal-editar-mantenimiento');
});

// Función para guardar cambios de bicicleta
document.getElementById('form-editar-bicicleta').addEventListener('submit', function(event) {
    event.preventDefault();
    const bicicleta = bicicletas.find(b => b.id === currentId);
    bicicleta.marca = document.getElementById('edit-marca').value;
    bicicleta.total = document.getElementById('edit-total').value;
    renderTables();
    closeModal('modal-editar-bicicleta');
});

// Funciones para eliminar
function deleteBicicleta(id) {
    bicicletas = bicicletas.filter(b => b.id !== id);
    renderTables();
}

function deleteAlquiler(id) {
    alquileres = alquileres.filter(a => a.id !== id);
    renderTables();
}

function deleteMantenimiento(id) {
    mantenimientos = mantenimientos.filter(m => m.id !== id);
    renderTables();
}

// Llamar la función para renderizar las tablas cuando la página se cargue
document.addEventListener('DOMContentLoaded', renderTables);
