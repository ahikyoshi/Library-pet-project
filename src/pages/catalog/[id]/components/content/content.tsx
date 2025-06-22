"use client";

// libs
// import { useRouter } from "next/navigation";
// utils
import { timeTransform } from "../player/utils";
// components
import { LocalImage } from "@/components/LocalImage";
import { Status } from "./componetns/status";
// types
import { IContentComponentProps } from "./types";

export const Content = ({
    content,
    isAuth,
    userMeta,
    isPlayerOpen,
    setIsPlayerOpen
}: IContentComponentProps) => {
    // const router = useRouter();

    const showTime = () => {
        if (!isAuth || !userMeta) {
            return;
        }
        if (
            userMeta?.audio.currentTime === 0 &&
            userMeta.audio.currentChapter === 0
        ) {
            return;
        }

        return (
            <div className="flex justify-between w-48 py-2">
                <div>{`Глава ${userMeta.audio.currentChapter + 1}`}</div>
                <div>{`Время ${timeTransform(userMeta.audio.currentTime)}`}</div>
            </div>
        );
    };
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
                                alert("Данный раздел находится в разработке");
                                // router.push(`/reader/${content.id}`);
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
                        className="w-48 bg-primary text-text-contrast py-2 mt-2"
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
                {showTime()}
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
