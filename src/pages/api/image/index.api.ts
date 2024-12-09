import { readFile } from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;

    if (!id || Array.isArray(id)) {
        res.status(400).json({
            success: false,
            message: "Неправильный запрос"
        });
        return;
    }

    try {
        const data = await readFile(`./public/assets/library/${id}/${id}.webp`);

        res.setHeader("Content-type", "image/webp");

        res.status(200).send(data);
    } catch (error) {
        console.error("Error reading file: ", error);
        res.status(404).json({ success: false, message: "Ошибка сервера" });
    }
}
