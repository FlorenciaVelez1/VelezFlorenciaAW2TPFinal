import { API } from "./api.js"
export const logIn = async(email, password) => {
    try {
        console.log("Sending request to server with:", {email, password})
        const response = await fetch(`${API}/user/login`, {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log("Received response from server:", data)
        // Devolver un objeto que incluya el estado y los datos
        return {
            status: response.status,
            ...data
        }
    } catch (error) {
        console.log("Error occurred:", error)
        return {status: false, message: "Error al conectar con el servidor"}
    }
}
export const decodeToken = async(token)=>{
    try {
        const response = await fetch(`${API}/user/decodeToken`, {
            method: 'POST',
            body: JSON.stringify({token}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        return data
    }catch(error){
        console.log(error)
        return {status:false}
    }
}
export const newUser = async(nombre, apellido, email, password)=>{
    try {
        const res = await fetch(`${API}/user/registro`,{
            method: 'POST',
            body: JSON.stringify({nombre, apellido, email, password}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        return res
    } catch (error) {
        console.log(error)
    }
}