"use client";

// libs
import { useEffect, useState } from "react";
import Image from "next/image";
// utils
import { changeTime } from "./utils";
// types
import { IControlsComponentProps } from "./types";

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
            <Image
                src={"/assets/icons/replay.svg"}
                className="cursor-pointer"
                onClick={() => {
                    if (current > 10) {
                        const isNext = false;
                        changeTime({ audioRef, isNext });
                    }
                }}
                width={28}
                height={28}
                alt="replay"
            />
            <div className="mx-3 border border-white cursor-pointer">
                {isPlay ? (
                    <Image
                        src="/assets/icons/player_play.svg"
                        onClick={() => {
                            audioRef?.current
                                ?.play()
                                .catch((e) => console.log(e));
                        }}
                        width={32}
                        height={32}
                        alt="play"
                    />
                ) : (
                    <Image
                        src={"/assets/icons/player_pause.svg"}
                        onClick={() => {
                            audioRef?.current?.pause();
                        }}
                        width={32}
                        height={32}
                        alt="pause"
                    />
                )}
            </div>
            <Image
                src={"/assets/icons/forward.svg"}
                className="cursor-pointer"
                onClick={() => {
                    const isNext = true;
                    changeTime({ audioRef, isNext });
                }}
                width={28}
                height={28}
                alt="forward"
            />
        </div>
    );
};
