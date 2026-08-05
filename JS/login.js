const togglePassword = document.querySelector('.toggle-password');
const passwordInput = document.querySelector('#password');

togglePassword.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';

  // Cambia el texto interno del span
  togglePassword.textContent = isPassword ? 'visibility_off' : 'visibility';
});
