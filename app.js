import express from "express";
import router from "./routers/router.js";

export const app = express();

// sending the response
app.use("/", router);
