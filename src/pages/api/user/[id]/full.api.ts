import { NextApiRequest, NextApiResponse } from "next";
import { loadDB } from "../utils";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    try {
        const userDB = await loadDB();

        const searchedUser = userDB.find((user) => {
            return user.id === id;
        });

        if (!searchedUser) {
            res.status(400).json({
                success: false,
                message: "пользователь не найден"
            });
        }

        return res.status(200).json({
            success: true,
            user: {
                avatar: searchedUser?.avatar,
                display_name: searchedUser?.display_name,
                library: searchedUser?.library
            }
        });
    } catch (error) {
        console.log("Ошибка сервера:", error);
        return res.status(500).json({
            success: false,
            message: "Ошибка сервера"
        });
    }
}

export default handler;
