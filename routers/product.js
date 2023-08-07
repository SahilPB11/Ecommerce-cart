import express from "express";
import {
  additems,
  deleteOne,
  getAllProducts,
  getOne,
  updateOne,
} from "../controlers/Outh/prod.js";
const proCart = express.Router();

proCart.get("/", getAllProducts);

proCart.post("/", additems);

proCart.route("/:id").get(getOne).put(updateOne).delete(deleteOne);
export default proCart;
