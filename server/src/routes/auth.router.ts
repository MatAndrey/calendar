import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY, usersCollection } from "..";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
    const { name, password } = req.body;
    if (name && password) {
        const candidate = await usersCollection.findOne({ name });
        if (!candidate) {
            const token = jwt.sign({ name, password }, SECRET_KEY);
            await usersCollection.insertOne({ name, password, plans: [] });
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
        const user = await usersCollection.findOne({ name, password });
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

router.post("/change", authMiddleware, async (req: Request, res: Response) => {
    const { name, oldPassword, newPassword } = req.body;
    const oldName = req.user?.name;
    if (name && oldPassword && newPassword && oldName) {
        const user = await usersCollection.findOne({ name: oldName });
        if (user) {
            if (user.password === oldPassword) {
                await usersCollection.updateOne(
                    { name },
                    {
                        $set: {
                            password: newPassword,
                            name,
                        },
                    }
                );
                const token = jwt.sign({ name, password: newPassword }, SECRET_KEY);
                return res.status(200).json({ token });
            }
            return res.status(401).json({ message: "Пароль не совпадает" });
        } else {
            return res.status(400).json({ message: "Пользователь не найден" });
        }
    } else {
        return res.status(400).json({ message: "Некорректные данные" });
    }
});

export default router;
