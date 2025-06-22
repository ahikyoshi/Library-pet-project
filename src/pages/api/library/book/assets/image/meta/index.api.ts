// libs
import { NextApiRequest, NextApiResponse } from "next";
import { writeFile } from "fs/promises";
import path from "path";
// utils
import { getFileMeta, loadDB } from "@/pages/api/library/utils";
// types
import { IBook, IServerResponse, TMeta } from "@/globalTypes";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let response: IServerResponse<TMeta | null> = {
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

    const { id } = req.query;
    if (!id || Array.isArray(id)) {
        return res.status(400).json({
            ...response,
            status: 400,
            message: "Неправильный query запрос"
        });
    }

    const imagePath = path.join(
        process.cwd(),
        `public/assets/library/${id}/${id}.webp`
    );

    try {
        response = await getFileMeta(imagePath);

        if (response.status === 404) {
            const DB: IBook[] = await loadDB();
            const searchedBookIndex = DB.findIndex((book) => book.id === id);
            DB[searchedBookIndex].assets.image = false;

            await writeFile(
                "./public/data/library/books.json",
                JSON.stringify(DB)
            );
        }
    } catch (err) {
        const error = err as { status?: number, message?: string };

        response.status = error.status ?? 500;
        response.message = error.message ?? "Непредвиденная ошибка на сервере";
    }

    return res.status(response.status).json(response);
}
