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

loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Evita que se recargue la página

  const emailIngresado = document.getElementById("email").value;
  const passwordIngresado = document.getElementById("password").value;

  iniciarSesion(emailIngresado, passwordIngresado);
});


//Función para validar el formulario de inicio de sesión
async function iniciarSesion(emailIngresado, passwordIngresado) {

  const loginRequest = {
    correo: emailIngresado,
    contrasenia: passwordIngresado
  };

  const response = await fetch("http://localhost:8080/api/usuarios/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(loginRequest)
  });

  const data = await response.json();

  if (response.ok) {

    const sesion = {
      idUsuario: data.idUsuario,
      nombre: data.nombre,
      email: data.correo,
      rol: data.nombreRol.toLowerCase()
    };

    localStorage.setItem("kapeSesion", JSON.stringify(sesion));

    window.location.href = sesion.rol === "admin"
      ? "./perfilAdmin.html"
      : "./perfil.html";

  } else {

    alert(data.message || "Correo electrónico o contraseña incorrectos.");

  }
}
