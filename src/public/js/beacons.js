// Datos quemados
const beacons = [
    { id: 123, date: '2025-10-10', serial: 'G-4758421', longitude: 85, latitude: 29 },
    { id: 124, date: '2025-11-12', serial: 'G-4758422', longitude: 84, latitude: 28 },
    { id: 125, date: '2025-12-15', serial: 'G-4758423', longitude: 86, latitude: 30 }
];

// Referencias a elementos del DOM
const beaconTableBody = document.querySelector('#beacon-table tbody');
const editModal = document.getElementById('edit-modal');
const closeButton = document.querySelector('.close-button');
const editForm = document.getElementById('edit-form');
const editId = document.getElementById('edit-id');
const editSerial = document.getElementById('edit-serial');
const editDate = document.getElementById('edit-date');
const editLongitude = document.getElementById('edit-longitude');
const editLatitude = document.getElementById('edit-latitude');

let selectedBeaconId = null;

// Función para escapar texto y prevenir XSS (Seguridad: Evita inyecciones maliciosas en el DOM)
function escapeHTML(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}

// Validación de entrada del formulario (Seguridad: Garantiza que los datos sean correctos y evita valores no deseados)
function validateBeacon(beacon) {
    if (!beacon.serial.trim()) { // Validación del campo serial (no vacío)
        alert("El serial no puede estar vacío.");
        return false;
    }
    if (isNaN(Date.parse(beacon.date))) { // Validación de la fecha
        alert("La fecha no es válida.");
        return false;
    }
    if (isNaN(beacon.longitude) || beacon.longitude < -180 || beacon.longitude > 180) { // Validación de la longitud
        alert("La longitud debe estar entre -180 y 180.");
        return false;
    }
    if (isNaN(beacon.latitude) || beacon.latitude < -90 || beacon.latitude > 90) { // Validación de la latitud
        alert("La latitud debe estar entre -90 y 90.");
        return false;
    }
    return true;
}

// Cargar los datos en la tabla
function loadBeacons() {
    beaconTableBody.innerHTML = ''; // Limpiar la tabla

    beacons.forEach(beacon => {
        const row = document.createElement('tr');
        row.dataset.id = beacon.id;
        row.innerHTML = `
            <td><input type="checkbox"></td>
            <td>${escapeHTML(beacon.id.toString())}</td> <!-- Seguridad: Escapamos el ID -->
            <td>${escapeHTML(beacon.date)}</td>          <!-- Seguridad: Escapamos la fecha -->
            <td>${escapeHTML(beacon.serial)}</td>        <!-- Seguridad: Escapamos el serial -->
            <td>${escapeHTML(beacon.longitude.toString())}</td> <!-- Seguridad: Escapamos longitud -->
            <td>${escapeHTML(beacon.latitude.toString())}</td>  <!-- Seguridad: Escapamos latitud -->
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
    selectedBeaconId = parseInt(row.dataset.id, 10);
    const beacon = beacons.find(b => b.id === selectedBeaconId);

    if (!beacon) { // Seguridad: Verificación de existencia del beacon
        alert("Beacon no encontrado.");
        return;
    }

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
        id: parseInt(editId.value, 10),
        serial: editSerial.value.trim(),
        date: editDate.value.trim(),
        longitude: parseFloat(editLongitude.value),
        latitude: parseFloat(editLatitude.value)
    };

    if (!validateBeacon(updatedBeacon)) { // Seguridad: Validamos los datos antes de actualizar
        return;
    }

    // Actualizar el beacon en el array
    const index = beacons.findIndex(b => b.id === selectedBeaconId);
    if (index > -1) { // Seguridad: Verificación de existencia del índice
        beacons[index] = updatedBeacon;
    } else {
        alert("Beacon no encontrado para actualizar.");
    }

    // Actualizar la tabla con los nuevos datos
    loadBeacons();

    // Cerrar el modal
    editModal.style.display = 'none';
});

// Eliminar un beacon con confirmación (Seguridad: Se solicita confirmación al usuario antes de eliminar)
function deleteBeacon(event) {
    const row = event.target.closest('tr');
    const beaconId = parseInt(row.dataset.id, 10);

    const confirmation = confirm("¿Estás seguro de que deseas eliminar este beacon?");
    if (!confirmation) return;

    // Eliminar el beacon del array
    const index = beacons.findIndex(b => b.id === beaconId);
    if (index > -1) { // Seguridad: Verificación de existencia antes de eliminar
        beacons.splice(index, 1);
    } else {
        alert("Beacon no encontrado para eliminar.");
    }

    // Actualizar la tabla con los datos modificados
    loadBeacons();
}

// Inicializar la carga de datos
loadBeacons();
