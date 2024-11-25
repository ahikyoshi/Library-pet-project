// libs
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
// vars
import { JWT_SECRET } from "@/globalVariables";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const token = req.cookies.auth;

    if (!token) {
        return res.status(401).json({ message: "Не авторизован" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return res.status(200).json({ success: true, user: decoded });
    } catch {
        return res.status(401).json({ message: "Неверный или истёкший токен" });
    }
}
