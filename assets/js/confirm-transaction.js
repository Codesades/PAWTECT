document.addEventListener('DOMContentLoaded', () => {

    // =============================================================
    // I. LOGIC ĐỂ HIỂN THỊ CHI TIẾT GIAO DỊCH
    // =============================================================
    const itemsListContainer = document.getElementById('transaction-items-list');
    const totalAmountElement = document.getElementById('total-amount');
    const confirmButton = document.getElementById('confirm-payment-btn');
    const backLink = document.querySelector('.back-link');

    const transactionDataJSON = sessionStorage.getItem('currentTransaction');

    function displayErrorState() {
        itemsListContainer.innerHTML = '<div class="item-row empty-state"><span>Không có giao dịch nào được chọn</span></div>';
        totalAmountElement.textContent = '0 VND';
        if (confirmButton) confirmButton.disabled = true;
        if (backLink) backLink.href = 'home.html';
    }

    if (transactionDataJSON && itemsListContainer && totalAmountElement && backLink) {
        try {
            const transactionData = JSON.parse(transactionDataJSON);
            
            itemsListContainer.innerHTML = '';

            if (transactionData.items && transactionData.items.length > 0) {
                transactionData.items.forEach(item => {
                    const itemRow = document.createElement('div');
                    itemRow.className = 'item-row';
                    itemRow.innerHTML = `
                        <span>${item.name}</span>
                        <strong>${item.amount}</strong>
                    `;
                    itemsListContainer.appendChild(itemRow);
                });
                totalAmountElement.textContent = transactionData.totalAmount || '0 VND';
                if (confirmButton) confirmButton.disabled = false;
            } else {
                displayErrorState();
            }

            if (transactionData.backLink) {
                backLink.href = transactionData.backLink;
            }

        } catch (e) {
            console.error("Error parsing transaction data:", e);
            displayErrorState();
        }
    } else {
        displayErrorState();
    }
    
    if (confirmButton) {
        confirmButton.addEventListener('click', () => {
            window.location.href = 'transaction-complete.html';
        });
    }

    // =============================================================
    // II. LOGIC CHO SLIDER "CÓ THỂ BẠN QUAN TÂM" (MERGED VERSION)
    // =============================================================
    const interestedContainer = document.getElementById('interested-container');
    const interestPrevBtn = document.getElementById('interest-prev-btn');
    const interestNextBtn = document.getElementById('interest-next-btn');

    if (interestedContainer && interestPrevBtn && interestNextBtn) {

        // --- START: MERGED CODE ---
        // 1. Define your array of placeholder images.
        // Ensure 'vet2.jpg' and 'vet3.jpg' exist in your assets/images folder.
        const placeholderImages = [
            'assets/images/vet.jpg',
            'assets/images/vet_2.jpg',
            'assets/images/vet_3.jpg'
        ];
        // --- END: MERGED CODE ---

        function renderInterestCards(clinics) {
            if (!clinics || clinics.length === 0) return;

            // --- START: MERGED CODE ---
            // 2. Initialize the counter and helper function inside here
            //    to reset the placeholder cycle every time the cards are rendered.
            let placeholderIndex = 0;
            const getNextPlaceholder = () => {
                const image = placeholderImages[placeholderIndex];
                placeholderIndex = (placeholderIndex + 1) % placeholderImages.length;
                return image;
            };
            // --- END: MERGED CODE ---

            interestedContainer.innerHTML = clinics.map(clinic => {
                // --- START: MERGED CODE ---
                // 3. Determine the correct image URL for each card inside the map.
                const imageUrl = clinic.image || getNextPlaceholder();
                // --- END: MERGED CODE ---
                
                // 4. Return the card's HTML with the dynamically chosen image URL.
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
        
        // --- The rest of the slider logic remains unchanged ---

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
        } else {
            console.error('Không tìm thấy dữ liệu vetData.');
        }
    }
});