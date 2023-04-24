const filters = document.querySelectorAll(".filter-btn");
const portfolioList = document.querySelector(".portfolio-content-list");

let projects = [];

showProjects(portfolio);

filters.forEach((filterBtn) => {
    filterBtn.addEventListener("click", ()=>{
        let type = filterBtn.getAttribute("id");

        filters.forEach((filter) => {
            filter.classList.remove("active");
        });
        filterBtn.classList.add("active");

        showProjects(getProjects(type));
    });
});

function getProjects(type){
    if(projects.length != 0) { projects = []; }

    if(type === "all") { return portfolio; }
    else{
        portfolio.forEach((project) => {
            if(project.type === type){
                projects.push(project);
            }       
        });
    }
    return projects;
}

function showProjects(arr){
    let countRows = Math.ceil(arr.length);

    portfolioList.innerHTML = "";
    portfolioList.style.gridTemplateRows = `"repeat(${countRows}, 1fr)"`;

    arr.forEach(function(project, index){
        portfolioList.innerHTML += 
        `<li>
            <article class="project-card" data-tags="all, ${project.type}">
                <div class="project-card-image">
                    <img src="${project.imageProject}" alt="Project Image"/>
                </div>
                <div class="project-card-text">
                    <h3 class="project-name">${project.name}</h3>
                    <p class="project-desc">${project.desc}</p>
                </div>
            </article>
        </li>`;

        setTimeout(() => {
            let portfolioListItem = portfolioList.querySelector(`li:nth-child(${index+1})`);
            portfolioListItem.classList.add("active");
        }, 100);
    });
}
