import jwt from "jsonwebtoken";
import user from "../../models/user.js";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    if (!token)
      return res.status(404).json({
        success: false,
        message: "Login First ",
      });

    const decodedData = await jwt.verify(token, process.env.Secret);
    req.user = await user.findById(decodedData.id);
    next();
  } catch (e) {
    console.log(e);
  }
};

export const createSession = async (res, User, statusCode = 200, message) => {
  try {
    const id = User._id;
    const token = jwt.sign({ id }, process.env.Secret);
    res
      .status(statusCode)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "development" ? false : true,
      })
      .json({
        success: true,
        message: message,
      });
  } catch (err) {
    console.log(err);
  }
};

export const deleteSession = (req, res) => {
  const token = req.cookies;
  if (!token) {
    return res.status(400).json({ message: "please login first" });
  }
  res
    .status(200)
    .cookie("token", "", {
      httpOnly: true,
      maxAge: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message: " successfully Logout",
    });
};
