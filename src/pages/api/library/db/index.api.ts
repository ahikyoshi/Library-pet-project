import { NextApiRequest, NextApiResponse } from "next";
import { IServerResponse } from "@/globalTypes";
import { readFile } from "fs/promises";
import path from "path";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const response: IServerResponse<null> = {
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

    const token = req.cookies.auth;

    if (!token) {
        return res.status(401).json({ message: "Не авторизован" });
    }
    if (!token || Array.isArray(token)) {
        return res.status(400).json({
            ...response,
            status: 400,
            message: "Неправильный query запрос"
        });
    }

    try {
        const filePath = path.join(
            process.cwd(),
            "public/data/library/books.json"
        );
        const fileBuffer = await readFile(filePath);

        response.status = 200;
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Content-Disposition", "attachment; filename=books.json");
        res.setHeader("Content-Length", fileBuffer.length);

        res.status(200).send(fileBuffer);
    } catch (err) {
        const error = err as { status?: number, message?: string };

        response.status = error.status ?? 500;
        response.message = error.message ?? "Непредвиденная ошибка на сервере";
    }

    return res.status(response.status).json(response);
}
