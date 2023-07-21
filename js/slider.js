import { ourTeam } from './data/our_team.js';

const ourTeamImgOne = document.querySelector('.our-team-image.one');
const ourTeamImgTwo = document.querySelector('.our-team-image.two');
const ourTeamTitle = document.querySelector('.our-team-title');
const ourTeamContentDesc = document.querySelector('.our-team-content-desc');
const radioBtnInner = document.querySelectorAll(".radio-btn-inner");
ourTeamContentDesc

let currSlide = 0;
let counter = 0;
let sizeArr = ourTeam.length; 

function setTextContentSlide(){
    ourTeamTitle.textContent = ourTeam[currSlide].title;
    ourTeamContentDesc.textContent = ourTeam[currSlide].contentDesc;
}

function nextSlide(){
    if(counter % 2 == 0){ 
        ourTeamImgOne.classList.add("hide");
        ourTeamImgTwo.classList.remove("hide");
        ourTeamImgTwo.src = ourTeam[currSlide].image;
    }
    else if(counter % 2 != 0){ 
        ourTeamImgTwo.classList.add("hide");
        ourTeamImgOne.classList.remove("hide");
        ourTeamImgOne.src = ourTeam[currSlide].image;
    }

    setTextContentSlide();

    enableTextAnim();
    enableRadioBtnsAnim();
    
    currSlide = (currSlide + 1) % sizeArr;
    counter++;
}

function enableTextAnim(){
    ourTeamTitle.classList.remove("move-left");
    ourTeamTitle.classList.add("move-right");

    ourTeamContentDesc.classList.remove("move-down");

    setTimeout(() => {
        ourTeamTitle.classList.remove("move-right");
        ourTeamTitle.classList.add("move-left");

        ourTeamContentDesc.classList.add("move-down");
    }, 4000);
}

function enableRadioBtnsAnim(){
    radioBtnInner[currSlide].classList.remove("animate-transition1");
    setTimeout(() => {
        if(currSlide == 0){ 
            radioBtnInner[sizeArr - 1].classList.add("animate-transition2");
            setTimeout(() => {
                radioBtnInner.forEach((item) => {
                    item.classList.add("hide");
                    item.classList.add("animate-transition1");
                    item.classList.remove("animate-transition2");
                });
            }, 500)
            
            setTimeout(() => {
                radioBtnInner.forEach((item) => {
                    item.classList.remove("hide");
                });
            }, 1000)
        }
        if(currSlide > 0){
            radioBtnInner[currSlide - 1].classList.add("animate-transition2");
            radioBtnInner[currSlide - 1].classList.remove("animate-transition1");
        }
    }, 4000);
}

nextSlide();
setInterval(nextSlide, 5000);