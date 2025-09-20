const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));
const productos = JSON.parse(localStorage.getItem("productos")) || [];

const producto = productos.find(p => p.id === id);

const detalleDiv = document.getElementById("detalle-producto");

if (producto) {
  detalleDiv.innerHTML = `
    <div class="detalle-producto">
      <div class="detalle-imagen">
        <img id="imagen-principal" src="${producto.imagen}" alt="${producto.nombre}">
        <div class="miniaturas">
          <img src="${producto.imagen}" alt="Miniatura 1" onclick="cambiarImagen(this)">
          <img src="img/producto1.jpg" alt="Miniatura 2" onclick="cambiarImagen(this)">
          <img src="img/producto2.png" alt="Miniatura 3" onclick="cambiarImagen(this)">
        </div>
      </div>
      <div class="detalle-info">
        <h1>${producto.nombre}</h1>
        <p class="precio">$${producto.precio}</p>
        <p>${producto.descripcion}</p>
        <label for="cantidad">Cantidad:</label>
        <input type="number" id="cantidad" value="1" min="1">
        <button onclick="agregarAlCarrito(${producto.id})">Añadir al carrito</button>
      </div>
    </div>
  `;
}

// función para cambiar la imagen principal al hacer clic en miniaturas
function cambiarImagen(img) {
  document.getElementById("imagen-principal").src = img.src;
}

// añadir al carrito con cantidad
function agregarAlCarrito(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const producto = productos.find(p => p.id === id);
  const cantidad = parseInt(document.getElementById("cantidad").value);

  for (let i = 0; i < cantidad; i++) {
    carrito.push(producto);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto añadido al carrito");
}
