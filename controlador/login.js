document.addEventListener("DOMContentLoaded", function () {
    // Login functionality
    const signInButton = document.getElementById("sign-in-button");

    signInButton.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = "dashboard.html";
    });

    // Register Modal
    function openRegisterModal() {
        document.getElementById('register-modal').style.display = 'flex';
    }

    // Forgot Password Modal
    function openForgotModal() {
        document.getElementById('forgot-modal').style.display = 'flex';
    }

    function closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
    }

    function sendRecoveryEmail() {
        const email = document.getElementById('forgot-email').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            alert('Por favor, ingrese un correo válido.');
            return;
        }

        alert('Se ha enviado un enlace para recuperar su contraseña a ' + email);
        document.getElementById('forgot-email').value = '';
        closeModal();
    }

    function validateRegister() {
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const telefono = document.getElementById('telefono').value;
        const correo = document.getElementById('correo').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const lettersRegex = /^[a-zA-Z\s]+$/;
        const numbersRegex = /^[0-9]+$/;

        if (!lettersRegex.test(nombre)) {
            alert("El nombre solo puede contener letras.");
            return;
        }
        if (!lettersRegex.test(apellido)) {
            alert("El apellido solo puede contener letras.");
            return;
        }
        if (!numbersRegex.test(telefono)) {
            alert("El teléfono solo puede contener números.");
            return;
        }
        if (!emailRegex.test(correo)) {
            alert("Ingrese un correo válido.");
            return;
        }

        alert("¡Registro exitoso!");
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('telefono').value = '';
        document.getElementById('correo').value = '';
        document.getElementById('contraseña').value = '';
        document.getElementById('fecha').value = '';
        closeModal();
    }

    // Event Listeners for Modals
    document.querySelector(".forgot-password").addEventListener("click", openForgotModal);
    document.querySelector(".register").addEventListener("click", openRegisterModal);

    // Close Modal Button Listeners
    const closeButtons = document.querySelectorAll(".close");
    closeButtons.forEach(button => {
        button.addEventListener("click", closeModal);
    });

    // Submit Button for Forgot Password
    const sendButton = document.querySelector("#forgot-modal button");
    if (sendButton) {
        sendButton.addEventListener("click", sendRecoveryEmail);
    }

    // Submit Button for Register
    const registerButton = document.querySelector("#register-modal button");
    if (registerButton) {
        registerButton.addEventListener("click", validateRegister);
    }
});
