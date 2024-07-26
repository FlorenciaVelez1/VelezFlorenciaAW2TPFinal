import { connectToDatabase } from "../connection.js"
import Product from "../schemas/product_schema.js"

export const newProduct = async({nombre, desc, precio, imagen,categoria}) =>{
    try {
        await connectToDatabase()
        const res = await Product.create({nombre, desc, precio, imagen, categoria})  
        console.log(res)      
        return JSON.parse(JSON.stringify(res))
    } catch (error) {
        console.log(error)
    }
}
export const findAll = async()=>{
    try {
        await connectToDatabase()
        const res = await Product.find()
        return JSON.parse(JSON.stringify(res))
    } catch (error) {
        console.log(error)
    }
}
export const getProductsByCategory = async (req, res) => {
    const categoria = req.params.categoria
    try {
        const result = await Product.find({ categoria })
        if (result.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos en esta categoría' })
        }
        res.status(200).json(result)
    } catch (error) {
        console.error('Error al buscar por categoría:', error)
        res.status(400).json({ message: 'Error al buscar por categoría', error })
    }
}
export const getProductoPorNombre = async (req, res) => {
    const nombre = req.params.nombre
    try {
        const result = await Product.find({ nombre })
        if (result.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos con este nombre' })
        }
        res.status(200).json(result)
    } catch (error) {
        console.error('Error al buscar por nombre:', error)
        res.status(400).json({ message: 'Error al buscar por nombre', error })
    }
}
