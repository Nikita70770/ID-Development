const filters = document.querySelectorAll(".filter-btn");
const filtersSidebar = document.querySelectorAll(".filter-btn-sidebar");
const portfolioList = document.querySelector(".portfolio-content-list");

let projects = [];
let arrFilters = [
    filters[0].getAttribute("id"),
    filtersSidebar[0].getAttribute("id")
];

showProjects(getProjects());

filters.forEach((filterBtn) => {
    filterBtn.addEventListener("click", ()=>{
        arrFilters[0] = filterBtn.getAttribute("id");

        filters.forEach((filter) => {
            filter.classList.remove("active");
        });
        filterBtn.classList.add("active");
    
        showProjects(getProjects());
    });
});

filtersSidebar.forEach((filterBtn) => {
    filterBtn.addEventListener("click", () => {
        arrFilters[1] = filterBtn.getAttribute("id");
        showProjects(getProjects());
    });
});

function getProjects(){
    if(projects.length != 0) { projects = []; }

    if(arrFilters.length != 0){
        portfolio.forEach((project) => {
            if(arrFilters[0] === "all"){
                if(project.fieldOfActivities.includes(arrFilters[1]))
                { projects.push(project); }
            }
            else if(project.type === arrFilters[0] &&
                    project.fieldOfActivities.includes(arrFilters[1]))
                { projects.push(project); }
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
            <article class="project-card">
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
