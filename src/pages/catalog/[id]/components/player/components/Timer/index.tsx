"use client";

// libs
import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
// utils
import { timeTransform } from "../../utils";
import { Svg } from "@/components/Svg";

export const Timer = ({
    audioRef
}: {
    audioRef: React.RefObject<HTMLAudioElement> | null
}) => {
    const listRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [currentTimer, setCurrentTimer] = useState(0);
    const [timeSwamp, setTimeSwamp] = useState(0);
    const [timerList] = useState([1, 5, 15, 30, 60, 120]);

    useEffect(() => {
        setTimeSwamp(currentTimer * 60);
    }, [currentTimer]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen &&
                listRef.current &&
                !listRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    useEffect(() => {
        if (timeSwamp > 0) {
            if (timerRef.current) clearInterval(timerRef.current);

            timerRef.current = setInterval(() => {
                setTimeSwamp((prevTimeSwamp) => {
                    if (prevTimeSwamp <= 1) {
                        clearInterval(timerRef.current as NodeJS.Timeout);
                        timerRef.current = null;
                        if (audioRef?.current) {
                            audioRef.current.pause();
                        }
                        return 0;
                    }
                    return prevTimeSwamp - 1;
                });
            }, 1000);
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [timeSwamp]);

    const toggleList = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const forEndChapter = () => {
        if (audioRef?.current) {
            setTimeSwamp(
                Math.floor(audioRef.current.duration) -
                    Math.floor(audioRef.current.currentTime)
            );
        }
    };

    return (
        <div className="flex flex-col items-center" ref={listRef}>
            {isOpen && (
                <ul className="bg-border flex flex-col items-center absolute z-20 bottom-14 left-0">
                    {timerList.map((time) => (
                        <li
                            key={time}
                            className={clsx(
                                time === currentTimer && "underline",
                                "px-2 py-1 text-xs cursor-pointer whitespace-nowrap"
                            )}
                            onClick={() => {
                                setCurrentTimer(time);
                                setIsOpen(false);
                            }}
                        >{`${time} минут`}</li>
                    ))}
                    <li
                        className={clsx(
                            "px-2 py-1 text-xs cursor-pointer whitespace-nowrap"
                        )}
                        onClick={forEndChapter}
                    >
                        Конец главы
                    </li>
                    <li
                        className="px-2 py-1 text-xs cursor-pointer whitespace-nowrap"
                        onClick={() => {
                            setCurrentTimer(0);
                            setIsOpen(false);
                            if (timerRef.current) {
                                clearInterval(timerRef.current);
                                timerRef.current = null;
                            }
                        }}
                    >
                        Отключить
                    </li>
                </ul>
            )}
            <div onClick={toggleList}>
                <Svg src="/assets/icons/player/theme/timer.svg" size={32} />
            </div>
            <div className="text-center text-xs">
                {timeTransform(timeSwamp)}
            </div>
        </div>
    );
};
