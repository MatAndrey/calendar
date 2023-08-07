import express, { Request, Response } from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.router";
import plansRouter from "./routes/plans.router";
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI!;
const SECRET_KEY = process.env.SECRET_KEY!;
if (!SECRET_KEY || !MONGO_URI) throw new Error("Environment variables are not found");

export { MONGO_URI, SECRET_KEY };

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

const app = express();
app.use(express.json());
app.use("/auth", authRouter);
app.use("/plans", plansRouter);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("App listening on port " + PORT);
    });
});
