// Smooth Scrolling Effect for Header Links with Offset Handling
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const headerOffset = document.querySelector('header').offsetHeight;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior

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

window.addEventListener('load', function () {
    const hash = window.location.hash;
    if (hash === '#contact') {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            const headerOffset = document.querySelector('header').offsetHeight;
            const additionalOffset = 50;

            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'auto'
            });
        }
    }
});

// Completely remove modal behavior for images inside links with target="_blank"
document.querySelectorAll(".portfolio-item a").forEach(link => {
    link.addEventListener("click", function (event) {
        if (link.getAttribute("target") === "_blank") {
            return; // Open link in new tab as intended, no modal popup
        }
        event.preventDefault(); // Prevent default only if no new tab specified
    });
});

// Disable modal functionality entirely for portfolio images
document.querySelectorAll(".portfolio-img").forEach(img => {
    img.onclick = null; // Remove any existing click event on images
});

// Close the modal when clicking the close button (if modal is ever used elsewhere)
const closeBtn = document.querySelector(".close-btn");
if (closeBtn) {
    closeBtn.onclick = function () {
        document.getElementById("modal").style.display = "none";
    };
}

// Close modal when clicking outside the image (failsafe)
window.onclick = function (event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
