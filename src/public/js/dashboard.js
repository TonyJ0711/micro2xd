// Simulando datos de las estaciones
const stations = [
    { id: 1, name: "Carolina", color: "Azul", totalRentals: 43, totalBikes: 45, totalBeacons: 2, totalAlerts: 7, maintenance: 8 },
    { id: 2, name: "Ejido", color: "Verde", totalRentals: 50, totalBikes: 55, totalBeacons: 3, totalAlerts: 5, maintenance: 1 },
    { id: 3, name: "Alameda", color: "Rojo", totalRentals: 30, totalBikes: 40, totalBeacons: 1, totalAlerts: 2, maintenance: 6 }
];

// Función para cargar las estaciones en la tabla
function loadStations() {
    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";

    stations.forEach(station => {
        const row = document.createElement("tr");
        row.classList.add("table-row");
        row.innerHTML = `
            <td>
                <img src="../public/imagenes/caroli.jpeg" alt="Icon" class="table-img">
            </td>                            
            <td>${station.name}</td>
            <td>${station.color}</td>
            <td>Alquiladas ${station.totalRentals}</td>
            <td>Total bicicletas ${station.totalBikes}</td>
            <td>Beacons ${station.totalBeacons}</td>
            <td>Total alertas ${station.totalAlerts}</td>
            <td>Realizados ${station.maintenance}</td>
            <td class="action-buttons">
                <button class="btn btn-edit" onclick="openEditModal(${station.id})">Editar</button>
                <button class="btn btn-delete" onclick="openDeleteModal(${station.id})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Función para abrir el modal de edición
function openEditModal(id) {
    const station = stations.find(station => station.id === id);
    if (station) {
        document.getElementById("stationName").value = station.name;
        document.getElementById("stationColor").value = station.color;
        document.getElementById("totalRentals").value = station.totalRentals;
        document.getElementById("totalBikes").value = station.totalBikes;
        document.getElementById("totalBeacons").value = station.totalBeacons;
        document.getElementById("totalAlerts").value = station.totalAlerts;
        document.getElementById("maintenance").value = station.maintenance;

        document.getElementById("editStationForm").onsubmit = function(event) {
            event.preventDefault();
            updateStation(id);
        };

        document.getElementById("myModal").style.display = "block";
    }
}

// Función para actualizar la estación con los nuevos datos
function updateStation(id) {
    const station = stations.find(station => station.id === id);
    if (station) {
        station.name = document.getElementById("stationName").value;
        station.color = document.getElementById("stationColor").value;
        station.totalRentals = document.getElementById("totalRentals").value;
        station.totalBikes = document.getElementById("totalBikes").value;
        station.totalBeacons = document.getElementById("totalBeacons").value;
        station.totalAlerts = document.getElementById("totalAlerts").value;
        station.maintenance = document.getElementById("maintenance").value;

        closeModal();
        loadStations();
    }
}

// Función para cerrar el modal de edición
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

// Función para abrir el modal de confirmación de eliminación
function openDeleteModal(id) {
    const deleteModal = document.getElementById("deleteModal");
    deleteModal.style.display = "block";

    // Asignar acción de confirmación
    document.getElementById("confirmDelete").onclick = function() {
        deleteStation(id);
        closeDeleteModal();
    };

    // Asignar acción de cancelación
    document.getElementById("cancelDelete").onclick = closeDeleteModal;
}

// Función para cerrar el modal de confirmación de eliminación
function closeDeleteModal() {
    const deleteModal = document.getElementById("deleteModal");
    deleteModal.style.display = "none";
}

// Función para eliminar estación
function deleteStation(id) {
    const index = stations.findIndex(station => station.id === id);
    if (index !== -1) {
        stations.splice(index, 1);
        loadStations();
    }
}

// Función para buscar estaciones
function searchStations() {
    const searchInput = document.querySelector("input[type='text']").value.toLowerCase();
    const filteredStations = stations.filter(station => station.name.toLowerCase().includes(searchInput));

    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = "";

    filteredStations.forEach(station => {
        const row = document.createElement("tr");
        row.classList.add("table-row");
        row.innerHTML = `
            <td>
                <img src="../public/imagenes/caroli.jpeg" alt="Icon" class="table-img">
            </td>                            
            <td>${station.name}</td>
            <td>${station.color}</td>
            <td>Alquiladas ${station.totalRentals}</td>
            <td>Total bicicletas ${station.totalBikes}</td>
            <td>Beacons ${station.totalBeacons}</td>
            <td>Total alertas ${station.totalAlerts}</td>
            <td>Realizados ${station.maintenance}</td>
            <td class="action-buttons">
                <button class="btn btn-edit" onclick="openEditModal(${station.id})">Editar</button>
                <button class="btn btn-delete" onclick="openDeleteModal(${station.id})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Asignar evento de búsqueda
document.querySelector("input[type='text']").addEventListener("input", searchStations);

// Cargar estaciones al cargar la página
window.onload = loadStations;
