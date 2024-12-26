// libs
import { useEffect, useState } from "react";
import clsx from "clsx";
// components
import BookCard from "@/components/BookCard/BookCard";
// types
import { IUserBook } from "@/globalTypes";
import { IViewUser } from "../../index.page";

export const Books = ({ user }: { user: IViewUser }) => {
    const [countOfBook, setCountOfBook] = useState({
        inProgress: 0,
        finished: 0,
        soon: 0
    });
    const [currentBookList, setCurrentBookList] = useState<IUserBook[]>([]);
    const [currentTab, setCurrentTab] = useState<
        "in progress" | "finished" | "soon"
    >("in progress");

    useEffect(() => {
        if (user) {
            const newList = user.library.filter((book: IUserBook) => {
                return book.status === currentTab;
            });
            setCurrentBookList(newList);
        }
    }, [user, currentTab]);

    useEffect(() => {
        const count = {
            inProgress: 0,
            finished: 0,
            soon: 0
        };
        user.library.forEach((book) => {
            switch (book.status) {
                case "finished":
                    count.finished++;
                    break;
                case "soon":
                    count.soon++;
                    break;
                case "in progress":
                    count.inProgress++;
                    break;
            }
        });
        setCountOfBook(count);
    }, [user.library]);

    return (
        <nav className="mt-4 w-screen">
            <ul className="flex items-center border-b border-t border-secondary">
                <li
                    className={clsx(
                        currentTab === "in progress" &&
                            "bg-primary text-text-contrast",
                        "w-1/3 flex items-center justify-evenly text-center py-2 sm:justify-center"
                    )}
                    onClick={() => {
                        setCurrentTab("in progress");
                    }}
                >
                    <div>В процессе</div>
                    <div className="sm:ml-2">{countOfBook.inProgress}</div>
                </li>
                <li
                    className={clsx(
                        currentTab === "finished" &&
                            "bg-primary text-text-contrast",
                        "w-1/3 flex items-center justify-evenly text-center py-2 sm:justify-center"
                    )}
                    onClick={() => {
                        setCurrentTab("finished");
                    }}
                >
                    <div>Завершены</div>
                    <div className="sm:ml-2">{countOfBook.finished}</div>
                </li>
                <li
                    className={clsx(
                        currentTab === "soon" &&
                            "bg-primary text-text-contrast",
                        "w-1/3 flex items-center justify-evenly text-center py-2 sm:justify-center"
                    )}
                    onClick={() => {
                        setCurrentTab("soon");
                    }}
                >
                    <div>Отложено</div>
                    <div className="sm:ml-2">{countOfBook.soon}</div>
                </li>
            </ul>
            <ul className="w-screen px-2 flex flex-wrap items-start justify-between">
                {currentBookList.map(({ _id }: IUserBook) => {
                    return (
                        <div key={_id}>
                            <BookCard id={_id} />
                        </div>
                    );
                })}
            </ul>
        </nav>
    );
};
