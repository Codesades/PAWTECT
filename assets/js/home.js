document.addEventListener('DOMContentLoaded', () => {

    // =============================================================
    // I. LOGIC CHUNG CHO SIDEBAR
    // =============================================================
    const menuIcon = document.getElementById('menu-icon');
    const sidebarNav = document.getElementById('sidebar-nav');
    const closeBtn = document.getElementById('close-btn');
    const overlay = document.getElementById('overlay');

    if (menuIcon && sidebarNav && closeBtn && overlay) {
        const openSidebar = () => {
            sidebarNav.classList.add('active');
            overlay.classList.add('active');
        };
        const closeSidebar = () => {
            sidebarNav.classList.remove('active');
            overlay.classList.remove('active');
        };
        menuIcon.addEventListener('click', openSidebar);
        closeBtn.addEventListener('click', closeSidebar);
        overlay.addEventListener('click', closeSidebar);
    }

    // =============================================================
    // II. LOGIC CHO CATEGORY SLIDER (RESPONSIVE)
    // =============================================================
    const categoryGridContainer = document.getElementById('category-grid-container');
    const catPrevBtn = document.getElementById('category-prev-btn');
    const catNextBtn = document.getElementById('category-next-btn');
    const categoryPagination = document.getElementById('category-pagination');

    if (categoryGridContainer && catPrevBtn && catNextBtn && categoryPagination) {
        
        const categories = [
            { href: 'report-location.html', text: 'BÁO CÁO CA CỨU HỘ' },
            { href: 'find_friends.html', text: 'TÌM BẠN ĐỒNG HÀNH' },
            { href: 'vets.html', text: 'KẾT NỐI VỚI THÚ Y' },
            { href: 'user.html', text: 'BẢNG TIN'},
            { href: 'premium.html', text: 'KHÁM PHÁ PREMIUM' },
            { href: 'donation.html', text: 'ỦNG HỘ PAWTECT' },
            { href: '#', text: 'SẮP RA MẮT', disabled: true },
            { href: '#', text: 'SẮP RA MẮT', disabled: true }
        ];

        const itemsPerPage = 4; // Always 4 items per page
        const totalPages = Math.ceil(categories.length / itemsPerPage);
        let currentPage = 0;

        function renderCategorySlider() {
            categoryGridContainer.innerHTML = '';
            for (let i = 0; i < totalPages; i++) {
                const page = document.createElement('div');
                page.className = 'category-page';
                const pageItems = categories.slice(i * itemsPerPage, (i + 1) * itemsPerPage);
                
                page.innerHTML = pageItems.map(cat => 
                    `<a href="${cat.href}" class="category-card ${cat.disabled ? 'disabled' : ''}">${cat.text}</a>`
                ).join('');
                
                categoryGridContainer.appendChild(page);
            }
        }

        function createCategoryPagination() {
            categoryPagination.innerHTML = '';
            for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement('span');
                dot.className = 'dot';
                if (i === 0) dot.classList.add('active');
                categoryPagination.appendChild(dot);
            }
        }

        function updateCategoryState() {
            catPrevBtn.disabled = currentPage === 0;
            catNextBtn.disabled = currentPage >= totalPages - 1;
            const dots = categoryPagination.querySelectorAll('.dot');
            dots.forEach((dot, index) => dot.classList.toggle('active', index === currentPage));
        }
        
        function scrollCategoryToPage(pageIndex) {
            const scrollAmount = categoryGridContainer.offsetWidth * pageIndex;
            categoryGridContainer.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        }
        
        catNextBtn.addEventListener('click', () => {
            if (currentPage < totalPages - 1) {
                currentPage++;
                scrollCategoryToPage(currentPage);
            }
        });

        catPrevBtn.addEventListener('click', () => {
            if (currentPage > 0) {
                currentPage--;
                scrollCategoryToPage(currentPage);
            }
        });

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const pageElements = Array.from(categoryGridContainer.querySelectorAll('.category-page'));
                    currentPage = pageElements.indexOf(entry.target);
                    updateCategoryState();
                }
            });
        }, { root: categoryGridContainer, threshold: 0.6 });

        renderCategorySlider();
        createCategoryPagination();
        updateCategoryState();
        categoryGridContainer.querySelectorAll('.category-page').forEach(page => scrollObserver.observe(page));
    }

