import { IBook, IServerResponse } from "@/globalTypes";
import { NextApiRequest, NextApiResponse } from "next";
import { loadDB } from "../../utils";

function getUniqueAuthors(books: IBook[]): string[] {
    // Получаем массив авторов
    const authors = books.map((book) => book.author);

    // Создаем Set для уникальности
    const uniqueAuthors = Array.from(new Set(authors));

    // Сортируем по алфавиту
    uniqueAuthors.sort((a, b) => a.localeCompare(b));

    return uniqueAuthors;
}

export default async function name(req: NextApiRequest, res: NextApiResponse) {
    const response: IServerResponse<string[] | null> = {
        success: false,
        status: 0,
        message: "_blank_",
        body: null
    };

    if (req.method !== "GET") {
        return res.status(405).json({
            ...response,
            status: 405,
            message: "Method not allowed"
        });
    }

    try {
        const DB: IBook[] = await loadDB();

        const listOfAuthors = getUniqueAuthors(DB);

        response.body = listOfAuthors;
        response.status = 200;
        response.success = true;
    } catch (err) {
        const error = err as { status?: number, message?: string };

        response.status = error.status ?? 500;
        response.message = error.message ?? "Непредвиденная ошибка на сервере";
    }

    return res.status(response.status).json(response);
}
