import { app } from "./app.js";
import connectDB from "./connectionWithDB/mongoose.js";

// connected to database
connectDB();

// here we listen the port
app.listen(process.env.Port, (e) => {
  if (e) return console.log(e);
  return console.log("server is working on 3000");
});
