import { ourTeam } from './data/our_team.js';

const ourTeamImgOne = document.querySelector('.our-team-image.one');
const ourTeamImgTwo = document.querySelector('.our-team-image.two');
const ourTeamTitle = document.querySelector('.our-team-title');
const ourTeamContentRight = document.querySelector('.our-team-content-right');
const ourTeamContentDesc = document.querySelector('.our-team-content-desc');
const radioBtns = document.querySelector(".block-radio-buttons").getElementsByTagName("*");

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
    enableAnimation();

    currSlide = (currSlide + 1) % sizeArr;
    counter++;
}

function enableAnimation(){
    ourTeamTitle.classList.remove("move-left");
    ourTeamTitle.classList.add("move-right");

    ourTeamContentRight.classList.remove("move-down");
    ourTeamContentRight.classList.add("move-up");   

    if(currSlide > 0) radioBtns[currSlide - 1].classList.remove("active");
    if(currSlide == 0) radioBtns[sizeArr - 1].classList.remove("active");
    radioBtns[currSlide].classList.add("active");

    setTimeout(() => {
        ourTeamTitle.classList.remove("move-right");
        ourTeamTitle.classList.add("move-left");

        ourTeamContentRight.classList.remove("move-up");
        ourTeamContentRight.classList.add("move-down");
    }, 4000);
}

nextSlide();
setInterval(nextSlide, 5000);