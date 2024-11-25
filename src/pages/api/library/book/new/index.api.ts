// libs
import { mkdir, writeFile } from "fs/promises";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
// utils
import { loadDB } from "../../utils";
// vars
import { JWT_SECRET } from "@/globalVariables";
// types
import { NextApiResponse } from "next";
import { INewBookRequest } from "./types";
import { TDecoded } from "@/pages/api/types";
import { IBook } from "@/globalTypes";

async function handler(req: INewBookRequest, res: NextApiResponse) {
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

        const decoded = jwt.verify(token, JWT_SECRET) as TDecoded;

        if (decoded.role != "admin") {
            return res.status(401).json({
                success: false,
                message:
                    "Пользован не авторизован или не имеет необходимых прав"
            });
        }

        const { title, author, cycle, description, meta } = req.body;

        if (!title || !author || !cycle || !description || !meta) {
            return res.status(400).json({
                success: false,
                message: "Данные запроса не верны"
            });
        }

        const DB: IBook[] = await loadDB();

        const today = new Date();

        const formatedDate = `${String(today.getDate()).padStart(2, "0")}.${String(today.getMonth()).padStart(2, "0")}.${String(today.getFullYear())}`;

        const uuid = randomUUID();

        const newBook: IBook = {
            title: title,
            author: author,
            cycle: cycle,
            description: description,
            assets: {
                image: false,
                audio: false,
                text: false
            },
            meta: {
                addedDate: formatedDate,
                writtingDate: meta.writtingDate
            },
            reviews: [],
            id: uuid
        };

        DB.push(newBook);

        await writeFile("./public/data/library/books.json", JSON.stringify(DB));

        await mkdir(`./public/data/library/files/${newBook.id}`);

        return res.status(200).json({
            success: true,
            message: "Книга успешна создана"
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
