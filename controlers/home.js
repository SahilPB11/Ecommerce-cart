import { createSession, deleteSession } from "./Outh/auth.js";

// home page
export const home = async (req, res, next) => {
  res.send("hiii");
};

// regsters first time
export const signUpHome = async (req, res, next) => {
  try {
    createSession(res, req.user, 200, `registerd Succesfully ${req.user.name}`);
  } catch (err) {
    console.log(err);
  }
};

// login and then start the sessin
export const loginHome = async (req, res, next) => {
  const User = req.user;
  console.log(User);
  try {
    createSession(res, User, 200, `Login Succesfully ${req.user.name}`);
  } catch (err) {
    console.log(err);
  }
};

// here we are ending the sessionand logout
export const logoutHome = async (req, res, next) => {
  try {
    deleteSession(req, res);
  } catch (err) {
    console.log(err);
  }
};
