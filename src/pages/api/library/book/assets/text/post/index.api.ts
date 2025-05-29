// libs
import { IncomingForm, File } from "formidable";
import jwt from "jsonwebtoken";
import { writeFile, readFile, mkdir } from "fs/promises";
// utils
import { loadDB } from "../../../../utils";
// vars
import { JWT_SECRET } from "@/globalVariables";
// types
import { NextApiRequest, NextApiResponse } from "next";
import { IBook } from "@/globalTypes";

export const config = {
    api: {
        bodyParser: false
    }
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res
            .status(405)
            .json({ success: false, message: "Method not allowed" });
    }

    const token = req.cookies.auth;

    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: "Пользователь не авторизован" });
    }

    const targetDirectory = `${process.cwd()}/public/assets/library/`;

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {
            login: string,
            role: "user" | "admin"
        };

        if (decoded.role != "admin") {
            return res
                .status(403)
                .json({ success: false, message: "Не достаточно прав" });
        }

        const form = new IncomingForm();

        const { files } = await new Promise<{
            files: Record<string, File[] | undefined>
        }>((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                else resolve({ files });
            });
        });

        if (!files || !files.image) {
            return res
                .status(500)
                .json({ success: false, message: "Файлы не найдены" });
        }

        const uploadedFiles = files.image;

        for (const uploadedFile of uploadedFiles) {
            const fileExtension = uploadedFile.originalFilename
                ?.split(".")
                .pop();
            const baseName = uploadedFile.originalFilename?.replace(
                /\.[^/.]+$/,
                ""
            );

            if (fileExtension != "fb2") {
                res.status(502).json({
                    success: false,
                    message: "Неправильный формат текстового файла"
                });
                return;
            }

            const newFilePath = `${targetDirectory}/${baseName}/text/${baseName}.${fileExtension}`;

            try {
                const fileData: Buffer = await readFile(uploadedFile.filepath);
                await mkdir(`${targetDirectory}/${baseName}/text`, {
                    recursive: true
                });
                await writeFile(newFilePath, Buffer.from(fileData));

                const DB: IBook[] = await loadDB();

                const searchedBookIndex = DB.findIndex(
                    (book) => book.id === baseName
                );

                if (searchedBookIndex === -1) {
                    res.status(404).json({
                        success: false,
                        message: "Книга не найдена"
                    });
                }

                DB[searchedBookIndex].assets.text = true;

                await writeFile(
                    "./public/data/library/books.json",
                    JSON.stringify(DB)
                );

                return res.status(200).json({
                    success: true,
                    message: "Файл успешно загружен",
                    newBook: DB[searchedBookIndex]
                });
            } catch (fileError) {
                console.log(fileError);
                return res.status(500).json({
                    success: false,
                    message: "Ошибка при работе с файлом"
                });
            }
        }
    } catch (err) {
        console.error("Ошибка при обработке файла:", err);
        return res
            .status(500)
            .json({ success: false, message: "Ошибка при обработке файла" });
    }
}
