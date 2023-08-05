import mongoose from "mongoose";

// conncted databe

const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.Connect, {
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
