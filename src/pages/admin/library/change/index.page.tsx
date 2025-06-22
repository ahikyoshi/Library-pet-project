// libs
import { useState } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
// utils
import { handleSubmit } from "./utils";
// components
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { FB2Form } from "./_components/FB2Form";
import { ImageForm } from "./_components/ImageForm";
// types
import { IBook } from "@/globalTypes";
import { baseURL } from "@/globalVariables";
import { AudioForm } from "./_components/AudioForm";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;

    if (!id || Array.isArray(id)) {
        throw new Error("ID не найден или передан не правильно");
    }

    try {
        const res = await fetch(`${baseURL}/api/library/book/get`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id, typeOfResponse: "page" })
        });

        if (!res.ok) throw new Error("Запрос вернул ошибку");

        const data = (await res.json()) as {
            success: boolean,
            message: string,
            body: {
                book: IBook
            }
        };

        if (!data.success)
            throw new Error(`Запрос выполнен с ошибкой: ${data.message}`);

        return {
            props: {
                content: data.body.book,
                id
            }
        };
    } catch (error) {
        throw new Error(`Запрос выполнен с ошибкой`);
    }
};

const Page = ({ content, id }: { content: IBook, id: string }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <main className="w-3/4 mx-auto h-[calc(100vh-48px)] flex items-center justify-center">
            <form
                onSubmit={(event) =>
                    handleSubmit({ event, content, setIsLoading })
                }
                className="w-full px-2 text-text-light grid gap-4"
            >
                <h1 className="text-4xl text-center font-bold">
                    Редактирование книги
                </h1>
                <div className="grid gap-2">
                    <Input
                        name="title"
                        border={true}
                        placeholder="Название произведения"
                        defaultValue={content.title}
                        required
                    />
                    <Input
                        name="author"
                        border={true}
                        placeholder="Автор произведения"
                        defaultValue={content.author}
                        required
                    />
                    <Input
                        name="cycle_name"
                        border={true}
                        placeholder="Название цикла"
                        defaultValue={content.cycle.title}
                        required
                    />
                    <Input
                        name="cycle_number"
                        border={true}
                        placeholder="Номер"
                        defaultValue={content.cycle.number}
                        type="number"
                        required
                    />
                    <Input
                        name="description"
                        border={true}
                        placeholder="Описание"
                        defaultValue={content.description}
                        required
                    />
                    <Input
                        name="writtingDate"
                        border={true}
                        placeholder="Дата написания (Указывать только цифры)"
                        defaultValue={content.meta.writtingDate}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <ImageForm isAdded={content.assets.image} id={id} />
                    <FB2Form isAdded={content.assets.text} id={id} />
                    <AudioForm isAdded={content.assets.audio} id={id} />
                </div>
                <div className="grid gap-2">
                    <Button
                        variant="primary"
                        text={isLoading ? "Загрузка..." : "Сохранить"}
                        type="submit"
                        disabled={isLoading}
                    />
                    <Link
                        href={"/admin/library"}
                        className="w-full text-center text-text-secondaryLight"
                    >
                        Назад
                    </Link>
                </div>
            </form>
        </main>
    );
};

export default Page;
