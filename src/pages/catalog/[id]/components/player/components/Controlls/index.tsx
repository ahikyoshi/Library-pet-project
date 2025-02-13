"use client";

// libs
import { useEffect, useState } from "react";
// utils
import { changeTime } from "./utils";
// types
import { IControlsComponentProps } from "./types";
import { Svg } from "@/components/Svg";

export const Controls = ({ current, audioRef }: IControlsComponentProps) => {
    const [isPlay, setIsPlay] = useState<boolean>(false);

    useEffect(() => {
        const audioElement = audioRef?.current;
        if (audioElement) {
            const handlerPlayPause = () => {
                setIsPlay(audioElement.paused);
            };

            audioElement.addEventListener("play", handlerPlayPause);
            audioElement.addEventListener("pause", handlerPlayPause);

            handlerPlayPause();

            return () => {
                audioElement.removeEventListener("play", handlerPlayPause);
                audioElement.removeEventListener("pause", handlerPlayPause);
            };
        }
    }, [audioRef]);

    if (!audioRef) {
        return <div>Loading</div>;
    }
    return (
        <div className="flex items-center flex-shrink-0 mx-2">
            <div
                onClick={() => {
                    if (current > 10) {
                        const isNext = false;
                        changeTime({ audioRef, isNext });
                    }
                }}
            >
                <Svg src="/assets/icons/player/theme/replay.svg" size={28} />
            </div>
            <div className="mx-3 border border-text-primary cursor-pointer">
                {isPlay ? (
                    <div
                        onClick={() => {
                            audioRef?.current
                                ?.play()
                                .catch((e) => console.log(e));
                        }}
                    >
                        <Svg
                            src="/assets/icons/player/theme/play.svg"
                            size={32}
                        />
                    </div>
                ) : (
                    <div
                        onClick={() => {
                            audioRef?.current?.pause();
                        }}
                    >
                        <Svg
                            src="/assets/icons/player/theme/pause.svg"
                            size={32}
                        />
                    </div>
                )}
            </div>
            <div
                onClick={() => {
                    const isNext = true;
                    changeTime({ audioRef, isNext });
                }}
            >
                <Svg src="/assets/icons/player/theme/forward.svg" size={28} />
            </div>
        </div>
    );
};
