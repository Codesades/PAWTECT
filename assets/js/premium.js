document.addEventListener('DOMContentLoaded', () => {

    // Logic cho sidebar
    const menuIcon = document.getElementById('menu-icon');
    const sidebarNav = document.getElementById('sidebar-nav');
    const closeBtn = document.getElementById('close-btn');
    const overlay = document.getElementById('overlay');

    if (menuIcon && sidebarNav && closeBtn && overlay) {
        menuIcon.addEventListener('click', () => sidebarNav.classList.add('active') || overlay.classList.add('active'));
        closeBtn.addEventListener('click', () => sidebarNav.classList.remove('active') || overlay.classList.remove('active'));
        overlay.addEventListener('click', () => sidebarNav.classList.remove('active') || overlay.classList.remove('active'));
    }

    // Logic cho slider
    const premiumSlider = document.getElementById("premium-slider");
    const prevBtn = document.getElementById("premium-prev-btn");
    const nextBtn = document.getElementById("premium-next-btn");

    if (premiumSlider && prevBtn && nextBtn) {
        prevBtn.addEventListener("click", () => {
            premiumSlider.scrollBy({ left: -premiumSlider.clientWidth, behavior: "smooth" });
        });
        nextBtn.addEventListener("click", () => {
            premiumSlider.scrollBy({ left: premiumSlider.clientWidth, behavior: "smooth" });
        });
    }

    // THÊM MỚI: Logic cho nút mua Premium
    const buyPremiumBtn = document.getElementById('buy-premium-btn');
    if (buyPremiumBtn) {
        buyPremiumBtn.addEventListener('click', () => {
            // Lấy thông tin từ card premium
            const premiumCard = buyPremiumBtn.closest('.premium-card');
            const name = premiumCard.querySelector('h3').textContent;
            const amount = premiumCard.querySelector('.price').textContent;

            // Tạo đối tượng giao dịch
            const transactionData = {
                items: [{ name: name, amount: amount }],
                totalAmount: amount,
                backLink: 'premium.html' // Link để quay lại
            };

            // Lưu vào sessionStorage và chuyển trang
            sessionStorage.setItem('currentTransaction', JSON.stringify(transactionData));
            window.location.href = 'confirm-transaction.html';
        });
    }
});