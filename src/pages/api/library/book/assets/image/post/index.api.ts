// libs
import { IncomingForm, File } from "formidable";
import { writeFile, readFile } from "fs/promises";
// utils
import { loadDB, verifyAdminToken } from "../../../../utils";
// types
import { NextApiRequest, NextApiResponse } from "next";
import { IBook, IServerResponse } from "@/globalTypes";

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

        const uploadedFiles = files.image;
        if (!uploadedFiles || uploadedFiles.length === 0) {
            throw { status: 400, message: "Файл не был отправлен" };
        }

        const uploadedFile = uploadedFiles[0];
        const fileExtension = uploadedFile.originalFilename?.split(".").pop();
        const baseName = uploadedFile.originalFilename?.replace(
            /\.[^/.]+$/,
            ""
        );

        if (fileExtension !== "webp") {
            throw { status: 415, message: "Неверный формат файлов" };
        }

        const newFilePath = `${targetDirectory}/${baseName}/${baseName}.${fileExtension}`;
        const fileData: Buffer = await readFile(uploadedFile.filepath);
        await writeFile(newFilePath, Buffer.from(fileData));

        const DB: IBook[] = await loadDB();
        const book = DB.find((book) => book.id === baseName);

        if (!book) {
            throw { status: 404, message: "Книга с данным ID не найдена" };
        }

        book.assets.image = true;
        await writeFile("./public/data/library/books.json", JSON.stringify(DB));

        response.success = true;
        response.status = 200;
        response.message = "Файл успешно загружен";
    } catch (err: unknown) {
        const error = err as { status?: number, message?: string };

        response.status = error.status ?? 500;
        response.message = error.message ?? "Непредвиденная ошибка на сервере";
    }

    return res.status(response.status).json(response);
}
