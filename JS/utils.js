// Función para validar si una cadena es alfanumérica
function esAlfanumerico(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
}

// Función para encriptar una contraseña
function cifrar(password, desplazamiento){
    return password.split('').map(char => {
        // Verificar si es una letra
        if (char.match(/[a-z]/i)) {
            // Obtener el código ASCII de la letra
            let code = char.charCodeAt(0);

            // Convertir el carácter según el caso (mayúscula o minúscula)
            let base = (code >= 65 && code <= 90) ? 65 : 97;

            // Realizar el desplazamiento y asegurarse de que el resultado esté dentro del rango de letras
            return String.fromCharCode(((code - base + desplazamiento) % 26) + base);
        } else if (char.match(/[0-9]/)) {
            // Cifrado para números
            let code = char.charCodeAt(0);
            let base = 48; // Código ASCII para '0'
            return String.fromCharCode(((code - base + desplazamiento) % 10) + base);
        }
        // Devolver el carácter no alfabético sin cambios
        return char;
    }).join('');
}

function encryptPassword(password) {
    const despl = 48; // Puedes ajustar el desplazamiento
    return cifrar(password, despl);
}





