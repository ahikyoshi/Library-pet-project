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
import { Search } from "@/components/search";
import Link from "next/link";

export default function Catalog() {
    const [books, setBooks] = useState<IBook[]>([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [searchedValue, setSearchedValue] = useState<string>("");
    const [limit, setLimit] = useState<10 | 25 | 50>(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState<number>(0);

    useEffect(() => {
        document.title = "Aurora: Каталог";

        getCatalog({
            limit,
            currentPage,
            searchedValue,
            setBooks,
            setPages
        });

        window.scrollBy(0, -100);
    }, [limit, currentPage, searchedValue]);

    useEffect(() => {
        setIsEmpty(books.length === 0);
    }, [books]);

    useEffect(() => {
        setCurrentPage(1);
    }, [limit]);

    return (
        <main className="px-2 w-full min-h-[calc(100vh-48px)] flex flex-col">
            <div className="w-full">
                <nav className="py-2 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Каталог</h1>
                    <Link href={"/catalog/offer"}>
                        <div className="bg-primary px-1 py-2 rounded">
                            Предложить книгу
                        </div>
                    </Link>
                </nav>
                <Search setSearchedValue={setSearchedValue} />
            </div>
            <div className="flex flex-wrap justify-between">
                {isEmpty ? (
                    <div className="w-full text-center text-xl">
                        К сожалению мы ничего не нашли
                    </div>
                ) : (
                    <>
                        {books.map(({ id }: { id: string }) => {
                            return (
                                <div key={id}>
                                    <BookCard id={id} />
                                </div>
                            );
                        })}
                    </>
                )}
            </div>
            {/* Books on Page limit and pages */}
            <div className="my-4 flex flex-col items-center justify-between">
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
