    import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (!id || Array.isArray(id)) {
        return res
            .status(400)
            .json({ success: false, message: "Неправильный query запрос" });
    }

    const imagePath = path.join(
        process.cwd(),
        `public/assets/library/${id}/text/${id}.fb2`
    );

    fs.stat(imagePath, (err, stats) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: "Ошибка на сервере"
            });
            console.log(`Error from upload text file meta: `, err);
        }

        const meta = {
            size: stats.size,
            modified: stats.mtime
        };

        res.status(200).json({ success: true, body: meta });
    });
}
