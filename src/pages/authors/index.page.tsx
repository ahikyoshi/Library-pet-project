import Loading from "@/components/Loading/Loading";
import { IServerResponse } from "@/globalTypes";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
    const [content, setContent] = useState<string[]>([]);
    useEffect(() => {
        fetch("/api/library/author/all")
            .then((res) => res.json())
            .then((data: IServerResponse<string[]>) => {
                if (data.success) {
                    setContent(data.body);
                } else {
                    console.log(data.message);
                }
            })
            .catch((e) => console.log(e));
    }, []);

    if (content.length === 0) {
        return <Loading />;
    }

    return (
        <main className={"py-4 px-2 container mx-auto grid gap-4"}>
            <h1 className="text-2xl">Авторы</h1>
            <ul className="flex flex-col border-b border-r border-border">
                {content.map((author, index) => (
                    <Link
                        href={`/authors/${author.replaceAll(" ", "-")}`}
                        key={index}
                        className="p-2 odd:bg-border border-primary hover:border-l transition-all"
                    >
                        {author}
                    </Link>
                ))}
            </ul>
        </main>
    );
}
