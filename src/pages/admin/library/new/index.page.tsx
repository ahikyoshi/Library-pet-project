import { useState } from "react";
import { handleSubmit } from "./utils";
import { IResponse } from "./types";
import Link from "next/link";

const Page = () => {
    const [isStatus, setIsStatus] = useState<null | IResponse>(null);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <form
            onSubmit={(event) =>
                handleSubmit({ event, setIsStatus, setIsLoading })
            }
            className="w-screen xl:w-[1280px] xl:mx-auto px-2 flex flex-col items-center mt-8"
        >
            <div className="w-full">
                <Link href={"/admin/library"}>&larr; Обартно</Link>
            </div>
            <h1 className="mt-2 md:text-2xl xl:text-3xl">
                Добавление новой книги
            </h1>
            <input
                className="mb-4 w-full py-2 border-b border-slate-600"
                type="text"
                name="title"
                placeholder="Название произведения"
                required
            />
            <input
                className="mb-4 w-full py-2 border-b border-slate-600"
                type="text"
                name="author"
                placeholder="Автор произведения"
                required
            />
            <input
                className="mb-4 w-full py-2 border-b border-slate-600"
                type="text"
                name="cycle_name"
                placeholder="Название цикла"
                required
            />
            <input
                className="mb-4 w-full py-2 border-b border-slate-600"
                type="number"
                name="cycle_number"
                placeholder="Номер"
                required
            />
            <input
                className="mb-4 w-full py-2 border-b border-slate-600"
                type="text"
                name="description"
                placeholder="Описание"
                required
            />
            <input
                className="mb-4 w-full py-2 border-b border-slate-600"
                type="number"
                name="writtingDate"
                placeholder="Дата написания (Указывать только цифры)"
                required
            />
            <div className="mt-2 w-full text-center text-rose-600">
                {!isStatus?.success && isStatus?.message}
            </div>

            <button
                className="w-full bg-slate-600 p-2 rounded"
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? "Загрузка..." : "Добавить книгу"}
            </button>
        </form>
    );
};

export default Page;
