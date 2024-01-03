import { NextFunction, Request, Response } from "express";
import { SECRET_KEY, usersCollection } from "..";
import jwt from "jsonwebtoken";

interface JWT {
    password: string;
    name: string;
    iat: number;
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
        const decoded = jwt.verify(token, SECRET_KEY) as JWT;
        const name = decoded.name;
        const password = decoded.password;
        if (name && password) {
            const user = await usersCollection.findOne({name, password })
            if (user) {
                req.user = {
                    name,
                    password,
                };
            }
        }
    }
    next();
}
