const bikes = [
    { id: 1, brand: "Trek", model: "Domane", color: "Rojo", quantity: 10, location: "Almacén 1", status: "active" },
    { id: 2, brand: "Specialized", model: "Roubaix", color: "Azul", quantity: 5, location: "Almacén 2", status: "inactive" },
    { id: 3, brand: "Giant", model: "Defy", color: "Negro", quantity: 8, location: "Almacén 3", status: "active" }
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

function loadBikes() {
    console.log("Cargando bicicletas...");
    const tableBody = document.querySelector("#bikesTable tbody");
    tableBody.innerHTML = "";

    bikes.forEach(bike => {
        console.log("Añadiendo bicicleta: ", bike);
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${escapeHTML(String(bike.id))}</td>
            <td>${escapeHTML(bike.brand)}</td>
            <td>${escapeHTML(bike.model)}</td>
            <td>${escapeHTML(bike.color)}</td>
            <td>${escapeHTML(String(bike.quantity))}</td>
            <td>${escapeHTML(bike.location)}</td>
            <td>
                <button class="status-button ${escapeHTML(bike.status)}" onclick="toggleStatus(${bike.id})">
                    ${bike.status === 'active' ? 'Activo' : 'Inactivo'}
                </button>
            </td>
            <td class="actions">
                <button class="edit" onclick="editBike(${bike.id})">✏️ Editar</button>
                <button class="delete" onclick="confirmDeleteBike(${bike.id})">🗑️ Borrar</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function editBike(id) {
    const bike = bikes.find(bike => bike.id === id);
    if (bike) {
        console.log("Editando bicicleta: ", bike);

        document.getElementById("bikeBrand").value = bike.brand;
        document.getElementById("bikeModel").value = bike.model;
        document.getElementById("bikeColor").value = bike.color;
        document.getElementById("bikeQuantity").value = bike.quantity;
        document.getElementById("bikeLocation").value = bike.location;
        document.getElementById("bikeStatus").value = bike.status;

        document.getElementById("myModal").style.display = "block";

        document.getElementById("editBikeForm").onsubmit = function (event) {
            event.preventDefault();

            const brand = document.getElementById("bikeBrand").value.trim();
            const model = document.getElementById("bikeModel").value.trim();
            const color = document.getElementById("bikeColor").value.trim();
            const quantity = parseInt(document.getElementById("bikeQuantity").value, 10);
            const location = document.getElementById("bikeLocation").value.trim();
            const status = document.getElementById("bikeStatus").value;

            if (!brand || !model || !color || isNaN(quantity) || quantity <= 0 || !location || !["active", "inactive"].includes(status)) {
                alert("Por favor, completa todos los campos correctamente.");
                return;
            }

            bike.brand = brand;
            bike.model = model;
            bike.color = color;
            bike.quantity = quantity;
            bike.location = location;
            bike.status = status;

            closeModal();
            loadBikes();
        };
    }
}

function closeModal() {
    console.log("Cerrando modal de edición.");
    document.getElementById("myModal").style.display = "none";
}

function confirmDeleteBike(id) {
    if (confirm("¿Estás seguro de que deseas eliminar esta bicicleta?")) {
        deleteBike(id);
    }
}

function deleteBike(id) {
    const index = bikes.findIndex(bike => bike.id === id);
    if (index !== -1) {
        console.log("Borrando bicicleta con ID: ", id);
        bikes.splice(index, 1);
        loadBikes();
    }
}

function toggleStatus(id) {
    const bike = bikes.find(bike => bike.id === id);
    if (bike) {
        console.log("Cambiando estado de la bicicleta con ID: ", id);
        bike.status = bike.status === 'active' ? 'inactive' : 'active';
        loadBikes();
    }
}

document.getElementById("closeModal").onclick = closeModal;

window.onload = loadBikes;
