"use client";

// libs
import clsx from "clsx";
import { useEffect, useState } from "react";
//utils
import { getCatalog } from "./utils";
// components
import BookCard from "@/components/BookCard/BookCard";
import { Pages } from "@/components/Pages";
// types
import { IBook } from "@/globalTypes";

export default function Catalog() {
    const [books, setBooks] = useState<IBook[]>([]);
    const [limit, setLimit] = useState<10 | 25 | 50>(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState<number>(0);

    useEffect(() => {
        document.title = "Aurora: Каталог";

        getCatalog({ limit, currentPage, setBooks, setPages });
    }, [limit, currentPage]);

    return (
        <main>
            <div style={{ maxWidth: "1250px" }} className="mx-auto">
                <nav className="mx-2 py-2 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Каталог</h1>
                </nav>
            </div>
            <div
                className="flex flex-wrap justify-between items-center px-2"
                style={{ maxWidth: "1250px" }}
            >
                {books.map(({ id }: { id: string }) => {
                    return (
                        <div key={id}>
                            <BookCard id={id} />
                        </div>
                    );
                })}
            </div>
            {/* Books on Page limit and pages */}
            <div className="wrapper px-2 mx-auto my-4 flex flex-col items-center justify-between">
                <div className="flex w-full">
                    <div>Страницы: </div>
                    <ul className="flex">
                        {Array.from({ length: pages }, (_, i) => i + 1).map(
                            (number) => (
                                <Pages
                                    key={number}
                                    number={number}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                />
                            )
                        )}
                    </ul>
                </div>
                <div className="flex w-full">
                    <span className="mr-4">Количество на странице:</span>
                    <ul className="flex items-center">
                        <li
                            className={clsx(
                                limit == 10 && "border-b",
                                "cursor-pointer"
                            )}
                            onClick={() => setLimit(10)}
                        >
                            10
                        </li>
                        <li
                            className={clsx(
                                limit == 25 && "border-b",
                                "mx-2 cursor-pointer"
                            )}
                            onClick={() => setLimit(25)}
                        >
                            25
                        </li>
                        <li
                            className={clsx(
                                limit == 50 && "border-b",
                                "cursor-pointer"
                            )}
                            onClick={() => setLimit(50)}
                        >
                            50
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    );
}
