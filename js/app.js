const filters = document.querySelectorAll(".filter-btn");
const portfolioList = document.querySelector(".portfolio-content-list");
const filterIcon = document.querySelector("#filter-icon");
const sidebarFilters = document.querySelector(".portfolio-sidebar-filters");
const sidebarListElements = document.querySelectorAll(".sidebar-filters-item");

let projects;
let arrFilters;

initData();
showProjects(getProjects());

document.addEventListener("click", e => {
    if(e.target.id !== "sidebar-filters" &&
        e.target.id !== "filter-icon"){ 
        sidebarFilters.classList.add("hide");
        setTimeout(() => {
            sidebarFilters.classList.remove("active");
        }, 500);
    } 

    e.stopPropagation();
});

filterIcon.addEventListener("click", () => {
    if(!sidebarFilters.classList.contains("active")){
        sidebarFilters.classList.add("active");
        sidebarFilters.classList.remove("hide");
    }else{
        sidebarFilters.classList.add("hide");
        setTimeout(() => {
            sidebarFilters.classList.remove("active");
        }, 500);
    }
});

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

sidebarListElements.forEach((elementList) => {
    let btnSidebar = elementList.querySelector(".filter-btn-sidebar"); 
    btnSidebar.addEventListener("click", () => {
        arrFilters[1] = btnSidebar.getAttribute("id");

        sidebarListElements.forEach((element) => {
            element.classList.remove("active");
        });
        elementList.classList.add("active");
        
        showProjects(getProjects());
    });
});

function initData(){
    projects = [];
    arrFilters = [
        filters[0].getAttribute("id"),
        sidebarListElements[0].querySelector(".filter-btn-sidebar").getAttribute("id")
    ];
}

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
