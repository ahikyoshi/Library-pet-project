// libs
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
// types
import { IBookCard } from "@/globalTypes";
import clsx from "clsx";

const BookCard = ({ id }: { id: string }) => {
    const [content, setContent] = useState<IBookCard | null>(null);
    const [isContentHide, setIsContentHide] = useState<boolean>(true);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetch("/api/library/book/get", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                typeOfResponse: "card"
            })
        })
            .then((response) => response.json())
            .then((data: { body: IBookCard }) => setContent(data.body))
            .catch((error) => console.log(error));
    }, []);

    const isTouchDevice = () => {
        return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    };

    useEffect(() => {
        const handleTouchOutside = (event: TouchEvent) => {
            if (
                cardRef.current &&
                !cardRef.current.contains(event.target as Node)
            ) {
                setIsContentHide(true);
            }
        };

        if (isTouchDevice()) {
            document.addEventListener("touchstart", handleTouchOutside);
        }
        return () => {
            document.removeEventListener("touchstart", handleTouchOutside);
        };
    }, []);

    if (!content) {
        return (
            <div className="w-44 h-72 flex items-center justify-center">
                Загружается...
            </div>
        );
    }
    return (
        <div
            className="w-44 h-72 mt-2"
            style={
                content.assets.image
                    ? {
                          background: `center/cover no-repeat url("/api/image?id=${id}")`
                      }
                    : { background: "black" }
            }
            ref={cardRef}
        >
            {!content.assets.image && !isContentHide && (
                <div className="bg-border h-full text-center flex flex-col items-center justify-center">
                    <div className="whitespace-pre-wrap font-bold">
                        {content.title}
                    </div>
                    <div className="whitespace-pre-wrap">
                        Изображение скоро будет ;3
                    </div>
                </div>
            )}
            <div
                className={clsx(
                    "w-full h-full bg-black/80 p-2 flex flex-col items-center justify-between",
                    isContentHide ? "opacity-0" : "opacity-100"
                )}
                onMouseEnter={() => setIsContentHide(false)}
                onMouseLeave={() => setIsContentHide(true)}
                onTouchStart={() => setIsContentHide(false)}
            >
                <div className="flex flex-col w-full">
                    <div className="flex justify-end w-full">
                        {content.assets.audio && (
                            <div className="p-1 bg-primary rounded">
                                <Image
                                    src={"/assets/icons/books/audio.svg"}
                                    width={18}
                                    height={18}
                                    alt="audio"
                                />
                            </div>
                        )}
                        {content.assets.text && (
                            <div className="p-1 bg-primary rounded ml-1">
                                <Image
                                    src={"/assets/icons/books/book.svg"}
                                    width={18}
                                    height={18}
                                    alt="audio"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className="text-center mb-2 w-full h-auto whitespace-pre-wrap">
                    {content.title}
                </div>

                <div className="flex flex-col w-full">
                    <div className="text-xs">{content.author}</div>
                    <div className="text-xs overflow-hidden">
                        {content.cycle.title} #{content.cycle.number}
                    </div>
                    <Link
                        href={`/catalog/${content.id}`}
                        className="mt-2 py-1 px-2 bg-primary text-text-contrast text-center font-bold rounded-md"
                    >
                        Читать
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
