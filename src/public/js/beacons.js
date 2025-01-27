// Datos quemados
const beacons = [
    { id: 123, date: '2025-10-10', serial: 'G-4758421', longitude: 85, latitude: 29 },
    { id: 124, date: '2025-11-12', serial: 'G-4758422', longitude: 84, latitude: 28 },
    { id: 125, date: '2025-12-15', serial: 'G-4758423', longitude: 86, latitude: 30 }
];

// Referencias a elementos del DOM
const beaconTableBody = document.querySelector('#beacon-table tbody');
const editModal = document.getElementById('edit-modal');
const closeButton = document.querySelector('.close');
const editForm = document.getElementById('edit-form');
const editId = document.getElementById('edit-id');
const editSerial = document.getElementById('edit-serial');
const editDate = document.getElementById('edit-date');
const editLongitude = document.getElementById('edit-longitude');
const editLatitude = document.getElementById('edit-latitude');

let selectedBeaconId = null;

// Cargar los datos en la tabla
function loadBeacons() {
    beaconTableBody.innerHTML = ''; // Limpiar la tabla

    beacons.forEach(beacon => {
        const row = document.createElement('tr');
        row.dataset.id = beacon.id;
        row.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${beacon.id}</td>
            <td>${beacon.date}</td>
            <td>${beacon.serial}</td>
            <td>${beacon.longitude}</td>
            <td>${beacon.latitude}</td>
            <td class="actions">
                <button class="edit">✏️ Editar</button>
                <button class="delete">🗑️ Eliminar</button>
            </td>
        `;
        beaconTableBody.appendChild(row);
    });

    // Añadir eventos de edición y eliminación
    document.querySelectorAll('.edit').forEach(button => {
        button.addEventListener('click', openEditModal);
    });
    
    document.querySelectorAll('.delete').forEach(button => {
        button.addEventListener('click', deleteBeacon);
    });
}

// Abrir el modal de edición
function openEditModal(event) {
    const row = event.target.closest('tr');
    selectedBeaconId = row.dataset.id;
    const beacon = beacons.find(b => b.id == selectedBeaconId);

    // Rellenar el formulario con los datos del beacon
    editId.value = beacon.id;
    editSerial.value = beacon.serial;
    editDate.value = beacon.date;
    editLongitude.value = beacon.longitude;
    editLatitude.value = beacon.latitude;

    editModal.style.display = 'block';
}

// Cerrar el modal de edición
closeButton.addEventListener('click', () => {
    editModal.style.display = 'none';
});



// Guardar los cambios del formulario
editForm.addEventListener('submit', event => {
    event.preventDefault();
    
    const updatedBeacon = {
        id: parseInt(editId.value),
        serial: editSerial.value,
        date: editDate.value,
        longitude: editLongitude.value,
        latitude: editLatitude.value
    };

    // Actualizar el beacon en el array
    const index = beacons.findIndex(b => b.id === selectedBeaconId);
    if (index > -1) {
        beacons[index] = updatedBeacon;
    }

    // Actualizar la tabla con los nuevos datos
    loadBeacons();

    // Cerrar el modal
    editModal.style.display = 'none';
});

// Eliminar un beacon
function deleteBeacon(event) {
    const row = event.target.closest('tr');
    const beaconId = row.dataset.id;
    
    // Eliminar el beacon del array
    const index = beacons.findIndex(b => b.id == beaconId);
    if (index > -1) {
        beacons.splice(index, 1);
    }

    // Actualizar la tabla con los datos modificados
    loadBeacons();
}

// Inicializar la carga de datos
loadBeacons();
