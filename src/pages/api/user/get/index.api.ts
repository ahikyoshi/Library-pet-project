// libs
import jwt from "jsonwebtoken";
// utils
import { loadDB } from "../utils";
// vars
import { JWT_SECRET } from "@/globalVariables";
// types
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res
            .status(405)
            .json({ success: false, message: "Method not allowed" });
    }

    const token = req.cookies.auth;

    if (!token) {
        return res.status(401).json({ success: false });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {
            login: string,
            role: string,
            id: string
        };
        const userDB = await loadDB();

        const searchedUser = userDB.find((user) => {
            return user.login === decoded.login;
        });

        if (!searchedUser) {
            res.status(401).json({
                success: false,
                message: "Пользователя нет в базе данных"
            });
        }

        return res.status(200).json({
            success: true,
            user: {
                login: searchedUser?.login,
                display_name: searchedUser?.display_name,
                avatar: searchedUser?.avatar,
                library: searchedUser?.library
            }
        });
    } catch {
        return res.status(401).json({ success: false });
    }
}

export default handler;
