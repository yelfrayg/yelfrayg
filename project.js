document.addEventListener("DOMContentLoaded", async function () {
    const projectContainer = document.querySelector(".project-container");
    const fallbackImage = "./img/shop-temp.jpg";
    try {
        const req = await fetch("projects.json");
        const res = await req.json();
        res.projects.forEach((project) => {
            const projectCard = document.createElement("div");
            projectCard.classList.add("project-card");
            projectCard.id = `project-${res.projects.indexOf(project)}`;
            const projectImage = project.image || fallbackImage;
            projectCard.innerHTML = `
                        <div class="img-container">
                            <img
                                src="${projectImage}"
                                alt="${project.title}"
                                onerror="this.onerror=null;this.src='${fallbackImage}';"
                            />
                        </div>
                        <div class="project-info">
                            <div class="project-text">
                                <h3 class="project-title">${project.title} <span class = "project-year">// ${project.year}</span></h3>
                                <p class="project-description">
                                    ${project.description}
                                </p>
                            </div>
                            <div class="project-links">
                                ${project.links.repo ? `<a class ="repo" href="${project.links.repo}">View Repo</a>` : ""}
                                ${project.links.website ? `<a class="website" href="${project.links.website}">View Website</a>` : ""}
                            </div>
                        </div>
            `
            projectContainer.appendChild(projectCard);
        })

        const triggerEvent = new Event("projectsLoaded");
        document.dispatchEvent(triggerEvent);
    } catch (error) {
        console.log(error);
    }
})