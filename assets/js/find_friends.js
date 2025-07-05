document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const loadMoreBtn = document.getElementById('load-more-btn');
    const petGrid = document.getElementById('pet-grid');
    const modal = document.getElementById('pet-modal');
    const modalOverlay = document.getElementById('pet-modal-overlay');
    const closeBtn = document.getElementById('modal-close-btn');
    const modalImage = document.getElementById('modal-pet-image');
    const modalName = document.getElementById('modal-pet-name');
    const modalDetails = document.getElementById('modal-pet-details');

    if (!loadMoreBtn || !petGrid || !modal || !modalOverlay || !closeBtn) {
        return;
    }

    // --- Data for "Load More" ---
    const additionalPets = [
        { name: "Rocky", personality: "Thích chạy nhảy, rất trung thành", likes: "Khúc xương gặm", imageUrl: "assets/images/CoCo.jpg" },
        { name: "Luna", personality: "Một tiểu thư kiêu kỳ", likes: "Ngủ trên sofa", imageUrl: "assets/images/Luna.jpg" },
        { name: "Buddy", personality: "Thân thiện với mọi người", likes: "Được xoa bụng", imageUrl: "assets/images/Gau.jpg" },
        { name: "Daisy", personality: "Nhẹ nhàng và tình cảm", likes: "Đi dạo công viên", imageUrl: "assets/images/Anh_Cho.jpg" }
    ];
    let currentPetIndex = 0;

    // --- Functions ---
    function createPetCard(pet) {
        const card = document.createElement('div');
        card.className = 'pet-card';
        const imageElementHTML = pet.imageUrl 
            ? `<img src="${pet.imageUrl}" alt="Ảnh của ${pet.name}">`
            : `<div class="pet-image-placeholder"></div>`;

        card.innerHTML = `
            ${imageElementHTML}
            <div class="pet-info">
                <span class="pet-name">${pet.name}</span>
                <div class="pet-details">
                    <p><strong>Tính cách:</strong> ${pet.personality}</p>
                    <p><strong>Sở thích:</strong> ${pet.likes}</p>
                </div>
            </div>
        `;
        return card;
    }

    function loadPets() {
        const petsToLoad = 2;
        for (let i = 0; i < petsToLoad; i++) {
            if (currentPetIndex >= additionalPets.length) {
                loadMoreBtn.style.display = 'none';
                return;
            }
            const petData = additionalPets[currentPetIndex];
            const newPetCard = createPetCard(petData);
            petGrid.appendChild(newPetCard);
            currentPetIndex++;
        }
    }

    function openModal(cardElement) {
        // Extract data from the clicked card
        const petImageElement = cardElement.querySelector('img');
        const petName = cardElement.querySelector('.pet-name').textContent;
        const petDetailsHTML = cardElement.querySelector('.pet-details').innerHTML;

        // Populate modal with data
        if (petImageElement) {
            modalImage.innerHTML = `<img src="${petImageElement.src}" alt="${petName}">`;
        } else {
            // Re-use the placeholder style if no image exists
            modalImage.innerHTML = `<div class="pet-image-placeholder"></div>`;
        }
        modalName.textContent = petName;
        modalDetails.innerHTML = petDetailsHTML;

        // Show the modal
        modal.classList.add('active');
        modalOverlay.classList.add('active');
    }

    function closeModal() {
        modal.classList.remove('active');
        modalOverlay.classList.remove('active');
    }

    // --- Event Listeners ---
    loadMoreBtn.addEventListener('click', loadPets);

    // Event delegation for opening the modal
    petGrid.addEventListener('click', (event) => {
        const card = event.target.closest('.pet-card');
        if (card) {
            openModal(card);
        }
    });

    // Listeners for closing the modal
    closeBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

});