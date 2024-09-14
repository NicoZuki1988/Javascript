
// Validación del formulario
document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    let isValid = true;

    // Validación del nombre completo
    const name = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    if (name.value.trim() === '') {
        name.classList.add('is-invalid');
        nameError.textContent = 'El nombre completo es obligatorio.';
        isValid = false;
    } else {
        name.classList.remove('is-invalid');
        nameError.textContent = '';
    }

    // Validación del nombre de usuario
    const username = document.getElementById('usernameRegister');
    const usernameError = document.getElementById('usernameError');
    if (username.value.trim() === '') {
        username.classList.add('is-invalid');
        usernameError.textContent = 'El nombre de usuario es obligatorio.';
        isValid = false;
    }
    else if (await usuarioExistente(username.value)) {
        username.classList.add('is-invalid');
        usernameError.textContent = 'El usuario ya existe, ingresá otro.';
        isValid = false;
    } else {
        username.classList.remove('is-invalid');
        usernameError.textContent = '';
    }

    // Validación de la contraseña
    const password = document.getElementById('passwordRegister');
    const passwordError = document.getElementById('passwordError');
    if (password.value.trim() === '') {
        password.classList.add('is-invalid');
        passwordError.textContent = 'La contraseña es obligatoria.';
        isValid = false;
    } else if (password.value.length < 4 || !esAlfanumerico(password.value)) {
        password.classList.add('is-invalid');
        passwordError.textContent = 'La contraseña debe tener al menos 4 caracteres alfanuméricos.';
        isValid = false;
    } else {
        password.classList.remove('is-invalid');
        passwordError.textContent = '';
    }

    // Si el formulario no es válido, evitar el envío
    if (isValid) {

        const encryptedPassword = encryptPassword(password.value);

        // Crear el objeto JSON para guardar
        const user = {
            nombre: name.value,
            usuario: username.value,
            password: encryptedPassword
        };

        guardarUsuario(user);

        new bootstrap.Modal(document.getElementById('registroConfirmadoModal')).show(); // Muestra el modal de confirmación de registro

    }
});


async function usuarioExistente(usuario) {
    try {
        const resp = await fetch("https://66ce7082901aab24841e9232.mockapi.io/users");
        const users = await resp.json();
        const existe = buscarUsuario(users, usuario);
        return existe;
    } catch (error) {
        console.error(error);
        alert("Se ha producido un error");
    }
}


async function guardarUsuario(usuario) {
    try {

        const info =
        {
            method: "POST",
            body: JSON.stringify(usuario),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }

        const url = "https://66ce7082901aab24841e9232.mockapi.io/users";
        const resp = await fetch(url, info);
        const userAgregado = await resp.json();
        return userAgregado;
    } catch (error) {
        console.error(error);
        alert("Se ha producido un error");
    }
}

function buscarUsuario(users, usuario) {
    const user = users.find(u => u.usuario === usuario);
    if (user) return true;
    return false;

}


document.getElementById('cerrarToLogin').addEventListener('click', (() => {
    window.location.href = "../index.html";
}));
