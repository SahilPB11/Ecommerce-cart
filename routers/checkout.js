import express from "express";
import { isAuthenticated } from "../controlers/Outh/auth.js";
import { addCart, deleteOrder, allOrder, deleteCheckout } from "../controlers/check.js";

const checkRouter = express.Router();

checkRouter.get("/", isAuthenticated, allOrder);
checkRouter.post("/", isAuthenticated, addCart);
checkRouter.delete("/:orderId", isAuthenticated, deleteOrder);
checkRouter.delete("/", isAuthenticated, deleteCheckout);



 export default checkRouter;