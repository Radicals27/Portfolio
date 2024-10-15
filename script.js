import { projects } from './projects.js';

document.addEventListener("DOMContentLoaded", () => {
    const projectContainer = document.getElementById("project-container");

    // Loop through the projects array and create the HTML
    projects.forEach((project, index) => {
        const projectDiv = document.createElement("div");
        projectDiv.className = "project";
        projectDiv.onclick = () => openModal(index); // Ensure openModal is defined

        projectDiv.innerHTML = `
            <video muted width="100%">
                <source src="${project.thumbnail}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;

        projectContainer.appendChild(projectDiv);
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