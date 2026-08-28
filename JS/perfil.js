import { API_BASE_URL, normalizarRutaImagen } from "./config.js";

// ======================================================
// SESIÓN (localStorage no requiere DOM)
// ======================================================
let sesion;
try {
    sesion = JSON.parse(localStorage.getItem("kapeSesion")) || {};
} catch {
    localStorage.removeItem("kapeSesion");
    sesion = {};
}

// Variables de referencia al DOM
let nombreUsuarioElem, infoNombreElem, infoEmailElem, infoTelefonoElem;
let btnEditarInfo, infoVista, formEditarInfo, btnCancelarEdicion, alertPlaceholder;
let inputEditNombre, inputEditEmail, inputEditTelefono;

// ======================================================
// FUNCIONES DE UI
// ======================================================

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
    if (alertPlaceholder) alertPlaceholder.innerHTML = "";
}

function cargarDatosUsuario() {
    const nombre   = sesion.nombre || "Mateo García Restrepo";
    const email    = sesion.email  || sesion.correo || "mateo.garcia@gmail.com";
    const telefono = sesion.telefono || sesion.numero || "+57 312 456 7890";

    if (nombreUsuarioElem) nombreUsuarioElem.textContent = sesion.nombre || "Mateo";
    if (infoNombreElem)    infoNombreElem.textContent    = nombre;
    if (infoEmailElem)     infoEmailElem.textContent     = email;
    if (infoTelefonoElem)  infoTelefonoElem.textContent  = telefono;
}

async function sincronizarConServidor() {
    if (!sesion?.idUsuario) return;
    try {
        const res = await fetch(`${API_BASE_URL}/usuarios/${sesion.idUsuario}`);
        if (res.ok) {
            const data = await res.json();
            sesion.nombre   = data.nombre  || sesion.nombre;
            sesion.email    = data.correo  || sesion.email;
            sesion.correo   = data.correo  || sesion.correo;
            sesion.telefono = data.numero  || sesion.telefono;
            sesion.numero   = data.numero  || sesion.numero;
            localStorage.setItem("kapeSesion", JSON.stringify(sesion));
            cargarDatosUsuario();
        }
    } catch (e) {
        console.debug("sincronizarConServidor: backend no disponible —", e.message);
    }
}

