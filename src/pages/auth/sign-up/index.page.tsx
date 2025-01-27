"use client";

// libs
import Link from "next/link";
import { useEffect, useState } from "react";
// utils
import { handleSubmit } from "./utils";

interface IServerResponse {
    success: boolean;
    message: string;
}

const Page = () => {
    const [Status, setStatus] = useState<null | IServerResponse>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = "Aurora: Регистрация";
    }, []);

    return (
        <main className="w-full h-[calc(100vh-48px)] flex items-center justify-center">
            <form
                onSubmit={(event) =>
                    handleSubmit({ event, setStatus, setIsLoading })
                }
                className="w-4/6 p-4 rounded text-text-light flex flex-col sm:w-1/2 md:w-96 md:border-2 md:border-border"
            >
                <h1 className="mb-4 text-2xl text-center font-bold">
                    Регистрация
                </h1>
                <input
                    className="py-2 border-2 border-border rounded indent-2"
                    type="text"
                    name="login"
                    placeholder="Логин"
                    required
                />
                <input
                    className="my-2 py-2 border-2 border-border rounded indent-2"
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    required
                />
                <input
                    className="mb-2 py-2 border-2 border-border rounded indent-2"
                    type="password"
                    name="password_confirm"
                    placeholder="Подтверждение пароля"
                    required
                />
                <input
                    className="py-2 border-2 border-border rounded indent-2"
                    type="text"
                    name="display_name"
                    placeholder="Отображаемое имя"
                />
                <button
                    className="my-2 py-2 bg-primary text-text-dark rounded"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Загрузка..." : "Зарегистрироваться"}
                </button>
                <div className="w-full mt-2 text-center text-notification underline">
                    {!Status?.success && Status?.message}
                </div>

                <Link
                    href={"/auth/sign-in"}
                    className="w-full mt-2 text-center te-2xt-text-borderLight"
                >
                    Уже есть аккаунт?
                </Link>
            </form>
        </main>
    );
};

export default Page;
