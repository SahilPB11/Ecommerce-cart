import bcrypt from "bcrypt";
import user from "../models/user.js";

export const registeration = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const User = await user.findOne({ email });
    if (User)
      return res
        .status(400)
        .json({ message: "Please Enter other eamil Its already exist" });

    const hashPassword = await bcrypt.hash(password, 10);

    req.user = await user.create({ name, email, password: hashPassword });
    next();
  } catch (err) {
    console.log(err);
  }
};

// here we identifyting that user is secure or not for login
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const User = await user.findOne({ email });
  
  if (!User)
  return res
.status(400)
.json({ message: "Please Enter valid eamil / regiisterd first" });

  const isIt = await bcrypt.compare(password, User.password);

  if (!isIt) return res(400).json({ message: "Please enter a valid password" });
req.user = User;

  next();
};
