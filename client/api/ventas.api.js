import { API } from "./api.js"

//generar orden de venta!
export const newSale = async(newSaleData)=>{
    try {
        const res = await fetch(`${API}/sales/newSale`, {
            method: 'POST',
            body: JSON.stringify(newSaleData),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        return res

    } catch (error) {
        console.log(error)
    }
}
//Obtener ultima venta
export const getLastSale = async()=>{
    try {
        const res = await fetch(`${API}/sales/lastSaleID`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        return res.json()
    } catch (error) {
        console.log(error)
    }
}