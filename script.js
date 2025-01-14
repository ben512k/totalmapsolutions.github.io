function smoothScroll(target) {
    const element = document.querySelector(target);
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
    const isMobile = window.innerWidth <= 768; // Adjust this breakpoint as needed
    
    let offsetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    
    // Adjust offset for mobile devices
    if (isMobile) {
        offsetPosition -= headerHeight;
    }

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        smoothScroll(this.getAttribute('href'));
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
        setTimeout(() => {
            smoothScroll(hash);
        }, 100);
    }
});
