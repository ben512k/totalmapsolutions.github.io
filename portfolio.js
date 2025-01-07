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
