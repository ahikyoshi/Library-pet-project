/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { readFile } from "fs/promises";
import { parseBuffer } from "music-metadata";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id, fileName } = req.query;

    if (!id || !fileName) {
        res.status(400).json({
            success: false,
            message: "Неправильный запрос"
        });
        return;
    }

    if (Array.isArray(id) || Array.isArray(fileName)) {
        res.status(502).json({
            success: false,
            message: "Неправильный запрос"
        });
        return;
    }

    try {
        const file = await readFile(
            `./public/assets/library/${id}/audio/${fileName}`
        );

        const buffer = await parseBuffer(file);

        const duration = buffer.format.duration;

        res.status(200).json({ success: true, message: duration });
    } catch (error) {
        res.status(500).json({ success: false, message: "Ошиька сервера" });
        console.log("Read file error: ", error);
    }
}
