let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const carritoItems = document.getElementById("carrito-items");
const totalElement = document.getElementById("total");
const pagarBtn = document.getElementById("pagar"); // ← Añade esta línea

function renderCarrito() {
  carritoItems.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    carritoItems.innerHTML = `
      <div class="carrito-vacio">
        <p>Tu carrito está vacío :(</p>
        <a href="productos.html" class="btn-seguir">Ver productos</a>
      </div>
    `;
    totalElement.textContent = "TOTAL: $0";
    
    if (pagarBtn) {
      pagarBtn.style.display = "none";
    }
    
    return;
  }

  carrito.forEach((p, i) => {
    total += p.precio * (p.cantidad || 1);

    const div = document.createElement("div");
    div.classList.add("carrito-item");
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <div class="carrito-info">
        <h4>${p.nombre}</h4>
        <p>$${formatearPrecio(p.precio)}</p>
      </div>
      <div class="carrito-cantidad">
        <button onclick="cambiarCantidad(${i}, -1)">-</button>
        <span>${p.cantidad || 1}</span>
        <button onclick="cambiarCantidad(${i}, 1)">+</button>
      </div>
      <button onclick="eliminarDelCarrito(${i})" class="btn-eliminar">Eliminar</button>
    `;
    carritoItems.appendChild(div);
  });

  totalElement.textContent = `TOTAL: $${formatearPrecio(total)}`;
  
  if (pagarBtn) {
    pagarBtn.style.display = "block";
  }
  
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Cambiar cantidad de un producto
function cambiarCantidad(index, delta) {
  carrito[index].cantidad = (carrito[index].cantidad || 1) + delta;
  if (carrito[index].cantidad <= 0) carrito.splice(index, 1);
  renderCarrito();
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  renderCarrito();
}

document.getElementById("pagar").addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("El carrito está vacío. Agrega productos antes de pagar.");
    return;
  }
  
  alert("¡Gracias por tu compra! Total: $" + formatearPrecio(calcularTotal()));
  localStorage.removeItem("carrito");
  carrito = [];
  renderCarrito();
});

function calcularTotal() {
  return carrito.reduce((total, p) => total + (p.precio * (p.cantidad || 1)), 0);
}

// Formatear precios chilenos
function formatearPrecio(valor) {
  return valor.toLocaleString("es-CL");
}

renderCarrito();