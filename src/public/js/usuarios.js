document.addEventListener("DOMContentLoaded", function () {
    const userTable = document.querySelector(".styled-table tbody");
    const editModal = document.getElementById("editUserModal");
    const deleteModal = document.getElementById("deleteUserModal");
    const editForm = document.getElementById("editUserForm");
    let currentRow = null;

    // Campos del modal de edición
    const editUserName = document.getElementById("editUserName");
    const editUserEmail = document.getElementById("editUserEmail");
    const editUserPhone = document.getElementById("editUserPhone");
    const editUserDob = document.getElementById("editUserDob");
    const editUserStatus = document.getElementById("editUserStatus");

    // Función para abrir el modal
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = "flex";
    }

    // Función para cerrar el modal
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = "none";
    }

    // Evento para manejar edición
    userTable.addEventListener("click", function (event) {
        if (event.target.classList.contains("edit")) {
            currentRow = event.target.closest("tr");
            const cells = currentRow.querySelectorAll("td");

            // Rellenar el formulario del modal
            editUserName.value = cells[2].textContent.trim();
            editUserEmail.value = cells[3].textContent.trim();
            editUserPhone.value = cells[4].textContent.trim();
            editUserDob.value = cells[5].textContent.trim();
            editUserStatus.value = cells[6].textContent.trim();

            openModal("editUserModal");
        }

        if (event.target.classList.contains("delete")) {
            currentRow = event.target.closest("tr");
            openModal("deleteUserModal");
        }
    });

    // Guardar cambios
    document.querySelector(".save-btn").addEventListener("click", function () {
        if (currentRow) {
            const cells = currentRow.querySelectorAll("td");

            // Actualizar los datos de la fila
            cells[2].textContent = editUserName.value;
            cells[3].textContent = editUserEmail.value;
            cells[4].textContent = editUserPhone.value;
            cells[5].textContent = editUserDob.value;
            const newStatus = editUserStatus.value;
            cells[6].textContent = newStatus;

            // Actualizar el color del botón de estado según el nuevo valor
            const statusButton = cells[6].querySelector(".badge");
            if (newStatus === "Activo") {
                statusButton.classList.remove("inactive");
                statusButton.classList.add("active");
                statusButton.textContent = "Activo";
            } else {
                statusButton.classList.remove("active");
                statusButton.classList.add("inactive");
                statusButton.textContent = "Inactivo";
            }

            alert("Usuario editado correctamente.");
            closeModal("editUserModal");
        }
    });

    // Confirmar eliminación
    document.querySelector(".confirm-btn").addEventListener("click", function () {
        if (currentRow) {
            currentRow.remove();
            alert("Usuario eliminado correctamente.");
            closeModal("deleteUserModal");
        }
    });

    // Cancelar edición
    document.getElementById("cancelEditBtn").addEventListener("click", function () {
        closeModal("editUserModal");
    });

    // Cancelar eliminación
    document.getElementById("cancelDeleteBtn").addEventListener("click", function () {
        closeModal("deleteUserModal");
    });
});
