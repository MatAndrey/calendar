import { Router, Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { User } from "../models/User";

const router = Router();
router.use(authMiddleware);

router.get("/", async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: "Пользователь не авторизован" });
    }
    const name = req.user.name;
    const user = await User.findOne({ name });
    if (user) {
        return res.status(200).json(user.plans);
    } else {
        res.status(500).json({ message: "Пользователь не найден" });
    }
});

// router.post("/", async (req: Request, res: Response) => {
//     if (!req.user) {
//         return res.status(401).json({ message: "Пользователь не авторизован" });
//     }
//     const name = req.user.name;
//     const user = await User.findOne({ name });
//     const plans = req.body;
//     if (user) {
//         user.plans = plans;
//         const newUser = await user.save();
//         res.status(200).json(newUser.plans);
//     } else {
//         return res.status(500).json({ message: "Пользователь не найден" });
//     }
// });

router.post("/:id", async (req: Request, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: "Пользователь не авторизован" });
    }
    const name = req.user.name;
    const user = await User.findOne({ name });
    const plan = req.body.plan;
    if (user) {
        if (plan.completed) {
            user.plans.splice(
                user.plans.findIndex((p) => p.id === plan.id),
                1
            );
        } else {
            const planIndex = user.plans.findIndex((p) => plan.id === p.id);
            if (planIndex > -1) {
                user.plans[planIndex] = plan;
            } else {
                user.plans.push(plan);
            }
        }
        await user.save();
        return res.status(200).json(plan);
    } else {
        return res.status(500).json({ message: "Пользователь не найден" });
    }
});

export default router;
