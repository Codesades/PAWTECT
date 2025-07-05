document.addEventListener('DOMContentLoaded', () => {

    const clinicNameElement = document.getElementById('clinic-name-placeholder');
    const daySelect = document.getElementById('select-day');
    const monthSelect = document.getElementById('select-month');
    const timeSelect = document.getElementById('select-time');
    const bookingForm = document.getElementById('booking-form');
    const fullNameInput = document.getElementById('full-name');
    const phoneInput = document.getElementById('phone-number');

    // --- 1. Lấy tên phòng khám từ URL và hiển thị ---
    if (clinicNameElement) {
        const urlParams = new URLSearchParams(window.location.search);
        const clinicName = urlParams.get('clinic');
        clinicNameElement.textContent = clinicName ? decodeURIComponent(clinicName) : 'Đặt lịch tại Phòng khám';
    }

    // --- 2. Điền dữ liệu cho các ô select và xử lý logic ngày/tháng ---
    if (daySelect && monthSelect && timeSelect) {
        
        // Hàm cập nhật số ngày trong tháng
        function updateDaysInMonth() {
            const month = parseInt(monthSelect.value);
            const year = new Date().getFullYear(); // Giả sử năm hiện tại
            let daysInMonth = 31;

            if (month === 4 || month === 6 || month === 9 || month === 11) {
                daysInMonth = 30;
            } else if (month === 2) {
                // Kiểm tra năm nhuận
                const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
                daysInMonth = isLeap ? 29 : 28;
            }

            const currentDay = daySelect.value; // Lưu lại ngày đang chọn
            daySelect.innerHTML = '<option value="" disabled selected>Chọn ngày</option>'; // Xóa và thêm lại option mặc định

            for (let i = 1; i <= daysInMonth; i++) {
                const option = new Option(i, i);
                daySelect.add(option);
            }
            
            // Nếu ngày đang chọn vẫn hợp lệ trong tháng mới, chọn lại nó
            if (currentDay && currentDay <= daysInMonth) {
                daySelect.value = currentDay;
            }
        }

        // Điền dữ liệu ban đầu
        // Tháng
        for (let i = 1; i <= 12; i++) {
            const option = new Option(`Tháng ${i}`, i);
            monthSelect.add(option);
        }

        // Giờ
        for (let hour = 8; hour <= 17; hour++) {
            for (let min of ['00', '30']) {
                if (hour === 17 && min === '30') continue;
                const timeString = `${String(hour).padStart(2, '0')}:${min}`;
                const option = new Option(timeString, timeString);
                timeSelect.add(option);
            }
        }

        // Gắn sự kiện để cập nhật ngày khi tháng thay đổi
        monthSelect.addEventListener('change', updateDaysInMonth);
        // Cập nhật ngày lần đầu (khi chưa chọn tháng)
        updateDaysInMonth();
    }
    
    // --- 3. Xử lý sự kiện gửi Form với VALIDATION ---
    if (bookingForm) {
        bookingForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Luôn ngăn chặn gửi form trước

            // --- VALIDATION LOGIC ---
            const fullName = fullNameInput.value.trim();
            const phone = phoneInput.value.trim();
            let isValid = true;
            let errorMessage = '';

            // Kiểm tra tên: Chỉ chứa chữ cái và khoảng trắng
            if (!/^[a-zA-Z\sÀ-ỹ]+$/.test(fullName)) {
                errorMessage += '- Họ và Tên chỉ được chứa chữ cái.\n';
                isValid = false;
            }
            
            // Kiểm tra SĐT: Chỉ chứa số và phải đủ 10 chữ số
            if (!/^\d{10}$/.test(phone)) {
                errorMessage += '- Số điện thoại phải là 10 chữ số.\n';
                isValid = false;
            }
            
            // Kiểm tra các ô select
            if (!daySelect.value || !monthSelect.value || !timeSelect.value) {
                errorMessage += '- Vui lòng chọn đầy đủ ngày, tháng, và giờ đặt lịch.';
                isValid = false;
            }
            
            // Nếu form không hợp lệ, hiển thị lỗi và dừng lại
            if (!isValid) {
                alert('Vui lòng sửa các lỗi sau:\n\n' + errorMessage);
                return;
            }

            // --- Nếu form hợp lệ, tiếp tục xử lý ---
            const formData = {
                clinic: clinicNameElement.textContent,
                name: fullName,
                phone: phone,
                day: daySelect.value,
                month: monthSelect.value,
                time: timeSelect.value
            };
            
            console.log('Booking submitted:', formData);

            // Chuyển hướng đến trang thành công
            window.location.href = 'book-successful.html';
        });
    }
});