// =============================================================
// FULL INTEREST SLIDER WITH PAGINATION DOTS (MERGED VERSION)
// =============================================================
const interestedContainer = document.getElementById('interested-container');
const interestPrevBtn = document.getElementById('interest-prev-btn');
const interestNextBtn = document.getElementById('interest-next-btn');
const interestDots = document.getElementById('interest-pagination');

if (interestedContainer && interestPrevBtn && interestNextBtn && interestDots) {

  // --- START: MERGED CODE ---
  // 1. Define your array of placeholder images.
  // Make sure 'vet2.jpg' and 'vet3.jpg' exist in your assets/images folder!
  const placeholderImages = [
    'assets/images/vet.jpg',
    'assets/images/vet_2.jpg',
    'assets/images/vet_3.jpg'
  ];
  // --- END: MERGED CODE ---


  function renderInterestCards(clinics) {
    interestedContainer.innerHTML = '';
    interestDots.innerHTML = '';

    if (!clinics || clinics.length === 0) {
      interestedContainer.innerHTML = '<p class="empty-message">Không có dữ liệu.</p>';
      return;
    }

    // --- START: MERGED CODE ---
    // 2. Initialize a counter for the placeholder cycle.
    // This is reset every time the cards are rendered.
    let placeholderIndex = 0;

    // 3. Helper function to get the next placeholder image.
    const getNextPlaceholder = () => {
      const image = placeholderImages[placeholderIndex];
      // Move to the next index, wrapping around to 0 if it reaches the end
      placeholderIndex = (placeholderIndex + 1) % placeholderImages.length;
      return image;
    };
    // --- END: MERGED CODE ---

    clinics.forEach(clinic => {
      const card = document.createElement('div');
      card.className = 'interest-card';

      // --- START: MERGED CODE ---
      // 4. Use the clinic's image if it exists, otherwise, get the next placeholder.
      const imageUrl = clinic.image || getNextPlaceholder();
      card.style.backgroundImage = `url('${imageUrl}')`;
      // --- END: MERGED CODE ---

      card.innerHTML = `
        <h3>${clinic.name.toUpperCase()}</h3>
        <p>${clinic.address}</p>
        <p>Hotline: ${clinic.hotline}</p>
        <p>${clinic.workingHours}</p>
        <a href="vets.html" class="btn btn-light">Tới ngay!</a>
      `;
      interestedContainer.appendChild(card);
    });

    // Wait for layout calculation (This part remains unchanged)
    setTimeout(() => {
      const containerWidth = interestedContainer.clientWidth;
      const totalWidth = interestedContainer.scrollWidth;
      const numPages = Math.ceil(totalWidth / containerWidth);

      interestDots.innerHTML = '';
      for (let i = 0; i < numPages; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        interestDots.appendChild(dot);
      }

      updateInterestArrowState();
    }, 100);
  }

  // --- ALL THE CODE BELOW REMAINS UNCHANGED ---

  const updateInterestArrowState = () => {
    const scrollLeft = interestedContainer.scrollLeft;
    const maxScrollLeft = interestedContainer.scrollWidth - interestedContainer.clientWidth;
    interestPrevBtn.disabled = scrollLeft < 10;
    interestNextBtn.disabled = scrollLeft >= maxScrollLeft - 10;
  };

  interestNextBtn.addEventListener('click', () => {
    interestedContainer.scrollBy({ left: interestedContainer.clientWidth, behavior: 'smooth' });
  });

  interestPrevBtn.addEventListener('click', () => {
    interestedContainer.scrollBy({ left: -interestedContainer.clientWidth, behavior: 'smooth' });
  });

  interestedContainer.addEventListener('scroll', () => {
    updateInterestArrowState();

    const containerWidth = interestedContainer.clientWidth;
    const activeIndex = Math.round(interestedContainer.scrollLeft / containerWidth);

    const dots = interestDots.querySelectorAll('.dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === activeIndex);
    });
  }, { passive: true });

  if (typeof vetData !== 'undefined' && vetData.clinics) {
    renderInterestCards(vetData.clinics);
  } else {
    console.error('Không tìm thấy dữ liệu vetData. Hãy chắc chắn file data-vets.js đã được nhúng.');
  }
}

    // =============================================================
// RENDER & SCROLL SLIDER FOR "CA CỨU HỘ GẦN TÔI"
// =============================================================
const nearbyRescueContainer = document.getElementById('nearby-rescue-container');
const rescuePrevBtn = document.getElementById('rescue-prev-btn');
const rescueNextBtn = document.getElementById('rescue-next-btn');
const rescueDots = rescuePrevBtn?.closest('.scroll-section')?.querySelector('.pagination-dots');

