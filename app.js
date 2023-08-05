import express from "express";
import router from "./routers/router.js";
import { config } from "dotenv";

// here  we are exporting the app to start server in another server.js file
export const app = express();
// here we are using 
config({
  path: "./config.env",
});

// important to read data what we are taking
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// sending the response
app.use("/", router);
