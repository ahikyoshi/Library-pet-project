"use client";

// libs
import { useEffect, useRef, useState } from "react";
// types
import { TPlayerAction } from "../../types";
import { Svg } from "@/components/Svg";
import { trackDurationTransform, trackTransform } from "../../utils";

export const Tracks = ({
    tracks,
    title,
    playerDispatch
}: {
    tracks: {
        current: number,
        list: string[]
    },
    title: string,
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

    useEffect(() => {
        document.title = `Aurora: ${trackTransform(tracks.list[tracks.current], title)}`;
    }, [tracks]);
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
                    <div className="w-6 h-6">
                        <Svg
                            src="/assets/icons/player/theme/list.svg"
                            size={24}
                        />
                    </div>
                    <div className="overflow-hidden mx-1 flex-shrink flex">
                        {trackTransform(tracks.list[tracks.current], title)}
                    </div>
                </div>
            </div>
            {isListOpen && (
                <div className="w-fit max-w-screen max-h-[calc(50vh-112px)] overflow-y-auto overflow-x-hidden bg-background absolute left-0 bottom-28 md:left-auto">
                    <ul>
                        {tracks.list.map(
                            (trackTitle: string, index: number) => {
                                return (
                                    <li
                                        className="max-w-screen py-2 px-1 overflow-x-hidden odd:bg-border flex"
                                        onClick={() => {
                                            playerDispatch({
                                                type: "CHANGE_TRACK",
                                                payload: index
                                            });
                                            setIsListOpen(false);
                                        }}
                                        key={index}
                                    >
                                        <div>
                                            {trackTransform(trackTitle, title)}
                                        </div>
                                        <div className="ml-2">
                                            {trackDurationTransform(trackTitle)}
                                        </div>
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
