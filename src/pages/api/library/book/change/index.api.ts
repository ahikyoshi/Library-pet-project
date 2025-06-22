// libs
import { writeFile } from "fs/promises";
// utils
import { loadDB, verifyAdminToken } from "../../utils";
// types
import { NextApiResponse } from "next";
import { IBook, IServerResponse } from "@/globalTypes";
import { IChangedBookRequest } from "./types";

export default async function handler(
    req: IChangedBookRequest,
    res: NextApiResponse
) {
    let response: IServerResponse<null> = {
        success: false,
        status: 0,
        message: "_blank_",
        body: null
    };

    if (req.method !== "POST") {
        return res.status(405).json({
            ...response,
            status: 405,
            message: "Method not allowed"
        });
    }

    const token = req.cookies.auth;

    response = verifyAdminToken(response, token);

    if (response.status != 0) {
        return res.status(response.status).json(response);
    }

    try {
        const { changedBook } = req.body;

        const DB: IBook[] = await loadDB();

        const searchedBookIndex = DB.findIndex(
            (book) => book.id === changedBook.id
        );

        if (searchedBookIndex === -1) {
            throw { status: 404, message: "Книга с данным ID не найдена" };
        }

        DB[searchedBookIndex] = changedBook;

        await writeFile("./public/data/library/books.json", JSON.stringify(DB));

        response.success = true;
        response.status = 200;
        response.message = "Файл успешно загружен";
    } catch (err: unknown) {
        const error = err as { status?: number, message?: string };

        response.status = error.status ?? 500;
        response.message = error.message ?? "Непредвиденная ошибка на сервере";
    }

    return res.status(response.status).json(response);
}
