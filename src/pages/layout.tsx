import { IUser } from "@/globalTypes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useEffect, useState } from "react";

export default function Layout({
    children
}: {
    children: ReactNode
}): ReactElement {
    const router = useRouter();

    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUnauthorizedPage, setIsUnauthorizedPage] = useState(false);

    useEffect(() => {
        fetch("/api/user/get")
            .then((res) => res.json())
            .then((data: { success: boolean, user: IUser }) => {
                if (data.success) {
                    setUser(data.user);
                    setIsAuth(true);
                }
            })
            .catch(() => {
                // router.push("/auth/sign-in");
            });
    }, []);

    useEffect(() => {
        if (router.pathname === "/reader") {
            setIsUnauthorizedPage(true);
        }
    }, [router]);
    if (isUnauthorizedPage) {
        return (
            <main className="w-full min-h-screen text-text absolute bg-main ">
                {children}
            </main>
        );
    }

    return (
        <main className="w-full min-h-screen text-text absolute bg-main ">
            <header className="w-screen flex justify-between items-center h-12 px-3 bg-slate-600">
                <div className="flex font-mono font-bold text-xl">
                    <Image
                        src={"/assets/icons/books/book.svg"}
                        width={24}
                        height={24}
                        alt="logotype"
                    />
                    <div className="mr-2">
                        Aurora.<span className="text-green-400">lib</span>
                    </div>
                </div>
                <div onClick={() => setIsMenuOpen(true)}>
                    <Image
                        src={"/assets/icons/header/menu.svg"}
                        width={24}
                        height={24}
                        alt="menu"
                    />
                </div>
            </header>
            {isMenuOpen && (
                <div className="w-screen h-screen bg-gray-900 flex flex-col items-center justify-between py-20 fixed top-0">
                    <div className=" absolute left-0 top-0 px-2 py-1 text-xl w-full justify-between flex">
                        <div className="flex font-mono font-bold">
                            <Image
                                src={"/assets/icons/books/book.svg"}
                                width={24}
                                height={24}
                                alt="logotype"
                            />
                            <div className="mr-2">
                                Aurora.
                                <span className="text-green-400">lib</span>
                            </div>
                        </div>
                        <div onClick={() => setIsMenuOpen(false)}>Назад</div>
                    </div>
                    {isAuth && user && (
                        <div className="flex flex-col items-center">
                            <div
                                className="w-24 h-24 rounded-full border border-white"
                                style={{
                                    background: `center/cover no-repeat  url(${user.avatar})`
                                }}
                            />
                            <div className="font-bold text-2xl mt-2">
                                {user.display_name}
                            </div>
                        </div>
                    )}
                    <ul className="text-xl w-screen text-center">
                        <li
                            className="py-4 bg-gray-600"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Link href={"/catalog"}>Каталог</Link>
                        </li>
                        <li
                            className="py-4"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Link href={"/profile"}>Профиль</Link>
                        </li>
                    </ul>
                    <div className="text-center text-xs">
                        <p>
                            Приложение разработано в целях самообучения, с
                            использованием личных наработок
                        </p>
                        <p className="mt-2">ahikyoshi@gmail.com</p>
                    </div>
                </div>
            )}

            {children}
        </main>
    );
}
