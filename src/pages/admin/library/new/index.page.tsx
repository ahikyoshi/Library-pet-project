"use client";

// libs
import { useState } from "react";
import Link from "next/link";
// utils
import { handleSubmit } from "./utils";
// types
import { IResponse } from "./types";

const Page = () => {
    const [isStatus, setIsStatus] = useState<null | IResponse>(null);
    const [mode, setMode] = useState<"back" | "continue" | "continue-author">(
        "back"
    );
    const [isLoading, setIsLoading] = useState(false);

    return (
        <main className="w-full h-[calc(100vh-48px)] flex items-center justify-center">
            <form
                onSubmit={(event) =>
                    handleSubmit({ event, mode, setIsStatus, setIsLoading })
                }
                className="w-full px-2 flex flex-col"
            >
                <h1 className="mb-4 text-2xl text-center font-bold">
                    Добавление новой книги
                </h1>
                <input
                    className="mb-2 py-2 border border-secondary rounded indent-2"
                    type="text"
                    name="title"
                    placeholder="Название произведения"
                    required
                />
                <input
                    className="mb-2 py-2 border border-secondary rounded indent-2"
                    type="text"
                    name="author"
                    placeholder="Автор произведения"
                    required
                />
                <input
                    className="mb-2 py-2 border border-secondary rounded indent-2"
                    type="text"
                    name="cycle_name"
                    placeholder="Название цикла"
                    required
                />
                <input
                    className="mb-2 py-2 border border-secondary rounded indent-2"
                    type="number"
                    name="cycle_number"
                    placeholder="Номер"
                    required
                />
                <input
                    className="mb-2 py-2 border border-secondary rounded indent-2"
                    type="text"
                    name="description"
                    placeholder="Описание"
                    required
                />
                <input
                    className="mb-2 py-2 border border-secondary rounded indent-2"
                    type="number"
                    name="writtingDate"
                    placeholder="Дата написания"
                    required
                />
                <div className="w-full mt-2 text-center text-notification underline">
                    {!isStatus?.success && isStatus?.message}
                </div>

                <button
                    className="py-2 bg-primary text-text-dark rounded"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Загрузка..." : "Добавить книгу"}
                </button>
                <button
                    className="my-2 py-2 border-2 border-primary text-text-dark rounded"
                    type="submit"
                    onClick={() => {
                        setMode("continue");
                    }}
                >
                    Продолжить с той же серии
                </button>
                <button
                    className="py-2 border-2 border-primary text-text-dark rounded"
                    type="submit"
                    onClick={() => {
                        setMode("continue-author");
                    }}
                >
                    Продолжить с автора
                </button>
                <Link
                    href={"/admin/library"}
                    className="w-full mt-2 text-center text-text-secondary"
                >
                    Назад
                </Link>
            </form>
        </main>
    );
};

export default Page;
