/**
 * Portfolio Website - Core Interactivity Script
 * Handles asynchronous contact form submission to a custom Node.js backend
 */

document.getElementById('contact-form').addEventListener('submit', function(event) {
    // 1. Prevent the default browser behavior (page reload)
    event.preventDefault();

    const form = event.target;
    const status = document.getElementById('form-status');
    
    // 2. Extract values directly from the DOM input elements
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        message: document.getElementById('message').value.trim()
    };

    // 3. Simple UI feedback during processing
    status.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    status.style.color = "#38bdf8";

    // 4. Initiate asynchronous POST request to your backend server
    fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(async (response) => {
        const result = await response.json();
        
        if (response.ok) {
            // Success: clear inputs and inform user
            status.innerHTML = '<i class="fas fa-check-circle"></i> Thanks! Your message has been sent successfully.';
            status.style.color = "#10b981"; // Success Green
            form.reset();
        } else {
            // Server-side error validation message
            status.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${result.error || "Oops! Something went wrong."}`;
            status.style.color = "#ef4444"; // Error Red
        }
    })
    .catch((error) => {
        // Network-side error (e.g. backend server is offline)
        console.error('Fetch Error:', error);
        status.innerHTML = '<i class="fas fa-wifi"></i> Network error. Please ensure your backend server is running.';
        status.style.color = "#ef4444"; // Error Red
    });
});

/* ==========================================
   Optional: Smooth Scrolling for Navigation Links
   ========================================== */
document.querySelectorAll('.nav-links a, .btn').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Only intercept if it's an internal ID link
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});