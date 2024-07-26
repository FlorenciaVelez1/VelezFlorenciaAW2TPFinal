import { logIn } from "./api/login.api.js"

const formLogIn = document.getElementById("logInForm")
const error = document.getElementById("error")

formLogIn.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = document.getElementById("email").value
    const password = document.getElementById("pass").value
    try {
        const res = await logIn(email, password)
        if (res.status === 200) {
            sessionStorage.setItem('email', JSON.stringify(email))
            window.location.href = "./pages/home/home.html"
            console.log("Usuario autenticado:", res)
        } else {
            error.textContent = res.message || "Error al loguearse, intente nuevamente"
            console.error("Error en la autenticación:", res.message)
        }
    } catch (error) {
        error.textContent = "Error al conectar con el servidor"
        console.error("Error en la solicitud:", error)
    }
})