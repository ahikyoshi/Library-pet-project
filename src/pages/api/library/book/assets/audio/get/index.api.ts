import { createReadStream, statSync } from "fs";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id, fileName } = req.query;

    if (!id || !fileName) {
        res.status(400).json({
            success: false,
            message: "Неправильный запрос"
        });
        return;
    }

    if (Array.isArray(id) || Array.isArray(fileName)) {
        res.status(502).json({
            success: false,
            message: "Неправильный запрос"
        });
        return;
    }

    const filePath = `./public/assets/library/${id}/audio/${fileName}`;

    try {
        const stat = statSync(filePath);
        const fileSize = stat.size;
        const range = req.headers.range;

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

            if (start >= fileSize || end >= fileSize) {
                res.status(416).setHeader(
                    "Content-Range",
                    `bytes */${fileSize}`
                );
                res.end();
                return;
            }

            const chunkSize = end - start + 1;
            const fileStream = createReadStream(filePath, { start, end });

            res.writeHead(206, {
                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": chunkSize,
                "Content-Type": "audio/mp3"
            });

            fileStream.pipe(res);
        } else {
            res.writeHead(200, {
                "Content-Length": fileSize,
                "Content-Type": "audio/mp3"
            });

            const fileStream = createReadStream(filePath);
            fileStream.pipe(res);
        }
    } catch (err) {
        console.error("Error reading file:", err);
        res.status(500).json({
            success: false,
            message: "Ошибка на сервере"
        });
    }
}
