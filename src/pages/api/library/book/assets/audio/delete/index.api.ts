import { IServerResponse } from "@/globalTypes";
import { verifyAdminToken } from "@/pages/api/library/utils";
import { rm } from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let response: IServerResponse<null> = {
        success: false,
        status: 0,
        message: "_blank_",
        body: null
    };

    if (req.method !== "DELETE") {
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

    const { id, target } = req.query;

    if (
        Array.isArray(id) ||
        id === undefined ||
        Array.isArray(target) ||
        target === undefined
    ) {
        return res.status(404).json({
            ...response,
            status: 404,
            message: "ID не найден"
        });
    }

    try {
        const audioPath = `./public/assets/library/${id}/audio/${target}`;

        await rm(audioPath);

        response.success = true;
        response.message = "Успешно удалено";
        response.status = 200;
    } catch (err: unknown) {
        const error = err as { status?: number, message?: string };

        response.status = error.status ?? 500;
        response.message = error.message ?? "Непредвиденная ошибка на сервере";
    }

    return res.status(response.status).json(response);
}
