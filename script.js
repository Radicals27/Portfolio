import { projects } from './projects.js';

// Define the openModal function
function openModal(projectIndex) {
    const project = projects[projectIndex];

    // Set the title and description
    document.getElementById("modal-title").innerText = project.title;
    document.getElementById("modal-description").innerText = project.description;

    // Load videos into the modal
    const modalMedia = document.getElementById("modal-media");
    modalMedia.innerHTML = `
        <video controls>
            <source src="${project.video01}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <video controls>
            <source src="${project.video02}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
    `;

    // Load learnings into the modal
    const modalLearnings = document.getElementById("modal-learnings");
    modalLearnings.innerHTML = ""; // Clear existing learnings
    project.learnings.forEach(learning => {
        const li = document.createElement("li");
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