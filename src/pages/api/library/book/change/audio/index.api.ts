// libs
import { IncomingForm, File, Fields, Files } from "formidable";
import { writeFile, readFile, mkdir } from "fs/promises";
import jwt from "jsonwebtoken";
// utils
import { loadDB } from "../../../utils";
// vars
import { JWT_SECRET } from "@/globalVariables";
// types
import { IBook } from "@/globalTypes";
import { NextApiRequest, NextApiResponse } from "next";

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

    const targetDirectory = `${process.cwd()}/public/data/library/files`;

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

        const form = new IncomingForm({
            multiples: true,
            maxTotalFileSize: 1024 * 1024 * 1024
        });

        const { fields, files } = await new Promise<{
            fields: Record<string, string>,
            files: Record<string, File | File[] | undefined>
        }>((resolve, reject) => {
            form.parse(req, (err, rawFields: Fields, rawFiles: Files) => {
                if (err) reject(err);
                else {
                    const transformedFields: Record<string, string> = {};

                    for (const key in rawFields) {
                        const value = rawFields[key];
                        if (typeof value === "string") {
                            transformedFields[key] = value;
                        } else if (Array.isArray(value)) {
                            transformedFields[key] = value.join(",");
                        } else {
                            transformedFields[key] = "";
                        }
                    }

                    resolve({
                        fields: transformedFields,
                        files: rawFiles as Record<
                            string,
                            File | File[] | undefined
                        >
                    });
                }
            });
        });

        const message = fields.message;

        if (!files || !files.audio) {
            return res
                .status(400)
                .json({ success: false, message: "Файлы не найдены" });
        }

        const uploadedFiles = Array.isArray(files.audio)
            ? files.audio
            : [files.audio];

        const DB: IBook[] = await loadDB();
        const processedFiles: string[] = [];

        for (const uploadedFile of uploadedFiles) {
            if (!uploadedFile.filepath) {
                return res.status(500).json({
                    success: false,
                    message: "Временный файл отсутствует"
                });
            }

            const originalFilename = uploadedFile.originalFilename;

            if (!originalFilename) {
                return res.status(500).json({
                    success: false,
                    message: "Оригинальное имя файла отсутствует"
                });
            }
            const newDirectory = `${targetDirectory}/${message}/audio`;
            const newFilePath = `${newDirectory}/${originalFilename}`;

            try {
                await mkdir(newDirectory, { recursive: true });

                const fileData = await readFile(uploadedFile.filepath);
                await writeFile(newFilePath, fileData);

                processedFiles.push(originalFilename);
            } catch (fileError) {
                res.status(500).json({
                    success: false,
                    message: "Ошибка обработки файла"
                });
                console.error("Ошибка при работе с файлом:", fileError);
            }
        }
        const searchedBookIndex = DB.findIndex((book) => {
            return book.id === message[0];
        });
        if (searchedBookIndex === -1) {
            res.status(404).json({
                success: false,
                message: "Книга не найдена"
            });
        }

        DB[searchedBookIndex].assets.audio = true;

        await writeFile(
            "./public/data/library/books.json",
            JSON.stringify(DB, null, 2)
        );

        return res.status(200).json({
            success: true,
            message: "Файлы успешно загружены"
        });
    } catch (err) {
        console.error("Ошибка при обработке файла:", err);
        return res.status(500).json({ error: "Ошибка при обработке файла" });
    }
}
