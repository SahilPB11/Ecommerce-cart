import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    email:{
        type : String,
        required: true,
    },
    list : [{
        product_id: {
            type : String,
            required : true,
        },
        quantity: {
            type : Number,
            required: true,
            default : 0
        }, price: {
            type: Number,
            required : true,
            default: 0,
        }
    }],
})

const cart = mongoose.model("Cart", cartSchema);

export default cart;