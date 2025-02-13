"use client";

// livs
import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Svg } from "@/components/Svg";

export const Speed = ({
    audioRef
}: {
    audioRef: React.RefObject<HTMLAudioElement> | null
}) => {
    const listRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [playSpeed, setPlaySpeed] = useState(1);
    const [speedList] = useState([0.8, 1, 1.25, 1.5, 2]);

    useEffect(() => {
        if (audioRef?.current) {
            audioRef.current.playbackRate = playSpeed;
        }
    }, [audioRef?.current?.src]);

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

    const changePlayBackRate = useCallback(
        (rate: number) => {
            if (audioRef?.current && audioRef.current.playbackRate !== rate) {
                audioRef.current.playbackRate = rate;
                setPlaySpeed(rate);
            }
        },
        [audioRef]
    );

    const toggleList = useCallback(() => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    }, []);
    return (
        <div className="flex flex-col items-center" ref={listRef}>
            {isOpen && (
                <ul className="absolute z-20 bottom-12 bg-border flex flex-col items-center">
                    {speedList.map((rate) => {
                        return (
                            <li
                                className={"px-2 py-1 cursor-pointer text-xs"}
                                key={rate}
                                onClick={() => changePlayBackRate(rate)}
                            >
                                <span
                                    className={clsx(
                                        rate === playSpeed && "opacity-100",
                                        "opacity-0 mr-1"
                                    )}
                                >
                                    &#8250;
                                </span>
                                {`${rate}x`}
                            </li>
                        );
                    })}
                </ul>
            )}
            <div onClick={toggleList}>
                <Svg src="/assets/icons/player/theme/speed.svg" size={32} />
            </div>
            <div className="text-center text-xs">{playSpeed}X</div>
        </div>
    );
};
