document.addEventListener("DOMContentLoaded", () => {
  // referencias a secciones
  const sections = document.querySelectorAll("section");

  // funciones

  function correoValido(correo) {
  const regex = /^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
  return regex.test(correo);
  }

  function validarRUN(run) {
  run = run.toUpperCase().trim();
  if (!/^[0-9]{7,8}[0-9K]$/.test(run)) return false;

  let cuerpo = run.slice(0, -1);
  let dv = run.slice(-1);

  let suma = 0, multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += multiplo * parseInt(cuerpo.charAt(i));
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }
  let dvEsperado = 11 - (suma % 11);
  let dvCalc = dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();

  return dv === dvCalc;
  }

  window.mostrarSeccion = (id) => {
    sections.forEach(s => s.classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");

    if (id === "usuarios-listar") renderUsuarios();
    if (id === "productos-listar") renderProductos();
  };

  // ====================
  // USUARIOS
  // ====================
  const formUsuario = document.getElementById("form-usuario");
  const errorUsuario = document.getElementById("u-error");
  const regiones = [ { nombre: "Arica y Parinacota", comunas: ["Arica", "Camarones", "General Lagos", "Putre"] },
  { nombre: "Tarapacá", comunas: ["Alto Hospicio", "Camiña", "Colchane", "Huara", "Iquique", "Pica", "Pozo Almonte"] },
  { nombre: "Antofagasta", comunas: ["Antofagasta", "Calama", "María Elena", "Mejillones", "Ollagüe", "San Pedro de Atacama", "Sierra Gorda", "Taltal", "Tocopilla"] },
  { nombre: "Atacama", comunas: ["Alto del Carmen", "Caldera", "Chañaral", "Copiapó", "Diego de Almagro", "Freirina", "Huasco", "Tierra Amarilla", "Vallenar"] },
  { nombre: "Coquimbo", comunas: ["Andacollo", "Canela", "Combarbalá", "Coquimbo", "Illapel", "La Higuera", "La Serena", "Los Vilos", "Monte Patria", "Ovalle", "Paihuano", "Punitaqui", "Río Hurtado", "Salamanca", "Vicuña"] },
  { nombre: "Valparaíso", comunas: ["Algarrobo", "Cabildo", "Calera", "Calle Larga", "Cartagena", "Casablanca", "Catemu", "Concón", "El Quisco", "El Tabo", "Hijuelas", "Isla de Pascua", "Juan Fernández", "La Cruz", "La Ligua", "Limache", "Llaillay", "Los Andes", "Nogales", "Olmué", "Panquehue", "Papudo", "Petorca", "Puchuncaví", "Putaendo", "Quillota", "Quilpué", "Quintero", "Rinconada", "San Antonio", "San Esteban", "San Felipe", "Santa María", "Santo Domingo", "Valparaíso", "Villa Alemana", "Viña del Mar", "Zapallar"] },
  { nombre: "Metropolitana", comunas: ["Alhué", "Buin", "Calera de Tango", "Cerrillos", "Cerro Navia", "Colina", "Conchalí", "Curacaví", "El Bosque", "El Monte", "Estación Central", "Huechuraba", "Independencia", "Isla de Maipo", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Lampa", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "María Pinto", "Melipilla", "Ñuñoa", "Padre Hurtado", "Paine", "Pedro Aguirre Cerda", "Peñaflor", "Peñalolén", "Pirque", "Providencia", "Pudahuel", "Puente Alto", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Bernardo", "San Joaquín", "San José de Maipo", "San Miguel", "San Pedro", "San Ramón", "Santiago", "Talagante", "Tiltil", "Vitacura"] },
  { nombre: "O'Higgins", comunas: ["Chépica", "Chimbarongo", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "La Estrella", "Las Cabras", "Litueche", "Lolol", "Machalí", "Malloa", "Marchihue", "Mostazal", "Nancagua", "Navidad", "Olivar", "Palmilla", "Paredones", "Peralillo", "Peumo", "Pichidegua", "Pichilemu", "Placilla", "Pumanque", "Quinta de Tilcoco", "Rancagua", "Rengo", "Requínoa", "San Fernando", "San Francisco de Mostazal", "San Vicente", "Santa Cruz"] },
  { nombre: "Maule", comunas: ["Cauquenes", "Chanco", "Colbún", "Constitución", "Curepto", "Curicó", "Empedrado", "Hualañé", "Licantén", "Linares", "Longaví", "Maule", "Molina", "Parral", "Pelarco", "Pelluhue", "Pencahue", "Rauco", "Retiro", "Romeral", "Río Claro", "Sagrada Familia", "San Clemente", "San Javier", "San Rafael", "Talca", "Teno", "Vichuquén", "Villa Alegre", "Yerbas Buenas"] },
  { nombre: "Ñuble", comunas: ["Bulnes", "Chillán", "Chillán Viejo", "Cobquecura", "Coelemu", "Coihueco", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"]  },
  { nombre: "Biobío", comunas: ["Alto Biobío", "Antuco", "Arauco", "Cabrero", "Cañete", "Chiguayante", "Concepción", "Contulmo", "Coronel", "Curanilahue", "Florida", "Hualpén", "Hualqui", "Laja", "Lebu", "Los Álamos", "Los Ángeles", "Lota", "Mulchén", "Nacimiento", "Negrete", "Penco", "Quilaco", "Quilleco", "San Pedro de la Paz", "San Rosendo", "Santa Bárbara", "Santa Juana", "Talcahuano", "Tirúa", "Tomé", "Tucapel", "Yumbel"] },
  { nombre: "Araucanía", comunas: ["Angol", "Carahue", "Cholchol", "Collipulli", "Cunco", "Curacautín", "Curarrehue", "Ercilla", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Lonquimay", "Los Sauces", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Purén", "Renaico", "Saavedra", "Temuco", "Teodoro Schmidt", "Toltén", "Traiguén", "Victoria", "Vilcún", "Villarrica"] },
  { nombre: "Los Ríos", comunas: ["Corral", "Futrono", "La Unión", "Lago Ranco", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "Río Bueno", "Valdivia"] },
  { nombre: "Los Lagos", comunas: ["Ancud", "Calbuco", "Castro", "Chaitén", "Chonchi", "Cochamó", "Curaco de Vélez", "Dalcahue", "Fresia", "Frutillar", "Futaleufú", "Hualaihué", "Llanquihue", "Los Muermos", "Maullín", "Osorno", "Palena", "Puerto Montt", "Puerto Octay", "Puerto Varas", "Puqueldón", "Purranque", "Puyehue", "Queilén", "Quellón", "Quemchi", "Quinchao", "Río Negro", "San Juan de la Costa", "San Pablo"] },
  { nombre: "Aysén", comunas: ["Aysén", "Chile Chico", "Cisnes", "Cochrane", "Coyhaique", "Guaitecas", "Lago Verde", "O'Higgins", "Río Ibáñez", "Tortel"] },
  { nombre: "Magallanes", comunas: ["Antártica", "Cabo de Hornos", "Laguna Blanca", "Natales", "Porvenir", "Primavera", "Punta Arenas", "Río Verde", "San Gregorio", "Timaukel", "Torres del Paine"] } ];

    function cargarRegiones(selectRegion, selectComuna) {
    selectRegion.innerHTML = "<option value=''>-- Seleccione región --</option>";
    regiones.forEach(r => {
    const opt = document.createElement("option");
    opt.value = r.nombre;
    opt.textContent = r.nombre;
    selectRegion.appendChild(opt);
    });

    selectRegion.addEventListener("change", () => {
    selectComuna.innerHTML = "<option value=''>-- Seleccione comuna --</option>";
    const region = regiones.find(r => r.nombre === selectRegion.value);
    if (region) {
      region.comunas.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c;
        opt.textContent = c;
        selectComuna.appendChild(opt);
        });
        }
    });
    }

    // al cargar la página
    cargarRegiones(
    document.getElementById("u-region"),
    document.getElementById("u-comuna")
    );

  function renderUsuarios() {
    const div = document.getElementById("tabla-usuarios");
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    if (usuarios.length === 0) {
      div.innerHTML = "<p>No hay usuarios registrados.</p>";
      return;
    }
    let html = "<table><tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Acciones</th></tr>";
    usuarios.forEach((u, i) => {
      html += `<tr>
        <td>${u.nombre}</td>
        <td>${u.correo}</td>
        <td>${u.rol}</td>
        <td>
          <button class="btn" onclick="editarUsuario(${i})">Editar</button>
          <button class="btn btn-danger" onclick="eliminarUsuario(${i})">Eliminar</button>
        </td>
      </tr>`;
    });
    html += "</table>";
    div.innerHTML = html;
  }

  window.editarUsuario = (i) => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const u = usuarios[i];
    document.getElementById("u-run").value = u.run || "";
    document.getElementById("u-nombres").value = u.nombres || u.nombre || "";
    document.getElementById("u-apellidos").value = u.apellidos || "";
    document.getElementById("u-correo").value = u.correo;
    document.getElementById("u-rol").value = u.rol;
    document.getElementById("u-edit-index").value = i;

    mostrarSeccion("usuarios-crear");
  };

  window.eliminarUsuario = (i) => {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.splice(i, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    renderUsuarios();
  };

  formUsuario.addEventListener("submit", (e) => {
    e.preventDefault();
    errorUsuario.textContent = "";

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const user = {
      run: document.getElementById("u-run").value,
      nombres: document.getElementById("u-nombres").value,
      apellidos: document.getElementById("u-apellidos").value,
      correo: document.getElementById("u-correo").value,
      rol: document.getElementById("u-rol").value,
      direccion: document.getElementById("u-direccion").value,
      password: document.getElementById("u-password").value
    };

    if (!validarRUN(user.run)) {
      errorUsuario.textContent = "RUN inválido";
      return;
    }

    if (!correoValido(user.correo)) {
      errorUsuario.textContent = "Correo inválido (solo duoc.cl, profesor.duoc.cl o gmail.com)";
      return;
    }

    const idx = document.getElementById("u-edit-index").value;
    if (idx) {
      usuarios[idx] = user;
    } else {
      usuarios.push(user);
    }

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Usuario guardado correctamente");
    mostrarSeccion("usuarios-listar");
  });

  // PRODUCTOS
  const formProducto = document.getElementById("form-producto");
  const errorProducto = document.getElementById("p-error");

  function renderProductos() {
    const div = document.getElementById("tabla-productos");
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    if (productos.length === 0) {
      div.innerHTML = "<p>No hay productos registrados.</p>";
      return;
    }
    
    // el precio lo ponemos como moneda local para que se vea mejor basicamente
    let html = "<table><tr><th>Código</th><th>Nombre</th><th>Precio</th><th>Acciones</th></tr>";
    productos.forEach((p, i) => {
      html += `<tr>
        <td>${p.id}</td>
        <td>${p.nombre}</td>
        <td>${p.precio.toLocaleString("es-CL", { style: "currency", currency: "CLP" })}</td>
        <td>
            <button class="btn" onclick="editarProducto(${i})">Editar</button>
            <button class="btn btn-danger" onclick="eliminarProducto(${i})">Eliminar</button>
        </td>
      </tr>`;
    });
    html += "</table>";
    div.innerHTML = html;
  }

  window.editarProducto = (i) => {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const p = productos[i];
    document.getElementById("p-codigo").value = p.codigo;
    document.getElementById("p-nombre").value = p.nombre;
    document.getElementById("p-precio").value = p.precio;
    document.getElementById("p-stock").value = p.stock;
    document.getElementById("p-edit-index").value = i;

    mostrarSeccion("productos-crear");
  };

  window.eliminarProducto = (i) => {
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    productos.splice(i, 1);
    localStorage.setItem("productos", JSON.stringify(productos));
    renderProductos();
  };

  formProducto.addEventListener("submit", (e) => {
    e.preventDefault();
    errorProducto.textContent = "";

    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    const producto = {
      codigo: document.getElementById("p-codigo").value,
      nombre: document.getElementById("p-nombre").value,
      precio: parseFloat(document.getElementById("p-precio").value),
      stock: parseInt(document.getElementById("p-stock").value),
      descripcion: document.getElementById("p-descripcion").value.trim()  
    };

    const descripcion = document.getElementById("p-descripcion").value.trim();
    if (descripcion.length > 500) {
      errorProducto.textContent = "La descripción no puede superar 500 caracteres";
      return;
    }

    const stockCritico = parseInt(document.getElementById("p-stock-critico").value || "0");
    if (stockCritico < 0) {
      errorProducto.textContent = "El stock crítico no puede ser negativo";
      return;
    }

    const idx = document.getElementById("p-edit-index").value;
    if (idx) {
      productos[idx] = producto;
    } else {
      productos.push(producto);
    }

    localStorage.setItem("productos", JSON.stringify(productos));
    alert("Producto guardado correctamente");
    mostrarSeccion("productos-listar");
  });

  // inicio en "inicio"
  mostrarSeccion("inicio");
});
