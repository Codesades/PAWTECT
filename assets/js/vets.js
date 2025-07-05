// assets/js/vets.js

document.addEventListener('DOMContentLoaded', () => {
    // --- SIDEBAR LOGIC (If you add a user_header.css link to vets.html) ---
    // This part can be added if you decide to include the main header/sidebar
    // const menuIcon = document.getElementById('menu-icon');
    // ... etc.

    // --- VET SLIDER LOGIC ---
    const slider = document.getElementById('vet-slider');
    const paginationContainer = document.getElementById('slider-pagination');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const sliderControls = document.querySelector('.slider-controls');

    if (!slider || !paginationContainer || !prevBtn || !nextBtn || !sliderControls) {
        return;
    }

    // Hàm tạo HTML cho các ngôi sao đánh giá (không đổi)
    function createStarsHTML(rating) {
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            starsHTML += i <= rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
        }
        return starsHTML;
    }

    // --- HÀM RENDER DANH SÁCH PHÒNG KHÁM (ĐÃ CẬP NHẬT) ---
    function renderVetList(clinics) {
        slider.innerHTML = ''; // Xóa nội dung cũ

        if (!clinics || clinics.length === 0) {
            slider.innerHTML = '<p class="empty-message">Không có phòng khám nào.</p>';
            return;
        }

        clinics.forEach(clinic => {
            // ==========================================================
            //            THAY ĐỔI DUY NHẤT BẮT ĐẦU TỪ ĐÂY
            // ==========================================================
            
            // Tạo một thẻ <a> bao bọc nút để có thể điều hướng
            // href được tạo động với tên phòng khám dưới dạng URL parameter
            const scheduleButtonHTML = `
                <a href="book-appointment.html?clinic=${encodeURIComponent(clinic.name)}" class="btn-schedule">
                    Hẹn lịch ngay
                </a>
            `;

            // ==========================================================
            //                       KẾT THÚC THAY ĐỔI
            // ==========================================================

            const cardHTML = `
                <div class="vet-clinic-card">
                    <div class="clinic-logo">
                        <img src="${clinic.logoUrl}" alt="${clinic.name} Logo">
                    </div>
                    <div class="clinic-info">
                        <h3>${clinic.name}</h3>
                        <p>Địa chỉ: ${clinic.address}</p>
                        <p>Hotline: ${clinic.hotline}</p>
                        <p>${clinic.workingHours}</p>
                    </div>
                    ${scheduleButtonHTML} 
                    <div class="clinic-rating">
                        <h4>Đánh giá chung</h4>
                        <div class="stars">
                            ${createStarsHTML(clinic.rating)}
                        </div>
                    </div>
                </div>
            `;
            slider.insertAdjacentHTML('beforeend', cardHTML);
        });
    }

    // Hàm khởi tạo slider và pagination (không đổi)
    function initializeSlider() {
        renderVetList(vetData.clinics);

        const cards = slider.querySelectorAll('.vet-clinic-card');
        const cardCount = cards.length;
        paginationContainer.innerHTML = '';

        if (cardCount <= 1) {
            sliderControls.style.display = 'none';
            return;
        }

        for (let i = 0; i < cardCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            paginationContainer.appendChild(dot);
        }
        const dots = paginationContainer.querySelectorAll('.dot');

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const cardWidth = cards[0].offsetWidth;
                const gap = parseInt(window.getComputedStyle(slider).gap) || 0;
                slider.scrollTo({
                    left: index * (cardWidth + gap),
                    behavior: 'smooth'
                });
            });
        });

        const updateControls = () => {
            const cardWidth = cards[0].offsetWidth;
            const gap = parseInt(window.getComputedStyle(slider).gap) || 0;
            const activeIndex = Math.round(slider.scrollLeft / (cardWidth + gap));

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });

            prevBtn.disabled = activeIndex === 0;
            nextBtn.disabled = (slider.scrollWidth - slider.scrollLeft - slider.clientWidth) < 1;
        };

        prevBtn.addEventListener('click', () => {
            const cardWidth = cards[0].offsetWidth;
            const gap = parseInt(window.getComputedStyle(slider).gap) || 0;
            slider.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            const cardWidth = cards[0].offsetWidth;
            const gap = parseInt(window.getComputedStyle(slider).gap) || 0;
            slider.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
        });

        slider.addEventListener('scroll', updateControls);
        
        updateControls(); 
    }

    // --- KHỞI TẠO BAN ĐẦU ---
    if (typeof vetData !== 'undefined' && vetData.clinics) {
        initializeSlider();
    } else {
        console.error("Không tìm thấy dữ liệu vetData. Hãy chắc chắn file data-vets.js đã được nhúng.");
    }
});