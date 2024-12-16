"use client";

// libs
import { Dispatch, FormEvent, SetStateAction } from "react";
import { useRouter } from "next/router";
// types
import { Review } from "./review/review";
import { IBook } from "@/globalTypes";
import { IBookPageContent } from "../../types";

type TApiResponse = {
    success: boolean,
    newBook: IBook,
    message: string
};

export const Reviews = ({
    book,
    setContent
}: {
    book: IBook,
    setContent: Dispatch<SetStateAction<IBookPageContent | null>>
}) => {
    const router = useRouter();
    const { id } = router.query;

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const review = String(formData.get("review")).trim();

        fetch("/api/library/book/review", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bookID: id, review: review })
        })
            .then((res) => res.json())
            .then((data: TApiResponse) => {
                if (data.success) {
                    setContent((prev) => {
                        if (!prev) {
                            return null;
                        }

                        return {
                            ...prev,
                            book: data.newBook
                        };
                    });
                } else {
                    alert(data.message);
                }
            })
            .catch((e) => console.log(e));
    }

    return (
        <div className="mt-4">
            <h1 className="text-2xl font-bold flex items-center">
                Отзывы:
                <div className="text-xl ml-2 -mb-1">{book.reviews.length}</div>
            </h1>
            <div className="mb-2 py-2  rounded-md">
                <h2 className="text-lg mb-2">Оставить отзыв</h2>
                <form
                    className="flex items-center border border-secondary rounded"
                    onSubmit={handleSubmit}
                >
                    <textarea
                        name="review"
                        placeholder="Вы можете оставить отзыв"
                        className="p-1 w-full"
                    />
                    <button
                        type="submit"
                        className="py-4 px-2 bg-primary text-text-contrast rounded-r w-1/4"
                    >
                        Отправить
                    </button>
                </form>
            </div>
            <ul className="w-screens py-2">
                {book.reviews.map((review) => {
                    return (
                        <div key={review.userID}>
                            <Review review={review} />
                        </div>
                    );
                })}
            </ul>
        </div>
    );
};
