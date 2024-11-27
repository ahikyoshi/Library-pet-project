"use client";

// libs
import Image from "next/image";
// utils
import { timeTransform } from "../player/utils";
// components

// types
import { IContentComponentProps } from "./types";
import { Status } from "./componetns/status";

export const Content = ({
    content,
    isAuth,
    userMeta,
    isPlayerOpen,
    setIsPlayerOpen
}: IContentComponentProps) => {
    return (
        <div className="flex flex-col lg:flex-row">
            <div className="w-full flex items-center flex-col lg:w-48">
                {content.assets.image ? (
                    <Image
                        src={`/data/library/files/${content.id}/${content.id}.webp`}
                        className="w-48 h-72"
                        width={192}
                        height={288}
                        alt={content.title}
                    />
                ) : (
                    <div className="w-48 h-72 bg-slate-500" />
                )}
                {content.assets.text && (
                    <button
                        className="w-48 bg-orange-400 py-2 mt-2"
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
                        className="w-48 bg-indigo-500 py-2 mt-2"
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
                <div className="text-2xl mb-2 flex justify-between items-start">
                    {content.title}
                </div>
                {isAuth && userMeta && <Status userMeta={userMeta} />}
                <div className="flex">
                    <div>{content.cycle.title}</div>
                    <div className="ml-2">{content.cycle.number}</div>
                </div>
                <div className="mb-2">{content.author}</div>
                <div className="text-xl mt-5">Описание</div>
                <div className="w-full mt-2">{content.description}</div>
            </div>
        </div>
    );
};
