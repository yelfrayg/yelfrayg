document.addEventListener("DOMContentLoaded", async function () {
    const projectContainer = document.querySelector(".projects-container");
    console.log("Loading projects...");
    try {
        const req = await fetch("projects.json");
        const res = await req.json();
        console.log("Projects loaded:", res.projects);
        res.projects.forEach((project) => {
            const projectElement = document.createElement("div");
            projectElement.classList.add("project");
            projectElement.innerHTML = `
                <div class="p-left">
                    <h2 class="project-title">${project.title}</h2>
                    <ul class="keywords">
                        ${project.year}
                        ${project.technologies.map(t => `<li class="skill">${t}</li>`).join('')}
                    </ul>
                </div>
                <div class="p-right">
                    <p class="description">
                        ${project.description}
                    </p>
                </div>
                <div class="p-middle img-list-wrapper">
                    <ul class="img-list">
                        ${project.images.map(img => `
                            <li class="img-item" data-img="${img}">
                                <div class="img-overlay">
                                    <div class="overlay-text">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M120-120v-320h80v184l504-504H520v-80h320v320h-80v-184L256-200h184v80H120Z"/></svg>
                                    </div>
                                </div>
                                <img class="project-img"
                                    src="${img}"
                                    alt="Bild von ${project.title}"
                                />
                            </li>
                        `)}
                    </ul>
                </div>
                <div class="project-links">
                    ${project.links.repo ? `
                        <div class="link-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
                            <a href="${project.links.repo}" class="link">Github</a>
                        </div>
                        ` : ''
                }
                    ${project.links.website ? `
                        <div class="link-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
                            <a href="${project.links.website}" class="link">Website</a>
                        </div>
                        ` : ''
                }                            
                </div>
            `;
            projectContainer.appendChild(projectElement);
        })
        toggleFullView();
    } catch (error) {
        console.log(error);
    }
})

function toggleFullView() {
    const projectElements = document.querySelectorAll(".img-item");
    const fullScreenSection = document.querySelector(".full-screen");
    const fullScreenImageSrc = document.getElementById("full-screen-image");

    projectElements.forEach((img) => {
        img.addEventListener("click", () => {
            const dataImgAttribute = img.getAttribute("data-img");
            console.log("Image clicked:", dataImgAttribute);
            fullScreenImageSrc.src = dataImgAttribute;
            fullScreenSection.classList.add("active");

            // Scrollen im Hintergrund verhindern
            document.body.style.overflow = "hidden";

            if (fullScreenSection.classList.contains("active")) {
                console.log("Full screen section is active, adding click listener to close...");
                fullScreenSection.addEventListener("click", () => {
                    console.log("Full screen section clicked, closing...");
                    fullScreenSection.classList.remove("active");
                    document.body.style.overflow = "auto"; // Scrollen wieder aktivieren

                })

                document.addEventListener("keydown", (event) => {
                    if (event.key === "Escape") {
                        console.log("Escape key pressed, closing full screen section...");
                        fullScreenSection.classList.remove("active");
                        document.body.style.overflow = "auto"; // Scrollen wieder aktivieren
                    }
                })
            }
        })
    })
}