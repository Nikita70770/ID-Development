const filters = document.querySelectorAll(".filter-btn");
const portfolioList = document.querySelector(".portfolio-content-list");

let projects = [];

showProjects(portfolio);

filters.forEach((filterBtn) => {
    filterBtn.addEventListener("click", ()=>{
        let type = filterBtn.getAttribute("id");
        
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
    portfolioList.innerHTML = "";
    arr.forEach((project) => {
        portfolioList.innerHTML += 
        `<li>
            <article class="project-card" data-tags="all, ${project.type}">
                <img src="${project.imageProject}" alt="Project Image" />
                <h2 class="project-name">${project.name}</h2>
            </article>
        </li>` 
    });
}