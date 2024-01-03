import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { usersCollection } from "..";

const planTypes = [
    { title: "Отдых", name: "rest" },
    { title: "Сервис", name: "service" },
    { title: "Эффективное время", name: "effective" },
    { title: "Работа", name: "work" },
] as const;
interface Plan {
    startAt: number;
    duration: number;
    description: string;
    completed: boolean;
    type: (typeof planTypes)[number];
    id: string;
}

const router = Router();
router.use(authMiddleware);

router.get("/", async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: "Пользователь не авторизован" });
    }
    const name = req.user.name;
    const user = await usersCollection.findOne({ name });
    if (user) {
        return res.status(200).json(user.plans);
    } else {
        res.status(500).json({ message: "Пользователь не найден" });
    }
});

router.post("/", async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: "Пользователь не авторизован" });
    }
    const name = req.user.name;
    const user = await usersCollection.findOne({ name });
    const plan = req.body.plan as Plan;
    if (user) {
        if (plan.completed) {
            usersCollection.updateOne(
                { _id: user._id },
                {
                    $pull: {
                        plans: { id: plan.id },
                    },
                }
            );
        } else {
            const planIndex = user.plans.findIndex((p: Plan) => plan.id === p.id);
            if (planIndex > -1) {
                usersCollection.updateOne(
                    { _id: user._id, "plans.id": plan.id },
                    {
                        $set: {
                            "plans.$": plan,
                        },
                    }
                );
            } else {
                usersCollection.updateOne(
                    { _id: user._id },
                    {
                        $push: {
                            plans: plan,
                        },
                    }
                );
            }
        }
        return res.status(200).json(plan);
    } else {
        return res.status(500).json({ message: "Пользователь не найден" });
    }
});

export default router;
