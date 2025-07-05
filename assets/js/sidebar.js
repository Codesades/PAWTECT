// assets/js/sidebar.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. HTML cho sidebar tối giản mới
    const sidebarHTML = `
        <nav class="sidebar simple-sidebar" id="sidebar-nav">
            <div class="sidebar-header">
                <i class="fas fa-user user-icon-shape"></i>
                <div class="user-greeting">
                    <span>chào buổi sáng</span><br>
                    <strong class="user-name">user!</strong>
                </div>
                <!-- Nút đóng 'x' đã được loại bỏ -->
            </div>
            <ul>
                <li><a href="pending.html">Bài đăng chờ duyệt</a></li>
                <li><a href="adoption.html">Đơn nhận nuôi</a></li>
                <li><a href="dashboard.html">Số liệu thống kê</a></li>
                <li><a href="donations.html">Quản lý thu chi</a></li>
                <li class="logout-item">
                    <a href="../login.html" id="logout-button">Đăng xuất</a>
                </li>
            </ul>
        </nav>
        <div class="overlay" id="overlay"></div>
    `;

    // 2. Chèn HTML vào trang
    // Cách này linh hoạt, nếu không có placeholder thì chèn vào đầu body
    const placeholder = document.getElementById('navbar-placeholder');
    if (placeholder) {
        placeholder.innerHTML = sidebarHTML;
    } else {
        document.body.insertAdjacentHTML('afterbegin', sidebarHTML);
    }

    // 3. Gắn các sự kiện
    const menuIcon = document.getElementById('menu-icon');
    const sidebarNav = document.getElementById('sidebar-nav');
    const overlay = document.getElementById('overlay');
    const logoutButton = document.getElementById('logout-button');

    // Mở/đóng sidebar
    if (menuIcon && sidebarNav && overlay) {
        const openSidebar = () => {
            sidebarNav.classList.add('active');
            overlay.classList.add('active');
        };
        const closeSidebar = () => {
            sidebarNav.classList.remove('active');
            overlay.classList.remove('active');
        };
        
        menuIcon.addEventListener('click', openSidebar);
        // Chỉ đóng khi click vào overlay
        overlay.addEventListener('click', closeSidebar);
    }

    // Xử lý đăng xuất
    if (logoutButton) {
        logoutButton.addEventListener('click', (event) => {
            event.preventDefault();
            if (confirm('Bạn có chắc chắn muốn đăng xuất không?')) {
                // Xóa thông tin người dùng khỏi sessionStorage (nếu có)
                sessionStorage.removeItem('loggedInUser');
                window.location.href = '../login.html';
            }
        });
    }

    // Hàm đặt trạng thái 'active' cho link menu
    function setActiveSidebarItem() {
        const currentPageUrl = window.location.href;
        const sidebarLinks = document.querySelectorAll('.sidebar ul li:not(.logout-item) a');

        sidebarLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            // So sánh phần cuối của URL để xác định trang hiện tại
            if (currentPageUrl.endsWith(linkHref)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    setActiveSidebarItem();
});