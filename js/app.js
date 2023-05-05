const filters = document.querySelectorAll(".filter-btn");
const filterIcon = document.querySelector("#filter-icon");
const sidebarFilters = document.querySelector(".portfolio-sidebar-filters");
const sidebarListElements = document.querySelectorAll(".sidebar-filters-item");
const portfolioList = document.querySelector(".portfolio-content-list");

const projectTotal = document.querySelector(".project-total");
const projectCount = document.querySelector(".project-count");
const btnMoreProjects = document.querySelector(".button-more-projects");
const progressBar = document.querySelector(".portfolio-progress-bar");

let arrProjects, arrFilters;
let projectsLimit, projectIncrease;
let currentPage, pageCount;
let startRange, endRange;

initData();

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
        clearData();

        arrFilters[0] = filterBtn.getAttribute("id");

        filters.forEach((filter) => {
            filter.classList.remove("active");
        });
        filterBtn.classList.add("active");
    
        getProjects();
        setRangeProjects();
        addProject();
    });
});

sidebarListElements.forEach((elementList) => {
    let btnSidebar = elementList.querySelector(".filter-btn-sidebar"); 
    btnSidebar.addEventListener("click", () => {
        clearData();

        arrFilters[1] = btnSidebar.getAttribute("id");

        sidebarListElements.forEach((element) => {
            element.classList.remove("active");
        });
        elementList.classList.add("active");

        getProjects();
        setRangeProjects();
        addProject();
    });
});

btnMoreProjects.addEventListener("click", () => {
    setRangeProjects();
    addProject();
});

/* Функция очистки данных */

function clearData(){
    portfolioList.innerHTML = "";
    progressBar.style.width = "0";
    btnMoreProjects.style.display = "block";
    startRange = endRange = 0;
    currentPage = 1;
}

/* Функция установки дипазона выводимых данных */

function setRangeProjects(){
    startRange = currentPage > 1 ? endRange + 1 : endRange;
    endRange = currentPage > 1 ? 
        (endRange + projectIncrease) : (endRange + projectIncrease - 1);
    
    if((projectIncrease - 1) > projectsLimit){ 
        endRange = projectsLimit; 
    }else{
        let diff = (projectsLimit - endRange - 1);
        endRange = diff < 0 ? projectIncrease + diff + startRange : endRange;
    }
}

/* Функция иницализации данных */

function initData(){
    arrProjects = [];
    arrFilters = [
        filters[0].getAttribute("id"),
        sidebarListElements[0].querySelector(".filter-btn-sidebar").getAttribute("id")
    ];
    projectIncrease = 6;
    countClick = 0;
    currentPage = 1;

    getProjects();

    startRange = 0
    endRange = (projectIncrease - 1) > projectsLimit ? projectsLimit : (projectIncrease - 1); 
    
    addProject();
}

/* Функция получения данных */

function getProjects(){
    if(arrProjects.length != 0) { arrProjects = []; }

    if(arrFilters.length != 0){
        portfolio.forEach((project) => {
            if(arrFilters[0] === "all"){
                if(project.fieldOfActivities.includes(arrFilters[1]))
                { arrProjects.push(project); }
            }
            else if(project.type === arrFilters[0] &&
                    project.fieldOfActivities.includes(arrFilters[1]))
                { arrProjects.push(project); }
        });
    }
    
    projectsLimit = arrProjects.length;
    pageCount = Math.ceil(projectsLimit / projectIncrease);
    projectTotal.innerHTML = pageCount;

    console.log(`projectsLimit = ${projectsLimit}`);
    return arrProjects;
}

/* Функция добавления проектов */

function addProject(){
    let countRows = Math.ceil(endRange + 1);
    portfolioList.style.gridTemplateRows = `"repeat(${countRows}, 1fr)"`;

    for(let i = startRange; i <= endRange; i++){
        if(i != projectsLimit){
            portfolioList.innerHTML += 
            `<li>
                <article class="project-card">
                    <div class="project-card-image">
                        <img src="${arrProjects[i].imageProject}" alt="Project Image"/>
                    </div>
                    <div class="project-card-text">
                        <h3 class="project-name">${arrProjects[i].name}</h3>
                        <p class="project-desc">${arrProjects[i].desc}</p>
                    </div>
                </article>
            </li>`;

            setTimeout(() => {
                let portfolioListItem = portfolioList.querySelector(`li:nth-child(${i+1})`);
                portfolioListItem.classList.add("active");
            }, 100);
        }   
    }

    progressBar.style.width = `${Math.floor((currentPage * 100) / pageCount)}%`;
    btnMoreProjects.style.display = currentPage === pageCount ? "none" : btnMoreProjects.style.display; 
    projectCount.innerHTML = currentPage++;
}