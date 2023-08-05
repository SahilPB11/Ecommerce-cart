import { app } from "./app.js";
import connectDB from "./mongoose.js";
const port = 3000;

connectDB();

app.listen(port, (e) => {
  if (e) return console.log(e);
  return console.log("server is working on 3000");
});