function activarModoEdicion() {
    limpiarAlerta();
    if (!formEditarInfo || !infoVista) return;
    inputEditNombre.value   = sesion.nombre || infoNombreElem?.textContent || "";
    inputEditEmail.value    = sesion.email  || sesion.correo || infoEmailElem?.textContent || "";
    const telActual = sesion.telefono || sesion.numero || infoTelefonoElem?.textContent || "";
    inputEditTelefono.value = telActual.replace(/\D/g, "");
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

// ======================================================
// HISTORIAL DE PEDIDOS DINÁMICO
// ======================================================
async function cargarPedidosUsuario() {
    const contenedor = document.getElementById("order-list");
    if (!contenedor) {
        console.warn("perfil.js — #order-list no encontrado");
        return;
    }

    let pedidos = [];

    // 1. Intentar cargar desde el backend si hay un usuario autenticado
    if (sesion?.idUsuario) {
        try {
            const resPedidos = await fetch(`${API_BASE_URL}/pedidos/usuario/${sesion.idUsuario}`);
            if (resPedidos.ok) {
                const data = await resPedidos.json();
                if (Array.isArray(data) && data.length > 0) {
                    pedidos = data;
                }
            }
        } catch (e) {
            console.debug("No se pudieron cargar pedidos del backend:", e.message);
        }
    }

    // 2. Si el backend tiene pedidos, renderizarlos
    if (pedidos.length > 0) {
        let html = "";
        for (const pedido of pedidos) {
            let detalles = [];
            try {
                const resD = await fetch(`${API_BASE_URL}/detalles-pedido/pedido/${pedido.idPedido}`);
                if (resD.ok) detalles = await resD.json();
            } catch (_) { }

            const mapa = {
                PENDIENTE: { cls: "btn-encamino",  etq: "PENDIENTE",  badge: "badge-encamino" },
                EN_CAMINO: { cls: "btn-encamino",  etq: "EN CAMINO",  badge: "badge-encamino" },
                ENTREGADO: { cls: "btn-entregado", etq: "ENTREGADO",  badge: "badge" },
                CANCELADO: { cls: "btn-entregado", etq: "CANCELADO",  badge: "badge" },
            };
            const est = mapa[pedido.estatus] || { cls: "btn-encamino", etq: pedido.estatus || "—", badge: "badge-encamino" };

            const fecha = pedido.fechaPedido
                ? new Date(pedido.fechaPedido).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })
                : "—";

            if (detalles.length > 0) {
                for (const det of detalles) {
                    let nombre = `Producto #${det.cafeId}`;
                    let imagen = "../assets/images/catalogo/01.png";
                    try {
                        const resCafe = await fetch(`${API_BASE_URL}/products/${det.cafeId}`);
                        if (resCafe.ok) {
                            const cafe = await resCafe.json();
                            nombre = cafe.nombreCafe || nombre;
                            imagen = normalizarRutaImagen(cafe.imagenCafe);
                        }
                    } catch (_) { }

                    html += `
                    <div class="order-item">
                        <div class="row align-items-center g-2">
                            <div class="col-3 col-sm-2">
                                <img src="${imagen}" alt="${nombre}" class="img-fluid rounded" style="max-width:8rem; height:80px; object-fit:cover;">
                            </div>
                            <div class="col-6 col-sm-7 infoybotones">
                                <div class="order-title">${nombre}</div>
                                <div class="order-meta">Pedido #KAPE-${pedido.idPedido} • ${fecha}</div>
                            </div>
                            <div class="col-3 col-sm-3 text-end ${est.cls}">
                                <span class="${est.badge}">${est.etq}</span>
                            </div>
                        </div>
                        <div class="row mt-2 justify-content-end">
                            <div class="col-4 col-sm-3">
                                <div class="order-price">$${Number(det.precioUnitario || 0).toFixed(2)} MX</div>
                            </div>
                            <div class="col-8 col-sm-7 text-end">
                                <div class="order-actions">
                                    <a href="./producto.html?id=${det.cafeId}" class="btn btn-detalle">Ver Detalle</a>
                                    <a href="./resenia.html?id=${det.cafeId}&num=${pedido.idPedido}&detalleId=${det.idDetallePedido || 1}" class="btn btn-com-res">Dejar comentario / Reseña</a>
                                </div>
                            </div>
                        </div>
                    </div>`;
                }
            } else {
                html += `
                <div class="order-item">
                    <div class="row align-items-center g-2">
                        <div class="col-9 col-sm-10 infoybotones">
                            <div class="order-title">Pedido #KAPE-${pedido.idPedido}</div>
                            <div class="order-meta">${fecha} • $${Number(pedido.total || 0).toFixed(2)} MX</div>
                        </div>
                        <div class="col-3 col-sm-2 text-end ${est.cls}">
                            <span class="${est.badge}">${est.etq}</span>
                        </div>
                    </div>
                    <div class="row mt-2 justify-content-end">
                        <div class="col-8 col-sm-7 text-end">
                            <div class="order-actions">
                                <a href="./resenia.html?num=${pedido.idPedido}" class="btn btn-com-res">Dejar comentario / Reseña</a>
                            </div>
                        </div>
                    </div>
                </div>`;
            }
        }
        contenedor.innerHTML = html;
        return;
    }

    // 3. Revisar compras locales en localStorage ("kape_orders")
    try {
        const localOrders = JSON.parse(localStorage.getItem("kape_orders")) || [];
        if (Array.isArray(localOrders) && localOrders.length > 0) {
            let html = "";
            localOrders.forEach((ped, idx) => {
                const fecha = ped.fecha
                    ? new Date(ped.fecha).toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })
                    : "Reciente";
                const prods = ped.productos || [];

                prods.forEach(prod => {
                    const imgUrl = normalizarRutaImagen(prod.image);
                    html += `
                    <div class="order-item">
                        <div class="row align-items-center g-2">
                            <div class="col-3 col-sm-2">
                                <img src="${imgUrl}" alt="${prod.name || 'Café'}" class="img-fluid rounded" style="max-width:8rem; height:80px; object-fit:cover;">
                            </div>
                            <div class="col-6 col-sm-7 infoybotones">
                                <div class="order-title">${prod.name || 'Café Especial'}</div>
                                <div class="order-meta">Pedido #${ped.id || 'KAPE-' + (1000 + idx)} • ${fecha}</div>
                            </div>
                            <div class="col-3 col-sm-3 text-end btn-entregado">
                                <span class="badge">COMPLETADO</span>
                            </div>
                        </div>
                        <div class="row mt-2 justify-content-end">
                            <div class="col-4 col-sm-3">
                                <div class="order-price">$${Number(prod.price || 0).toFixed(2)} MX</div>
                            </div>
                            <div class="col-8 col-sm-7 text-end">
                                <div class="order-actions">
                                    <a href="./producto.html?id=${prod.id || 1}" class="btn btn-detalle">Ver Detalle</a>
                                    <a href="./resenia.html?id=${prod.id || 1}&num=${ped.id || '100' + idx}&detalleId=${idx + 1}" class="btn btn-com-res">Dejar comentario / Reseña</a>
                                </div>
                            </div>
                        </div>
                    </div>`;
                });
            });
            contenedor.innerHTML = html;
            return;
        }
    } catch (_) { }

    // 4. Si no hay pedidos previos, consultar los cafés reales del catálogo de la base de datos
    try {
        let cafesCatalogo = [];
        try {
            const resCafes = await fetch(`${API_BASE_URL}/products`);
            if (resCafes.ok) {
                cafesCatalogo = await resCafes.json();
            }
        } catch (_) { }

        if (Array.isArray(cafesCatalogo) && cafesCatalogo.length > 0) {
            const pedidosEjemplo = [
                { cafe: cafesCatalogo[0], num: "KAPE-9421", fecha: "12 de Julio, 2026", estatusCls: "btn-entregado", badgeCls: "badge", estatusTxt: "ENTREGADO" },
                { cafe: cafesCatalogo[1 % cafesCatalogo.length], num: "KAPE-9580", fecha: "24 de Julio, 2026", estatusCls: "btn-encamino", badgeCls: "badge-encamino", estatusTxt: "EN CAMINO" },
                { cafe: cafesCatalogo[2 % cafesCatalogo.length], num: "KAPE-8812", fecha: "15 de Agosto, 2026", estatusCls: "btn-entregado", badgeCls: "badge", estatusTxt: "ENTREGADO" }
            ];

            let html = "";
            pedidosEjemplo.forEach((item, index) => {
                const c = item.cafe;
                const imgUrl = normalizarRutaImagen(c.imagenCafe);
                html += `
                <div class="order-item">
                    <div class="row align-items-center g-2">
                        <div class="col-3 col-sm-2">
                            <img src="${imgUrl}" alt="${c.nombreCafe}" class="img-fluid rounded" style="max-width:8rem; height:80px; object-fit:cover;">
                        </div>
                        <div class="col-6 col-sm-7 infoybotones">
                            <div class="order-title">${c.nombreCafe}</div>
                            <div class="order-meta">Pedido #${item.num} • ${item.fecha}</div>
                        </div>
                        <div class="col-3 col-sm-3 text-end ${item.estatusCls}">
                            <span class="${item.badgeCls}">${item.estatusTxt}</span>
                        </div>
                    </div>
                    <div class="row mt-2 justify-content-end">
                        <div class="col-4 col-sm-3">
                            <div class="order-price">$${Number(c.precioCafe || 250).toFixed(2)} MX</div>
                        </div>
                        <div class="col-8 col-sm-7 text-end">
                            <div class="order-actions">
                                <a href="./producto.html?id=${c.idCafe}" class="btn btn-detalle">Ver Detalle</a>
                                <a href="./resenia.html?id=${c.idCafe}&num=${item.num}&detalleId=${index + 1}" class="btn btn-com-res">Dejar comentario / Reseña</a>
                            </div>
                        </div>
                    </div>
                </div>`;
            });
            contenedor.innerHTML = html;
            return;
        }
    } catch (_) { }

    // 5. Fallback por defecto si no hay conexión
    contenedor.innerHTML = `
        <div class="order-item">
            <div class="row align-items-center g-2">
                <div class="col-3 col-sm-2">
                    <img src="../assets/images/catalogo/Chiapas Reserva.png" alt="Chiapas Reserva" class="img-fluid rounded" style="max-width:8rem; height:80px; object-fit:cover;">
                </div>
                <div class="col-6 col-sm-7 infoybotones">
                    <div class="order-title">Chiapas Reserva</div>
                    <div class="order-meta">Pedido #KAPE-9421 • 12 de Julio, 2026</div>
                </div>
                <div class="col-3 col-sm-3 text-end btn-entregado">
                    <span class="badge">ENTREGADO</span>
                </div>
            </div>
            <div class="row mt-2 justify-content-end">
                <div class="col-4 col-sm-3">
                    <div class="order-price">$250.00 MX</div>
                </div>
                <div class="col-8 col-sm-7 text-end">
                    <div class="order-actions">
                        <a href="./producto.html?id=1" class="btn btn-detalle">Ver Detalle</a>
                        <a href="./resenia.html?id=1&num=KAPE-9421&detalleId=1" class="btn btn-com-res">Dejar comentario / Reseña</a>
                    </div>
                </div>
            </div>
        </div>`;
}

