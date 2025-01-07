// Smooth Scrolling for Internal Links Only
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); 
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const headerOffset = document.querySelector('header').offsetHeight;
        const offsetPosition = targetElement.getBoundingClientRect().top - headerOffset;

        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// ✅ New Tab Links (No Interference)
document.querySelectorAll('.portfolio-item a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function (e) {
        // Prevent interfering with default behavior for external links
        e.stopPropagation(); 
        // Let the default behavior (new tab) happen naturally
    });
});

// ✅ Completely Remove Modal Image Behavior
document.querySelectorAll(".portfolio-img").forEach(img => {
    img.onclick = null; // Ensure no modal interference
});

// Form Handling (No Changes Needed)
function handleFormSubmit(event) {
    event.preventDefault();
    var form = document.getElementById('contact-form');
    var formData = new FormData(form);
    
    fetch('https://form-manager.alecbuetow.workers.dev/', {
        method: 'POST',
        body: formData,
        mode: 'cors'
    })
    .then(response => {
        if (response.ok) {
            console.log('Form submitted successfully.');
            document.getElementById('contact-form').style.display = 'none';
            document.getElementById('success-message').style.display = 'block';
        } else {
            console.error('Form submission failed.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function resetForm() {
    document.getElementById('contact-form').reset();
    document.getElementById('contact-form').style.display = 'block';
    document.getElementById('success-message').style.display = 'none';
}

// Hash Navigation Fix (For Page Load)
window.addEventListener('load', function () {
    const hash = window.location.hash;
    if (hash.startsWith("#")) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            const headerOffset = document.querySelector('header').offsetHeight;
            const offsetPosition = targetElement.getBoundingClientRect().top - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'auto'
            });
        }
    }
});
