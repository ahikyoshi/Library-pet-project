"use client";

// utils
import { timeTransform } from "../player/utils";
// components
// types
import { IContentComponentProps } from "./types";
import { Status } from "./componetns/status";
import { LocalImage } from "@/components/LocalImage";

export const Content = ({
    content,
    isAuth,
    userMeta,
    isPlayerOpen,
    setIsPlayerOpen
}: IContentComponentProps) => {
    return (
        <div className="flex flex-col">
            <div className="w-full flex flex-col items-center">
                {content.assets.image ? (
                    <LocalImage id={content.id} />
                ) : (
                    <div className="w-44 h-72  bg-border text-center flex flex-col items-center justify-center">
                        <div className="whitespace-pre-wrap font-bold">
                            {content.title}
                        </div>
                        <div className="whitespace-pre-wrap">
                            Изображение скоро будет ;3
                        </div>
                    </div>
                )}
                {content.assets.text && (
                    <button
                        className="w-48 border border-primary py-2 mt-2"
                        onClick={() => {
                            if (isAuth) {
                                alert(
                                    "Прочтение в разработке, авторизованные пользователи могут прослушать книгу"
                                );
                            } else {
                                alert("Для прочтения требуется авторизация");
                            }
                        }}
                    >
                        Читать
                    </button>
                )}
                {content.assets.audio && (
                    <button
                        className="w-48 bg-primary text-text-dark py-2 mt-2"
                        onClick={() => {
                            if (isAuth) {
                                setIsPlayerOpen(!isPlayerOpen);
                            } else {
                                alert(
                                    "Для прослушивания требуется авторизация"
                                );
                            }
                        }}
                        disabled={!content.assets.audio}
                    >
                        {!isPlayerOpen ? "Слушать аудио" : "Скрыть плеер"}
                    </button>
                )}
                {isAuth && userMeta && content.assets.audio && (
                    <div className="flex justify-between w-48 py-2">
                        <div>{`Глава ${userMeta.audio.currentChapter + 1}`}</div>
                        <div>{`Время ${timeTransform(userMeta.audio.currentTime)}`}</div>
                    </div>
                )}
            </div>
            <div className="w-full items-start mt-5 lg:w-4/6 lg:mt-0 lg:ml-5">
                <div className="mb-2 text-2xl font-bold flex justify-between items-start">
                    {content.title}
                </div>
                {isAuth && userMeta && <Status userMeta={userMeta} />}
                <div className="flex">
                    <div>{content.cycle.title}</div>
                    <div className="ml-2">{content.cycle.number}</div>
                </div>
                <div className="mb-2">{content.author}</div>
                <div className="mt-5 text-xl font-bold">Описание</div>
                <div className="mt-2 w-full">{content.description}</div>
            </div>
        </div>
    );
};
