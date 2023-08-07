"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: String,
    password: String,
    plans: [
        {
            startAt: Number,
            duration: Number,
            description: String,
            completed: Boolean,
            color: String,
            id: String,
        },
    ],
});
exports.User = (0, mongoose_1.model)("User", UserSchema);
