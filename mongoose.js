import mongoose from "mongoose";

// conncted databe

const connectDB = async () => {
  try {
    await mongoose
      .connect("mongodb://127.0.0.1:27017", {
        dbName: "E-cart",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((c) =>
        console.log(`Databse connected safely with ${c.connection.host}`)
      );
  } catch (error){
    console.log(error);
  }
};

export default connectDB;
