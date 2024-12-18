"use client";

// libs
import Link from "next/link";
import { useEffect, useState } from "react";
// utils
import { handleSubmit } from "./utils";
// types
import { IServerResponse } from "./types";

const Page = () => {
    const [status, setStatus] = useState<null | IServerResponse>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = "Aurora: Авторизация";
    }, []);

    return (
        <main className="w-full h-[calc(100vh-48px)] flex items-center justify-center">
            <form
                onSubmit={(event) =>
                    handleSubmit({ event, setStatus, setIsLoading })
                }
                className="w-4/6 p-4 rounded text-text-light flex flex-col"
            >
                <h1 className="mb-4 text-2xl text-center font-bold">
                    Авторизация
                </h1>
                <input
                    className="py-2 border border-secondary rounded indent-2"
                    type="text"
                    name="login"
                    placeholder="Логин"
                    required
                />
                <input
                    className="my-2 py-2 border border-secondary rounded indent-2"
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    required
                />
                <button
                    className="py-2 bg-primary text-text-dark rounded"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Загрузка..." : "Авторизироваться"}
                </button>
                <div className="w-full mt-2 text-center text-notification underline">
                    {!status?.success && status?.message}
                </div>
                <Link
                    href={"/auth/sign-up"}
                    className="w-full mt-2 text-center text-text-secondaryLight"
                >
                    Еще нет аккаунта?
                </Link>
            </form>
        </main>
    );
};

export default Page;
