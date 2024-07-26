import mongoose from 'mongoose'
import 'dotenv/config'
const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables')
}

let cached = global.mongoose
if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

 export const connectToDatabase = async () => {
    if (cached.conn) {
        return cached.conn
    }
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000 
        }).then((mongoose) => {
            console.log('Connected to MongoDB')
            return mongoose
        }).catch((error) => {
            console.error('Error connecting to MongoDB:', error)
            throw error
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}
export default connectToDatabase
