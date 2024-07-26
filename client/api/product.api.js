import { API } from "./api.js"

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
