document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const nombre = form.querySelector("input[name='nombre']");
  const correo = form.querySelector("input[name='correo']");
  const mensaje = form.querySelector("textarea[name='mensaje']");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (nombre.value.trim().length === 0 || nombre.value.length > 100) {
      alert("El nombre es obligatorio y máximo 100 caracteres");
      return;
    }

    if (!correoValido(correo.value.trim().toLowerCase())) {
      alert("Correo inválido (solo duoc.cl, profesor.duoc.cl o gmail.com)");
      return;
    }

    if (mensaje.value.trim().length === 0 || mensaje.value.length > 500) {
      alert("El mensaje es obligatorio y máximo 500 caracteres");
      return;
    }

    alert("Mensaje enviado correctamente");
    form.reset();
  });
});
