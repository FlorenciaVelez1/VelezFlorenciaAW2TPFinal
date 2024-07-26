import { API } from "./api.js"

export const newProduct = async(nombre, desc, precio, imagen)=>{
    try {
        const res = await fetch(`${API}/product/newProduct`,{
            method: 'POST',
            body: JSON.stringify({nombre, desc, precio, imagen}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        return res

    } catch (error) {
        console.log(error)
    }
}
export const allProduct = async()=>{
    try {
        const res = await fetch(`${API}/product/all`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        return data

    } catch (error) {
        console.log(error)
    }
}
export const productById = async(idProduct)=>{
    try {
        const res = await fetch(`${API}/product/porid/${idProduct}`,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        if(data){
            return data
        }
    } catch (error) {
        console.log(error)
    }
}
