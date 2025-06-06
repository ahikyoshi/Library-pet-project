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
            className="w-full flex items-center justify-between text-xs md:text-base text-text-light odd:bg-border"
        >
            <div className="w-1/12">
                {index + (currentPage - 1) * pageLimit + 1}
            </div>
            <div className="flex items-center w-8/12 overflow-hidden">
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
                <div
                    onClick={() => {
                        setIsDeleteOpen(true);
                        setCurrentDelete(book);
                    }}
                >
                    <Svg src="/assets/icons/admin/theme/delete.svg" size={24} />
                </div>
                <Link
                    href={{
                        pathname: "/admin/library/change",
                        query
                    }}
                >
                    <Svg src="/assets/icons/admin/theme/edit.svg" size={24} />
                </Link>
                <Link href={`/catalog/${book.id}`}>
                    <Svg src={"/assets/icons/admin/theme/open.svg"} size={24} />
                </Link>
            </div>
        </div>
    );
};
