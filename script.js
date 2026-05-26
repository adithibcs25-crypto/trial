document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the traditional page reload

    const form = event.target;
    const status = document.getElementById('form-status');
    const data = new FormData(form);

    // Provide immediate UI feedback
    status.innerHTML = "Sending...";
    status.style.color = "#38bdf8";

    // Submit data via AJAX/Fetch
    fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "Thanks! Your message has been sent successfully.";
            status.style.color = "#10b981"; // Success Green
            form.reset(); // Clear the form fields
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.innerHTML = "Oops! There was a problem submitting your form.";
                }
                status.style.color = "#ef4444"; // Error Red
            })
        }
    }).catch(error => {
        status.innerHTML = "Oops! There was a network problem. Please try again.";
        status.style.color = "#ef4444"; // Error Red
    });
});