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
exports.authMiddleware = void 0;
const __1 = require("..");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
function authMiddleware(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, __1.SECRET_KEY);
            const name = decoded.name;
            const password = decoded.password;
            if (name && password) {
                const user = yield User_1.User.findOne({ name, password });
                if (user) {
                    req.user = {
                        name,
                        password,
                    };
                }
            }
        }
        next();
    });
}
exports.authMiddleware = authMiddleware;
