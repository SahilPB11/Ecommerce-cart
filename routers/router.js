import express from "express";
import { home } from "../controlers/control";

const router = express.Router();

router.get("/", home);

export default router;