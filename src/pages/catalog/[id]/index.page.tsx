"use client";

// libs
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
// Components
import { Player } from "./components/player/player";
import { Reviews } from "./components/reviews";
import { Content } from "./components/content/content";
import { Cycle } from "./components/cycle/cycle";
// utils
import { fetchBookAndUserData } from "./utils";
// Types
import { IBookPageContent } from "./types";

export default function Page() {
    const router = useRouter();
    const { id } = router.query;

    const [isPlayerOpen, setIsPlayerOpen] = useState(false);
    const [content, setContent] = useState<IBookPageContent | null>(null);

    useEffect(() => {
        if (id) {
            void (async () => {
                try {
                    const pageContent = await fetchBookAndUserData(String(id));
                    if (pageContent) {
                        setContent(pageContent);
                    }
                } catch (error) {
                    console.error("Failed to load book data:", error);
                }
            })();
        }
    }, [id]);

    if (!content) return <div>Загрузка...</div>;

    return (
        <main
            className={clsx(
                "py-4 px-2 container mx-auto",
                isPlayerOpen && "pb-28"
            )}
        >
            <Content
                content={content?.book}
                isAuth={content.isAuth}
                userMeta={content?.user}
                isPlayerOpen={isPlayerOpen}
                setIsPlayerOpen={setIsPlayerOpen}
            />
            <Cycle books={content.series} />
            {content.book.reviews != undefined && (
                <Reviews book={content.book} setContent={setContent} />
            )}
            {isPlayerOpen && content.user && (
                <Player
                    id={String(id)}
                    userMeta={content.user}
                    setContent={setContent}
                />
            )}
        </main>
    );
}
