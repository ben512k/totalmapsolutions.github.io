// Smooth Scrolling for Internal Links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = document.querySelector('header').offsetHeight;
            const offsetPosition = targetElement.getBoundingClientRect().top - headerOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Handling Portfolio Item Clicks (Preventing Duplicate Tabs)
document.querySelectorAll('.portfolio-item a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        window.open(link.href, '_blank'); // Open link manually in a new tab
    });
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
