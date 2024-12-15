"use client";

// libs
import { useEffect, useRef, useState } from "react";
// types
import { TPlayerAction } from "../../types";

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
                    <svg width="24" height="24" className="flex-shrink-0">
                        <path
                            d="M7.714 16.286h12V18h-12v-1.714zm-3.428 0H6V18H4.286v-1.714zm4.285-5.143h11.143v1.714H8.571v-1.714zM7.714 6h12v1.714h-12V6zM4.286 6H6v1.714H4.286V6zm0 4.286L6.857 12l-2.571 1.714v-3.428z"
                            fill="white"
                        />
                    </svg>
                    <div className="overflow-hidden ml-1 flex-shrink">
                        {tracks.list[tracks.current]}
                    </div>
                </div>
            </div>
            {isListOpen && (
                <div className="w-screen  max-h-[calc(50vh-112px)] overflow-y-scroll  bg-background absolute left-0 bottom-28 md:left-auto">
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
