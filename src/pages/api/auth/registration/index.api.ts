// Libs
import { randomUUID } from "crypto";
import { writeFile } from "fs/promises";
import argon2 from "argon2";
// utils
import { Validate } from "./utils";
import { loadDB } from "../../user/utils";
// types
import { IUser } from "@/globalTypes";
import { NextApiResponse } from "next";
import { IRegistrationRequest } from "./types";

export default async function handler(
    req: IRegistrationRequest,
    res: NextApiResponse
) {
    try {
        const { login, password, display_name } = req.body;

        const validationResult = Validate(login, password);

        if (!validationResult.valid) {
            return res.status(400).json({
                success: false,
                message: validationResult.message
            });
        }
        if (
            !login ||
            typeof login !== "string" ||
            login.trim() === "" ||
            !password ||
            typeof password !== "string" ||
            password.trim() === ""
        ) {
            return res.status(400).json({
                success: false,
                message: "Неверные данные запроса"
            });
        }

        const DB: IUser[] = await loadDB();

        const existensUser = DB.find((user) => user.login === login);
        if (existensUser) {
            return res.status(409).json({
                success: false,
                message: "Пользователь уже существует"
            });
        }

        const uuid = randomUUID();
        const hashedPassword = await argon2.hash(password);

        const newUser: IUser = {
            login: login,
            password: hashedPassword,
            display_name: display_name?.trim() || "anonimus",
            role: "user",
            avatar: "",
            library: [],
            id: uuid
        };

        DB.push(newUser);

        await writeFile("./public/data/users/users.json", JSON.stringify(DB));

        res.status(201).json({
            success: true,
            message: "Пользователь успешно зарегистрирован"
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
