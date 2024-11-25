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
import { IReviewRequest } from "./types";

async function handler(req: IReviewRequest, res: NextApiResponse) {
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
                message: "Пользователь не авторизован"
            });
        }
        const decoded = jwt.verify(token, JWT_SECRET) as {
            login: string,
            id: string
        };

        const { bookID, review } = req.body;

        if (!bookID || !review) {
            return res.status(400).json({
                success: false,
                message: "Отсутсвует необходимые данные"
            });
        }

        const DB: IBook[] = await loadDB();

        const searchedBookIndex = DB.findIndex((book) => book.id === bookID);

        if (searchedBookIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Книга не найдена"
            });
        }

        const today = new Date();
        const newReview = {
            userID: decoded.id,
            content: review,
            addedDate: `${String(today.getDate()).padStart(2, "0")}.${String(today.getMonth()).padStart(2, "0")}.${String(today.getFullYear())}`
        };
        const oldReviewIndex = DB[searchedBookIndex].reviews.findIndex(
            (review) => review.userID === decoded.id
        );

        if (oldReviewIndex === -1) {
            DB[searchedBookIndex].reviews.push(newReview);
        } else {
            DB[searchedBookIndex].reviews[oldReviewIndex] = newReview;
        }

        await writeFile("./public/data/library/books.json", JSON.stringify(DB));

        return res.status(200).json({
            success: true,
            newBook: DB[searchedBookIndex]
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
