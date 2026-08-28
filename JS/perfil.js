import { API_BASE_URL } from "./config.js";

let sesion;
try {
    sesion = JSON.parse(localStorage.getItem("kapeSesion")) || {};
} catch {
    localStorage.removeItem("kapeSesion");
    sesion = {};
}

// Elementos de la vista
const nombreUsuarioElem = document.getElementById("nombreUsuario");
const infoNombreElem = document.getElementById("infoNombre");
const infoEmailElem = document.getElementById("infoEmail");
const infoTelefonoElem = document.getElementById("infoTelefono");

// Elementos de edición
const btnEditarInfo = document.getElementById("btnEditarInfo");
const infoVista = document.getElementById("infoVista");
const formEditarInfo = document.getElementById("formEditarInfo");
const btnCancelarEdicion = document.getElementById("btnCancelarEdicion");
const alertPlaceholder = document.getElementById("infoAlertPlaceholder");

const inputEditNombre = document.getElementById("inputEditNombre");
const inputEditEmail = document.getElementById("inputEditEmail");
const inputEditTelefono = document.getElementById("inputEditTelefono");

// Función para mostrar alertas en la tarjeta de información
function mostrarAlerta(mensaje, tipo = "danger") {
    if (!alertPlaceholder) return;
    alertPlaceholder.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible py-2 px-3 mb-2 small" role="alert">
            <div>${mensaje}</div>
            <button type="button" class="btn-close py-2 px-3" data-bs-dismiss="alert" aria-label="Cerrar"></button>
        </div>
    `;
}

function limpiarAlerta() {
    if (alertPlaceholder) {
        alertPlaceholder.innerHTML = "";
    }
}

// Cargar información del usuario en la interfaz
function cargarDatosUsuario() {
    const nombre = sesion.nombre || "Mateo García Restrepo";
    const email = sesion.email || sesion.correo || "mateo.garcia@gmail.com";
    const telefono = sesion.telefono || sesion.numero || "+57 312 456 7890";

    if (nombreUsuarioElem) nombreUsuarioElem.textContent = sesion.nombre || "Mateo";
    if (infoNombreElem) infoNombreElem.textContent = nombre;
    if (infoEmailElem) infoEmailElem.textContent = email;
    if (infoTelefonoElem) infoTelefonoElem.textContent = telefono;
}

// Sincronizar datos con la base de datos si el backend está activo
async function sincronizarConServidor() {
    if (!sesion || !sesion.idUsuario) return;

    try {
        const response = await fetch(`${API_BASE_URL}/usuarios/${sesion.idUsuario}`);
        if (response.ok) {
            const data = await response.json();
            if (data) {
                sesion.nombre = data.nombre || sesion.nombre;
                sesion.email = data.correo || sesion.email;
                sesion.correo = data.correo || sesion.correo;
                sesion.telefono = data.numero || sesion.telefono;
                sesion.numero = data.numero || sesion.numero;
                localStorage.setItem("kapeSesion", JSON.stringify(sesion));
                cargarDatosUsuario();
            }
        }
    } catch (e) {
        // Modo offline / sin conexión con backend
        console.debug("Backend no disponible para sincronización inicial:", e.message);
    }
}

// Alternar entre modo lectura y modo edición
function activarModoEdicion() {
    limpiarAlerta();
    if (!formEditarInfo || !infoVista) return;

    // Rellenar los inputs con los valores actuales
    inputEditNombre.value = (sesion.nombre) ? sesion.nombre : (infoNombreElem?.textContent || "");
    inputEditEmail.value = (sesion.email || sesion.correo) ? (sesion.email || sesion.correo) : (infoEmailElem?.textContent || "");
    const telActual = sesion.telefono || sesion.numero || (infoTelefonoElem?.textContent || "");
    inputEditTelefono.value = telActual.replace(/\D/g, ""); // Solo dígitos en el input

    infoVista.classList.add("d-none");
    formEditarInfo.classList.remove("d-none");
    inputEditNombre.focus();
}

function desactivarModoEdicion() {
    limpiarAlerta();
    if (!formEditarInfo || !infoVista) return;

    formEditarInfo.classList.add("d-none");
    infoVista.classList.remove("d-none");
}

// Validaciones en tiempo real para inputs de edición
if (inputEditNombre) {
    inputEditNombre.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    });
}

if (inputEditTelefono) {
    inputEditTelefono.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
    });
}

// Event Listeners para edición
if (btnEditarInfo) {
    btnEditarInfo.addEventListener("click", () => {
        if (formEditarInfo.classList.contains("d-none")) {
            activarModoEdicion();
        } else {
            desactivarModoEdicion();
        }
    });
}

if (btnCancelarEdicion) {
    btnCancelarEdicion.addEventListener("click", desactivarModoEdicion);
}

// Guardar los datos editados
if (formEditarInfo) {
    formEditarInfo.addEventListener("submit", async function (event) {
        event.preventDefault();
        limpiarAlerta();

        const nombreNuevo = inputEditNombre.value.trim();
        const emailNuevo = inputEditEmail.value.trim();
        const telefonoNuevo = inputEditTelefono.value.trim();

        // Validaciones
        if (!nombreNuevo) {
            mostrarAlerta("El nombre no puede estar vacío.");
            return;
        }

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailNuevo || !regexEmail.test(emailNuevo)) {
            mostrarAlerta("Por favor ingresa un correo electrónico válido.");
            return;
        }

        if (telefonoNuevo && telefonoNuevo.length !== 10) {
            mostrarAlerta("El teléfono debe contener exactamente 10 dígitos numéricos.");
            return;
        }

        // Deshabilitar botón durante el guardado
        const submitBtn = document.getElementById("btnGuardarEdicion");
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Guardando...";
        }

        // Intento de actualización en backend si existe idUsuario
        if (sesion && sesion.idUsuario) {
            try {
                const response = await fetch(`${API_BASE_URL}/usuarios/${sesion.idUsuario}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nombre: nombreNuevo,
                        correo: emailNuevo,
                        numero: telefonoNuevo
                    })
                });

                if (!response.ok) {
                    const resData = await response.json().catch(() => null);
                    if (resData && resData.message) {
                        console.warn("Aviso del servidor:", resData.message);
                    }
                }
            } catch (err) {
                console.debug("Backend no disponible para PUT, guardando localmente:", err.message);
            }
        }

        // Actualizar objeto sesión en localStorage
        sesion.nombre = nombreNuevo;
        sesion.email = emailNuevo;
        sesion.correo = emailNuevo;
        sesion.telefono = telefonoNuevo;
        sesion.numero = telefonoNuevo;
        localStorage.setItem("kapeSesion", JSON.stringify(sesion));

        // Actualizar UI
        cargarDatosUsuario();
        desactivarModoEdicion();
        mostrarAlerta("Información actualizada correctamente.", "success");

        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Guardar";
        }

        // Quitar la alerta de éxito después de 4 segundos
        setTimeout(() => {
            limpiarAlerta();
        }, 4000);
    });
}

// Inicialización
cargarDatosUsuario();
sincronizarConServidor();

// Cerrar sesión
const cerrarSesionBtn = document.querySelector(".cerrar-sesion");
if (cerrarSesionBtn) {
    cerrarSesionBtn.addEventListener("click", function (evento) {
        evento.preventDefault();
        localStorage.removeItem("kapeSesion");
        window.location.href = "/index.html";
    });
}