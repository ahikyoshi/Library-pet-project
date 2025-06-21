import { IBook, IServerResponse, TMeta } from "@/globalTypes";
import { readdir, readFile, stat } from "fs/promises";
import jwt from "jsonwebtoken";
import fs from "fs";
import { JWT_SECRET } from "@/globalVariables";
import path, { join } from "path";

export let bookCache: IBook[] | null;

export async function loadDB() {
    if (!bookCache) {
        const stringDB = (
            await readFile("./public/data/library/books.json")
        ).toString();
        bookCache = JSON.parse(stringDB) as IBook[];
    }
    return bookCache;
}

export function verifyAdminToken(
    response: IServerResponse<null>,
    token: string | undefined
) {
    if (!token) {
        return {
            ...response,
            status: 401,
            message: "Пользователь не авторизован"
        };
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
        login: string,
        id: string,
        role: "user" | "admin"
    };

    if (decoded.role !== "admin") {
        return {
            ...response,
            status: 403,
            message: "Пользован не авторизован или не имеет необходимых прав"
        };
    }

    return response;
}

export async function getFolderMeta(
    folderPath: string,
    mode: "total" | "list" = "total"
): Promise<IServerResponse<TMeta[] | number | null>> {
    const response: IServerResponse<TMeta[] | number | null> = {
        success: false,
        message: "_blank",
        body: null,
        status: 0
    };

    async function walk(path: string): Promise<TMeta[]> {
        const entries = await readdir(path, { withFileTypes: true });
        const results: TMeta[] = [];

        for (const entry of entries) {
            const fullPath = join(path, entry.name);
            if (entry.isDirectory()) {
                results.push(...(await walk(fullPath)));
            } else if (entry.isFile()) {
                const stats = await stat(fullPath);
                results.push({
                    size: stats.size,
                    name: entry.name,
                    modified: stats.mtime
                });
            }
        }

        return results;
    }

    try {
        const filesMeta = await walk(folderPath);

        response.success = true;
        response.status = 200;
        response.message = "OK";
        response.body =
            mode === "total"
                ? {
                      modified: filesMeta[0].modified,
                      size: filesMeta.reduce((sum, file) => sum + file.size, 0)
                  }
                : filesMeta;
    } catch (err: unknown) {
        response.status = 500;
        response.message = "Ошибка на сервере";
    }

    return response;
}

export function getFileMeta(
    imagePath: string
): Promise<IServerResponse<TMeta | null>> {
    return new Promise((resolve) => {
        const response: IServerResponse<TMeta | null> = {
            success: false,
            message: "_blank",
            body: null,
            status: 0
        };

        const baseName = path.basename(imagePath);

        fs.stat(imagePath, (err, stats) => {
            if (err) {
                if (err.code === "ENOENT") {
                    response.status = 404;
                    response.message = "Файл не найден";
                } else {
                    response.status = 500;
                    response.message = "Ошибка на сервере";
                }
                return resolve(response);
            }
            console.log(baseName);
            response.status = 200;
            response.success = true;
            response.body = {
                name: baseName,
                size: stats.size,
                modified: stats.mtime
            };

            return resolve(response);
        });
    });
}
