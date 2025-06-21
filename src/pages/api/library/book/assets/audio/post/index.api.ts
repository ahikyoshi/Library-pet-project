// libs
import { IncomingForm, File } from "formidable";
import jwt from "jsonwebtoken";
import { writeFile, readFile, mkdir, access } from "fs/promises";
// utils
// vars
import { JWT_SECRET } from "@/globalVariables";
// types
import { NextApiRequest, NextApiResponse } from "next";
import { IBook, IServerResponse } from "@/globalTypes";
import { loadDB, verifyAdminToken } from "@/pages/api/library/utils";

export const config = {
    api: {
        bodyParser: false
    }
};

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

    if (req.method !== "POST") {
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

    const { id } = req.query;
    if (id === undefined) {
        return res.status(405).json({
            ...response,
            status: 404,
            message: "ID не найден"
        });
    }

    const targetDirectory = `${process.cwd()}/public/assets/library/`;

    try {
        const form = new IncomingForm();
        const { files } = await new Promise<{
            files: Record<string, File[] | undefined>
        }>((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err)
                    reject({ status: 400, message: "Ошибка разбора формы" });
                else resolve({ files });
            });
        });

        for (const [key, value] of Object.entries(files)) {
            if (key.startsWith("audio_") && value && value.length > 0) {
                const uploadedFile = value[0];
                const fileExtension = uploadedFile.originalFilename
                    ?.split(".")
                    .pop();
                const baseName = uploadedFile.originalFilename?.replace(
                    /\.[^/.]+$/,
                    ""
                );

                if (fileExtension != "mp3") {
                    throw { status: 415, message: "Неверный формат файлов" };
                }

                try {
                    await access(`${targetDirectory}/${id}/audio`);
                } catch {
                    await mkdir(`${targetDirectory}/${id}/audio`, {
                        recursive: true
                    });
                }

                const newFilePath = `${targetDirectory}${id}/audio/${baseName}.${fileExtension}`;
                const fileData: Buffer = await readFile(uploadedFile.filepath);
                await writeFile(newFilePath, Buffer.from(fileData));
            }
        }

        const DB: IBook[] = await loadDB();

        const searchedBookIndex = DB.findIndex((book) => book.id === id);

        DB[searchedBookIndex].assets.audio = true;

        await writeFile("./public/data/library/books.json", JSON.stringify(DB));

        res.status(200).json({
            success: true,
            message: "Success added",
            body: DB[searchedBookIndex]
        });
    } catch (err: unknown) {
        const error = err as { status?: number, message?: string };

        response.status = error.status ?? 500;
        response.message = error.message ?? "Непредвиденная ошибка на сервере";
    }

    return res.status(response.status).json(response);
}
