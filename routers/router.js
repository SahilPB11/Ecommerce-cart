import express from "express";
import { home, signUp } from "../controlers/home/home.js";

const router = express.Router();

router.get("/", home);

router.get("/register", signUp);

export default router;