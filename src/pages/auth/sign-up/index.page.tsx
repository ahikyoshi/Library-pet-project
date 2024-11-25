"use client";

// libs
import Link from "next/link";
import { useState } from "react";
// utils
import { handleSubmit } from "./utils";

interface IServerResponse {
    success: boolean;
    message: string;
}

const Page = () => {
    const [Status, setStatus] = useState<null | IServerResponse>(null);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <main className="w-screen h-screen flex items-center justify-center">
            <form
                onSubmit={(event) =>
                    handleSubmit({ event, setStatus, setIsLoading })
                }
                className="bg-slate-800 w-4/6 p-4 rounded flex flex-col"
            >
                <input
                    className="mb-4 border-b border-slate-600"
                    type="text"
                    name="login"
                    placeholder="Логин"
                    required
                />
                <input
                    className="mb-4 border-b border-slate-600"
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    required
                />
                <input
                    className="mb-4 border-b border-slate-600"
                    type="text"
                    name="display_name"
                    placeholder="Отображаемое имя"
                />
                <button
                    className="w-full bg-slate-600 p-2 rounded"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Загрузка..." : "Зарегистрироваться"}
                </button>
                <div className="mt-2 w-full text-center text-rose-600">
                    {!Status?.success && Status?.message}
                </div>

                <Link
                    href={"/auth/sign-in"}
                    className="w-full mt-2 text-center"
                >
                    Уже есть аккаунт?
                </Link>
            </form>
        </main>
    );
};

export default Page;
