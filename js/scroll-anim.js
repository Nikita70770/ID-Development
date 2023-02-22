const animElements = document.querySelectorAll('.anim-element');

if(animElements.length > 0){

    window.addEventListener("scroll", animOnScroll);
    
    function animOnScroll(){
        for(let i = 0; i < animElements.length; i++){
            const animElement = animElements[i];
            const animElementHeight = animElement.offsetHeight;
            const animElementOffsetTop = getCoords(animElement).top;
            const animStart = 1;

            let animElementPoint = (window.innerHeight - animElementHeight) / animStart;
            if(animElementHeight > window.innerHeight){
                animElementPoint = (window.innerHeight - window.innerHeight) / animStart;
            }

            if((window.pageYOffset > animElementOffsetTop - animElementPoint) &&
            (window.pageYOffset < animElementOffsetTop + animElementHeight)){
                animElement.classList.add("animate");
            }
            else{ 
                if(!animElement.classList.contains("hide-anim")){
                    animElement.classList.remove("animate");
                }
            }
            // console.log(`animElemntPoint: ${animElemntPoint}`);
        }
    }
    function getCoords(elem){
        const rect = elem.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return{
            left: rect.left + scrollLeft, top: rect.top + scrollTop
        }
    }
}

// function getCoords(elem) {
//     let itemCoord = elem.getBoundingClientRect();
//     return{
//         top: itemCoord.top + window.pageYOffset,
//         left: itemCoord.left + window.pageXOffset
//     }
// }

