import mongoose from "mongoose";

const connectUserDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://grantwass123:oK4qBUbWB41W668n@secrethitler.r5wqhra.mongodb.net/?retryWrites=true&w=majority&appName=SecretHitler");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectUserDB;
