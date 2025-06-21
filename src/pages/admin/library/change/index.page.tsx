// libs
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// utils
import { getContent, handleSubmit } from "./utils";
// components
import { FB2Form } from "./components/FB2Form";
// types
import { IBook } from "@/globalTypes";
import { IResponse } from "./types";
import { ImageForm } from "./components/ImageForm";
import { Input } from "./components/Input";

// Нужно сделать еще формы аудио фб2
// Декомпонизировать все и почистить и можно выпускать обнову

const Page = () => {
    const router = useRouter();
    const { id } = router.query;

    const [content, setContent] = useState<IBook | null>(null);
    const [isStatus, setIsStatus] = useState<null | IResponse>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (id != undefined) {
            getContent({ id, setContent });
        }
    }, [id]);

    if (!content || Array.isArray(id) || id === undefined) {
        return <div>Loading</div>;
    }
    return (
        <main className="w-3/4 mx-auto h-[calc(100vh-48px)] flex items-center justify-center">
            <form
                onSubmit={(event) =>
                    handleSubmit({ event, content, setIsStatus, setIsLoading })
                }
                className="w-full px-2 text-text-light flex flex-col"
            >
                {/* Title */}
                <h1 className="text-4xl text-center font-bold">
                    Редактирование книги
                </h1>
                <div>{isStatus != null && <div>{isStatus.message}</div>}</div>
                {/* Text change */}
                <div className="flex flex-col mt-6">
                    <Input
                        name="title"
                        placeholder="Название произведения"
                        defaultValue={content.title}
                    />
                    <Input
                        name="author"
                        placeholder="Автор произведения"
                        defaultValue={content.author}
                    />
                    <Input
                        name="cycle_name"
                        placeholder="Название цикла"
                        defaultValue={content.cycle.title}
                    />
                    <input
                        className="mb-3 py-2 border border-secondary rounded indent-2"
                        type="number"
                        name="cycle_number"
                        placeholder="Номер"
                        defaultValue={content.cycle.number}
                        required
                    />
                    <Input
                        name="description"
                        placeholder="Описание"
                        defaultValue={content.description}
                    />
                    <Input
                        name="writtingDate"
                        placeholder="Дата написания (Указывать только цифры)"
                        defaultValue={content.meta.writtingDate}
                    />
                </div>
                {/* Files change */}
                <div className="mt-4">
                    <ImageForm isAdded={content.assets.image} id={id} />
                    <FB2Form isAdded={content.assets.text} id={id} />
                </div>
                {/* Buttons */}
                <div className="mt-4 flex flex-col items-center">
                    <button
                        className="w-full mt-2 p-2 bg-primary text-text-contrast rounded"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Загрузка..." : "Сохранить"}
                    </button>
                    <Link
                        href={"/admin/library"}
                        className="w-full mt-2 text-center text-text-secondaryLight"
                    >
                        Назад
                    </Link>
                </div>
            </form>
        </main>
    );
};

export default Page;
