const icone = document.querySelector(".icone");
const navMenu = document.querySelector(".navMenu");

icone.addEventListener("click",() =>{
    icone.classList.toggle('active');
    navMenu.classList.toggle('active');
})