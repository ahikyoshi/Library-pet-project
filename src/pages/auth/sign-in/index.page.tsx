"use client";

// libs
import Link from "next/link";
import { useEffect, useState } from "react";
// utils
import { handleSubmit } from "./utils";
// types
import { IServerResponse } from "./types";
import { Svg } from "@/components/Svg";

const Page = () => {
    const [status, setStatus] = useState<null | IServerResponse>(null);
    const [isPasswordHide, setIsPasswordHide] = useState(true);
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
                className="w-4/6 p-4 rounded text-text-light flex flex-col  sm:w-1/2 md:w-96 md:border md:border-border"
            >
                <h1 className="mb-4 text-2xl text-center font-bold">
                    Авторизация
                </h1>
                <input
                    className="py-2 border-2 border-border rounded indent-2"
                    type="text"
                    name="login"
                    placeholder="Логин"
                    required
                />
                <div className="my-2 p-2 border-2 border-border rounded flex">
                    <input
                        className="w-full"
                        type={isPasswordHide ? "password" : "text"}
                        name="password"
                        placeholder="Пароль"
                        required
                    />
                    <div
                        className="ml-2"
                        onClick={() => setIsPasswordHide((prev) => !prev)}
                    >
                        <Svg
                            src={`/assets/icons/auth/theme/visibility${isPasswordHide ? "_off" : ""}.svg`}
                            size={24}
                        />
                    </div>
                </div>
                <button
                    className="py-2 bg-primary text-text-contrast rounded"
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
                    className="w-full mt-2 text-center text-text-secondary"
                >
                    Еще нет аккаунта?
                </Link>
            </form>
        </main>
    );
};

export default Page;
