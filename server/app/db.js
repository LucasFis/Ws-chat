import mongoose from "mongoose"

export const connectToDB = async (dbUri) => {
    try {
        await mongoose.connect(dbUri);
        console.log("Conectado a MongoDB!");
        return mongoose;
    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
}