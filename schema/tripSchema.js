import mongoose from "mongoose"

const tripSchema = mongoose.Schema({
    origin: { type: String },
    destination: { type: String },
    cost: { type: Number },
    duration: { type: Number },
    type: { type: String },
    display_name: { type: String },
}, 
{ toJSON: { virtuals: true }} //enable the virtual property for an schema
)

const tripModal = mongoose.model('trip', tripSchema)

export default tripModal