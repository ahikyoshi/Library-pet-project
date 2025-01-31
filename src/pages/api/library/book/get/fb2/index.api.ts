import { readFile } from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res
            .status(405)
            .json({ success: false, message: "Method not allowed" });
    }

    try {
        const { id } = req.query;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                success: false,
                message: "Данные запроса не верны"
            });
        }

        const path = `./public/assets/library/${id}/${id}.fb2`;

        const readerFile = await readFile(path, "utf8");

        if (!readerFile) {
            res.status(404).json({
                success: false,
                message: "Файл не найден"
            });
        }

        res.status(200).json({
            success: true,
            body: readerFile
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Ошибка сервера"
        });
    }
}

export default handler;
