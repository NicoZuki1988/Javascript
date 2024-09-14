

// Validación del formulario
document.getElementById('loginForm').addEventListener('submit', async function (event) {

    event.preventDefault();
    let isValid = true;

    // Validación del nombre de usuario
    const username = document.getElementById('username');
    const usernameError = document.getElementById('usernameError');
    const usuario = await usuarioInexistente(username.value)
    if (username.value.trim() === '') {
        username.classList.add('is-invalid');
        usernameError.textContent = 'El nombre de usuario es obligatorio.';
        isValid = false;
    }
    else if (!usuario) {
        username.classList.add('is-invalid');
        usernameError.textContent = 'Usuario inexistente';
        isValid = false;
    } else {
        username.classList.remove('is-invalid');
        usernameError.textContent = '';
    }

    // Validación de la contraseña
    const password = document.getElementById('password');
    const passwordError = document.getElementById('passwordError');
    if (password.value.trim() === '') {
        password.classList.add('is-invalid');
        passwordError.textContent = 'La contraseña es obligatoria.';
        isValid = false;
    } else if (password.value.length < 4 || !esAlfanumerico(password.value)) {
        password.classList.add('is-invalid');
        passwordError.textContent = 'La contraseña debe tener al menos 4 caracteres alfanuméricos.';
        isValid = false;
    }
    else if (!usuario) {
        password.classList.add('is-invalid');
        passwordError.textContent = 'Usuario inexistente';
        isValid = false;
    }
    else if (encryptPassword(password.value) !== usuario.password) {
        password.classList.add('is-invalid');
        passwordError.textContent = 'Contraseña incorrecta';
        isValid = false;

    }
    else {
        password.classList.remove('is-invalid');
        passwordError.textContent = '';
    }

    // Si el formulario no es válido, evitar el envío
    if (isValid) {
        window.location.href = "./pages/carrito.html";
        localStorage.setItem('user', JSON.stringify(usuario));
    }
});

async function usuarioInexistente(usuario) {
    try {
        const resp = await fetch("https://66ce7082901aab24841e9232.mockapi.io/users");
        const users = await resp.json();
        const user = getUsuario(users, usuario);
        return user;
    } catch (error) {
        console.error(error);
        alert("Se ha producido un error");
    }
}

function getUsuario(users, usuario) {
    const user = users.find(u => u.usuario === usuario);
    return user;

}