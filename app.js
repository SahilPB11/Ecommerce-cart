import express from "express";
import router from "./routers/router.js";
import { config } from "dotenv";


export const app = express();
config({
  path: "./config.env",
});

// sending the response
app.use("/", router);
