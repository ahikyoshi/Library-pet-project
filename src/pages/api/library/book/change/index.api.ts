// libs
import { writeFile } from "fs/promises";
import jwt from "jsonwebtoken";
// utils
import { loadDB } from "../../utils";
// vars
import { JWT_SECRET } from "@/globalVariables";
// types
import { NextApiResponse } from "next";
import { IBook } from "@/globalTypes";
import { IChangedBookRequest } from "./types";

async function handler(req: IChangedBookRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res
            .status(405)
            .json({ success: false, message: "Method not allowed" });
    }

    const token = req.cookies.auth;

    try {
        if (!token) {
            return res.status(401).json({
                success: false,
                message:
                    "Пользован не авторизован или не имеет необходимых прав"
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as {
            login: string,
            id: string,
            role: "user" | "admin"
        };

        if (decoded.role != "admin") {
            return res.status(401).json({
                success: false,
                message:
                    "Пользован не авторизован или не имеет необходимых прав"
            });
        }

        const { changedBook } = req.body;

        const DB: IBook[] = await loadDB();

        const searchedBookIndex = DB.findIndex(
            (book) => book.id === changedBook.id
        );

        if (searchedBookIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Книга не найдена"
            });
        }

        DB[searchedBookIndex] = changedBook;

        await writeFile("./public/data/library/books.json", JSON.stringify(DB));

        return res.status(200).json({
            success: true,
            message: "Книга успешна обновлена"
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
