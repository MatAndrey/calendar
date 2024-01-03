import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.router";
import plansRouter from "./routes/plans.router";
import { Collection, MongoClient } from "mongodb";
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI!;
const SECRET_KEY = process.env.SECRET_KEY!;
if (!SECRET_KEY || !MONGO_URI) throw new Error("Environment variables are not found");

export { MONGO_URI, SECRET_KEY };

const client = new MongoClient(MONGO_URI);
export let usersCollection: Collection;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/plans", plansRouter);

const PORT = process.env.PORT || 5000;

async function start() {
    await client.connect();
    usersCollection = client.db("database").collection("users");
    app.listen(PORT, () => {
        console.log("App listening on port " + PORT);
    });
}
start();
