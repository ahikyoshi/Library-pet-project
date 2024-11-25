import { NextApiRequest, NextApiResponse } from "next";
import { loadDB } from "../utils";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    try {
        const userDB = await loadDB();

        const searchedUser = userDB.find((user) => {
            return user.id === id;
        });

        return res.status(200).json({
            success: true,
            user: {
                display_name: searchedUser?.display_name,
                avatar: searchedUser?.avatar
            }
        });
    } catch {
        return res.status(401).json({ success: false });
    }
}

export default handler;
