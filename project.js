document.addEventListener("DOMContentLoaded", async function () {
    const projectContainer = document.querySelector(".project-container");
    try {
        const req = await fetch("projects.json");
        const res = await req.json();
        res.projects.forEach((project) => {
            const projectCard = document.createElement("div");
            projectCard.classList.add("project-card");
            projectCard.innerHTML = `
                        <div class="img-container">
                            <img
                                src="${project.image}"
                                alt="${project.title} Image"
                            />
                        </div>
                        <div class="project-info">
                            <div class="project-text">
                                <h3 class="project-title">${project.title}</h3>
                                <p class="project-description">
                                    ${project.description}
                                </p>
                            </div>
                            <div class="project-links">
                                ${project.links.repo ? `<a href="${project.links.repo}">Zum Repo!</a>` : ""}
                                ${project.links.website ? `<a href="${project.links.website}">Zur Website!</a>` : ""}
                            </div>
                        </div>
            `
            projectContainer.appendChild(projectCard);
        })
    } catch (error) {
        console.log(error);
    }
})