import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    name: String,
    username:{
        type: String,
        required : true,
    },
    password:{
        type: String,
        required : true,
    },
    createAt: {
        type: Date,
        default : Date.now(),
      }
});

const user = mongoose.model("User", Schema);

export default user;