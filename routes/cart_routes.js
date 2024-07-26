import { Router } from "express"

import { findAll, addProductToCart, deleteProductFromCart, reduceProductQuantity } from '../db/actions/cart_actions.js'

const router = Router()
router.get('/all', async (req, res) => {
    try {
        const carritos = await findAll()
        res.json(carritos)
    } catch (error) {
        res.status(500).json({ message: 'error buscando los carritos' })
        console.log(error)
    }
})

router.post('/agregar', async (req, res) => {
    const { nombre } = req.body

    try {
        const carritoData = await addProductToCart(nombre)
        res.status(200).json({ mensaje: 'Producto agregado al carrito', carrito: carritoData })
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al agregar producto al carro', error: error.message })
    }
})

router.delete('/eliminar/:nombre', async (req, res) => {
    const { nombre } = req.params

    try {
        const carritoData = await deleteProductFromCart(nombre)
        res.status(200).json(carritoData)
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el producto del carro', error: error.message })
    }
})

router.post('/eliminarProducto/:nombre', async (req, res) => {
    const { nombre } = req.params
    try {
        const carritoData = await reduceProductQuantity(nombre)

        if (carritoData.cantidad = 0) {
            await deleteProductFromCart(nombre)
            res.status(200).json({ mensaje: 'Producto eliminado del carrito' })
        } else {
            res.status(200).json({
                mensaje: 'Cantidad reducida del producto en el carrito',
                carrito: carritoData
            })
        }
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el carrito', error: error.message })
    }
})
export default router