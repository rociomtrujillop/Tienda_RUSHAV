document.addEventListener('DOMContentLoaded', function() {
    function correoValido(correo) {
        const dominiosPermitidos = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];
        return dominiosPermitidos.some(dominio => correo.endsWith(dominio));
    }

    function mostrarError(mensaje) {
        const errorElement = document.getElementById('error');
        errorElement.textContent = mensaje;
        errorElement.style.display = 'block';
    }

    function limpiarError() {
        const errorElement = document.getElementById('error');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    function configurarValidacionTiempoReal() {
        const correoInput = document.getElementById('correo');
        const passwordInput = document.getElementById('password');

        correoInput.addEventListener('input', function() {
            limpiarError();
            const correo = this.value.trim().toLowerCase();
            
            if (correo && !correoValido(correo)) {
                this.style.borderColor = 'red';
            } else {
                this.style.borderColor = '';
            }
        });

        passwordInput.addEventListener('input', function() {
            limpiarError();
            const password = this.value;
            
            if (password && (password.length < 4 || password.length > 10)) {
                this.style.borderColor = 'red';
            } else {
                this.style.borderColor = '';
            }
        });
    }

    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const correo = document.getElementById('correo').value.trim().toLowerCase();
        const password = document.getElementById('password').value;
        
        limpiarError();

        if (!correo || !password) {
            mostrarError('Todos los campos son requeridos');
            return;
        }

        if (!correoValido(correo)) {
            mostrarError('El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com');
            return;
        }

        if (password.length < 4 || password.length > 10) {
            mostrarError('La contraseña debe tener entre 4 y 10 caracteres');
            return;
        }

        if (correo.length > 100) {
            mostrarError('El correo no puede exceder los 100 caracteres');
            return;
        }

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        const usuarioEncontrado = usuarios.find(usuario => 
            usuario.correo === correo && usuario.password === password
        );

        if (!usuarioEncontrado) {
            mostrarError('Correo o contraseña incorrectos');
            return;
        }

        // Login exitoso - Guardar sesión
        localStorage.setItem('usuarioLogueado', JSON.stringify({
            id: usuarioEncontrado.id,
            correo: usuarioEncontrado.correo,
            nombre: usuarioEncontrado.nombre,
            fechaRegistro: new Date().toISOString()
        }));

        alert(`¡Bienvenido ${usuarioEncontrado.nombre || usuarioEncontrado.correo}!`);
        window.location.href = 'index.html';
    });

    configurarValidacionTiempoReal();

    console.log('Login.js cargado correctamente');
    console.log('Usuarios registrados:', JSON.parse(localStorage.getItem('usuarios') || '[]').length);
});

function hayUsuarioLogueado() {
    return localStorage.getItem('usuarioLogueado') !== null;
}

function obtenerUsuarioLogueado() {
    const usuario = localStorage.getItem('usuarioLogueado');
    return usuario ? JSON.parse(usuario) : null;
}

function cerrarSesion() {
    localStorage.removeItem('usuarioLogueado');
    alert('Sesión cerrada correctamente');
    window.location.href = 'index.html';
}