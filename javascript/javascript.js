document.addEventListener('DOMContentLoaded', function () {
    // Form elements
    const form = document.querySelector('#contactForm');
    const nameInput = document.querySelector('#name');
    const surnameInput = document.querySelector('#surname');
    const cellInput = document.querySelector('#cell');
    const emailInput = document.querySelector('#email');
    const noteInput = document.querySelector('#note');
    const submitButton = document.querySelector('#submitButton');

    // Search form handling
    document.querySelector('form[role="search"]').addEventListener('submit', function (event) {
        event.preventDefault();
        const query = this.querySelector('input[name="q"]').value;
        if (query.trim() === '') {
            alert('Please enter a search term.');
            return;
        }
        window.location.href = 'search_results.html?q=' + encodeURIComponent(query);
    });

    // Function to validate email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Function to validate phone number 
    function isValidCell(cell) {
        const re = /^\d{10}$/; // 10 digits
        return re.test(cell);
    }

    // Form submission handler
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Reset error styles
        nameInput.classList.remove('is-invalid');
        surnameInput.classList.remove('is-invalid');
        cellInput.classList.remove('is-invalid');
        emailInput.classList.remove('is-invalid');

        // Validate inputs
        let isValid = true;

        if (nameInput.value.trim() === '') {
            nameInput.classList.add('is-invalid');
            isValid = false;
        }

        if (surnameInput.value.trim() === '') {
            surnameInput.classList.add('is-invalid');
            isValid = false;
        }

        if (!isValidCell(cellInput.value)) {
            cellInput.classList.add('is-invalid');
            isValid = false;
        }

        if (!isValidEmail(emailInput.value)) {
            emailInput.classList.add('is-invalid');
            isValid = false;
        }

        // If all validations pass, submit form or handle it with AJAX
        if (isValid) {
            console.log('Form Submitted:', {
                name: nameInput.value,
                surname: surnameInput.value,
                cell: cellInput.value,
                email: emailInput.value,
                note: noteInput.value
            });

            alert('Form submitted successfully!');
            form.reset();
        } else {
            document.querySelector('.is-invalid').focus();
        }
    });

    // Theme toggle functionality
    function toggleTheme() {
        document.body.classList.toggle('light-mode');

        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    }

    // Apply stored theme preference on load
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
    }

    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

    // Modal functionality
    const modal = document.getElementById('projectModal');
    const closeBtn = modal.querySelector('.close');
    const viewProjectButtons = document.querySelectorAll('.btn-primary');

    // Function to open modal and display images
    function openModal(id) {
        modal.style.display = 'flex'; // Use flex to center the modal

        const modalImages = modal.querySelector('.modal-images');
        modalImages.innerHTML = ''; // Clear previous images

        // Dynamically create and append images
        for (let i = 1; i <= 3; i++) {
            const img = document.createElement('img');
            img.src = `images/project${id}_image${i}.jpg`;
            img.alt = `Project ${id} Image ${i}`;
            img.style.maxWidth = '100%'; // Ensure responsive width
            img.style.maxHeight = '90vh'; // Maintain aspect ratio without exceeding screen height
            modalImages.appendChild(img);
        }
    }

    // Function to close the modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Add event listeners for opening modals
    viewProjectButtons.forEach(button => {
        button.addEventListener('click', function () {
            const id = this.getAttribute('data-id'); // Get the project ID from the button
            openModal(id); // Open modal with project-specific images
        });
    });

    // Close modal when the close button is clicked
    closeBtn.addEventListener('click', closeModal);

    // Close modal if clicked outside of the modal content
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal(); // Close modal when clicking outside the modal content
        }
    });


});
