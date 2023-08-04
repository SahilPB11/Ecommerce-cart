import express from "express";
const port = 3000;

const app = express();

// sending the response
app.get("/", (req, res) => {
    res.send("hii");
});

// server listen
app.listen(port, (e) => {
  if (e) return console.log(e);
  return console.log("serber is working on 3000");
});
