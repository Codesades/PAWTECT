document.addEventListener('DOMContentLoaded', () => {

    // ================================================
    // LOGIC CHUNG CHO SIDEBAR
    // ================================================
    const menuIcon = document.getElementById('menu-icon');
    const sidebarNav = document.getElementById('sidebar-nav');
    const closeBtn = document.getElementById('close-btn');
    const overlay = document.getElementById('overlay');

    if (menuIcon && sidebarNav && closeBtn && overlay) {
        menuIcon.addEventListener('click', () => sidebarNav.classList.add('active') || overlay.classList.add('active'));
        closeBtn.addEventListener('click', () => sidebarNav.classList.remove('active') || overlay.classList.remove('active'));
        overlay.addEventListener('click', () => sidebarNav.classList.remove('active') || overlay.classList.remove('active'));
    }

    // ================================================
    // LOGIC CHO TRANG ỦNG HỘ
    // ================================================
    const donationPackages = document.querySelectorAll('.donation-package');
    const donationMessage = document.getElementById('donation-message');
    const checkoutButton = document.getElementById('checkout-button');
    
    if (donationPackages.length > 0 && donationMessage && checkoutButton) {
        let totalAmount = 0;
        const defaultMessage = "Bạn chưa chọn gói ủng hộ nào, hãy ủng hộ ngay!";

        function parseAmount(amountString) {
            return parseInt(String(amountString).replace(/\./g, '').replace('VND', ''), 10) || 0;
        }

        function formatAmount(amountNumber) {
            return amountNumber.toLocaleString('vi-VN') + ' VND';
        }
        
        function updateDonationBox() {
            if (totalAmount === 0) {
                donationMessage.innerHTML = defaultMessage;
                checkoutButton.disabled = true;
            } else {
                donationMessage.innerHTML = `Tổng cộng: <strong>${formatAmount(totalAmount)}</strong>`;
                checkoutButton.disabled = false;
            }
        }
        
        donationPackages.forEach(pkg => {
            pkg.addEventListener('click', () => {
                const packageValue = parseAmount(pkg.dataset.amount);
                pkg.classList.toggle('selected');
                if (pkg.classList.contains('selected')) {
                    totalAmount += packageValue;
                } else {
                    totalAmount -= packageValue;
                }
                updateDonationBox();
            });
        });

        // THAY ĐỔI Ở ĐÂY: Logic khi nhấn nút Thanh toán
        checkoutButton.addEventListener('click', () => {
            // KIỂM TRA ĐIỀU KIỆN: Chỉ tiếp tục nếu có gói được chọn
            if (totalAmount > 0) {
                const selectedPackages = document.querySelectorAll('.donation-package.selected');
            
                const transactionItems = Array.from(selectedPackages).map(pkg => ({
                    name: pkg.dataset.name,
                    amount: pkg.dataset.amount.replace('VND', ' VND')
                }));

                const transactionData = {
                    items: transactionItems,
                    totalAmount: formatAmount(totalAmount),
                    backLink: 'donation.html'
                };

                sessionStorage.setItem('currentTransaction', JSON.stringify(transactionData));
                window.location.href = 'confirm-transaction.html';
            } else {
                // Nếu không có gói nào được chọn, hiển thị thông báo
                alert('Vui lòng chọn ít nhất một gói ủng hộ!');
            }
        });
        
        updateDonationBox();
    }
    
    console.log('Trang ủng hộ Pawtect đã tải xong!');
});