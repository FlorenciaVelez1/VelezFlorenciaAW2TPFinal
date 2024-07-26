import { navbarComponent } from "./components/navbar.js"

let navContainer = document.querySelector('header')
window.addEventListener('load', ()=>{
    navContainer.innerHTML = navbarComponent    
    let navbarBtn = document.getElementById('btnNavbar')
    let navbarMobileMenu = document.getElementById('menuNavbar')
    navbarBtn.addEventListener('click', ()=>{
        navbarMobileMenu.classList.toggle('hidden')
    })
})

