// Datos quemados de alquiler
const rentals = [
    { id: 1, bikeBrand: "Trek", client: "Juan Pérez", rentalDate: "2025-01-10", status: "active" },
    { id: 2, bikeBrand: "Specialized", client: "Ana Gómez", rentalDate: "2025-01-15", status: "returned" },
    { id: 3, bikeBrand: "Cannondale", client: "Carlos Martínez", rentalDate: "2025-01-18", status: "active" }
];

// Referencias a elementos del DOM
const rentalTableBody = document.querySelector("#rental-table tbody");
const rentalModal = document.getElementById("myModal");
const closeButton = document.getElementById("closeModal");
const editRentalForm = document.getElementById("editRentalForm");
const bikeBrandInput = document.getElementById("bikeBrand");
const clientInput = document.getElementById("client");
const rentalDateInput = document.getElementById("rentalDate");
const statusInput = document.getElementById("status");

let selectedRentalId = null;

// Cargar los datos de alquileres en la tabla
function loadRentals() {
    rentalTableBody.innerHTML = ""; // Limpiar la tabla

    rentals.forEach(rental => {
        const row = document.createElement("tr");
        row.dataset.id = rental.id;

        row.innerHTML = `
            <td>${rental.id}</td>
            <td>${rental.bikeBrand}</td>
            <td>${rental.client}</td>
            <td>${rental.rentalDate}</td>
            <td>
                <button class="status-button ${rental.status}" onclick="toggleStatus(${rental.id})">
                    ${rental.status === 'active' ? 'Activo' : 'Devuelto'}
                </button>
            </td>
            <td class="actions">
                <button class="edit" onclick="editRental(${rental.id})">✏️ Editar</button>
                <button class="delete" onclick="deleteRental(${rental.id})">🗑️ Borrar</button>
            </td>
        `;

        rentalTableBody.appendChild(row);
    });
}

// Editar alquiler
function editRental(id) {
    const rental = rentals.find(r => r.id === id);
    if (rental) {
        bikeBrandInput.value = rental.bikeBrand;
        clientInput.value = rental.client;
        rentalDateInput.value = rental.rentalDate;
        statusInput.value = rental.status;

        rentalModal.style.display = "block";

        editRentalForm.onsubmit = function (event) {
            event.preventDefault();

            rental.bikeBrand = bikeBrandInput.value;
            rental.client = clientInput.value;
            rental.rentalDate = rentalDateInput.value;
            rental.status = statusInput.value;

            closeModal();
            loadRentals();
        };
    }
}

// Cerrar el modal
closeButton.onclick = closeModal;

function closeModal() {
    rentalModal.style.display = "none";
}

// Eliminar alquiler
function deleteRental(id) {
    const index = rentals.findIndex(rental => rental.id === id);
    if (index !== -1) {
        rentals.splice(index, 1);
        loadRentals();
    }
}

// Cambiar el estado (activo o devuelto)
function toggleStatus(id) {
    const rental = rentals.find(rental => rental.id === id);
    if (rental) {
        rental.status = rental.status === 'active' ? 'returned' : 'active';
        loadRentals();
    }
}

// Inicializar la carga de datos
window.onload = loadRentals;
