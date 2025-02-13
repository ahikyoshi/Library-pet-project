"use client";

// libs
import { useEffect, useRef, useState } from "react";
// types
import { TPlayerAction } from "../../types";
import { Svg } from "@/components/Svg";

export const Tracks = ({
    tracks,
    playerDispatch
}: {
    tracks: {
        current: number,
        list: string[]
    },
    playerDispatch: React.Dispatch<TPlayerAction>
}) => {
    const [isListOpen, setIsListOpen] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isListOpen &&
                listRef.current &&
                !listRef.current.contains(event.target as Node)
            ) {
                setIsListOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isListOpen]);
    return (
        <div
            className="w-full h-10 flex flex-col justify-center cursor-pointer overflow-hidden whitespace-nowrap"
            ref={listRef}
        >
            <div>
                <div
                    className="flex"
                    onClick={() => setIsListOpen(!isListOpen)}
                >
                    <Svg src="/assets/icons/player/theme/list.svg" size={24} />
                    <div className="overflow-hidden mx-1 flex-shrink">
                        {tracks.list[tracks.current]}
                    </div>
                </div>
            </div>
            {isListOpen && (
                <div className="w-screen max-h-[calc(50vh-112px)] overflow-y-scroll  bg-background absolute left-0 bottom-28 md:left-auto">
                    <ul>
                        {tracks.list.map(
                            (trackTitle: string, index: number) => {
                                return (
                                    <li
                                        className="w-full odd:bg-border py-2 px-1 md:first:rounded-t-md md:last:rounded-b-md"
                                        onClick={() => {
                                            playerDispatch({
                                                type: "CHANGE_TRACK",
                                                payload: index
                                            });
                                            setIsListOpen(false);
                                        }}
                                        key={index}
                                    >
                                        {trackTitle}
                                    </li>
                                );
                            }
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};
