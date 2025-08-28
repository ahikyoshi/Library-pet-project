// libs
import { useEffect, useState } from "react";
import Link from "next/link";
// components
import { Card } from "./_components/card";
import { Pages } from "@/components/Pages";
import { Search } from "@/components/search";
import { Delete } from "./_components/delete";
// utils
import { getCatalog } from "./utils";
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
        document.title = "Aurora: Админ панель";

        if (isDeleteOpen) {
            return;
        }

        getCatalog({ currentPage, searchedValue, setList, setPages });
    }, [currentPage, searchedValue, isDeleteOpen]);

    return (
        <main className="p-2 min-h-[calc(100vh-48px)] flex flex-col gap-4 h-full box-border">
            {/* Верхний блок: Титул и поиск */}
            <div className="grid gap-2 flex-shrink-0">
                <h1 className="text-2xl font-bold">Каталог</h1>
                <Search setSearchedValue={setSearchedValue} />
            </div>

            {/* Центральный блок: Список книг, занимает всё оставшееся пространство */}
            <div
                className="flex-1 min-h-0 flex flex-col gap-1 self-stretch overflow-auto"
                id="admin_list"
            >
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

            {/* Нижний блок: Пагинация и кнопка */}
            <div className="grid gap-1 flex-shrink-0">
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
