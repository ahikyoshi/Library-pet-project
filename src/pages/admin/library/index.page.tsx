// libs
import { useEffect, useState } from "react";
import Link from "next/link";
// components
import { Delete } from "./components/delete";
import { Card } from "./components/card";
import { Pages } from "@/components/Pages";
import { Search } from "@/components/search";
// types
import { IBook } from "@/globalTypes";

const Page = () => {
    const [list, setList] = useState<IBook[]>([]);
    const [pages, setPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchedValue, setSearchedValue] = useState("");

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [currentDelete, setCurrentDelete] = useState<IBook | null>(null);

    useEffect(() => {
        if (isDeleteOpen) {
            return;
        }

        const settings = {
            currentPage: currentPage,
            limit: 20,
            searchedValue: searchedValue
        };

        fetch("/api/library/catalog/get", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ settings: settings })
        })
            .then((res) => res.json())
            .then(
                ({
                    success,
                    catalog,
                    pages,
                    message
                }: {
                    success: boolean,
                    catalog: IBook[],
                    pages: number,
                    message: string
                }) => {
                    if (success) {
                        setList(catalog);
                        setPages(pages);
                    } else {
                        alert(message);
                    }
                }
            )
            .catch(() => console.log("Something went wrong"));
    }, [currentPage, searchedValue, isDeleteOpen]);

    return (
        <main className="px-2 w-full min-h-[calc(100vh-48px)] flex flex-col">
            <div className="w-full">
                <nav className=" py-2 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Каталог</h1>
                </nav>
                <Search setSearchedValue={setSearchedValue} />
            </div>

            <div className="w-full mt-2 flex flex-col flex-1 flex-wrap">
                {list.map((book: IBook, index) => (
                    <Card
                        key={book.id}
                        book={book}
                        index={index}
                        setIsDeleteOpen={setIsDeleteOpen}
                        setCurrentDelete={setCurrentDelete}
                        currentPage={currentPage}
                    />
                ))}
            </div>
            <div className="w-full my-2 flex flex-col">
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
                <Link
                    href={"/admin/library/new"}
                    className="py-2 bg-primary text-text-contrast text-center rounded font-bold"
                >
                    Добавить новую книгу
                </Link>
            </div>
            {isDeleteOpen && (
                <Delete
                    currentTarget={currentDelete}
                    setCurrentTarget={setCurrentDelete}
                    setIsOpen={setIsDeleteOpen}
                />
            )}
        </main>
    );
};
export default Page;
