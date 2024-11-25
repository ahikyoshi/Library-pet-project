// utils
import { loadDB } from "../../utils";
// types
import { IBook, IBookCard } from "@/globalTypes";
import { NextApiResponse } from "next";
import { IGetBookRequest } from "./types";

async function handler(req: IGetBookRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res
            .status(405)
            .json({ success: false, message: "Method not allowed" });
    }

    try {
        const { id, typeOfResponse } = req.body;

        if (!id || !typeOfResponse) {
            return res.status(400).json({
                success: false,
                message: "Данные запроса не верны"
            });
        }

        const DB: IBook[] = await loadDB();

        const searchedBookIndex = DB.findIndex((book) => book.id === id);

        if (searchedBookIndex === -1) {
            return res.status(400).json({
                success: false,
                message: "Книга не найдена"
            });
        }

        const searchedBook: IBook = DB[searchedBookIndex];

        if (typeOfResponse === "page") {
            const series = DB.filter((book) => {
                return book.cycle.title === DB[searchedBookIndex].cycle.title;
            });

            res.status(200).json({
                success: true,
                body: {
                    book: searchedBook,
                    series: series
                }
            });
        }

        if (typeOfResponse === "card") {
            const searchedBookCard: IBookCard = {
                title: searchedBook.title,
                author: searchedBook.author,
                assets: searchedBook.assets,
                cycle: searchedBook.cycle,
                id: searchedBook.id
            };
            res.status(200).json({
                success: true,
                body: searchedBookCard
            });
        }
    } catch (error) {
        console.log("Ошибка сервера:", error);
        return res.status(500).json({
            success: false,
            message: "Ошибка сервера"
        });
    }
}

export default handler;
