// libs
import React, { useRef, useState, useEffect, useReducer } from "react";
// components
import { Slider } from "./components/Slider";
import { Controls } from "./components/Controlls";
import { Volume } from "./components/Volume";
import { Speed } from "./components/Speed";
import { Timer } from "./components/Timer";
import { Tracks } from "./components/Tracks";
// utils
import {
    bookEnded,
    getTracks,
    nextTrack,
    playerReducer,
    updateUserBook
} from "./utils";
// types
import { IUserBook } from "@/globalTypes";
import { IPlayerComponentProps, IPlayerState } from "./types";

export const Player = ({
    id,
    userMeta,
    title,
    setContent,
    setIsOpen
}: IPlayerComponentProps) => {
    const initialState: IPlayerState = {
        tracks: {
            current: userMeta.audio.currentChapter,
            list: []
        },
        time: {
            current: userMeta.audio.currentTime,
            duration: 0
        }
    };
    const [player, playerDispatch] = useReducer(playerReducer, initialState);
    const [isLoading] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const abortController = useRef<AbortController | null>(null);

    useEffect(() => {
        abortController.current = new AbortController();

        return () => {
            if (abortController.current) {
                abortController.current.abort();
            }
        };
    }, []);

    const getDuration = () => {
        fetch(
            `/api/audio/meta?id=${id}&fileName=${player.tracks.list[player.tracks.current]}`
        )
            .then((res) => res.json())
            .then((data: { success: boolean, message: string }) => {
                if (data.success) {
                    playerDispatch({
                        type: "CHANGE_DURATION",
                        payload: Number(data.message)
                    });
                } else {
                    console.log(data.message);
                }
            })
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        if (player.time.current % 10 === 0 && player.time.current != 0) {
            const newUserMeta: IUserBook = {
                ...userMeta,
                status: "in progress",
                audio: {
                    currentTime: player.time.current,
                    currentChapter: player.tracks.current
                }
            };

            updateUserBook(newUserMeta);

            setContent((prev) => {
                if (!prev) {
                    return null;
                }

                return {
                    ...prev,
                    user: newUserMeta
                };
            });
        }
    }, [player.time.current]);
    useEffect(() => {
        if (audioRef && audioRef.current) {
            if (
                Math.abs(audioRef.current.currentTime - player.time.current) > 5
            ) {
                audioRef.current.currentTime = player.time.current;
            }
        }
    }, [player.time.current, audioRef]);

    useEffect(() => {
        getTracks({ id, playerDispatch });
    }, [id]);

    if (isLoading) {
        return <div>Loading</div>;
    }

    return (
        <div className="w-screen bg-background fixed bottom-0 left-0">
            <div className="w-full flex flex-col">
                <Slider
                    current={player.time.current}
                    duration={player.time.duration}
                    playerDispatch={playerDispatch}
                />
                <div className="flex px-1">
                    <Tracks
                        tracks={player.tracks}
                        title={title}
                        playerDispatch={playerDispatch}
                    />
                    <Volume audioRef={audioRef} />
                </div>
                <div className="w-full p-1 flex justify-between items-center">
                    <Timer audioRef={audioRef} />
                    <Controls
                        current={player.time.current}
                        audioRef={audioRef}
                    />
                    <Speed audioRef={audioRef} />
                </div>
            </div>
            {/* Audio */}
            <audio
                src={`/api/audio/file?id=${id}&fileName=${player.tracks.list[player.tracks.current]}`}
                ref={audioRef}
                onTimeUpdate={() => {
                    playerDispatch({
                        type: "CHANGE_TIME",
                        payload: Math.floor(
                            Number(audioRef.current?.currentTime)
                        )
                    });
                }}
                onLoadedMetadata={getDuration}
                onEnded={() => {
                    if (nextTrack(player, playerDispatch)) {
                        bookEnded(setIsOpen, setContent, userMeta);
                    }
                }}
                autoPlay
                hidden
            />
        </div>
    );
};
