"use client";

// components
import BookCard from "@/components/BookCard/BookCard";
// types
import { IBook } from "@/globalTypes";

export const Cycle = ({ books }: { books: IBook[] }) => {
    return (
        <div className="w-full mt-5">
            <div className="overflow-x-hidden">
                <h1 className="text-xl font-bold">Книги из той же серии</h1>
                <ul className="flex overflow-x-scroll whitespace-nowrap py-2">
                    {books.map(({ id }) => {
                        return (
                            <div key={id} className="pr-2 last:pr-0">
                                <BookCard id={id} />
                            </div>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};
