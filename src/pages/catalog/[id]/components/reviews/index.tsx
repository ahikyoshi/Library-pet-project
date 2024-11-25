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
        const review = formData.get("review") as string;

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
            <h1 className="text-2xl mb-2 flex items-center">
                Отзывы:
                <div className="text-xl ml-2 -mb-1">{book.reviews.length}</div>
            </h1>
            <div className="mb-2 px-2 py-4  rounded-md">
                <h2 className="text-lg mb-2">Оставить отзыв</h2>
                <form className="flex items-center" onSubmit={handleSubmit}>
                    <textarea
                        name="review"
                        placeholder="Вы можете оставить отзыв"
                        className="border p-1 w-full border-slate-300 rounded"
                    />
                    <button
                        type="submit"
                        className="bg-slate-800 ml-2 py-2 rounded"
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
