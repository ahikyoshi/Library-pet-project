import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/globalVariables";
import { TDecoded } from "../../types";
import { readFile, writeFile } from "fs/promises";

interface IOfferRequest extends NextApiRequest {
    body: {
        title: string,
        cycle: string,
        author: string
    };
}

interface IOfferDateBase {
    title: string;
    cycle: string;
    author: string;
    userID: string;
    date: string;
}

async function handler(req: IOfferRequest, res: NextApiResponse) {
    const token = req.cookies.auth;

    try {
        if (!token) {
            return res.status(401).json({
                success: false,
                message:
                    "Пользован не авторизован или не имеет необходимых прав"
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as TDecoded;

        const { title, cycle, author } = req.body;

        if (!title || !author || !cycle) {
            return res.status(400).json({
                success: false,
                message: "Данные запроса не верны"
            });
        }

        const today = new Date();
        const formatedDate = `${String(today.getDate()).padStart(2, "0")}.${String(today.getMonth()).padStart(2, "0")}.${String(today.getFullYear())}`;

        const offer = {
            title: title,
            cycle: cycle,
            author: author,
            userID: decoded.id,
            date: formatedDate
        };

        const offerDB = (
            await readFile("./public/data/offers/books.json")
        ).toString();

        const DB = JSON.parse(offerDB) as IOfferDateBase[];

        DB.push(offer);

        console.log("check:", DB);

        await writeFile("./public/data/offers/books.json", JSON.stringify(DB));

        res.status(200).json({ success: true, message: "Добавлена" });
    } catch (error) {
        console.log("Ошибка сервера:", error);
        return res.status(500).json({
            success: false,
            message: "Ошибка сервера"
        });
    }
}

export default handler;
