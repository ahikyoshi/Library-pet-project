import React, { useRef, useState, useEffect, useReducer } from "react";
import { IUserBook } from "@/globalTypes";
import { getTracks, nextTrack, playerReducer } from "./utils";
import { IPlayerComponentProps, IPlayerState } from "./types";
import { Slider } from "./components/Slider";
import { Controls } from "./components/Controlls";
import { Volume } from "./components/Volume";
import { Speed } from "./components/Speed";
import { Timer } from "./components/Timer";
import { Tracks } from "./components/Tracks";

export const Player = ({ id, userMeta, setContent }: IPlayerComponentProps) => {
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

            fetch("/api/user/book/change", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    newBook: newUserMeta
                })
            }).catch((e) => console.log(e));

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
        <div className="w-screen  bg-slate-800 fixed bottom-0 left-0">
            <div className="w-full flex flex-col">
                <Slider
                    current={player.time.current}
                    duration={player.time.duration}
                    playerDispatch={playerDispatch}
                />
                <div className="flex py-1">
                    <Tracks
                        tracks={player.tracks}
                        playerDispatch={playerDispatch}
                    />
                    <Volume audioRef={audioRef} />
                </div>
                <div className="w-full flex justify-between items-center">
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
                src={`/data/library/files/${id}/audio/${player.tracks.list[player.tracks.current]}`}
                ref={audioRef}
                onTimeUpdate={() =>
                    playerDispatch({
                        type: "CHANGE_TIME",
                        payload: Math.floor(
                            Number(audioRef.current?.currentTime)
                        )
                    })
                }
                onLoadedMetadata={() => {
                    playerDispatch({
                        type: "CHANGE_DURATION",
                        payload: Number(audioRef.current?.duration)
                    });
                }}
                onEnded={() => nextTrack(player, playerDispatch)}
                autoPlay
                hidden
            />
        </div>
    );
};
