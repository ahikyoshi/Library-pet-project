// libs
import Image from "next/image";
import Link from "next/link";
// types
import { ICardComponentProps } from "./types";

export const Card = ({
    book,
    index,
    setIsDeleteOpen,
    setCurrentDelete,
    currentPage
}: ICardComponentProps) => {
    const query = { id: book.id };
    return (
        <li
            key={book.id}
            className="flex items-center justify-between text-xs md:text-base"
        >
            <div className="w-1/12">{index + (currentPage - 1) * 20 + 1}</div>
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
                <Image
                    src={"/assets/icons/admin/delete.svg"}
                    width={24}
                    height={24}
                    alt="delete"
                    onClick={() => {
                        setIsDeleteOpen(true);
                        setCurrentDelete(book);
                    }}
                />
                <Link
                    href={{
                        pathname: "/admin/library/change",
                        query
                    }}
                >
                    <Image
                        src={"/assets/icons/admin/edit.svg"}
                        width={24}
                        height={24}
                        alt="edit"
                    />
                </Link>
                <Link href={`/catalog/${book.id}`}>
                    <Image
                        src={"/assets/icons/admin/open.svg"}
                        width={24}
                        height={24}
                        alt="open"
                    />
                </Link>
            </div>
        </li>
    );
};