// ======================================================
// ARRANQUE SEGURO
// ======================================================
function initPerfil() {
    // Asignar referencias del DOM
    nombreUsuarioElem   = document.getElementById("nombreUsuario");
    infoNombreElem      = document.getElementById("infoNombre");
    infoEmailElem       = document.getElementById("infoEmail");
    infoTelefonoElem    = document.getElementById("infoTelefono");
    btnEditarInfo       = document.getElementById("btnEditarInfo");
    infoVista           = document.getElementById("infoVista");
    formEditarInfo      = document.getElementById("formEditarInfo");
    btnCancelarEdicion  = document.getElementById("btnCancelarEdicion");
    alertPlaceholder    = document.getElementById("infoAlertPlaceholder");
    inputEditNombre     = document.getElementById("inputEditNombre");
    inputEditEmail      = document.getElementById("inputEditEmail");
    inputEditTelefono   = document.getElementById("inputEditTelefono");

    // Inicializar datos del perfil
    cargarDatosUsuario();
    sincronizarConServidor();
    cargarPedidosUsuario();

    // Validación en tiempo real del formulario de edición
    inputEditNombre?.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    });
    inputEditTelefono?.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
    });

    // Botón Editar perfil
    btnEditarInfo?.addEventListener("click", () => {
        if (formEditarInfo?.classList.contains("d-none")) {
            activarModoEdicion();
        } else {
            desactivarModoEdicion();
        }
    });

    // Botón Cancelar edición
    btnCancelarEdicion?.addEventListener("click", desactivarModoEdicion);

    // Guardar datos del perfil editado
    formEditarInfo?.addEventListener("submit", async (event) => {
        event.preventDefault();
        limpiarAlerta();

        const nombreNuevo   = inputEditNombre.value.trim();
        const emailNuevo    = inputEditEmail.value.trim();
        const telefonoNuevo = inputEditTelefono.value.trim();

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
            mostrarAlerta("El teléfono debe tener exactamente 10 dígitos.");
            return;
        }

        const submitBtn = document.getElementById("btnGuardarEdicion");
        if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Guardando..."; }

        if (sesion?.idUsuario) {
            try {
                await fetch(`${API_BASE_URL}/usuarios/${sesion.idUsuario}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nombre: nombreNuevo, correo: emailNuevo, numero: telefonoNuevo })
                });
            } catch (err) {
                console.debug("PUT backend no disponible:", err.message);
            }
        }

        sesion.nombre   = nombreNuevo;
        sesion.email    = emailNuevo;
        sesion.correo   = emailNuevo;
        sesion.telefono = telefonoNuevo;
        sesion.numero   = telefonoNuevo;
        localStorage.setItem("kapeSesion", JSON.stringify(sesion));

        cargarDatosUsuario();
        desactivarModoEdicion();
        mostrarAlerta("Información actualizada correctamente.", "success");
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "Guardar"; }
        setTimeout(limpiarAlerta, 4000);
    });

    // Cerrar sesión
    document.querySelector(".cerrar-sesion")?.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("kapeSesion");
        window.location.href = "/index.html";
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPerfil);
} else {
    initPerfil();
}