import jwt from "jsonwebtoken";
import user from "../models/user.js";

export const isAuthenticated = async(req, res, next) => {
    const { token} = req.coookies;
    if(!token){
        return res.status(404).json({
            message: "please try to login",
            cookie: "cookie is not valid"
        })

        const decode = await jwt.verify(token, process.env.Secret);
        req.user = user.findById(decode._id);
        next();
    }
}

export const creteSession = (res, User, statusCode = 200, message) => {
    const token = jwt.sign(User._id, process.env.Secret);

    res.status(statusCode).cookie("token", token,{
        httpOnly: true,
        maxAge : 15 * 60 * 1000,
        sameSite : process.env.NODE_ENV === "development" ? "lax" : "none",
        secure : process.env.NODE_ENV === "development" ? false : true
    }).json({
        success: true,
        message: message
    })

}

export const deleteSession = (res, User, statusCode = 200, message) => {
    const token = jwt.sign(User._id, process.env.Secret);

    res.status(200).cookie("token", "",{
        httpOnly: true,
        maxAge : new Date(Date.now()),
        sameSite : process.env.NODE_ENV === "development" ? "lax" : "none",
        secure : process.env.NODE_ENV === "development" ? false : true
    }).json({
        success: true,
        message: message
    })

}