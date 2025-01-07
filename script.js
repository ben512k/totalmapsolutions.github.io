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

    // Capture form data
    var form = document.getElementById('contact-form');
    var formData = new FormData(form);
    
    // Send the form data using fetch
    fetch('https://form-manager.alecbuetow.workers.dev/', {
        method: 'POST',
        body: formData,
        mode: 'cors'
    })
        .then(response => {
            if (response.ok) {
                console.log('Form submitted successfully.');
                // Hide the form and show the success message
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
    // Reset the form
    document.getElementById('contact-form').reset();

    // Show the form and hide the success message
    document.getElementById('contact-form').style.display = 'block';
    document.getElementById('success-message').style.display = 'none';
}

window.addEventListener('load', function () {
    const hash = window.location.hash;
    if (hash === '#contact') {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            const headerOffset = document.querySelector('header').offsetHeight;
            const additionalOffset = 50; // Adjust this value to your needs

            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'auto'
            });

        }
    }
});

// Get the modal
var modal = document.getElementById("modal");

// Get the image elements
var images = document.querySelectorAll(".portfolio-img");

// Get the modal image and the close button
var modalImg = document.getElementById("modal-img");
var closeBtn = document.getElementsByClassName("close-btn")[0];

// Loop through each image and add an event listener to open the modal
images.forEach(function(image) {
    image.onclick = function() {
        // Set the source of the modal image to the clicked image's data-src
        modal.style.display = "block";
        modalImg.src = this.getAttribute("data-src");
    }
});

// When the user clicks on the close button, close the modal
closeBtn.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside the modal, close it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
