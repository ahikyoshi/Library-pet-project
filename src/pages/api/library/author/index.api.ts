import { IBook, IServerResponse } from "@/globalTypes";
import { NextApiRequest, NextApiResponse } from "next";
import { loadDB } from "../utils";

interface IResponseBody {
    statistic: {
        countOfBooks: number,
        countOfSeries: number
    };
    list: Record<string, IBook[]>;
}

function groupBooksByCycle(books: IBook[]) {
    // Группировка по cycle.title
    const grouped = books.reduce<Record<string, IBook[]>>((acc, book) => {
        const cycleTitle = book.cycle?.title || "Без серии";
        if (!acc[cycleTitle]) {
            acc[cycleTitle] = [];
        }
        acc[cycleTitle].push(book);
        return acc;
    }, {});

    // Количество серий
    const seriesCount = Object.keys(grouped).length;

    return { grouped, seriesCount };
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const response: IServerResponse<IResponseBody | null> = {
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

    const { author } = req.query;
    if (!author || Array.isArray(author)) {
        return res.status(400).json({
            ...response,
            status: 400,
            message: "Неправильный query запрос"
        });
    }

    try {
        const DB: IBook[] = await loadDB();

        const authorBooks = DB.filter((book: IBook) => {
            return book.author === author.replaceAll("-", " ");
        });

        const groupBooks = groupBooksByCycle(authorBooks);

        response.body = {
            statistic: {
                countOfBooks: authorBooks.length,
                countOfSeries: groupBooks.seriesCount
            },
            list: groupBooks.grouped
        };

        response.status = 200;
        response.success = true;
    } catch (err) {
        const error = err as { status?: number, message?: string };

        response.status = error.status ?? 500;
        response.message = error.message ?? "Непредвиденная ошибка на сервере";
    }

    return res.status(response.status).json(response);
}
