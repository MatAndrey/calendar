import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "..";
import { User } from "../models/User";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
    const { name, password } = req.body;
    if (name && password) {
        const candidate = await User.findOne({ name });
        if (!candidate) {
            const token = jwt.sign({ name, password }, SECRET_KEY);
            const user = new User({ name, password, plans: [] });
            user.save();
            return res.status(200).json({ token });
        } else {
            return res.status(400).json({ message: "Пользователь уже существует" });
        }
    } else {
        return res.status(400).json({ message: "Некорректные данные" });
    }
});

router.post("/login", async (req: Request, res: Response) => {
    const { name, password } = req.body;
    if (name && password) {
        const user = await User.findOne({ name, password });
        if (user) {
            const token = jwt.sign({ name, password }, SECRET_KEY);
            return res.status(200).json({ token });
        } else {
            return res.status(400).json({ message: "Некорректные данные" });
        }
    } else {
        return res.status(400).json({ message: "Некорректные данные" });
    }
});

export default router;
