import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log('Database connected'))
    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)
}

export default connectDB



//YP666mmaum3qgKuj
//mongodb+srv://mahalakshmi82100:YP666mmaum3qgKuj@cluster0.qcuyp.mongodb.net/
//mongodb+srv://mahalakshmi82100:YP666mmaum3qgKuj@cluster0.qcuyp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0