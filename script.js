import { projects } from './projects.js';

document.addEventListener("DOMContentLoaded", () => {
    const projectContainer = document.getElementById("project-container");

    // Loop through the projects array and create the HTML
    projects.forEach((project, index) => {
        const projectDiv = document.createElement("div");
        projectDiv.className = "project";
        projectDiv.onclick = () => openModal(index); // Ensure openModal is defined

        projectDiv.innerHTML = `
            <video class="thumbnail" muted width="100%" preload="none" poster="${project.thumbnail}">
                <source src="${project.videos[0]}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;

        projectContainer.appendChild(projectDiv);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Select all thumbnail videos
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumbnail => {
        // Add event listeners for mouseenter and mouseleave
        thumbnail.addEventListener('mouseenter', function () {
            this.play(); // Play the video on hover
        });

        thumbnail.addEventListener('mouseleave', function () {
            this.pause(); // Pause the video when not hovered
            this.currentTime = 0; // Optionally reset the video to the beginning
        });
    });
});

// Define the openModal function
function openModal(projectIndex) {
    const project = projects[projectIndex];

    // Set the title and description
    document.getElementById("modal-title").innerText = project.title;
    document.getElementById("modal-description").innerText = project.description;

    // Load videos into the modal
    const modalMedia = document.getElementById("modal-media");
    modalMedia.innerHTML = '';

    // Loop through the videos array and add video elements dynamically
    project.videos.forEach((videoSrc) => {
        const videoElement = `
            <video controls>
                <source src="${videoSrc}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
        modalMedia.innerHTML += videoElement; // Append each video element
    });

    // Load learnings into the modal
    const modalLearnings = document.getElementById("modal-learnings");
    modalLearnings.innerHTML = ""; // Clear existing learnings
    project.learnings.forEach(learning => {
        const li = document.createElement("li");
        li.className = "learnings-list-element"
        li.innerText = learning;
        modalLearnings.appendChild(li);
    });

    // Show the modal
    document.getElementById("modal").style.display = "block";
}

// Attach openModal to the window object for global access
window.openModal = openModal;

// Add event listener for closing the modal
document.getElementById("close-modal").addEventListener("click", function() {
    document.getElementById("modal").style.display = "none"; // Hide the modal
});