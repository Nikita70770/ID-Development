import { ourTeam } from './data/our_team.js';

const ourTeamImgOne = document.querySelector('.our-team-image.one');
const ourTeamImgTwo = document.querySelector('.our-team-image.two');

let currSlide = 0;
let counter = 0;

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
    currSlide = (currSlide + 1) % ourTeam.length;
    counter++;
}

nextSlide();
setInterval(nextSlide, 3000);

