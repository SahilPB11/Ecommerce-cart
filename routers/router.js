import express from "express";
import { home, signUpHome, loginHome, logoutHome } from "../controlers/home.js";
import { login, registeration } from "../controlers/authentication.js";

const router = express.Router();

router.get("/", home);

router.post("/register", registeration, signUpHome);

router.post('/login', login, loginHome)

router.delete("/delete", logoutHome );

export default router;