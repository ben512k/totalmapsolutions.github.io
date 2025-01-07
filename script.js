// Smooth Scrolling Effect for Internal Links Only (Excludes External Links)
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        // If it's an internal link, handle smooth scrolling
        if (targetId.startsWith("#")) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            const headerOffset = document.querySelector('header').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        // If it's an external link or opens a new tab, default behavior applies.
    });
});

// Form Handling Logic (No Changes Here)
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

// Fix for Loading Hash Links on Page Load
window.addEventListener('load', function () {
    const hash = window.location.hash;
    if (hash.startsWith("#")) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            const headerOffset = document.querySelector('header').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'auto'
            });
        }
    }
});

// ✅ Ensure No Freeze for Portfolio Links
document.querySelectorAll(".portfolio-item a").forEach(link => {
    link.addEventListener("click", function (event) {
        // Allow all external links and links with target="_blank" without interruption
        if (link.getAttribute("target") === "_blank") {
            return; 
        }
        // Prevent default action only if it’s an internal link
        if (link.getAttribute("href").startsWith("#")) {
            event.preventDefault();
        }
    });
});

// ✅ Completely Disable Modal Behavior
document.querySelectorAll(".portfolio-img").forEach(img => {
    img.onclick = null; // Ensure no event listener on image click
});

// Failsafe for Modal (If Still Present)
const closeBtn = document.querySelector(".close-btn");
if (closeBtn) {
    closeBtn.onclick = () => {
        document.getElementById("modal").style.display = "none";
    };
}

window.onclick = (event) => {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
