document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const correo = document.getElementById("correo").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  error.textContent = ""; // limpiar antes de validar

  // obtener usuarios registrados desde localStorage
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // buscar coincidencia de correo y contraseña
  const user = usuarios.find(
    u => u.correo === correo && u.password === password
  );

  if (!user) {
    error.textContent = "Correo o contraseña incorrectos";
    return;
  }

  if (!correoValido(correo)) {
    error.textContent = "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com";
    return;
  }

  // Guardar usuario en sesión (localStorage)
  localStorage.setItem("usuarioLogueado", JSON.stringify(user));

  alert("Inicio de sesión exitoso");
  window.location.href = "index.html"; // redirige al inicio
});
