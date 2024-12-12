// libs
import jwt from "jsonwebtoken";
import { writeFile } from "fs/promises";
// utils
import { loadDB } from "../utils";
// vars
import { JWT_SECRET } from "@/globalVariables";
// types
import { NextApiRequest, NextApiResponse } from "next";

interface IRequestBody extends NextApiRequest {
    body: {
        display_name: string
    };
}

async function handler(req: IRequestBody, res: NextApiResponse) {
    const token = req.cookies.auth;

    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: "Пользователь не авторизован" });
    }

    try {
        const { display_name } = req.body;

        const decoded = jwt.verify(token, JWT_SECRET) as {
            login: string
        };

        const userDB = await loadDB();

        const searchedUserIndex = userDB.findIndex((user) => {
            return user.login === decoded.login;
        });

        if (searchedUserIndex === -1) {
            res.status(401).json({
                success: false,
                message: "Пользователя нет в базе данных"
            });
        }

        userDB[searchedUserIndex].display_name = display_name;

        await writeFile(
            "./public/data/users/users.json",
            JSON.stringify(userDB)
        );

        res.status(200).json({
            success: true,
            message: "Успешно изменен",
            user: userDB[searchedUserIndex]
        });
    } catch (error) {
        console.log("Ошибка сервера:", error);
        return res.status(500).json({
            success: false,
            message: "Ошибка сервера"
        });
    }
}

export default handler;
