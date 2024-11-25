// libs
import { useEffect, useState } from "react";
import Link from "next/link";
// types
import { IBook } from "@/globalTypes";
import { Delete } from "./components/delete";
import { Card } from "./components/card";
import { Pages } from "@/components/Pages";

const Page = () => {
    const [list, setList] = useState<IBook[]>([]);
    const [pages, setPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [currentDelete, setCurrentDelete] = useState<IBook | null>(null);

    useEffect(() => {
        const settings = {
            currentPage: currentPage,
            limit: 20
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
    }, [currentPage]);

    return (
        <div className="px-2 min-h-[calc(100vh-48px)] md:px-5 flex flex-col justify-between xl:w-[1280px] xl:mx-auto">
            <div>
                <h1 className="py-2 text-xl md:text-2xl">
                    Управление базой данных библиотеки
                </h1>
            </div>

            <ul className="flex flex-col max-h-[calc(100vh-172px)] overflow-y-scroll">
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
            </ul>
            <div className="flex flex-col justify-between w-full py-1">
                <div className="flex items-center py-1 md:text-xl">
                    <div className="mr-2">страницы:</div>
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
                    className="bg-blue-800 py-2 text-center md:text-xl"
                >
                    Добавить новую книгу
                </Link>
            </div>
            {isDeleteOpen && (
                <Delete
                    currentTarget={currentDelete}
                    setCurrentTarget={setCurrentDelete}
                    setIsOpen={setIsDeleteOpen}
                    setCurrentPage={setCurrentPage}
                />
            )}
        </div>
    );
};
export default Page;
