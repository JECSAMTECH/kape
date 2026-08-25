// const hamburger = document.querySelector(".hamburger");
// const mobileMenu = document.querySelector(".mobile-menu");

// hamburger.addEventListener("click", () => {
//     hamburger.classList.toggle("active");
//     mobileMenu.classList.toggle("active");
//     document.body.classList.toggle("menu-open");
// });

export function iniciarNavbar() {
    const modalNavbar = document.getElementById('modal-navbar')
    const inputNavbarSearch = document.getElementById('input-navbar-search');

    modalNavbar.addEventListener('shown.bs.modal', () => {
        inputNavbarSearch.focus();
    });
}