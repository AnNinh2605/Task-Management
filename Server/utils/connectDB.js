import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT);
        console.log("Connection to DB successful");
    } catch (error) {
        console.log("Connection to DB fail", error);
    }
}

export default connectDB;
