import Loading from "@/components/Loading/Loading";
import { IBook, IServerResponse } from "@/globalTypes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface IResponseBody {
    statistic: {
        countOfBooks: number,
        countOfSeries: number
    };
    list: Record<string, IBook[]>;
}

export default function Page() {
    const router = useRouter();
    const { author } = router.query;

    const [authorTitle, setAuthorTitle] = useState("");
    const [content, setContent] = useState<null | IResponseBody>(null);

    useEffect(() => {
        if (author != undefined && !Array.isArray(author)) {
            setAuthorTitle(author.replace("-", " "));
            document.title = authorTitle;
            fetch(`/api/library/author?author=${author}`)
                .then((res) => res.json())
                .then((data: IServerResponse<IResponseBody>) => {
                    if (data.success) {
                        setContent(data.body);
                    } else {
                        console.log(data.message);
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [author]);

    if (content === null) {
        return <Loading />;
    }

    return (
        <main className={"py-4 px-2 container mx-auto grid gap-4"}>
            <div>
                <div className="grid gap-2">
                    <h1 className="text-3xl">{authorTitle}</h1>
                    <div>
                        <div className="text-sm">
                            Произведений автора:{" "}
                            {content.statistic.countOfBooks}
                        </div>
                        <div className="text-sm">
                            Серий автора: {content.statistic.countOfSeries}
                        </div>
                        <div className="text-sm">
                            Средняя оценка произведений: В разработке
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-4">
                {Object.entries(content.list).map(([seriesTitle, books]) => {
                    return (
                        <div
                            key={seriesTitle}
                            className="border border-border rounded grid gap-2"
                        >
                            <h2 className="indent-2 text-2xl">{seriesTitle}</h2>
                            <ul>
                                {books.map((book) => {
                                    return (
                                        <li
                                            key={book.id}
                                            className="p-2 hover:border-l-2 hover:border-primary odd:bg-border cursor-pointer"
                                        >
                                            <Link
                                                href={`/catalog/${book.id}`}
                                                className="flex items-center justify-between"
                                            >
                                                <div className="flex">
                                                    <div className="w-10 flex gap-1">
                                                        {book.assets.audio && (
                                                            <Image
                                                                src={
                                                                    "/assets/icons/books/audio.svg"
                                                                }
                                                                width={18}
                                                                height={18}
                                                                alt="audio"
                                                            />
                                                        )}
                                                        {book.assets.text && (
                                                            <Image
                                                                src={
                                                                    "/assets/icons/books/book.svg"
                                                                }
                                                                width={18}
                                                                height={18}
                                                                alt="audio"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <div>
                                                            {book.cycle.number}.
                                                        </div>
                                                        <div>{book.title}</div>
                                                    </div>
                                                </div>
                                                <div className="text-sm">
                                                    Год написания:{" "}
                                                    {book.meta.writtingDate}
                                                </div>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}
