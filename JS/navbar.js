export function iniciarNavbar() {
    const modalNavbar = document.getElementById('modal-navbar')
    const inputNavbarSearch = document.getElementById('input-navbar-search');

    modalNavbar.addEventListener('shown.bs.modal', () => {
        inputNavbarSearch.focus();
    });

    // Marca el link activo según la URL actual
    const currentPath = window.location.pathname.replace(/\/$/, "").split("/").pop() || "index.html";

    document.querySelectorAll(".navbar-nav .nav-item").forEach(item => {
        item.classList.remove("active");
    });

    document.querySelectorAll(".navbar-nav .nav-item a").forEach(link => {
        const linkPath = link.getAttribute("href").split("/").pop();
        if (linkPath === currentPath) {
            link.closest(".nav-item").classList.add("active");
        }
    });
}



