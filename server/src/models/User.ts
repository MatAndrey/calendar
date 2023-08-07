import { Schema, model } from "mongoose";

const UserSchema = new Schema({
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

export const User = model("User", UserSchema);
