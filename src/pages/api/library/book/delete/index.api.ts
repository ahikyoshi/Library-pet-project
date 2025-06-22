// libs
import { rm, writeFile } from "fs/promises";
// utils
import { loadDB, verifyAdminToken } from "../../utils";
// types
import { NextApiResponse } from "next";
import { IBook, IServerResponse } from "@/globalTypes";
import { IDeleteBookRequest } from "./types";

export default async function handler(
    req: IDeleteBookRequest,
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
        const { id } = req.body;

        if (typeof id !== "string") {
            throw {
                status: 404,
                message: "ID не найден"
            };
        }

        const DB: IBook[] = await loadDB();

        const searchedBookIndex = DB.findIndex((book) => book.id === id);

        if (searchedBookIndex === -1) {
            throw {
                status: 404,
                message: "Книга не найдена"
            };
        }

        DB.splice(searchedBookIndex, 1);

        await writeFile("./public/data/library/books.json", JSON.stringify(DB));

        const directoryPath = `./public/assets/library/${id}`;
        try {
            await rm(directoryPath, { recursive: true, force: true });
        } catch (error) {
            response.status = 500;
            response.message = "Ошибка при удалении файлов книги";
        }

        response.success = true;
        response.status = 200;
        response.message = "Книга успешно удалена";
    } catch (err: unknown) {
        const error = err as { status?: number, message?: string };

        response.status = error.status ?? 500;
        response.message = error.message ?? "Непредвиденная ошибка на сервере";
    }

    return res.status(response.status).json(response);
}
