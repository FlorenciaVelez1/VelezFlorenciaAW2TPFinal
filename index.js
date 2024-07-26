import express from 'express'
import cors from 'cors'

import userRouter from './routes/user_routes.js'
import productRouter from './routes/product_routes.js'
import salesRouter from './routes/sales_routes.js'
import cartRouter from './routes/cart_routes.js'
const app = express()
app.use(cors({
    origin: 'http://127.0.0.1:5500',  
    methods: ['GET', 'POST'],         
    allowedHeaders: ['Content-Type'],
}))
const port = 8000

app.listen(port, ()=>{
    console.log(`Servidor levantado en el puerto: ${port}`)
})
app.use(express.json())
app.use('/user', userRouter)
app.use('/product', productRouter)
app.use('/sales', salesRouter)
app.use('/cart', cartRouter)