// libs
import { readFile } from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
// types
import { IServerResponse } from "@/globalTypes";

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

    const { id } = req.query;
    if (!id || Array.isArray(id)) {
        return res.status(400).json({
            ...response,
            status: 400,
            message: "Неправильный query запрос"
        });
    }

    try {
        const body = await readFile(
            `./public/assets/library/${id}/text/${id}.fb2`
        );

        response.status = 200;

        res.setHeader("Content-type", "image/webp");

        res.status(200).send(body);
    } catch (err) {
        const error = err as { status?: number, message?: string };

        response.status = error.status ?? 500;
        response.message = error.message ?? "Непредвиденная ошибка на сервере";
    }

    return res.status(response.status).json(response);
}
