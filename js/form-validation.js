// Form Validation for Contact Form
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
});

function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Real-time validation
        const formFields = contactForm.querySelectorAll('input, textarea, select');
        formFields.forEach(field => {
            field.addEventListener('blur', validateField);
            field.addEventListener('input', clearFieldError);
        });
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const isValid = validateForm(form);
    
    if (isValid) {
        // Simulate form submission
        simulateFormSubmission(form);
    }
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    // Clear previous errors
    clearAllErrors(form);
    
    // Validate each required field
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    // Validate email format if present
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
        if (!isValidEmail(emailField.value)) {
            showFieldError(emailField, 'Please enter a valid email address');
            isValid = false;
        }
    }
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous error
    clearFieldError(e);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'This field is required';
        isValid = false;
    }
    
    // Email validation
    if (field.type === 'email' && value && !isValidEmail(value)) {
        errorMessage = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Minimum length validation for message
    if (field.name === 'message' && value.length < 10) {
        errorMessage = 'Message must be at least 10 characters long';
        isValid = false;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    const errorId = `${field.id}-error`;
    let errorElement = document.getElementById(errorId);
    
    if (!errorElement) {
        errorElement = document.createElement('span');
        errorElement.id = errorId;
        errorElement.className = 'error-message';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    field.setAttribute('aria-invalid', 'true');
    field.classList.add('error');
}

function clearFieldError(e) {
    const field = e.target;
    const errorId = `${field.id}-error`;
    const errorElement = document.getElementById(errorId);
    
    if (errorElement) {
        errorElement.textContent = '';
    }
    
    field.removeAttribute('aria-invalid');
    field.classList.remove('error');
}

function clearAllErrors(form) {
    const errorMessages = form.querySelectorAll('.error-message');
    const errorFields = form.querySelectorAll('.error');
    
    errorMessages.forEach(error => error.textContent = '');
    errorFields.forEach(field => {
        field.removeAttribute('aria-invalid');
        field.classList.remove('error');
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function simulateFormSubmission(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        const successMessage = document.getElementById('form-success');
        form.classList.add('hidden');
        successMessage.classList.remove('hidden');
        
        // Reset form
        form.reset();
        
        // Reset button after a delay
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 3000);
    }, 2000);
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        validateField,
        isValidEmail,
        showFieldError,
        clearFieldError
    };
}