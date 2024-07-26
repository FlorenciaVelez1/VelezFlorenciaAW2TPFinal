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
export default router