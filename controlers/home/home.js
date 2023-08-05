import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
export const home = async(req, res) => {
    res.send("hii");
}

export const signUp = async(req, res) => {
    const {name , email, password} = req.body;
}

