// assets/js/login.js
// Logic xác thực cho trang login.html

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessageDiv = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            errorMessageDiv.style.display = 'none';

            const email = loginForm.email.value;
            const password = loginForm.password.value;

            // Ensure accountData is loaded
            if (typeof accountData === 'undefined' || !accountData.users) {
                displayError('Lỗi: Không thể tải dữ liệu tài khoản.');
                return;
            }

            const user = accountData.users.find(u => u.email === email);

            if (!user) {
                displayError('Tài khoản không tồn tại.');
            } else if (user.password !== password) {
                displayError('Mật khẩu không chính xác.');
            } else {
                handleSuccessfulLogin(user);
            }
        });
    }

    function handleSuccessfulLogin(user) {
        // Use sessionStorage to store user info for the current session
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));

        if (user.role === 'admin') {
            window.location.href = 'admin/dashboard.html';
        } else if (user.role === 'user') {
            window.location.href = 'home.html';
        } else {
            displayError('Vai trò người dùng không xác định.');
        }
    }

    function displayError(message) {
        errorMessageDiv.textContent = message;
        errorMessageDiv.style.display = 'block';
    }

    // ==========================================================
    // SỬA LỖI LOGIC TOGGLE SHOW/HIDE PASSWORD
    // ==========================================================
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            // Kiểm tra loại của input hiện tại
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Thay đổi icon mắt
            togglePassword.classList.toggle('fa-eye-slash');
            togglePassword.classList.toggle('fa-eye');
        });
    }
});