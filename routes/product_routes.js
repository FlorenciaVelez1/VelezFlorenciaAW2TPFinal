import { Router } from "express"
import { newProduct, findAll, getProductsByCategory, getProductoPorNombre } from "../db/actions/product_actions.js"

const router = Router()

router.get('/all', async(req,res)=>{
    try {
        const result = await findAll()
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json()
    }
})

router.get('/porNombre/:nombre', getProductoPorNombre)

router.get('/porCategoria/:categoria', getProductsByCategory)

router.post('/nuevoProducto', async (req, res) => {
    try {
        const { nombre, desc, precio, imagen, categoria } = req.body
        const result = await newProduct({ nombre, desc, precio, imagen, categoria })
        res.status(201).json(result)
    } catch (error) {
        console.error('Error en la ruta /nuevoProduct:', error)
        res.status(500).json({ mensaje: 'Error en el servidor' })
    }
})
export default router