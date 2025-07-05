document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-icon');
    const sidebarNav = document.getElementById('sidebar-nav');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('close-btn');
    const logoutButton = document.getElementById('logout-button');
  
    if (menuIcon && sidebarNav && overlay && closeBtn) {
      // Open sidebar
      menuIcon.addEventListener('click', () => {
        sidebarNav.classList.add('active');
        overlay.classList.add('active');
      });
  
      // Close sidebar
      const closeSidebar = () => {
        sidebarNav.classList.remove('active');
        overlay.classList.remove('active');
      };
  
      closeBtn.addEventListener('click', closeSidebar);
      overlay.addEventListener('click', closeSidebar);
    }
  
    // Logout confirmation
    if (logoutButton) {
      logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Bạn có chắc chắn muốn đăng xuất không?')) {
          window.location.href = 'login.html';
        }
      });
    }
  
    // Active link highlighting
    function setActiveSidebarItem() {
      const currentUrl = window.location.href;
      const sidebarLinks = document.querySelectorAll('.sidebar ul li:not(.logout-item) a');
      sidebarLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (currentUrl.endsWith(href)) {
          link.classList.add('active');
        }
      });
    }
  
    setActiveSidebarItem();
  });
  