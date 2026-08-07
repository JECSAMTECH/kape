export function iniciarNavbar() {
    const modalNavbar = document.getElementById('modal-navbar')
    const inputNavbarSearch = document.getElementById('input-navbar-search');

    modalNavbar.addEventListener('shown.bs.modal', () => {
        inputNavbarSearch.focus();
    });
}



