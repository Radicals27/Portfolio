import { projects } from './projects.js';

let currentProjectIndex = 0; // Track the currently opened project index

document.addEventListener("DOMContentLoaded", () => {
    const projectContainer = document.getElementById("project-container");

    // Loop through the projects array and create the HTML
    projects.forEach((project, index) => {
        const projectDiv = document.createElement("div");
        projectDiv.className = "project";
        projectDiv.onclick = () => openModal(index); // Ensure openModal is defined

        if(project.videos != null) {
            projectDiv.innerHTML = `
            <video class="thumbnail" muted width="100%" preload="none" poster="${project.thumbnail}">
                <source src="${project.videos[0]}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            `;
        }
        else {
            projectDiv.innerHTML = `
            <img class="thumbnail" src="${project.thumbnail}"></img>
            `;
        }

        projectContainer.appendChild(projectDiv);
    });
});

document.addEventListener("DOMContentLoaded", function () {

    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumbnail => {
        if (thumbnail.tagName.toLowerCase() === 'video') {
            thumbnail.addEventListener('mouseenter', function () {
                this.play(); // Play the video on hover
            });

            thumbnail.addEventListener('mouseleave', function () {
                this.pause(); // Pause the video when not hovered
                this.currentTime = 0; // Optionally reset the video to the beginning
            });
        }
    });
});

// Function to handle left arrow click
document.getElementById("prev-project").addEventListener("click", function () {
    if (currentProjectIndex > 0) {
        openModal(currentProjectIndex - 1);
    }
});

// Function to handle right arrow click
document.getElementById("next-project").addEventListener("click", function () {
    if (currentProjectIndex < projects.length - 1) {
        openModal(currentProjectIndex + 1);
    }
});

// Define the openModal function
function openModal(projectIndex) {
    currentProjectIndex = projectIndex;

    const project = projects[projectIndex];

    // Set the title and description
    document.getElementById("modal-title").innerText = project.title;
    document.getElementById("modal-description").innerText = project.description;

    // Load videos into the modal
    const modalMedia = document.getElementById("modal-media");
    modalMedia.innerHTML = '';

    if(project.videos != null) {
        project.videos.forEach((videoSrc) => {
            const videoElement = `
                <video controls>
                    <source src="${videoSrc}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
            modalMedia.innerHTML += videoElement; // Append each video element
        });
    }  

    // Load learnings into the modal
    const modalLearnings = document.getElementById("modal-learnings");
    modalLearnings.innerHTML = ""; // Clear existing learnings
    project.learnings.forEach(learning => {
        const li = document.createElement("li");
        li.className = "learnings-list-element"
        li.innerText = learning;
        modalLearnings.appendChild(li);
    });

    if(project.images != null) {
        project.images.forEach((image) => {
            const imageElement = `
                <img class="modal-image" src="${image}"></img>
            `;
            modalMedia.innerHTML += imageElement; // Append each image
        });
    }

    // Show the modal
    document.getElementById("modal").style.display = "block";
}

// Function to handle keydown event for navigating between projects
function handleKeydown(event) {
    if (event.key === "ArrowLeft") {
        // Go to the previous project if not at the start
        if (currentProjectIndex > 0) {
            openModal(currentProjectIndex - 1);
        }
    } else if (event.key === "ArrowRight") {
        // Go to the next project if not at the end
        if (currentProjectIndex < projects.length - 1) {
            openModal(currentProjectIndex + 1);
        }
    }
}

document.addEventListener("keydown", handleKeydown);

// Attach openModal to the window object for global access
window.openModal = openModal;

// Add event listener for closing the modal
document.getElementById("close-modal").addEventListener("click", function() {
    document.getElementById("modal").style.display = "none"; // Hide the modal
});