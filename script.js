import { projects } from './projects.js';

let currentProjectIndex = 0; // Track the currently opened project index

// At the top of the file, add these variables to track projects by category
let currentCategory = '';
let categorizedProjects = {
    unity: [],
    javascript: [],
    dotnet: [],
    rails: []
};

// Helper function to create project elements
function createProjectElements(projects, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    projects.forEach((project, index) => {
        const projectDiv = document.createElement("div");
        projectDiv.className = "project";
        projectDiv.onclick = () => openModal(project.category, index); // Pass category and index

        if(project.videos != null) {
            projectDiv.innerHTML = `
            <video class="thumbnail" muted width="100%" preload="none" poster="${project.thumbnail}">
                <source src="${project.videos[0]}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            `;
        } else {
            projectDiv.innerHTML = `
            <img class="thumbnail" src="${project.thumbnail}"></img>
            `;
        }

        container.appendChild(projectDiv);
    });
}

// Main initialization
document.addEventListener("DOMContentLoaded", () => {
    // Filter projects by category and store them
    categorizedProjects.unity = projects.filter(p => p.category === 'unity');
    categorizedProjects.javascript = projects.filter(p => p.category === 'javascript');
    categorizedProjects.dotnet = projects.filter(p => p.category === 'dotnet');
    categorizedProjects.rails = projects.filter(p => p.category === 'rails');

    // Create project elements for each category
    createProjectElements(categorizedProjects.unity, 'unity-projects');
    createProjectElements(categorizedProjects.javascript, 'javascript-projects');
    createProjectElements(categorizedProjects.dotnet, 'dotnet-projects');
    createProjectElements(categorizedProjects.rails, 'rails-projects');
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
        openModal(currentCategory, currentProjectIndex - 1);
    }
});

// Function to handle right arrow click
document.getElementById("next-project").addEventListener("click", function () {
    const categoryProjects = categorizedProjects[currentCategory];
    if (currentProjectIndex < categoryProjects.length - 1) {
        openModal(currentCategory, currentProjectIndex + 1);
    }
});

// Define the openModal function
function openModal(category, index) {
    currentCategory = category;
    currentProjectIndex = index;
    const project = categorizedProjects[category][index];

    if (!project) {
        console.error('Project not found:', category, index);
        return;
    }

    // Update navigation buttons visibility
    const prevButton = document.getElementById("prev-project");
    const nextButton = document.getElementById("next-project");
    
    prevButton.style.visibility = index > 0 ? 'visible' : 'hidden';
    nextButton.style.visibility = index < categorizedProjects[category].length - 1 ? 'visible' : 'hidden';

    // Set the title and description
    document.getElementById("modal-title").innerText = project.title;
    document.getElementById("modal-description").innerText = project.description;

    // Load videos into the modal
    const modalMedia = document.getElementById("modal-media");
    modalMedia.innerHTML = '';

    // Check if project has videos before trying to iterate through them
    if (project.videos && project.videos.length > 0) {
        project.videos.forEach((videoSrc) => {
            let videoElement = '';

            if (videoSrc.includes('youtube.com') || videoSrc.includes('youtu.be')) {
                const videoId = getYouTubeID(videoSrc);
                videoElement = `
                    <div class="video-container">
                        <iframe src="https://www.youtube.com/embed/${videoId}" 
                        title="YouTube video player" frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen></iframe>
                    </div>
                `;
            } else {
                videoElement = `
                    <video controls>
                        <source src="${videoSrc}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                `;
            }

            modalMedia.innerHTML += videoElement;
        });
    }

    // Load learnings into the modal
    const modalLearnings = document.getElementById("modal-learnings");
    modalLearnings.innerHTML = ""; // Clear existing learnings
    
    // Check if project has learnings before trying to iterate through them
    if (project.learnings && project.learnings.length > 0) {
        project.learnings.forEach(learning => {
            const li = document.createElement("li");
            li.className = "learnings-list-element"
            li.innerText = learning;
            modalLearnings.appendChild(li);
        });
    }

    // Check if project has images before trying to iterate through them
    if (project.images && project.images.length > 0) {
        project.images.forEach((image) => {
            const imageElement = `
                <img class="modal-image" src="${image}"></img>
            `;
            modalMedia.innerHTML += imageElement;
        });
    }

    // Update click handlers for navigation
    prevButton.onclick = () => {
        if (index > 0) openModal(category, index - 1);
    };
    
    nextButton.onclick = () => {
        if (index < categorizedProjects[category].length - 1) openModal(category, index + 1);
    };

    // Update keyboard navigation
    document.onkeydown = (event) => {
        const categoryProjects = categorizedProjects[category];
        if (event.key === "ArrowLeft") {
            if (index > 0) {
                openModal(category, index - 1);
            }
        } else if (event.key === "ArrowRight") {
            if (index < categoryProjects.length - 1) {
                openModal(category, index + 1);
            }
        }
    };

    // Show the modal
    document.getElementById("modal").style.display = "block";
}

function getYouTubeID(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
}

// Attach openModal to the window object for global access
window.openModal = openModal;

// Add event listener for closing the modal
document.getElementById("close-modal").addEventListener("click", function() {
    document.getElementById("modal").style.display = "none"; // Hide the modal
});