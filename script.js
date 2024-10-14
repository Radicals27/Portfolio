// Handle hover play/pause functionality
document.querySelectorAll('.thumbnail').forEach(video => {
    video.addEventListener('mouseover', () => {
        video.play();
    });
    video.addEventListener('mouseout', () => {
        video.pause();
        video.currentTime = 0; // Reset the video to the start
    });
});

// Handle modal functionality
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalMedia = document.getElementById('modal-media');
const closeModal = document.querySelector('.close');

// Close the modal when the user clicks the close button
closeModal.onclick = function() {
    modal.style.display = 'none';
    modalMedia.innerHTML = ''; // Clear media content when modal is closed
};

// Close the modal if user clicks outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        modalMedia.innerHTML = ''; // Clear media content when modal is closed
    }
};

// Show modal with project info and media on click
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', () => {
        const projectTitle = item.getAttribute('project-title');
        const projectDescription = item.getAttribute('project-description');
        const projectVideo01 = item.getAttribute('data-video01');
        const projectVideo02 = item.getAttribute('data-video02');
        
        modalTitle.textContent = projectTitle;
        modalDescription.textContent = projectDescription;
        
        // Load the media into the modal
        modalMedia.innerHTML = `
            <video controls>
                <source src="${projectVideo01}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <video controls>
                <source src="${projectVideo02}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
        
        modal.style.display = 'flex'; // Show the modal (with flex to center it)
    });
});