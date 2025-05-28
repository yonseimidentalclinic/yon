// script.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('연세미치과 홈페이지 스크립트 로드 완료');

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('header nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }

    // Smooth Scrolling for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            // Ensure it's a valid internal link and not just '#'
            if (targetId.length > 1 && document.querySelector(targetId)) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                const headerOffset = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open after clicking a link
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                }
            }
        });
    });

    // Basic Form Validation for Booking Form
    const bookingForm = document.getElementById('bookingForm');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            let isValid = true;
            const requiredFields = bookingForm.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red'; // Highlight empty required fields
                    // You could add a more sophisticated error message display here
                    console.warn(`Field ${field.name || field.id} is required.`);
                } else {
                    field.style.borderColor = '#ddd'; // Reset border color
                }
            });

            const emailField = bookingForm.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim() && !isValidEmail(emailField.value.trim())) {
                isValid = false;
                emailField.style.borderColor = 'red';
                console.warn('Invalid email format.');
            }

            const phoneField = bookingForm.querySelector('input[type="tel"]');
            if (phoneField && phoneField.value.trim() && !isValidPhoneNumber(phoneField.value.trim())) {
                isValid = false;
                phoneField.style.borderColor = 'red';
                console.warn('Invalid phone number format. Expected format: 010-1234-5678 or 01012345678');
            }

            const privacyCheckbox = bookingForm.querySelector('input[name="privacyAgreement"]');
            if (privacyCheckbox && !privacyCheckbox.checked) {
                isValid = false;
                // Highlight the checkbox or its label area if needed
                console.warn('Privacy agreement must be checked.');
                // You might want to alert the user or display a message near the checkbox
                const privacyLabel = document.querySelector('label[for="privacyAgreement"]');
                if (privacyLabel) {
                    privacyLabel.style.color = 'red';
                }
            }

            if (!isValid) {
                e.preventDefault(); // Prevent form submission if validation fails
                alert('필수 입력 항목을 모두 채우고, 유효한 형식으로 입력해주세요. 개인정보처리방침 동의도 필요합니다.');
            } else {
                // Optional: Provide feedback on successful submission or handle via backend
                // alert('예약 요청이 접수되었습니다. 확인 후 연락드리겠습니다.');
                // For now, we'll let it submit. Actual booking logic would be backend.
                console.log('Form submitted successfully (frontend validation passed).');
            }
        });

        // Reset border color on input
        bookingForm.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '#ddd';
                if (this.name === 'privacyAgreement') {
                    const privacyLabel = document.querySelector('label[for="privacyAgreement"]');
                    if (privacyLabel) {
                         privacyLabel.style.color = ''; // Reset label color
                    }
                }
            });
        });
    }

    function isValidEmail(email) {
        // Basic email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhoneNumber(phone) {
        // Matches 010-1234-5678 or 01012345678
        const phoneRegex = /^(\d{3}-?\d{3,4}-?\d{4})$/;
        return phoneRegex.test(phone);
    }

    // Active navigation link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('header nav ul li a');
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 0;

    function changeNavOnScroll() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50; // Add some offset
            if (window.pageYOffset >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        // Special case for top of the page (hero section might not be a <section>)
        if (window.pageYOffset < (document.getElementById('hero') ? document.getElementById('hero').offsetHeight - headerHeight - 50 : 300)) {
            const homeLink = document.querySelector('header nav ul li a[href="#home"]') || document.querySelector('header nav ul li a[href="index.html#home"]');
            if (homeLink) {
                 navLinks.forEach(link => link.classList.remove('active')); // Remove active from all
                 homeLink.classList.add('active');
            }
        }
    }

    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', changeNavOnScroll);
        changeNavOnScroll(); // Initial check
    }

    console.log('연세미치과 홈페이지 스크립트 로드 완료');
});
