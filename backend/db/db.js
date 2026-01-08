import mongoose from "mongoose";

const connectToDatabase=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to database successfully")
    }
    catch(error)
    {
        console.log("Error connecting to database : ",error)
    }
}
export default connectToDatabase;