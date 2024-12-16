// libs
import { useEffect, useState } from "react";
import Link from "next/link";
import { Svg } from "@/components/Svg";

export const Review = ({
    review
}: {
    review: { userID: string, content: string, addedDate: string }
}) => {
    const [user, setUser] = useState<{
        display_name: string,
        avatar: string
    } | null>(null);

    useEffect(() => {
        fetch(`/api/user/${review.userID}/short`)
            .then((res) => res.json())
            .then(
                (data: {
                    success: boolean,
                    user: {
                        display_name: string,
                        avatar: string
                    }
                }) => {
                    setUser(data.user);
                }
            )
            .catch((e) => console.log(e));
    }, [review.userID]);
    if (!user) {
        return <div>loading</div>;
    }
    return (
        <div key={review.userID}>
            <Link
                href={`/profile/${review.userID}`}
                className="flex flex-grow-0"
            >
                {user.avatar === "" ? (
                    <div className="w-12 h-12">
                        <Svg
                            size={24}
                            src="/assets/icons/profile/theme/person.svg"
                        />
                    </div>
                ) : (
                    <div
                        className="w-12 h-12 rounded-full border border-white"
                        style={{
                            background: `center/cover no-repeat  url(${user.avatar}) gray`
                        }}
                    />
                )}
                <div className="ml-2 w-3/4">
                    <div className="font-bold text-xl">{user.display_name}</div>
                    <div className="whitespace-break-spaces">
                        {review.content}
                    </div>
                </div>
            </Link>
        </div>
    );
};
