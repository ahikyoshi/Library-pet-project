// libs
import { writeFile } from "fs/promises";
import jwt from "jsonwebtoken";
// utils
import { loadDB } from "../../utils";
// vars
import { JWT_SECRET } from "@/globalVariables";
// types
import { IUserBook } from "@/globalTypes";
import { NextApiResponse } from "next";
import { IExtendedNextApiRequest } from "./types";

async function handler(req: IExtendedNextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res
            .status(405)
            .json({ success: false, message: "Method not allowed" });
    }

    const token = req.cookies.auth;

    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: "Токен отсутсвует" });
    }

    try {
        const { newBook }: { newBook: IUserBook } = req.body;

        console.log(newBook);
        if (!newBook || !newBook._id) {
            return res.status(400).json({
                success: false,
                message: "Отсутствует информация о книге"
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { login: string };

        const userDB = await loadDB();

        const userIndex = userDB.findIndex(
            (user) => user.login === decoded.login
        );

        if (userIndex === -1) {
            return res
                .status(404)
                .json({ success: false, message: "Пользователь не найден" });
        }

        const user = userDB[userIndex];

        const bookIndex = user.library.findIndex(
            (book) => book._id === newBook._id
        );

        if (bookIndex === -1) {
            user.library.push(newBook);
        } else {
            user.library[bookIndex] = newBook;
        }
        userDB[userIndex] = user;
        await writeFile(
            "./public/data/users/users.json",
            JSON.stringify(userDB)
        );

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Ошибка изменения книги:", error);
        return res
            .status(500)
            .json({ success: false, message: "Ошибка сервера" });
    }
}

export default handler;
