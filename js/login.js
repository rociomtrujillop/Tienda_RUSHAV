document.getElementById("login-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const correo = document.getElementById("correo").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  error.textContent = ""; // limpiar antes de validar

  if (!correo.endsWith("@duoc.cl") &&
      !correo.endsWith("@profesor.duoc.cl") &&
      !correo.endsWith("@gmail.com")) {
    error.textContent = "Correo no válido (usa @duoc.cl, @profesor.duoc.cl o @gmail.com)";
    return;
  }

  if (password.length < 4 || password.length > 10) {
    error.textContent = "La contraseña debe tener entre 4 y 10 caracteres";
    return;
  }

  alert("Inicio de sesión exitoso");
  // Aquí puedes redirigir si quieres:
  // window.location.href = "index.html";
});
