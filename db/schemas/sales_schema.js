import mongoose from "mongoose"

const { Schema, models, model , ObjectId} = mongoose

const SalesSchema = new Schema({
    usuario: {type: ObjectId, required: true, ref:"user"},
    direccion: {type: String, required: true},
    ciudad: {type: String, required: true},
    pais: {type: String, required: true},
    provincia: {type: String, required: true},
    codPostal: {type: Number, required: true},
    telefono: {type: String, required: true},
    productos: [{type: ObjectId, required: true, ref:"product"}]
},{ timestamps: true })
const Sale = models.sale || model('sale', SalesSchema)
export default Sale