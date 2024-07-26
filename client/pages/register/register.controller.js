import { newUser } from "../../api/login.api.js"

const registerForm = document.getElementById('registerForm')
const error = document.getElementById("error")

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const nombre = document.getElementById("nombre").value
    const apellido = document.getElementById("apellido").value
    const email = document.getElementById("email").value
    const password = document.getElementById("pass").value
    try {
        const res = await newUser(nombre, apellido, email, password)
        if (res.status !== false) {
            window.location.href = `http://127.0.0.1:5500/client/pages/home/home.html`
            console.log("Usuario registrado correctamente.")
        } else {
            error.textContent = res.message || "Error al registrar el usuario!"
        }
    } catch (error) {
        error.textContent = "Error al conectar con el servidor"
        console.error("Error en la solicitud:", error)
    }
})