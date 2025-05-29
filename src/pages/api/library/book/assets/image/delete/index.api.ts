import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/globalVariables";
import { rm, writeFile } from "fs/promises";
import { IBook } from "@/globalTypes";
import { loadDB } from "../../../../utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const token = req.cookies.auth;
    const { id } = req.query;

    console.log(id);

    if (Array.isArray(id) || id === undefined) {
        return res.status(402).json({
            success: false,
            message: "Неправильный запрос от клиента"
        });
    }

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

        if (decoded.role !== "admin") {
            return res.status(401).json({
                success: false,
                message:
                    "Пользован не авторизован или не имеет необходимых прав"
            });
        }

        const imagePath = `./public/assets/library/${id}/${id}.webp`;

        await rm(imagePath);

        const DB: IBook[] = await loadDB();

        const searchedBookIndex = DB.findIndex((book) => book.id === id);

        DB[searchedBookIndex].assets.image = false;

        await writeFile("./public/data/library/books.json", JSON.stringify(DB));

        return res
            .status(200)
            .json({ success: true, message: "Успешно удалено" });
    } catch (error) {
        console.error("image delete error:", error);
        res.status(500).json({
            success: false,
            message: "Произошла ошибка на сервере"
        });
    }
}
