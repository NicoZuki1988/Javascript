
let productos = new Array();

// Array de productos
//Clase para crear el objeto producto del carrito
class ProductoCarrito {
  constructor(id = 0, nombre = '', precio = 0, cantidad = 1) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
  }

  calcularPrecioTotal() {
    return (this.precio * this.cantidad).toFixed(2);
  }
}

const usuarioIniciado = localStorage.getItem('user');
if (!usuarioIniciado) { window.location.href = "../index.html" }
const user = JSON.parse(usuarioIniciado);
document.getElementById("bienvenida").textContent = `Hola, ${user.nombre}`;
const carritoGuardado = localStorage.getItem(`${user.usuario}-carrito`) != null ? JSON.parse(localStorage.getItem(`${user.usuario}-carrito`)) : new Array();
let carrito = carritoGuardado.map(item => new ProductoCarrito(item.id, item.nombre, item.precio, item.cantidad));

actualizarContadorCarrito();
const elementoContadorCarrito = document.getElementById('contadorCarrito');

// Función para renderizar productos
async function renderizarProductos() {
  try {
    productos = await buscarProductos();
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpiar la lista de productos

    productos.forEach(producto => {
      const productHTML = `
                <div class="col-md-4">
                    <div class="card product-card">
                        <img src="${producto.imageURL}" class="card-img-top" alt="${producto.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">$${producto.precio.toFixed(2)}</p>
                            <div class="input-group mb-3">
                                    <input type="number" class="form-control" id="cantidad-${producto.id}" value="1" min="1">
                                    <button class="btn btn-primary add-to-cart" id="${producto.id}">Agregar al Carrito</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
      productList.innerHTML += productHTML;

    });
  } catch (error) {
    console.error("Error: " + error);
  }

  addEventListeners();
}

// Función para añadir eventos a los botones
function addEventListeners() {
  const botonesAgregarCarrito = document.querySelectorAll('.add-to-cart');
  const botonBorrarCarrito = document.getElementById('clear-cart');
  const botonCerrarSesion = document.getElementById('logout-btn');



  botonesAgregarCarrito.forEach(button => {
    button.addEventListener('click', () => {
      const productoId = parseInt(button.getAttribute('id'));
      const cantdadInput = document.getElementById(`cantidad-${productoId}`);
      const cantidad = parseInt(cantdadInput.value);

      agregarAlCarrito(productoId, cantidad);
    });
  });

  botonBorrarCarrito.addEventListener('click', borrarCarrito);
  botonCerrarSesion.addEventListener('click', cerrarSesion);


}

// Función para agregar productos al carrito
function agregarAlCarrito(productoId, cantidad) {
  const producto = productos.find(p => p.id === productoId);
  if (producto) {
    contadorCarrito++;
    elementoContadorCarrito.textContent = contadorCarrito;
    const productoExistente = carrito.find(p => p.id === productoId);
    if (productoExistente) {
      productoExistente.cantidad += cantidad;
    } else {
      //carrito.push({ ...producto, cantidad: cantidad });
      carrito.push(new ProductoCarrito(productoId, producto.nombre, producto.precio, cantidad));
    }
    new bootstrap.Modal(document.getElementById('addProdModal')).show(); // Muestra el modal de confirmación
    document.getElementById('addProdLeyend').textContent = `Se han agregado ${cantidad} ${producto.nombre}`;
    actualizarContadorCarrito();
  }
  localStorage.setItem(`${user.usuario}-carrito`, JSON.stringify(carrito));
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
  const contador = document.getElementById('contadorCarrito');
  const totalItems = contarItemsTotal();
  contador.textContent = totalItems;
}

// Función para contar los items totales del carrito
function contarItemsTotal() {
  let i = 0;
  carrito.forEach(prodCarrito => {
    i += prodCarrito.cantidad;
  })
  return i;
}

// Función para limpiar el carrito
function borrarCarrito() {
  carrito = [];
  actualizarContadorCarrito();
  resetearInputs();
  localStorage.removeItem(`${user.usuario}-carrito`);
}

// Función para procesar el pago
function procederAlPago() {
  const modalCarrito = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
  modalCarrito.hide(); // Cerrar el modal del carrito

  borrarCarrito(); // Limpia el carrito después del pago
  new bootstrap.Modal(document.getElementById('paymentModal')).show(); // Muestra el modal de confirmación
}

// Función para resetear los inputs de cantidad a agregar al carrito
function resetearInputs() {
  productos.forEach(producto => {
    let cant = document.getElementById(`cantidad-${producto.id}`);
    cant.value = 1;
  });
}


// Función para mostrar los productos en el modal del carrito
function mostrarCarrito() {
  const itemsCarrito = document.getElementById('cart-items');
  const totalElement = document.getElementById('cart-total');
  itemsCarrito.innerHTML = ''; // Limpiar la lista

  let total = 0;

  carrito.forEach(item => {
    const itemHTML = `
          <li class="list-group-item d-flex justify-content-between align-items-center">
              ${item.nombre} (x${item.cantidad})
              <span>$${item.calcularPrecioTotal()}</span>
          </li>
      `;//Usa la funcion calcularPrecioTotal del mismo objeto del carrito
    itemsCarrito.innerHTML += itemHTML;
    total += item.precio * item.cantidad;
  });

  totalElement.textContent = `$${total.toFixed(2)}`;
  if (carrito.length > 0) {
    document.getElementById('checkout').disabled = false;
  } else {
    document.getElementById('checkout').disabled = true;
  }
}

function cerrarSesion() {
  localStorage.removeItem("user");
  window.location.href = "../index.html";
}

async function buscarProductos(usuario) {
  try {
    const resp = await fetch("../JSON/productos.json");
    const prods = await resp.json();
    return prods;
  } catch (error) {
    console.error(error);
    alert("Se ha producido un error");
  }
}



// Llamada inicial para renderizar los productos en la página
renderizarProductos();

document.getElementById('cartModal').addEventListener('shown.bs.modal', mostrarCarrito);
document.getElementById('checkout').addEventListener('click', procederAlPago);
