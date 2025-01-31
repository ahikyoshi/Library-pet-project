// libs
import { useEffect, useState } from "react";
import clsx from "clsx";
// components
import { Svg } from "@/components/Svg";
// utils
import { debounce } from "@/globalUtils";
// types
import { IChaptersProps } from "./types";

export const Chapters = ({
    chapters,
    currentChapter,
    setCurrentChapter
}: IChaptersProps) => {
    const [isListOpen, setIsListOpen] = useState<boolean>(false);
    const [scrollPosition, setScrollPosition] = useState<number>(
        window.scrollY
    );

    useEffect(() => {
        const handleScroll = debounce(() => {
            setScrollPosition(window.scrollY + window.innerHeight);
        }, 100);

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="w-screen p-2 bg-background border-t-2 border-border fixed bottom-0">
            {isListOpen && (
                <ul className="w-screen bg-background absolute bottom-[100%] left-0">
                    {chapters.map((chapter, index) => {
                        return (
                            <li
                                className={clsx(
                                    index === currentChapter && "bg-border",
                                    "p-2"
                                )}
                                onClick={() => {
                                    if (index != currentChapter) {
                                        setIsListOpen(false);
                                        setCurrentChapter(index);
                                    }
                                }}
                                key={chapter.chapterTitle}
                            >
                                {chapter.chapterTitle}
                            </li>
                        );
                    })}
                </ul>
            )}
            <div className="flex items-center">
                <div className="mr-2 text-xs">
                    {Math.floor(
                        (scrollPosition / document.body.offsetHeight) * 100
                    )}
                    %
                </div>
                <div
                    className="w-full h-1"
                    style={{
                        background: `linear-gradient(270deg, rgb(50, 50, 50) 0%, rgb(50,50,50) ${
                            100 -
                            Math.floor(
                                (scrollPosition / document.body.offsetHeight) *
                                    100
                            )
                        }%, rgb(255,0,0) ${
                            100 -
                            Math.floor(
                                (scrollPosition / document.body.offsetHeight) *
                                    100
                            )
                        }%)`
                    }}
                />
            </div>
            <div className="flex justify-between">
                <div className="w-1/2 flex items-center">
                    <Svg
                        src={"/assets/icons/header/theme/menu.svg"}
                        size={24}
                    />
                    <div
                        className="ml-2 text-xl font-bold"
                        onClick={() => {
                            setIsListOpen((prev) => !prev);
                        }}
                    >
                        {chapters[currentChapter].chapterTitle}
                    </div>
                </div>
                <div className="flex items-center">
                    <Svg
                        src="/assets/icons/reader/theme/font_size.svg"
                        styles="mr-2"
                        size={18}
                    />
                    <Svg src="/assets/icons/reader/theme/bg.svg" size={18} />
                </div>
            </div>
        </div>
    );
};
