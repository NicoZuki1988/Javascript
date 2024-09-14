// Función para validar si una cadena es alfanumérica
function esAlfanumerico(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
}

// Función para encriptar una contraseña
function cifrar(password, desplazamiento) {
    return password.split('').map(char => {
        if (char.match(/[a-z]/i)) {
            let code = char.charCodeAt(0);

            let base = (code >= 65 && code <= 90) ? 65 : 97;

            return String.fromCharCode(((code - base + desplazamiento) % 26) + base);
        } else if (char.match(/[0-9]/)) {
            let code = char.charCodeAt(0);
            let base = 48; // Código ASCII para '0'
            return String.fromCharCode(((code - base + desplazamiento) % 10) + base);
        }
        return char;
    }).join('');
}

function encryptPassword(password) {
    const despl = 48;
    return cifrar(password, despl);
}





