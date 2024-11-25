// libs
import { readdir } from "fs/promises";
// types
import { NextApiResponse } from "next";
import { IPlayerRequest } from "./types";

async function handler(req: IPlayerRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res
            .status(405)
            .json({ success: false, message: "Method not allowed" });
    }

    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Данные запроса не верны"
            });
        }
        const path = `./public/data/library/files/${id}/audio`;

        const tracksList = await readdir(path);

        if (tracksList.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Файлы не найдены"
            });
        }

        res.status(200).json({
            success: true,
            body: tracksList
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
