// Obtener el ID desde la URL (?id=1)
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

// Recuperar productos desde localStorage
const listaProductos = JSON.parse(localStorage.getItem("productos")) || [];
const producto = listaProductos.find(p => p.id === id);

const detalle = document.getElementById("detalle");

if (producto) {
  // Construcción de detalle principal
  detalle.innerHTML = `
    <div class="detalle-container">
      <div class="detalle-imagen">
        <img id="imagen-principal" src="${producto.imagen}" alt="${producto.nombre}">
        <div class="miniaturas">
          ${(producto.imagenes || [producto.imagen])
            .map(img => `<img src="${img}" onclick="cambiarImagen('${img}')">`)
            .join("")}
        </div>
      </div>
      <div class="detalle-info">
        <h1>${producto.nombre}</h1>
        <p class="precio">$${producto.precio.toLocaleString("es-CL")}</p>
        <p>${producto.descripcion}</p>
        <label for="cantidad">Cantidad:</label>
        <input type="number" id="cantidad" value="1" min="1">
        <button onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
      </div>
    </div>
  `;

  // Mostrar productos relacionados
  const relacionados = listaProductos.filter(p => 
    p.id !== producto.id &&
    p.categoria.some(cat => producto.categoria.includes(cat))
  ).slice(0, 4);

  detalle.innerHTML += `
    <h2>Productos relacionados</h2>
    <div class="productos-relacionados">
      ${relacionados.length > 0 
        ? relacionados.map(p => `
          <article class="producto">
            <img src="${p.imagen}" alt="${p.nombre}">
            <h4><a href="detalle.html?id=${p.id}">${p.nombre}</a></h4>
            <p class="precio">$${p.precio.toLocaleString("es-CL")}</p>
          </article>
        `).join("") 
        : "<p>No hay productos relacionados.</p>"}
    </div>
  `;
} else {
  detalle.innerHTML = "<p>Producto no encontrado.</p>";
}

// Función para cambiar imagen principal
function cambiarImagen(src) {
  document.getElementById("imagen-principal").src = src;
}

// Función para agregar al carrito
function agregarAlCarrito(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const producto = listaProductos.find(p => p.id === id);
  const cantidad = parseInt(document.getElementById("cantidad").value);

  if (!producto) return;

  // Si ya está en el carrito, sumar cantidad
  const existente = carrito.find(p => p.id === id);
  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push({ ...producto, cantidad });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto añadido al carrito");
}
