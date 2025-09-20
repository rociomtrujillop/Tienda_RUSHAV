const productos = [
  {
    id: 1,
    nombre: "Polera Heartstruck",
    precio: 9990,
    imagen: "img/producto1.jpg",
    imagenes: ["img/producto1.jpg", "img/producto1.2.jpg"],
    categoria: ["Poleras", "Hombre"],
    descripcion: "Polera oversize con estampado exclusivo."
  },
  {
    id: 2,
    nombre: "Jeans flare negro",
    precio: 29990,
    imagen: "img/producto2.png",
    imagenes: ["img/producto2.png", "img/producto2.2.png"],
    categoria: ["Jeans", "Hombre"],
    descripcion: "Jeans con estilo flare."
  },
  {
    id: 3,
    nombre: "Chaqueta efecto cuero",
    precio: 39990,
    imagen: "img/producto3.jpg",
    imagenes: ["img/producto3.jpg", "img/producto3.2.jpg"],
    categoria: ["Chaquetas", "Unisex"],
    descripcion: "Chaqueta clásica efecto cuero con cierre metálico."
  },
  {
    id: 4,
    nombre: "Zapatillas skate Ecko",
    precio: 49990,
    imagen: "img/producto4.jpg",
    imagenes: ["img/producto4.jpg", "img/producto4.2.jpg", "img/producto4.3.jpg"],
    categoria: ["Zapatillas", "Ecko"],
    descripcion: "Zapatillas estilo urbano, cómodas y resistentes."
  },
  {
    id: 5,
    nombre: "Jeans baggy gris",
    precio: 29990,
    imagen: "img/producto5.jpg",
    imagenes: ["img/producto5.jpg", "img/producto5.2.jpg"],
    categoria: ["Jeans", "Hombre"],
    descripcion: "Jeans anchos estilo baggy, color gris cloro."
  },
  {
    id: 6,
    nombre: "Cortavientos azul gráfico oversize",
    precio: 15990,
    imagen: "img/producto6.jpg",
    imagenes: ["img/producto6.jpg", "img/producto6.2.jpg"],
    categoria: ["Chaquetas", "Unisex"],
    descripcion: "Cortavientos liviano, ideal para media estación."
  },
  {
    id: 7,
    nombre: "Vestido blanco bordado",
    precio: 25990,
    imagen: "img/producto7.jpg",
    imagenes: ["img/producto7.jpg", "img/producto7.2.jpg"],
    categoria: ["Vestidos", "Mujer"],
    descripcion: "Vestido elegante color blanco con bordados delicados."
  },
  {
    id: 8,
    nombre: "Gorro Von Dutch",
    precio: 11990,
    imagen: "img/producto8.jpg",
    imagenes: ["img/producto8.jpg", "img/producto8.2.jpg"],
    categoria: ["Accesorios", "Unisex", "Von Dutch"],
    descripcion: "Gorra von dutch estilo retro, ajustable."
  },
  {
    id: 9,
    nombre: "Chaqueta de mezclilla Ecko",
    precio: 19990,
    imagen: "img/producto9.jpg",
    imagenes: ["img/producto9.jpg", "img/producto9.2.jpg"],
    categoria: ["Chaquetas", "Hombre", "Ecko"],
    descripcion: "Chaqueta de mezclilla Ecko, estilo urbano y moderno."
  },
  {
    id: 10,
    nombre: "Top Von Dutch",
    precio: 16990,
    imagen: "img/producto10.jpg",
    imagenes: ["img/producto10.jpg", "img/producto10.2.jpg"],
    categoria: ["Tops", "Mujer", "Von Dutch"],
    descripcion: "Top corto Von Dutch, ideal para looks casuales."
  }
];

localStorage.setItem("productos", JSON.stringify(productos));

