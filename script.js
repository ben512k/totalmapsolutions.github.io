// Smooth Scrolling for Internal Links
function smoothScroll(target) {
    const element = document.querySelector(target);
    const headerHeight = document.querySelector('header').offsetHeight;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const isMobile = window.innerWidth <= 768;
            const offsetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - (isMobile ? headerHeight : 0);

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
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
