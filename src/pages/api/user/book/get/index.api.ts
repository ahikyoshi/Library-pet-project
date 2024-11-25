// libs
import jwt from "jsonwebtoken";
// utils
import { loadDB } from "../../utils";
// vars
import { JWT_SECRET } from "@/globalVariables";
// types
import { IUserBook } from "@/globalTypes";
import { NextApiResponse } from "next";
import { IExtendedNextApiRequest } from "./types";

async function handler(req: IExtendedNextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res
            .status(405)
            .json({ success: false, message: "Method not allowed" });
    }

    const token = req.cookies.auth;

    if (!token) {
        return res.status(401).json({ isAuth: false });
    }
    try {
        const { id } = req.body;
        const decoded = jwt.verify(token, JWT_SECRET) as { login: string };
        const DB = await loadDB();

        const searchedUser = DB.find((user) => {
            return user.login === decoded.login;
        });
        if (!searchedUser) {
            return res.status(404).json({
                isAuth: false,
                book: {
                    _id: id,
                    status: "new",
                    audio: {
                        currentTime: 0,
                        currentChapter: 0
                    }
                }
            });
        }

        const searchedBook: IUserBook | undefined = searchedUser?.library.find(
            (book: IUserBook) => {
                return book._id === id;
            }
        );

        if (!searchedBook) {
            return res.status(200).json({
                isAuth: true,
                book: {
                    _id: id,
                    status: "new",
                    audio: {
                        currentTime: 0,
                        currentChapter: 0
                    }
                }
            });
        }

        return res.status(200).json({ isAuth: true, book: searchedBook });
    } catch (error) {
        res.status(500).send("Oops... server error");
    }
}

export default handler;
