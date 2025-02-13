"use client";

// libs
import React, { useState, useEffect } from "react";
// utils
import { timeTransform } from "../../utils";
// types
import { TPlayerAction } from "../../types";

export const Slider = ({
    current,
    duration,
    playerDispatch
}: {
    current: number,
    duration: number,
    playerDispatch: React.Dispatch<TPlayerAction>
}) => {
    const [progress, setProgress] = useState("0");

    const changeTime = (event: React.MouseEvent<HTMLDivElement>) => {
        const clickX = event.clientX;
        const windowX = window.innerWidth;

        const newProgress = (clickX / windowX) * 100;
        setProgress(newProgress.toFixed(2));

        playerDispatch({
            type: "CHANGE_TIME",
            payload: Math.floor(duration * (newProgress / 100))
        });
    };

    useEffect(() => {
        setProgress(((current / duration) * 100).toFixed(2));
    }, [current]);

    return (
        <div
            className="relative w-full h-4 px-2"
            onClick={changeTime}
            style={{
                background: `linear-gradient(90deg, rgb(255, 0, 0) 0%, rgb(255,0,0) ${progress}%, rgb(50,50,50) ${progress}%)`
            }}
        >
            <div className="text-xs text-text-contrast">
                {timeTransform(current) + " / " + timeTransform(duration)}
            </div>
        </div>
    );
};
