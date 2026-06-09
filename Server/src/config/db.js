import mongoose, { connect } from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "Luxe"
        });
        console.log("Database Connected :  ", conn.connection.host);
    } catch (error) {
        console.log(error);
    }
}