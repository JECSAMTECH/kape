//Método para mostrar u ocultar la contraseña
const togglePassword = document.querySelector('.toggle-password');
const passwordInput = document.querySelector('#password');

togglePassword.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';

  // Cambia el texto interno del span
  togglePassword.textContent = passwordInput.type === 'text' ? 'visibility_off' : 'visibility';
});

//Método para validar el formulario de inicio de sesión
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que se recargue la página

    const emailIngresado = document.getElementById("email").value;
    const passwordIngresado = document.getElementById("password").value;

    iniciarSesion(emailIngresado, passwordIngresado);
});


//Función para validar el formulario de inicio de sesión
function iniciarSesion(emailIngresado, passwordIngresado) {
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  // Buscar el usuario en el array de usuarios
  const usuarioEncontrado = usuarios.find(usuario => usuario.email === emailIngresado); 

  if (usuarioEncontrado && usuarioEncontrado.password === passwordIngresado) {
    // Redirigir a la página de inicio
    window.location.href = "../index.html";
  } else {
    // Mostrar mensaje de error
    alert("Correo electrónico o contraseña incorrectos.");
  }
}