const navMenu = document.querySelector('#nav');
const navBtn = document.querySelector('#nav-btn');
const navBtnImg = document.querySelector('#nav-btn-img');

navBtn.onclick = function(){
    if(navMenu.classList.toggle('open')){
        navBtnImg.src = "./img/header/navigation/close1.png";
    }
    else{
        navBtnImg.src = "./img/header/navigation/hamburger01.png";
    }
};