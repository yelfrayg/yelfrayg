document.addEventListener("DOMContentLoaded", () => {
    const projectContainer = document.querySelector(".project-container");

    fetch("./projects.json")
        .then((response) => response.json())
        .then((data) => {
            const collectProjects = data.projects;
            let counter = 0;
            collectProjects.forEach((project) => {
                counter++

                const projectElement = document.createElement("div");
                // projectElement.href = project.link;
                projectElement.classList.add("project");
                projectElement.style.transform = `rotate(${Math.floor(Math.random(0, 1) * 11) - 3}deg)`;
                projectElement.innerHTML = `
                    <p class="p-number">${counter}</p>
                    <section class="p-section">
                        <div class="p-img-wrapper">
                            <img
                                src="${project.image}"
                                alt="Inhalt wird hier beschrieben."
                                class="p-img"
                            />
                        </div>
                        <div class="text-container">
                            <h2 class="p-heading">${project.title}</h2>
                            <p class="p-text">${project.description}</p>
                            <ul class="p-tech-stack">
                                ${project.technologies.map(tech => `<li class="p-tech">${tech}</li>`).join('')}
                            </ul>
                        </div>
                    </section>
                `;
                projectContainer.appendChild(projectElement);
            });
                    cardToggle()        

        })
        .catch((error) => console.error("Error fetching projects:", error));
});

function cardToggle(){
    const allProjects = document.querySelectorAll(".project");

    allProjects.forEach((project) => {
        project.addEventListener("click", () => {
            project.classList.toggle("full");
        });
    });
}
    
