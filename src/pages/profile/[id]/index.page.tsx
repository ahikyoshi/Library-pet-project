// libs
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// components
import { Content } from "./componets/content/index.api";
import { Books } from "./componets/books";
// types
import { IUserBook } from "@/globalTypes";

export interface IViewUser {
    avatar: string;
    display_name: string;
    library: IUserBook[];
}

const Page = () => {
    const router = useRouter();
    const { id } = router.query;

    const [user, setUser] = useState<IViewUser | null>(null);

    useEffect(() => {
        if (!id) {
            return;
        }

        if (Array.isArray(id)) {
            return;
        }

        fetch(`/api/user/${id}/full`)
            .then((res) => res.json())
            .then(
                (data: {
                    success: boolean,
                    message: string,
                    user: IViewUser
                }) => {
                    if (data.success) {
                        setUser(data.user);
                    } else {
                        console.log(data.message);
                    }
                }
            )
            .catch((error) => console.log(error));
    }, [id]);

    useEffect(() => {
        document.title = `Aurora: ${user?.display_name}`;
    }, [user]);

    if (!user) {
        return <div>Загрузка</div>;
    }

    return (
        <main>
            <Content user={user} />

            <Books user={user} />
        </main>
    );
};

export default Page;
