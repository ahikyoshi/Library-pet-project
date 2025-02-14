"use client";

// libs
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// types
import { IUser } from "@/globalTypes";
import clsx from "clsx";
import { ThemeToggle } from "./profile/components/theme";
import { Svg } from "@/components/Svg";

export default function Layout({
    children
}: {
    children: ReactNode
}): ReactElement {
    const router = useRouter();

    const [isAuth, setIsAuth] = useState(false);
    const [currentPage, setCurrentPage] = useState("");
    const [user, setUser] = useState<IUser | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        fetch("/api/user/get")
            .then((res) => res.json())
            .then((data: { success: boolean, user: IUser }) => {
                if (data.success) {
                    setUser(data.user);
                    setIsAuth(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const path = router.pathname;

        setIsHidden(false);

        switch (path) {
            case "/reader/[id]":
                setIsHidden(true);
                break;
            case "/profile":
                setCurrentPage("profile");
                break;
            case "/catalog":
                setCurrentPage("catalog");
                break;
            case "/admin/library":
                setCurrentPage("admin");
                break;
            default:
                setCurrentPage("");
                break;
        }
    }, [router]);

    const logout = () => {
        fetch("/api/auth/logout")
            .then(() => {
                window.location.reload();
            })
            .catch((error) => console.log(error));
    };

    if (isHidden) {
        return (
            <div className="w-screen min-h-screen bg-background text-text-primary overflow-hidden">
                {children}
            </div>
        );
    }

    return (
        <div className="w-screen min-h-screen bg-background text-text-primary overflow-hidden">
            <header
                className={clsx(
                    "w-full h-12 px-2 bg-background flex justify-between items-center sm:h-26",
                    isMenuOpen ? "fixed" : "absolute"
                )}
            >
                <Link href={"/catalog"}>
                    <div className="flex font-mono font-bold text-xl">
                        <Svg
                            src="/assets/icons/books/theme/book.svg"
                            size={24}
                        />
                        <div className="mr-2 text-text-light">
                            Aurora.<span className="text-primary">lib</span>
                        </div>
                    </div>
                </Link>
                <ul className="w-full h-full ml-2 text-xl hidden sm:flex">
                    <li
                        className={clsx(
                            "px-2 cursor-pointer flex items-center",
                            currentPage === "catalog" &&
                                "border-b-2 border-primary"
                        )}
                    >
                        <Link href={"/catalog"}>Каталог</Link>
                    </li>
                    {isAuth && user && (
                        <li
                            className={clsx(
                                "px-2 cursor-pointer flex items-center",
                                currentPage === "profile" &&
                                    "border-b-2 border-primary"
                            )}
                        >
                            <Link href={"/profile"}>Профиль</Link>
                        </li>
                    )}
                    {user?.role === "admin" && (
                        <li
                            className={clsx(
                                "px-2 cursor-pointer flex items-center",
                                currentPage === "admin" &&
                                    "border-b-2 border-primary"
                            )}
                        >
                            <Link href={"/admin/library"}>Админ панель</Link>
                        </li>
                    )}
                </ul>
                <div className="h-full flex items-center">
                    {!user && (
                        <div
                            className="mr-2 text-sm hidden items-center sm:flex"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Link
                                href={"/auth/sign-up"}
                                className="mr-1 p-1 bg-primary text-text-dark rounded"
                            >
                                Зарегистрироваться
                            </Link>
                            <Link href={"/auth/sign-in"}>Войти</Link>
                        </div>
                    )}
                    {isAuth && (
                        <li
                            className={
                                "h-full mr-2 hidden items-center cursor-pointer text-base sm:flex"
                            }
                            onClick={logout}
                        >
                            Выйти
                        </li>
                    )}
                    <ThemeToggle />
                    <div
                        className="ml-2 block sm:hidden"
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                    >
                        <Svg
                            src={"/assets/icons/header/theme/menu.svg"}
                            size={24}
                        />
                    </div>
                </div>
            </header>

            {isMenuOpen && (
                <div className="w-screen h-screen py-20 bg-background flex flex-col items-center justify-between fixed z-30 top-12">
                    {isAuth && user && (
                        <div className="flex flex-col items-center">
                            {user.avatar != "" ? (
                                <div
                                    className="w-24 h-24 rounded-full border-2 border-primary"
                                    style={{
                                        background: `center/cover no-repeat  url(${user.avatar})`
                                    }}
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full border-2 border-primary flex items-center justify-center">
                                    <Svg
                                        src="/assets/icons/profile/theme/person.svg"
                                        size={80}
                                    />
                                </div>
                            )}
                            <div className="font-bold text-2xl mt-2">
                                {user.display_name}
                            </div>
                        </div>
                    )}
                    <ul className="text-xl mt-4 w-screen h-full text-center flex flex-col">
                        <li
                            className={clsx(
                                "py-4 cursor-pointer hover:bg-primary hover:text-text-dark",
                                currentPage === "catalog" &&
                                    "bg-primary text-text-contrast"
                            )}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Link href={"/catalog"}>Каталог</Link>
                        </li>
                        {isAuth && user && (
                            <li
                                className={clsx(
                                    "py-4 cursor-pointer hover:bg-primary hover:text-text-contrast",
                                    currentPage === "profile" &&
                                        "bg-primary text-text-contrast"
                                )}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Link href={"/profile"}>Профиль</Link>
                            </li>
                        )}
                        {user?.role === "admin" && (
                            <li
                                className={clsx(
                                    "py-4 cursor-pointer hover:bg-primary hover:text-text-contrast",
                                    currentPage === "admin" &&
                                        "bg-primary text-text-contrast"
                                )}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <Link href={"/admin/library"}>
                                    Админ панель
                                </Link>
                            </li>
                        )}
                        {isAuth && (
                            <li
                                className={"py-4 cursor-pointer text-base"}
                                onClick={logout}
                            >
                                Выйти
                            </li>
                        )}
                    </ul>
                    {!user && (
                        <div
                            className="mb-4 text-base flex flex-col items-center"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Link
                                href={"/auth/sign-up"}
                                className="bg-primary text-text-dark px-2 py-2 rounded"
                            >
                                Зарегистрироваться
                            </Link>
                            <Link href={"/auth/sign-in"} className="mt-4">
                                Войти
                            </Link>
                        </div>
                    )}
                    <div className="text-center text-xs text-text-secondary">
                        <p>
                            Приложение разработано в целях самообучения, с
                            использованием личных наработок
                        </p>
                        <p className="my-1">
                            <span>Связаться со мной можно почтой: </span>
                            <Link
                                href={"mailto:ahikyoshi@gmail.com"}
                                className="mt-2 underline"
                            >
                                ahikyoshi@gmail.com
                            </Link>
                        </p>
                        <p>
                            <span>Или telegram: </span>
                            <Link
                                href={"https://t.me/ahikyoshi"}
                                className="mt-2 underline"
                            >
                                @ahikyoshi
                            </Link>
                        </p>
                    </div>
                </div>
            )}
            <div className="pt-12">{children}</div>
        </div>
    );
}
