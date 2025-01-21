const stations = [
    { id: 1, name: "Estación Central", capacity: 20, location: "Centro", status: "active" },
    { id: 2, name: "Estación Norte", capacity: 15, location: "Norte", status: "inactive" },
    { id: 3, name: "Estación Sur", capacity: 18, location: "Sur", status: "active" }
];

function loadStations() {
    const tableBody = document.querySelector("#stationsTable tbody");
    tableBody.innerHTML = "";

    stations.forEach(station => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${station.id}</td>
            <td>${station.name}</td>
            <td>${station.capacity}</td>
            <td>${station.location}</td>
            <td>
                <button class="status-button ${station.status}" onclick="toggleStatus(${station.id})">
                    ${station.status === 'active' ? 'Activo' : 'Inactivo'}
                </button>
            </td>
            <td class="actions">
                <button class="edit" onclick="editStation(${station.id})">✏️ Editar</button>
                <button class="delete" onclick="deleteStation(${station.id})">🗑️ Borrar</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function editStation(id) {
    const station = stations.find(station => station.id === id);
    if (station) {
        document.getElementById("stationName").value = station.name;
        document.getElementById("capacity").value = station.capacity;
        document.getElementById("location").value = station.location;
        document.getElementById("status").value = station.status;

        document.getElementById("myModal").style.display = "block";

        document.getElementById("editStationForm").onsubmit = function (event) {
            event.preventDefault();
            station.name = document.getElementById("stationName").value;
            station.capacity = parseInt(document.getElementById("capacity").value, 10);
            station.location = document.getElementById("location").value;
            station.status = document.getElementById("status").value;

            closeModal();
            loadStations();
        };
    }
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

function deleteStation(id) {
    const index = stations.findIndex(station => station.id === id);
    if (index !== -1) {
        stations.splice(index, 1);
        loadStations();
    }
}

function toggleStatus(id) {
    const station = stations.find(station => station.id === id);
    if (station) {
        station.status = station.status === 'active' ? 'inactive' : 'active';
        loadStations();
    }
}

document.getElementById("closeModal").onclick = closeModal;

window.onload = loadStations;
