// carrito.js - SOLO para la página del carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const carritoItems = document.getElementById("carrito-items");
const totalElement = document.getElementById("total");
const pagarBtn = document.getElementById("pagar");

// SOLO ejecutar si estamos en la página del carrito
if (carritoItems && totalElement) {
    renderCarrito();
    
    if (pagarBtn) {
        pagarBtn.addEventListener("click", pagar);
    }
}

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
                <p>$${p.precio.toLocaleString("es-CL")}</p>
                <p><strong>Cantidad:</strong> ${p.cantidad || 1}</p>
            </div>
            <div class="carrito-cantidad">
                <button onclick="cambiarCantidad(${i}, -1)">-</button>
                <span>${p.cantidad || 1}</span>
                <button onclick="cambiarCantidad(${i}, 1)">+</button>
                <button onclick="eliminarProducto(${i})" style="background:red;color:white;margin-left:10px;">X</button>
            </div>
        `;
        carritoItems.appendChild(div);
    });

    totalElement.textContent = `TOTAL: $${total.toLocaleString("es-CL")}`;
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cambiarCantidad(index, delta) {
    carrito[index].cantidad = (carrito[index].cantidad || 1) + delta;
    
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1);
    }
    
    renderCarrito();
}

function eliminarProducto(index) {
    if (confirm("¿Eliminar este producto del carrito?")) {
        carrito.splice(index, 1);
        renderCarrito();
    }
}

function pagar() {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }
    
    alert("¡Gracias por tu compra!");
    localStorage.removeItem("carrito");
    carrito = [];
    renderCarrito();
}

// Debug
console.log("Carrito.js cargado correctamente");
console.log("Productos en carrito:", carrito);