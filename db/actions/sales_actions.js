import { connectToDatabase } from "../connection.js"
import Sale from "../schemas/sales_schema.js"

export const newSale = async ({usuario, direccion, ciudad, pais, provincia, codPostal, telefono, productos})=>{
    try {
        await connectToDatabase()
        const res = await Sale.create({usuario, direccion, ciudad, pais, provincia, codPostal, telefono, productos})
        return JSON.parse(JSON.stringify(res))
    } catch (error) {
        console.log(error)
    }
}
export const findAll = async()=>{
    try {
        await connectToDatabase()
        const res = await Sale.find().populate({path:"usuario", select:"nombre apellido email"}).populate({path:"productos"})
        return JSON.parse(JSON.stringify(res))
    } catch (error) {
        console.log(error)
    }
}