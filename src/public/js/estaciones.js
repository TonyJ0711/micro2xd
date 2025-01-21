const stations = [
    { id: 1, name: "Estación Central", capacity: 20, location: "Centro", status: "active" },
    { id: 2, name: "Estación Norte", capacity: 15, location: "Norte", status: "inactive" },
    { id: 3, name: "Estación Sur", capacity: 18, location: "Sur", status: "active" }
];

// Escapa posibles caracteres maliciosos para prevenir XSS
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

function loadStations() {
    const tableBody = document.querySelector("#stationsTable tbody");
    tableBody.innerHTML = "";

    stations.forEach(station => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${escapeHTML(String(station.id))}</td>
            <td>${escapeHTML(station.name)}</td>
            <td>${escapeHTML(String(station.capacity))}</td>
            <td>${escapeHTML(station.location)}</td>
            <td>
                <button class="status-button ${escapeHTML(station.status)}" onclick="toggleStatus(${station.id})">
                    ${station.status === 'active' ? 'Activo' : 'Inactivo'}
                </button>
            </td>
            <td class="actions">
                <button class="edit" onclick="editStation(${station.id})">✏️ Editar</button>
                <button class="delete" onclick="confirmDeleteStation(${station.id})">🗑️ Borrar</button>
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

            const name = document.getElementById("stationName").value.trim();
            const capacity = parseInt(document.getElementById("capacity").value, 10);
            const location = document.getElementById("location").value.trim();
            const status = document.getElementById("status").value;

            if (!name || isNaN(capacity) || capacity <= 0 || !location || !["active", "inactive"].includes(status)) {
                alert("Por favor, completa todos los campos correctamente.");
                return;
            }

            station.name = name;
            station.capacity = capacity;
            station.location = location;
            station.status = status;

            closeModal();
            loadStations();
        };
    }
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

function confirmDeleteStation(id) {
    if (confirm("¿Estás seguro de que deseas eliminar esta estación?")) {
        deleteStation(id);
    }
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
