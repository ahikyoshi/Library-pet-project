"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";

// libs
// utils

export default function Offer() {
    const router = useRouter();

    const handleSubmit = ({ event }: { event: FormEvent<HTMLFormElement> }) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const title = String(formData.get("title")).trim();
        const cycle = String(formData.get("cycle")).trim();
        const author = String(formData.get("author")).trim();

        fetch("/api/library/offer/book", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                author,
                cycle
            })
        })
            .then((res) => res.json())
            .then(
                ({
                    success,
                    message
                }: {
                    success: boolean,
                    message: string
                }) => {
                    if (success) {
                        router.push("/catalog");
                    } else {
                        console.log(message);
                    }
                }
            )
            .catch(() => {
                console.log("something went wrong");
            });
    };
    return (
        <main className="bg-background w-full h-[calc(100vh-48px)] flex items-center justify-center">
            <form
                onSubmit={(event) => handleSubmit({ event })}
                className="space-y-4 px-2 flex flex-col"
            >
                <p className="text-2xl font-bold text-center">
                    Добавление нового произведения
                </p>
                <input
                    className="py-2 border border-secondary rounded indent-2"
                    type="text"
                    name="title"
                    placeholder="Название произведения"
                    required
                />
                <input
                    className="py-2 border border-secondary rounded indent-2"
                    type="text"
                    name="cycle"
                    placeholder="Серия произведения"
                    required
                />
                <input
                    className="py-2 border border-secondary rounded indent-2"
                    type="text"
                    name="author"
                    placeholder="Автор"
                    required
                />
                <button className="py-2 bg-primary text-text-contrast rounded">
                    Предложить произведения
                </button>
            </form>
        </main>
    );
}
