import { API } from "./api.js";

export const logIn = async(email, password) => {
    try {
        const response = await fetch(`${API}/user/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        //hacemos un filtro para que cuando el adm se conecta unicamente pueda ir a su pag
        if (response.status === 200) {
            if (data.email === 'administracion@gmail.com') {
                window.location.href = 'http://127.0.0.1:5500/client/pages/administrador/adm.html';
            } else {
                window.location.href = 'http://127.0.0.1:5500/client/pages/home/home.html';
            }
        } else {
            console.error("El login fallo:", data.message);
            alert("El login fallo: " + data.message);
        }
    } catch (error) {
        alert("Error al conectar con el servidor");
    }
};
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

export const newUser = async (nombre, apellido, email, password) => {
    try {
        const res = await fetch(`${API}/user/registro`, {
            method: 'POST',
            body: JSON.stringify({ nombre, apellido, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        if (res.ok) {
            return data;
        } else {
            throw new Error(data.message || 'Error al registrar el usuario');
        }
    } catch (error) {
        console.log('Error:', error);
        return { status: false, message: error.message };
    }
};