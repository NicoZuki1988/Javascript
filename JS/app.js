class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }
}

function obtenerProductos() {
  let productos = [];

  let nombreProducto = prompt("Ingrese el nombre del producto (o 0 para terminar):");

  while (nombreProducto !== "0") {

    let precioProducto = parseFloat(prompt("Ingrese el precio del producto:"));
    if (isNaN(precioProducto) || precioProducto <= 0) {
      alert("Por favor, ingrese un precio válido.");
      continue;
    }

    productos.push(new Producto(nombreProducto, precioProducto));

     nombreProducto = prompt("Ingrese el nombre del producto (o 0 para terminar):");
  }
  return productos;
}

function mostrarProductos(productos) {
  console.log(productos);
  let lista = "Lista de productos:\n";
  for (let i = 0; i < productos.length; i++) {
    let producto = productos[i];
    lista += producto.nombre + ": $" + producto.precio.toFixed(2) + "\n";

  }
  alert(lista);
}


function calcularTotalConDescuento(productos, metodoPago) {
  let total = calcularTotal(productos);

  let descuento = metodoPago === "T" ? 0.10 : 0.15;
  const totalConDescuento = (total, descuento) => total * (1 - descuento);

  return totalConDescuento(total,descuento).toFixed(2);
}

function calcularTotal(productos) {
  let suma = 0;
  for (let i = 0; i < productos.length; i++) {
    let precio = productos[i].precio;
    suma += precio;
  }
  return suma;
}


function ingresarMetodoPago() {
  let metodoPago;
  while (true) {
    metodoPago = prompt("¿Cómo desea pagar? T (Tarjeta 10% desc.) / E (Efectivo 15% desc.):");
    if (metodoPago === "T" || metodoPago === "E") {
      break;
    } else {
      alert("Por favor, ingrese un método de pago válido (T o E).");
    }
  }
  return metodoPago;
}

function ejecutar() {
  let productos = obtenerProductos();
  mostrarProductos(productos);
  let metodoPago = ingresarMetodoPago();
  let totalConDescuento = calcularTotalConDescuento(productos, metodoPago);
  alert('El total con descuento es: $' + totalConDescuento);
  let compraRealizada = confirm("¿Desea confirmar su compra?");
  if (compraRealizada) {
    alert("Compra confirmada");
  } else {
    alert("Compra cancelada");
  }
}

ejecutar();