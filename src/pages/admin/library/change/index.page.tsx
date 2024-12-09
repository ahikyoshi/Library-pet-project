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
        <div>
            <form
                onSubmit={(event) =>
                    handleSubmit({ event, content, setIsStatus, setIsLoading })
                }
                className="w-screen xl:w-[1280px] mx-auto px-2 flex flex-col items-center py-2"
            >
                <div className="w-full flex bg">
                    <Link href={"/admin/library"} className="">
                        &larr; обратно
                    </Link>
                </div>
                <input
                    className="mb-4 w-full py-2 border-b border-slate-600"
                    type="text"
                    name="title"
                    placeholder="Название произведения"
                    defaultValue={content.title}
                    required
                />
                <input
                    className="mb-4 w-full py-2 border-b border-slate-600"
                    type="text"
                    name="author"
                    placeholder="Автор произведения"
                    defaultValue={content.author}
                    required
                />
                <input
                    className="mb-4 w-full py-2 border-b border-slate-600"
                    type="text"
                    name="cycle_name"
                    placeholder="Название цикла"
                    defaultValue={content.cycle.title}
                    required
                />
                <input
                    className="mb-4 w-full py-2 border-b border-slate-600"
                    type="number"
                    name="cycle_number"
                    placeholder="Номер"
                    defaultValue={content.cycle.number}
                    required
                />
                <input
                    className="mb-4 w-full py-2 border-b border-slate-600"
                    type="text"
                    name="description"
                    placeholder="Описание"
                    defaultValue={content.description}
                    required
                />
                <input
                    className="mb-4 w-full py-2 border-b border-slate-600"
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
                    color="bg-blue-800"
                    text="изображение"
                    isActive={content.assets.image}
                    setStateOpen={setIsImageOpen}
                />
                <Button
                    color="bg-green-800"
                    text="аудио"
                    isActive={content.assets.audio}
                    setStateOpen={setIsAudioOpen}
                />
                <Button
                    color="bg-orange-800"
                    text="текстовый файл"
                    isActive={content.assets.text}
                    setStateOpen={setIsFB2Open}
                />

                <button
                    className="w-full bg-slate-600 mt-2 p-2 rounded"
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Загрузка..." : "Сохранить"}
                </button>
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
        </div>
    );
};

export default Page;
