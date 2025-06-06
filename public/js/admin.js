document.addEventListener('DOMContentLoaded', () => {

    // =============================================================
    // PHẦN 1: LOGIC CHO SIDEBAR (CHẠY TRÊN MỌI TRANG)
    // =============================================================
    const menuIcon = document.getElementById('menu-icon');
    const sidebarNav = document.getElementById('sidebar-nav');
    const closeBtn = document.getElementById('close-btn');
    const overlay = document.getElementById('overlay');

    // Mở/đóng sidebar khi click
    if (menuIcon && sidebarNav && closeBtn && overlay) {
        menuIcon.addEventListener('click', () => {
            sidebarNav.classList.add('active');
            overlay.classList.add('active');
        });

        closeBtn.addEventListener('click', () => {
            sidebarNav.classList.remove('active');
            overlay.classList.remove('active');
        });

        overlay.addEventListener('click', () => {
            sidebarNav.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // Hàm đặt trạng thái 'active' cho mục sidebar dựa trên URL
    function setActiveSidebarItem() {
        const currentPath = window.location.pathname; // Lấy đường dẫn hiện tại, ví dụ: "/dashboard"
        const sidebarLinks = document.querySelectorAll('.sidebar ul li a'); // Lấy tất cả các link trong sidebar

        sidebarLinks.forEach(link => {
            link.classList.remove('active'); // Xóa active khỏi tất cả các link trước
            
            // So sánh href của link với đường dẫn hiện tại
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active'); // Thêm active vào link khớp
            }
        });
    }

    // GỌI HÀM KHI TRANG TẢI XONG
    setActiveSidebarItem();


    // =============================================================
    // PHẦN 2: LOGIC RIÊNG CHO TRANG DASHBOARD (SỐ LIỆU TIẾP NHẬN)
    // =============================================================
    const specificFilterContainer = document.getElementById('specific-filter-container');

    // Chỉ chạy code filter nếu tìm thấy container của nó
    if (specificFilterContainer) {
        const timeFilterButtons = document.querySelectorAll('.time-filters button');

        function generateWeekFilters() { return `<button><span>T1</span> Tuần 1</button><button><span>T1</span> Tuần 2</button><button class="active"><span>T1</span> Tuần 3</button><button><span>T1</span> Tuần 4</button><button><span>T2</span> Tuần 1</button><button><span>T2</span> Tuần 2</button>`; }
        function generateMonthFilters() { let h = ''; for (let i = 1; i <= 12; i++) { h += `<button>Tháng ${i}</button>`; } return h; }
        function generateYearFilters() { let h = ''; for (let i = 2020; i <= 2025; i++) { h += `<button>${i}</button>`; } return h; }

        function setupSpecificFilterClicks() {
            const specificButtons = specificFilterContainer.querySelectorAll('button');
            specificButtons.forEach(button => {
                button.addEventListener('click', () => {
                    specificButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                });
            });
        }

        timeFilterButtons.forEach(button => {
            button.addEventListener('click', () => {
                timeFilterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const filterType = button.textContent.trim();
                let newFiltersHTML = '';
                switch (filterType) {
                    case 'Theo tháng': newFiltersHTML = generateMonthFilters(); break;
                    case 'Theo năm': newFiltersHTML = generateYearFilters(); break;
                    default: newFiltersHTML = generateWeekFilters(); break;
                }
                specificFilterContainer.innerHTML = newFiltersHTML;
                setupSpecificFilterClicks();
            });
        });

        function initialize() {
            specificFilterContainer.innerHTML = generateWeekFilters();
            setupSpecificFilterClicks();
        }
        initialize();
    }
});