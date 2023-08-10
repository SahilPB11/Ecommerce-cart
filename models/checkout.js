import mongoose from "mongoose";

const checkOutSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  order: [
    {
      products: [{
        product_id:{
          type:String,
          required: true,
        }
      }]
      ,
      Total: {
        type: Number,
        default: 0,
      },
      address: {
        type: String,
        default: "0001",
      },
      paymentWay: {
        type: String,
        default: "cash",
      },
      createAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

const checkout = mongoose.model("checkout", checkOutSchema);

export default checkout;
