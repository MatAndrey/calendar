declare namespace Express {
    interface Request {
        user?: {
            name: string;
            password: string;
        };
    }
}
