import { connectToDatabase } from "../connection.js"
import Product from "../schemas/product_schema.js"
import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

//Estaba teniendo problemas para que me encontrara la ruta del carrito.json, esto lo resolvio
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const filePath = path.resolve(__dirname, '../../data/carrito.json')

const fileCarrito = await readFile(filePath, 'utf-8')
const carritoData = JSON.parse(fileCarrito)
export const findAll = async ()=>{
    try {
        const res = await carritoData
        return JSON.parse(JSON.stringify(res))
    } catch (error) {
        console.log(error)
    }
}

export const agregarProductoCarrito = async (nombre) => {
    const cantidad = 1
    let productoNombre = nombre.toString()

    try {
        await connectToDatabase()
        console.log(`Buscando producto con nombre: ${productoNombre}`)

        const producto = await Product.findOne({ nombre: productoNombre })

        if (!producto) {
            throw new Error('Producto no encontrado')
        }

        console.log(`Producto encontrado: ${producto}`)

        const productoExiste = carritoData.find(p => p.id === producto._id.toString())

        if (productoExiste) {
            productoExiste.cantidad += parseInt(cantidad)
        } else {
            const nuevoProducto = {
                id: producto._id.toString(),
                nombre: producto.nombre,
                imagen: producto.imagen,
                precio: producto.precio,
                cantidad: parseInt(cantidad)
            }
            carritoData.push(nuevoProducto)
        }

        await writeFile(filePath, JSON.stringify(carritoData, null, 2))
        return carritoData
    } catch (error) {
        console.error('Error al agregar producto al carro:', error)
        throw error
    }
}

export const eliminarProductoDelCarrito = async (nombre) => {
    const productoExiste = carritoData.findIndex(c => c.nombre === nombre)

    if (productoExiste === -1) {
        throw new Error('Producto no encontrado')
    }

    carritoData.splice(productoExiste, 1)

    try {
        await writeFile(filePath, JSON.stringify(carritoData, null, 2))
        return carritoData
    } catch (error) {
        console.error('Error al eliminar el producto del carro:', error)
        throw error
    }
}

export const reducirCantProducto = async (nombre) => {
    const productoExiste = carritoData.find(c => c.nombre === nombre.toString())

    if (!productoExiste) {
        throw new Error('Producto no encontrado')
    }

    if (productoExiste.cantidad > 0) {
        productoExiste.cantidad -= 1
    }
    try {
        await writeFile(filePath, JSON.stringify(carritoData, null, 2))
        return carritoData
    } catch (error) {
        console.error('Error al actualizar el carrito:', error)
        throw error
    }
}
export const vaciarCarrito = async () => {
    try {
        carritoData.length = 0

        await writeFile(filePath, JSON.stringify(carritoData, null, 2))
        return carritoData
    } catch (error) {
        console.error('Error al vaciar el carrito:', error)
        throw error
    }
}