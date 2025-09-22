document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const nombreInput = form.querySelector("input[name='nombre']");
    const correoInput = form.querySelector("input[name='correo']");
    const mensajeTextarea = form.querySelector("textarea[name='mensaje']");
    function correoValido(correo) {
        if (!correo) return false;
        if (correo.length > 100) return false;
        
        const dominiosPermitidos = ['duoc.cl', 'profesor.duoc.cl', 'gmail.com'];
        const partes = correo.split('@');
        
        if (partes.length !== 2) return false;
        
        return dominiosPermitidos.includes(partes[1]);
    }

    function mostrarError(mensaje) {
        const errorAnterior = document.getElementById('error-contacto');
        if (errorAnterior) errorAnterior.remove();

        const errorElement = document.createElement('div');
        errorElement.id = 'error-contacto';
        errorElement.textContent = mensaje;

        form.parentNode.insertBefore(errorElement, form);
    }

    function limpiarError() {
        const errorElement = document.getElementById('error-contacto');
        if (errorElement) errorElement.remove();
    }

    function configurarValidacionTiempoReal() {
        nombreInput.addEventListener('input', function() {
            limpiarError();
            if (this.value.length > 100) {
                this.style.borderColor = 'red';
            } else {
                this.style.borderColor = '';
            }
        });

        correoInput.addEventListener('input', function() {
            limpiarError();
            const correo = this.value.trim().toLowerCase();
            
            if (correo && !correoValido(correo)) {
                this.style.borderColor = 'red';
            } else {
                this.style.borderColor = '';
            }
        });

        mensajeTextarea.addEventListener('input', function() {
            limpiarError();
            if (this.value.length > 500) {
                this.style.borderColor = 'red';
                if (!document.getElementById('contador-mensaje')) {
                    const contador = document.createElement('div');
                    contador.id = 'contador-mensaje';
                    contador.style.cssText = 'font-size: 0.8em; color: #666; text-align: right; margin-top: 5px;';
                    this.parentNode.appendChild(contador);
                }
                document.getElementById('contador-mensaje').textContent = 
                    `${this.value.length}/500 caracteres`;
            } else {
                this.style.borderColor = '';
                const contador = document.getElementById('contador-mensaje');
                if (contador) contador.remove();
            }
        });
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        limpiarError();

        const nombre = nombreInput.value.trim();
        const correo = correoInput.value.trim().toLowerCase();
        const mensaje = mensajeTextarea.value.trim();

        let errores = [];

        if (!nombre) {
            errores.push("El nombre es obligatorio");
        } else if (nombre.length > 100) {
            errores.push("El nombre no puede exceder 100 caracteres");
        }

        // Validación de correo (requerido por rúbrica)
        if (!correo) {
            errores.push("El correo es obligatorio");
        } else if (correo.length > 100) {
            errores.push("El correo no puede exceder 100 caracteres");
        } else if (!correoValido(correo)) {
            errores.push("El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com");
        }

        // Validación de mensaje (requerido por rúbrica)
        if (!mensaje) {
            errores.push("El mensaje es obligatorio");
        } else if (mensaje.length > 500) {
            errores.push("El mensaje no puede exceder 500 caracteres");
        }

        // Mostrar errores si hay
        if (errores.length > 0) {
            mostrarError(errores.join('. '));
            return;
        }
        alert("Mensaje enviado correctamente");
        const mensajes = JSON.parse(localStorage.getItem('mensajesContacto')) || [];
        mensajes.push({
            nombre,
            correo,
            mensaje,
            fecha: new Date().toISOString()
        });
        localStorage.setItem('mensajesContacto', JSON.stringify(mensajes));
        // Resetear formulario
        form.reset();
    });
    // Configurar validación en tiempo real
    configurarValidacionTiempoReal();
    console.log("Formulario de contacto inicializado correctamente");
});