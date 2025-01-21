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

// Función para escapar HTML y prevenir XSS
function escapeHTML(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}

// Cargar los datos de alquileres en la tabla
function loadRentals() {
    rentalTableBody.innerHTML = ""; // Limpiar la tabla

    rentals.forEach(rental => {
        const row = document.createElement("tr");
        row.dataset.id = rental.id;

        row.innerHTML = `
            <td>${escapeHTML(rental.id.toString())}</td>
            <td>${escapeHTML(rental.bikeBrand)}</td>
            <td>${escapeHTML(rental.client)}</td>
            <td>${escapeHTML(rental.rentalDate)}</td>
            <td>
                <button class="status-button ${escapeHTML(rental.status)}" onclick="toggleStatus(${rental.id})">
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

            const updatedBikeBrand = bikeBrandInput.value.trim();
            const updatedClient = clientInput.value.trim();
            const updatedRentalDate = rentalDateInput.value.trim();
            const updatedStatus = statusInput.value;

            // Validar datos del formulario
            if (!updatedBikeBrand || !updatedClient || !updatedRentalDate || !['active', 'returned'].includes(updatedStatus)) {
                alert("Por favor, completa todos los campos correctamente.");
                return;
            }

            rental.bikeBrand = updatedBikeBrand;
            rental.client = updatedClient;
            rental.rentalDate = updatedRentalDate;
            rental.status = updatedStatus;

            closeModal();
            loadRentals();
        };
    } else {
        alert("Alquiler no encontrado.");
    }
}

// Cerrar el modal
closeButton.onclick = closeModal;

function closeModal() {
    rentalModal.style.display = "none";
}

// Eliminar alquiler con confirmación
function deleteRental(id) {
    const index = rentals.findIndex(rental => rental.id === id);
    if (index !== -1) {
        const confirmation = confirm("¿Estás seguro de que deseas eliminar este alquiler?");
        if (confirmation) {
            rentals.splice(index, 1);
            loadRentals();
        }
    } else {
        alert("Alquiler no encontrado.");
    }
}

// Cambiar el estado (activo o devuelto)
function toggleStatus(id) {
    const rental = rentals.find(rental => rental.id === id);
    if (rental) {
        rental.status = rental.status === 'active' ? 'returned' : 'active';
        loadRentals();
    } else {
        alert("Alquiler no encontrado.");
    }
}

// Manejo de errores global (opcional)
window.onerror = function (message, source, lineno, colno, error) {
    console.error("Error global capturado:", { message, source, lineno, colno, error });
    alert("Se ha producido un error. Revisa la consola para más detalles.");
};

// Inicializar la carga de datos
window.onload = loadRentals;
