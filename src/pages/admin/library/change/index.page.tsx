// libs
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
// utils
import { getContent, handleSubmit } from "./utils";
// components
import { ImageForm } from "./components/ImageForm";
import { AudioForm } from "./components/AudioForm";
import { FB2Form } from "./components/FB2Form";
import { Button } from "./components/Button";
// types
import { IBook } from "@/globalTypes";
import { IResponse } from "./types";

const Page = () => {
    const router = useRouter();
    const { id } = router.query;

    const [isImageOpen, setIsImageOpen] = useState(false);
    const [isAudioOpen, setIsAudioOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const [isFB2Open, setIsFB2Open] = useState(false);

    const [content, setContent] = useState<IBook | null>(null);
    const [isStatus, setIsStatus] = useState<null | IResponse>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (id != undefined) {
            getContent({ id, setContent });
        }
    }, [id]);

    if (!content) {
        return <div>Loading</div>;
    }
    return (
        <main className="w-full h-[calc(100vh-48px)] flex items-center justify-center">
            <form
                onSubmit={(event) =>
                    handleSubmit({ event, content, setIsStatus, setIsLoading })
                }
                className="w-full px-2 text-text-light flex flex-col"
            >
                <h1 className="mb-4 text-2xl text-center font-bold">
                    Редактирование книги
                </h1>
                <input
                    className="mb-2 py-2 border border-secondary rounded indent-2"
                    type="text"
                    name="title"
                    placeholder="Название произведения"
                    defaultValue={content.title}
                    required
                />
                <input
                    className="mb-2 py-2 border border-secondary rounded indent-2"
                    type="text"
                    name="author"
                    placeholder="Автор произведения"
                    defaultValue={content.author}
                    required
                />
                <input
                    className="mb-2 py-2 border border-secondary rounded indent-2"
                    type="text"
                    name="cycle_name"
                    placeholder="Название цикла"
                    defaultValue={content.cycle.title}
                    required
                />
                <input
                    className="mb-2 py-2 border border-secondary rounded indent-2"
                    type="number"
                    name="cycle_number"
                    placeholder="Номер"
                    defaultValue={content.cycle.number}
                    required
                />
                <input
                    className="mb-2 py-2 border border-secondary rounded indent-2"
                    type="text"
                    name="description"
                    placeholder="Описание"
                    defaultValue={content.description}
                    required
                />
                <input
                    className="mb-2 py-2 border border-secondary rounded indent-2"
                    type="text"
                    name="writtingDate"
                    placeholder="Дата написания (Указывать только цифры)"
                    defaultValue={content.meta.writtingDate}
                    required
                />
                <div className="mt-2 w-full text-center text-rose-600">
                    {!isStatus?.success && isStatus?.message}
                </div>

                <Button
                    color="light"
                    text="изображение"
                    isActive={content.assets.image}
                    setStateOpen={setIsImageOpen}
                />
                <Button
                    color="light"
                    text="аудио"
                    isActive={content.assets.audio}
                    setStateOpen={setIsAudioOpen}
                />
                <Button
                    color="light"
                    text="текстовый файл"
                    isActive={content.assets.text}
                    setStateOpen={setIsFB2Open}
                />

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
            </form>
            {isImageOpen && (
                <ImageForm
                    content={content}
                    setContent={setContent}
                    setIsImageOpen={setIsImageOpen}
                />
            )}
            {isFB2Open && (
                <FB2Form content={content} setIsFB2Open={setIsFB2Open} />
            )}
            {isAudioOpen && (
                <AudioForm
                    content={content}
                    setIsAudioOpen={setIsAudioOpen}
                    setContent={setContent}
                />
            )}
        </main>
    );
};

export default Page;
