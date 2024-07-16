import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async() => {
    try {
        mongoose.connect(config.mongoUrl as string).then(()=> {console.log('Connected Mongodb')});
    } catch (error) {
        console.log(error)
    }
}


export default connectDB;