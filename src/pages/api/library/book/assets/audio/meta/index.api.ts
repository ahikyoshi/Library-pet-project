import { IServerResponse, TMeta } from "@/globalTypes";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { getFolderMeta } from "@/pages/api/library/utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let response: IServerResponse<null | TMeta | TMeta[]> = {
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

    const { id, target } = req.query;
    if (!id || Array.isArray(id) || !target || Array.isArray(target)) {
        return res.status(400).json({
            ...response,
            status: 400,
            message: "Неправильный query запрос"
        });
    }

    const audioDir = path.join(
        process.cwd(),
        `public/assets/library/${id}/audio/`
    );

    try {
        response = await getFolderMeta(audioDir, target);
    } catch (err) {
        const error = err as { status?: number, message?: string };

        response.status = error.status ?? 500;
        response.message = error.message ?? "Непредвиденная ошибка на сервере";
    }

    return res.status(response.status).json(response);
}
