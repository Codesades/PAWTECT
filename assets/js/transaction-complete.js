document.addEventListener('DOMContentLoaded', () => {

    // =============================================================
    // I. LOGIC CẬP NHẬT LINK QUAY LẠI
    // =============================================================
    const backLink = document.getElementById('back-to-origin-link');
    const transactionDataJSON = sessionStorage.getItem('currentTransaction');

    if (backLink && transactionDataJSON) {
        try {
            const transactionData = JSON.parse(transactionDataJSON);
            if (transactionData.backLink) {
                // Đặt href của link quay lại về trang gốc (donation.html hoặc premium.html)
                backLink.href = transactionData.backLink;
            }
        } catch (e) {
            console.error("Could not parse transaction data on success page:", e);
        }
    }
    
    // Dọn dẹp sessionStorage sau khi đã sử dụng xong
    // Điều này ngăn người dùng refresh trang và thấy thông tin cũ
    sessionStorage.removeItem('currentTransaction');


    // =============================================================
    // II. LOGIC CHO SLIDER "CÓ THỂ BẠN QUAN TÂM" (MERGED VERSION)
    // =============================================================
    const interestedContainer = document.getElementById('interested-container');
    const interestPrevBtn = document.getElementById('interest-prev-btn');
    const interestNextBtn = document.getElementById('interest-next-btn');

    if (interestedContainer && interestPrevBtn && interestNextBtn) {
        
        // --- START: MERGED CODE ---
        // 1. Define the array of placeholder images.
        const placeholderImages = [
            'assets/images/vet.jpg',
            'assets/images/vet_2.jpg',
            'assets/images/vet_3.jpg'
        ];
        // --- END: MERGED CODE ---

        function renderInterestCards(clinics) {
            if (!clinics || clinics.length === 0) return;

            // --- START: MERGED CODE ---
            // 2. Initialize the counter and helper function for the placeholder cycle.
            let placeholderIndex = 0;
            const getNextPlaceholder = () => {
                const image = placeholderImages[placeholderIndex];
                placeholderIndex = (placeholderIndex + 1) % placeholderImages.length;
                return image;
            };
            // --- END: MERGED CODE ---

            interestedContainer.innerHTML = clinics.map(clinic => {
                // 3. Determine the correct image URL for each card.
                const imageUrl = clinic.image || getNextPlaceholder();
                
                // 4. Return the card's HTML using the chosen URL.
                return `
                    <div class="interest-card" style="background-image: url('${imageUrl}')">
                        <h3>${clinic.name.toUpperCase()}</h3>
                        <p>${clinic.address}</p>
                        <p>Hotline: ${clinic.hotline}</p>
                        <p>${clinic.workingHours}</p>
                        <a href="vets.html" class="btn btn-light">Tới ngay!</a>
                    </div>
                `;
            }).join('');
        }

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

        interestedContainer.addEventListener('scroll', updateInterestArrowState, { passive: true });

        if (typeof vetData !== 'undefined' && vetData.clinics) {
            renderInterestCards(vetData.clinics);
            setTimeout(updateInterestArrowState, 100);
        }
    }
});