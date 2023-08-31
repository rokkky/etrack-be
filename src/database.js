import mongoose from 'mongoose';

export async function connectDB(port) {
    mongoose.set("strictQuery", false);
    
    await mongoose.connect(port);
}