function renderNearbyRescues(posts) {
  nearbyRescueContainer.innerHTML = '';

  const rescuePosts = posts.filter(post => post.status !== 'handled' && typeof post.distance === 'number')
                            .sort((a, b) => a.distance - b.distance);

  if (rescuePosts.length === 0) {
    nearbyRescueContainer.innerHTML = '<p class="empty-message">Không có ca cứu hộ nào gần bạn.</p>';
    return;
  }

  nearbyRescueContainer.innerHTML = rescuePosts.map(post => `
    <div class="rescue-card">
      <img src="${post.imagePet || post.imageUrl || 'assets/images/placeholder.jpg'}" alt="Ảnh ca cứu hộ ${post.id}">
      <div class="rescue-card-info">
        <span class="rescue-id">${post.id}</span>
        <span class="rescue-distance">Cách bạn ${post.distance.toFixed(1)}km</span>
        <!-- THAY ĐỔI Ở ĐÂY: Truyền cid thay vì id -->
        <a href="case-detail.html?cid=${post.cid}" class="btn-arrow-icon" aria-label="Xem ngay">
          <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>
  `).join('');

  requestAnimationFrame(() => {
    initializeRescueSlider();
  });
}

function initializeRescueSlider() {
  const cards = nearbyRescueContainer.querySelectorAll('.rescue-card');
  if (!cards.length) return;

  const gap = parseInt(window.getComputedStyle(nearbyRescueContainer).gap || '20');
  const cardWidth = cards[0].offsetWidth;

  const updateArrowState = () => {
    const scrollLeft = nearbyRescueContainer.scrollLeft;
    const maxScrollLeft = nearbyRescueContainer.scrollWidth - nearbyRescueContainer.clientWidth;
    rescuePrevBtn.disabled = scrollLeft <= 10;
    rescueNextBtn.disabled = scrollLeft >= maxScrollLeft - 10;
  };

  // Scroll arrows
  rescuePrevBtn.onclick = () => {
    nearbyRescueContainer.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
  };
  rescueNextBtn.onclick = () => {
    nearbyRescueContainer.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
  };

  nearbyRescueContainer.addEventListener('scroll', () => {
    updateArrowState();

    // update pagination dot
    const dots = document.querySelectorAll('#rescue-pagination .dot');
    const activeIndex = Math.round(nearbyRescueContainer.scrollLeft / (cardWidth + gap));
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === activeIndex);
    });
  }, { passive: true });

  // 🔽 Create pagination dots
  const rescuePagination = document.getElementById('rescue-pagination');
  if (rescuePagination) {
    rescuePagination.innerHTML = '';
    cards.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'dot';
      if (i === 0) dot.classList.add('active');
      rescuePagination.appendChild(dot);
    });
  }

  updateArrowState();
}


if (typeof appData !== 'undefined' && appData.posts) {
  renderNearbyRescues(appData.posts);
} else {
  console.error('Không tìm thấy dữ liệu appData. Hãy chắc chắn file data.js đã được nhúng.');
}



    // =============================================================
    // V. LOGIC CHUNG CHO CÁC THANH TRƯỢT CÓ DẤU CHẤM (E.G., PARTNERS)
    // =============================================================
    function initializeGenericScrollSection(section) {
        const scrollContainer = section.querySelector('.scroll-container');
        const paginationDotsContainer = section.querySelector('.pagination-dots');

        if (!scrollContainer || !paginationDotsContainer) return;
        
        const cards = scrollContainer.children;
        if (cards.length === 0) return;

        paginationDotsContainer.innerHTML = '';
        for (let i = 0; i < cards.length; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            if (i === 0) dot.classList.add('active');
            paginationDotsContainer.appendChild(dot);
        }

        const dots = paginationDotsContainer.querySelectorAll('.dot');
        const cardWidth = cards[0].offsetWidth;
        const gap = parseInt(window.getComputedStyle(scrollContainer).gap);

        scrollContainer.addEventListener('scroll', () => {
            const activeIndex = Math.round(scrollContainer.scrollLeft / (cardWidth + gap));
            dots.forEach((dot, index) => dot.classList.toggle('active', index === activeIndex));
        }, { passive: true });
    }

    // Chỉ áp dụng cho .scroll-section, không áp dụng cho các slider chuyên dụng khác
    document.querySelectorAll('.scroll-section').forEach(initializeGenericScrollSection);

    console.log('Trang chủ Pawtect đã tải xong!');
});