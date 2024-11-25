// libs
import argon2 from "argon2";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
// utils
import { loadDB } from "../../user/utils";
// types
import { IUser } from "@/globalTypes";
import { NextApiResponse } from "next";
import { JWT_SECRET } from "@/globalVariables";
import { ILoginRequest } from "./types";

export default async function handler(
    req: ILoginRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { login, password } = req.body;

        if (
            !login ||
            typeof login !== "string" ||
            login.trim() === "" ||
            !password ||
            typeof password !== "string" ||
            password.trim() === ""
        ) {
            return res.status(400).json({ message: "Неверные данные запроса" });
        }

        const userDB: IUser[] = await loadDB();

        const searchedUser: IUser | undefined = userDB.find(
            (user) => user.login === login
        );

        if (!searchedUser) {
            return res.status(401).json({
                success: false,
                message: "Неверный логин или пароль"
            });
        }

        const isPasswordValid = await argon2.verify(
            searchedUser.password,
            password
        );
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Неверный логин или пароль"
            });
        }

        const role = searchedUser.role;

        const id = searchedUser.id;

        const token = jwt.sign({ id, login, role }, JWT_SECRET, {
            expiresIn: "30d"
        });

        res.setHeader(
            "Set-Cookie",
            serialize("auth", token, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 30,
                path: "/"
            })
        );

        res.status(200).json({
            success: true,
            message: "Успешная авторизация"
        });
    } catch (error) {
        console.error("Ошибка авторизации:", {
            message: error instanceof Error ? error.message : error,
            stack: error instanceof Error ? error.stack : null,
            body: req.body.login
        });

        res.status(500).json({ message: "Ошибка сервера" });
    }
}
