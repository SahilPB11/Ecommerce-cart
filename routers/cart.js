import express from "express";
import { isAuthenticated } from "../controlers/Outh/auth.js";
import {addProduct, deletemanyProducts, deleteproduct, getCart, updateQuantity  } from "../controlers/cart-control.js";

const cartEx = express.Router();

cartEx.get("/", isAuthenticated, getCart);

cartEx.post('/:productId',isAuthenticated, addProduct);

cartEx.put('/:productId',isAuthenticated,updateQuantity);

cartEx.delete('/:productId', isAuthenticated, deleteproduct)

cartEx.delete('/', isAuthenticated, deletemanyProducts);

export default cartEx;
