import { Router } from "express"
import { newUser, findAll, userLogin } from "../db/actions/user_actions.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { verifyToken, decodeToken } from "../middleware/middleware.js"
import User from "../db/schemas/user_schema.js"

const router = Router()
const secret = process.env.SECRET

//Traer a todos los usuarios
router.get('/all', async(req,res)=>{
    try {
        const result = await findAll()
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json()
    }
})

router.post('/registro', async (req, res) => {
    const { nombre, apellido, email, password } = req.body
    console.log('Datos recibidos:', { nombre, apellido, email, password })
    try {
        const user = await newUser({ nombre, apellido, email, password, activo: true })
        res.status(201).json({ message: 'Usuario registrado correctamente', user })
    } catch (error) {
        console.error('Error al registrar el usuario:', error)
        res.status(400).json({ message: 'Error al intentar registrar el nuevo usuario', error })
    }
})


router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userLogin(email)
        if (!user) {
            return res.status(401).json({ message: 'Email inválido' })
        }
        if (!user.password) {
            return res.status(500).json({ message: 'Error del servidor: el usuario no tiene una contraseña establecida' })
        }
        if (user.password != password) {
            return res.status(401).json({ message: 'Contraseña inválida' })
        }
        if (!user.activo) {
            return res.status(401).json({ message: 'Usuario inactivo' })
        }
        // Devuelve el usuario autenticado si todo está bien
        res.status(200).json(user)
    } catch (error) {
        console.error('Error del servidor:', error)
        res.status(500).json({ message: 'Error interno del servidor' })
    }
})


router.post('/decodeToken',async (req,res)=>{
    const token = req.body.token
    
    const result = await decodeToken(token.replace(/^"|"$/g, ''))
    res.status(200).json(result)
})
export default router