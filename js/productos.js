const productos = [
  {
    id: 1,
    nombre: "Polera Heartstruck",
    precio: 9990,
    imagen: "img/producto1.jpg",
    descripcion: "Polera oversize con estampado exclusivo."
  },
  {
    id: 2,
    nombre: "Pantalón flare negro",
    precio: 29990,
    imagen: "img/producto2.png",
    descripcion: "Pantalón ajustado con estilo flare moderno."
  },
  {
    id: 3,
    nombre: "Chaqueta efecto cuero",
    precio: 39990,
    imagen: "img/producto3.jpg",
    descripcion: "Chaqueta clásica efecto cuero con cierre metálico."
  },
  {
    id: 4,
    nombre: "Zapatillas skate Ecko",
    precio: 49990,
    imagen: "img/producto4.jpg",
    descripcion: "Zapatillas estilo urbano, cómodas y resistentes."
  },
  {
    id: 5,
    nombre: "Jeans baggy gris",
    precio: 29990,
    imagen: "img/producto5.jpg",
    descripcion: "Jeans anchos estilo baggy, color gris lavado."
  },
  {
    id: 6,
    nombre: "Cortavientos rojo",
    precio: 14990,
    imagen: "img/producto6.jpg",
    descripcion: "Cortavientos liviano, ideal para media estación."
  },
  {
    id: 7,
    nombre: "Vestido blanco bordado",
    precio: 25990,
    imagen: "img/producto7.jpg",
    descripcion: "Vestido elegante color blanco con bordados delicados."
  }
];

// Guardar en localStorage (solo si no existe)
if (!localStorage.getItem("productos")) {
  localStorage.setItem("productos", JSON.stringify(productos));
}
