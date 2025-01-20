const bikes = [
    { id: 1, brand: "Trek", model: "Domane", color: "Rojo", quantity: 10, location: "Almacén 1", status: "active" },
    { id: 2, brand: "Specialized", model: "Roubaix", color: "Azul", quantity: 5, location: "Almacén 2", status: "inactive" },
    { id: 3, brand: "Giant", model: "Defy", color: "Negro", quantity: 8, location: "Almacén 3", status: "active" }
];

// Función para cargar las bicicletas y mostrarlas en la tabla
function loadBikes() {
    console.log("Cargando bicicletas...");
    const tableBody = document.querySelector("#bikesTable tbody");
    tableBody.innerHTML = "";

    // Iteramos sobre el array de bicicletas y las mostramos en la tabla
    bikes.forEach(bike => {
        console.log("Añadiendo bicicleta: ", bike);
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${bike.id}</td>
            <td>${bike.brand}</td>
            <td>${bike.model}</td>
            <td>${bike.color}</td>
            <td>${bike.quantity}</td>
            <td>${bike.location}</td>
            <td>
                <button class="status-button ${bike.status}" onclick="toggleStatus(${bike.id})">
                    ${bike.status === 'active' ? 'Activo' : 'Inactivo'}
                </button>
            </td>
            <td class="actions">
                <button class="edit" onclick="editBike(${bike.id})">✏️ Editar</button>
                <button class="delete" onclick="deleteBike(${bike.id})">🗑️ Borrar</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Función para editar una bicicleta
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

        // Configuramos la función de submit del formulario para guardar los cambios
        document.getElementById("editBikeForm").onsubmit = function (event) {
            event.preventDefault();
            bike.brand = document.getElementById("bikeBrand").value;
            bike.model = document.getElementById("bikeModel").value;
            bike.color = document.getElementById("bikeColor").value;
            bike.quantity = parseInt(document.getElementById("bikeQuantity").value, 10);
            bike.location = document.getElementById("bikeLocation").value;
            bike.status = document.getElementById("bikeStatus").value;

            closeModal();
            loadBikes();
        };
    }
}

// Función para cerrar el modal de edición
function closeModal() {
    console.log("Cerrando modal de edición.");
    document.getElementById("myModal").style.display = "none";
}

// Función para borrar una bicicleta del array
function deleteBike(id) {
    const index = bikes.findIndex(bike => bike.id === id);
    if (index !== -1) {
        console.log("Borrando bicicleta con ID: ", id);
        bikes.splice(index, 1);
        loadBikes();
    }
}

// Función para cambiar el estado de una bicicleta (activo/inactivo)
function toggleStatus(id) {
    const bike = bikes.find(bike => bike.id === id);
    if (bike) {
        console.log("Cambiando estado de la bicicleta con ID: ", id);
        bike.status = bike.status === 'active' ? 'inactive' : 'active';
        loadBikes();
    }
}

// Asignamos el evento de cerrar modal al botón de cerrar
document.getElementById("closeModal").onclick = closeModal;

// Cargamos las bicicletas cuando la página está lista
window.onload = loadBikes;
