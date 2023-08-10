import express from "express";
import router from "./routers/router.js";
import { config } from "dotenv";
import proCart from "./routers/product.js";
import cartEx from "./routers/cart.js";
import cookieParse from "cookie-parser"
import checkRouter from "./routers/checkout.js";

// here  we are exporting the app to start server in another server.js file
export const app = express();
// here we are using
config({
  path: "./config.env",
});

// important to read data what we are taking
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParse());

// sending the response
app.use("/", router);
app.use("/pro", proCart);
app.use('/cart', cartEx)
app.use("/checkout", checkRouter)
