import { ourTeam } from './data/our_team.js';

const ourTeamImgOne = document.querySelector('.our-team-image.one');
const ourTeamImgTwo = document.querySelector('.our-team-image.two');
const ourTeamTitle = document.querySelector('.our-team-title');
const ourTeamContentRightInner = document.querySelector('.our-team-content-right-inner');
const ourTeamContentDesc = document.querySelector('.our-team-content-desc');

let currSlide = 0;
let counter = 0;

function setTextContentSlide(){
    ourTeamTitle.textContent = ourTeam[currSlide].title;
    ourTeamContentDesc.textContent = ourTeam[currSlide].contentDesc;
    enableAnimation(true);
}

function nextSlide(){
    console.log(counter);
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
    currSlide = (currSlide + 1) % ourTeam.length;
    counter++;
}

function enableAnimation(){
    ourTeamTitle.classList.remove("move-left");
    ourTeamTitle.classList.add("move-right");

    ourTeamContentRightInner.classList.remove("move-down");
    ourTeamContentRightInner.classList.add("move-up");
    setTimeout(() => {
        ourTeamTitle.classList.remove("move-right");
        ourTeamTitle.classList.add("move-left");

        ourTeamContentRightInner.classList.remove("move-up");
        ourTeamContentRightInner.classList.add("move-down");
    }, 4000)
}

nextSlide();

setInterval(nextSlide, 5000);