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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const __1 = require("..");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    if (name && password) {
        const candidate = yield User_1.User.findOne({ name });
        if (!candidate) {
            const token = jsonwebtoken_1.default.sign({ name, password }, __1.SECRET_KEY);
            const user = new User_1.User({ name, password, plans: [] });
            user.save();
            return res.status(200).json({ token });
        }
        else {
            return res.status(400).json({ message: "Пользователь уже существует" });
        }
    }
    else {
        return res.status(400).json({ message: "Некорректные данные" });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    if (name && password) {
        const user = yield User_1.User.findOne({ name, password });
        if (user) {
            const token = jsonwebtoken_1.default.sign({ name, password }, __1.SECRET_KEY);
            return res.status(200).json({ token });
        }
        else {
            return res.status(400).json({ message: "Некорректные данные" });
        }
    }
    else {
        return res.status(400).json({ message: "Некорректные данные" });
    }
}));
exports.default = router;
