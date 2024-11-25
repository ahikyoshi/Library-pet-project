import BookCard from "@/components/BookCard/BookCard";
import { IUser, IUserBook } from "@/globalTypes";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
    const router = useRouter();
    const [user, setUser] = useState<IUser | null>(null);
    const [currentTab, setCurrentTab] = useState<
        "in progress" | "finished" | "soon"
    >("in progress");
    const [currentBookList, setCurrentBookList] = useState<IUserBook[]>([]);

    useEffect(() => {
        fetch("/api/user/get")
            .then((res) => {
                if (res.status === 401) {
                    router.push("/auth/sign-in");
                }
                return res.json();
            })
            .then((data: { success: boolean, user: IUser }) => {
                if (data.success) {
                    setUser(data.user);
                }
            })
            .catch(() => {
                router.push("/auth/sign-in");
            });
    }, [router]);

    useEffect(() => {
        if (user) {
            const newList = user.library.filter((book: IUserBook) => {
                return book.status === currentTab;
            });
            setCurrentBookList(newList);
        }
    }, [user, currentTab]);

    if (!user) {
        return <div>Loading</div>;
    }
    return (
        <main className="w-screen min-h-screen flex flex-col items-center">
            <div className="w-screen py-4 flex flex-col items-center">
                <div
                    className="w-24 h-24 rounded-full border border-white"
                    style={{
                        background: `center/cover no-repeat  url(${user.avatar})`
                    }}
                />
                <p className="mt-2 text-xl font-bold">{user.display_name}</p>
            </div>

            <nav className="mt-4 w-screen">
                <ul className="flex items-center border-b border-t">
                    <li
                        className={clsx(
                            currentTab === "in progress" && "bg-slate-700",
                            "w-1/3 text-center py-2"
                        )}
                        onClick={() => {
                            setCurrentTab("in progress");
                        }}
                    >
                        В процессе
                    </li>
                    <li
                        className={clsx(
                            currentTab === "finished" && "bg-slate-700",
                            "w-1/3 text-center py-2"
                        )}
                        onClick={() => {
                            setCurrentTab("finished");
                        }}
                    >
                        Завершены
                    </li>
                    <li
                        className={clsx(
                            currentTab === "soon" && "bg-slate-700",
                            "w-1/3 text-center py-2"
                        )}
                        onClick={() => {
                            setCurrentTab("soon");
                        }}
                    >
                        Запланировано
                    </li>
                </ul>
            </nav>
            <ul className="w-screen px-2 flex flex-wrap items-start justify-between">
                {currentBookList.map(({ _id }: IUserBook) => {
                    return (
                        <div key={_id}>
                            <BookCard id={_id} />
                        </div>
                    );
                })}
            </ul>
        </main>
    );
};

export default Page;
