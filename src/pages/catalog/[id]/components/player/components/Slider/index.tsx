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
    const [visualTime, setVisualTime] = useState(current);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (!isDragging) {
            setVisualTime(current);
        }
    }, [current, isDragging]);

    return (
        <div className="relative w-full h-4 bg-border">
            <div
                className="h-4 bg-primary"
                style={{
                    width: `${((visualTime / duration) * 100).toFixed(2)}%`
                }}
            />
            <input
                type="range"
                className="absolute w-full top-0 z-10 opacity-0 cursor-pointer"
                min={0}
                value={visualTime}
                max={duration}
                onChange={(e) => {
                    setVisualTime(Number(e.target.value));
                }}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => {
                    setIsDragging(false);
                    playerDispatch({
                        type: "CHANGE_TIME",
                        payload: visualTime
                    });
                }}
                onBlur={() => {
                    setIsDragging(false);
                    setVisualTime(current);
                }}
            />
            <div className="text-xs absolute top-0 ml-2">
                {`${timeTransform(visualTime)} / ${timeTransform(duration)}`}
            </div>
        </div>
    );
};
