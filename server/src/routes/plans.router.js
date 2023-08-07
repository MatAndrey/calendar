"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(401).json({ message: "Пользователь не авторизован" });
    }
    const name = req.user.name;
    const user = yield User_1.User.findOne({ name });
    if (user) {
        return res.status(200).json(user.plans);
    }
    else {
        res.status(500).json({ message: "Пользователь не найден" });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.status(401).json({ message: "Пользователь не авторизован" });
    }
    const name = req.user.name;
    const user = yield User_1.User.findOne({ name });
    const plans = req.body.plans;
    if (!plans) {
        return res.status(500).json({ message: "Планы не найдены" });
    }
    if (user) {
        user.plans = plans;
        const newUser = yield user.save();
        res.status(200).json(newUser.plans);
    }
    else {
        return res.status(500).json({ message: "Пользователь не найден" });
    }
}));
exports.default = router;
