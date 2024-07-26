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
    //Agrego este console para ver que estan ingresando los datos correctamente
    console.log('Datos recibidos:', { nombre, apellido, email, password })
    try {
        const newUser = new User({
            nombre,
            apellido,
            email,
            password
        })
        console.log('Usuario nuevo:', newUser)
        await newUser.save()
        res.status(201).json({ message: 'Usuario registrado correctamente' })
    } catch (error) {
        console.error('Error al registrar el usuario:', error)
        res.status(400).json({ message: 'Error al intentar registrar el nuevo usuario', error })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: 'Email inválido' })
        }
        // Comparar la contraseña proporcionada con la hash almacenado
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid && password !== user.password) {
            return res.status(401).json({ message: 'Contraseña inválida' })
        }
        // Verificar si el usuario está activo
        if (!user.activo) {
            return res.status(401).json({ message: 'Usuario inactivo' })
        }
        // Retornar el usuario autenticado si todo está bien
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