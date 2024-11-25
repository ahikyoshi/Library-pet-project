import { IBookCard } from "@/globalTypes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const BookCard = ({ id }: { id: string }) => {
    const [content, setContent] = useState<IBookCard | null>(null);
    const [isContentHide, setIsContentHide] = useState<boolean>(false);
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
                          background: `center/cover no-repeat url(/data/library/files/${id}/${id}.webp)`
                      }
                    : { background: "gray" }
            }
            onMouseEnter={() => setIsContentHide(false)}
            onMouseLeave={() => setIsContentHide(true)}
            onClick={() => setIsContentHide((prev) => !prev)}
        >
            {isContentHide && (
                <div className="w-full h-full bg-black/80 p-2 flex flex-col items-center  justify-between">
                    <div className="flex flex-col w-full">
                        <div className="flex justify-end w-full">
                            {content.assets.audio && (
                                <div className="p-1 bg-blue-900 rounded">
                                    <Image
                                        src={"/assets/icons/books/audio.svg"}
                                        width={18}
                                        height={18}
                                        alt="audio"
                                    />
                                </div>
                            )}
                            {content.assets.text && (
                                <div className="p-1 bg-orange-900 rounded ml-1">
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
                            className="bg-indigo-700 py-1 px-2 text-center mt-2 rounded-md"
                        >
                            Читать
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookCard;
