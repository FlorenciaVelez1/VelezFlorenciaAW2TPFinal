import { newUser } from "../../api/login.api.js"

import { API } from "../../api/api.js"
const registerForm = document.getElementById('registerForm')

const error = document.getElementById("error")

registerForm.addEventListener('submit', async(e)=>{
    e.preventDefault()
    const nombre = document.getElementById("nombre").value
    const apellido = document.getElementById("apellido").value
    const email = document.getElementById("email").value
    const password = document.getElementById("pass").value
    const res = await newUser(nombre, apellido, email, password)
    if(res){        
        window.location.href = `http://127.0.0.1:5500/client/pages/home/home.html`
        console.log("Usuario registrado correctamente.")
    }else{
        error.textContent = "Error al registrar el usuario!"
    }
})