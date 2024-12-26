"use client";

// libs
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// types
import { IUser } from "@/globalTypes";
import { UserInfo } from "./components/userInfo";
import { Books } from "./components/books";

const Page = () => {
    const router = useRouter();
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        document.title = "Aurora: Профиль";

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

    if (!user) {
        return <div>Loading</div>;
    }
    return (
        <main className="w-screen min-h-screen flex flex-col items-center text-text-light">
            <UserInfo user={user} setUser={setUser} />

            <Books user={user} />
        </main>
    );
};

export default Page;
