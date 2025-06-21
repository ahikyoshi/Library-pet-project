// libs
import Link from "next/link";
// types
import { ICardComponentProps } from "./types";
import { Svg } from "@/components/Svg";
import { useEffect, useState } from "react";

export const Card = ({
    book,
    index,
    setIsDeleteOpen,
    setCurrentDelete,
    currentPage
}: ICardComponentProps) => {
    const query = { id: book.id };
    const [pageLimit, setPageLimit] = useState(10);

    useEffect(() => {
        const adminListHeight =
            document.getElementById("admin_list")?.offsetHeight;
        setPageLimit(Math.floor(adminListHeight ? adminListHeight / 24 : 10));
    }, []);
    return (
        <div
            key={book.id}
            className="w-full h-10 mb-2 flex text-xs md:text-base text-text-light"
        >
            <div className="w-10 border border-border rounded flex items-center justify-center">
                {index + (currentPage - 1) * pageLimit + 1}
            </div>
            <div className="w-full h-10 mx-2 px-2 border border-border rounded flex items-center justify-between overflow-hidden">
                <div className="flex">
                    <div className="whitespace-nowrap">{book.author}</div>
                    <div className="mx-1">-</div>
                    <div className="whitespace-nowrap">{book.title}</div>
                    <div className="hidden md:flex ml-2">
                        {"-"}
                        <div className="ml-2">{book.cycle.title}</div>
                        <div className="ml-1">#{book.cycle.number}</div>
                    </div>
                </div>
                <div className="flex">
                    {!book.assets.image && (
                        <div
                            className="w-4 h-4 mr-2 bg-orange-500 rounded-full flex items-center justify-center"
                            title={
                                !book?.assets?.text && !book?.assets?.audio
                                    ? "Не добавлены текстовая и аудио версия книги"
                                    : !book?.assets?.text
                                      ? "Не добавлена Текстовая версия книги"
                                      : "Не добавлена аудио версия книги"
                            }
                        >
                            !
                        </div>
                    )}
                    {!book.assets.image && (
                        <div
                            className="w-4 h-4 mr-2 bg-notification rounded-full flex items-center justify-center"
                            title="Не добавлено изображение"
                        >
                            !
                        </div>
                    )}
                </div>
            </div>
            <div className="flex border border-border">
                <div
                    className="px-2 rounded flex items-center cursor-pointer hover:bg-border"
                    onClick={() => {
                        setIsDeleteOpen(true);
                        setCurrentDelete(book);
                    }}
                >
                    <Svg src="/assets/icons/admin/theme/delete.svg" size={24} />
                </div>
                <Link
                    className="px-2 rounded flex items-center hover:bg-border"
                    href={{
                        pathname: "/admin/library/change",
                        query
                    }}
                >
                    <Svg src="/assets/icons/admin/theme/edit.svg" size={24} />
                </Link>
                <Link
                    className="px-2 rounded flex items-center hover:bg-border"
                    href={`/catalog/${book.id}`}
                >
                    <Svg src={"/assets/icons/admin/theme/open.svg"} size={24} />
                </Link>
            </div>
        </div>
    );
};
