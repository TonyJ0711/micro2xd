document.addEventListener("DOMContentLoaded", function () {
    const userCards = document.getElementById('userCards');
    const editModal = document.getElementById('editModal');
    const cancelEdit = document.getElementById('cancelEdit');
    const editForm = document.getElementById('editForm');
    let currentCard = null;

    // Editar usuario
    userCards.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit')) {
            currentCard = event.target.closest('.user-card');
            const name = currentCard.querySelector('h3').textContent;
            const email = currentCard.querySelector('p:nth-child(2)').textContent.split(': ')[1];
            const phone = currentCard.querySelector('p:nth-child(3)').textContent.split(': ')[1];
            const birthdate = currentCard.querySelector('p:nth-child(4)').textContent.split(': ')[1];

            document.getElementById('editName').value = name;
            document.getElementById('editEmail').value = email;
            document.getElementById('editPhone').value = phone;
            document.getElementById('editBirthdate').value = birthdate;

            editModal.style.display = 'block';
        }
    });

    // Guardar cambios del usuario
    editForm.addEventListener('submit', (event) => {
        event.preventDefault();
        currentCard.querySelector('h3').textContent = document.getElementById('editName').value;
        currentCard.querySelector('p:nth-child(2)').textContent = `Email: ${document.getElementById('editEmail').value}`;
        currentCard.querySelector('p:nth-child(3)').textContent = `No. de celular: ${document.getElementById('editPhone').value}`;
        currentCard.querySelector('p:nth-child(4)').textContent = `Fecha de nacimiento: ${document.getElementById('editBirthdate').value}`;
        editModal.style.display = 'none';
    });

    // Cancelar edición
    cancelEdit.addEventListener('click', () => {
        editModal.style.display = 'none';
    });

    // Eliminar usuario
    userCards.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete')) {
            const card = event.target.closest('.user-card');
            const name = card.querySelector('h3').textContent;
            const email = card.querySelector('p:nth-child(2)').textContent.split(': ')[1];
            const phone = card.querySelector('p:nth-child(3)').textContent.split(': ')[1];
            const birthdate = card.querySelector('p:nth-child(4)').textContent.split(': ')[1];

            const confirmation = confirm(`¿Estás seguro de eliminar este usuario?\n\nNombre: ${name}\nEmail: ${email}\nNo. de celular: ${phone}\nFecha de nacimiento: ${birthdate}`);
            if (confirmation) {
                card.remove();
                alert('Usuario eliminado correctamente.');
            }
        }
    });

    // Cerrar modal si se hace clic fuera de él
    window.onclick = function (event) {
        if (event.target == editModal) {
            editModal.style.display = "none";
        }
    };
});
