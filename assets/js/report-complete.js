// assets/js/report-complete.js

document.addEventListener('DOMContentLoaded', () => {
    // Thời gian chờ trước khi chuyển hướng (5000 milliseconds = 4 seconds)
    const redirectDelay = 3000;

    // Sử dụng setTimeout để thực hiện một hành động sau một khoảng thời gian
    setTimeout(() => {
        // Sau 4 giây, chuyển người dùng về trang chủ
        window.location.href = 'home.html';
    }, redirectDelay);
});