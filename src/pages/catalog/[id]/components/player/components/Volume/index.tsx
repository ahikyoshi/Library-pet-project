"use client";

// libs
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export const Volume = ({
    audioRef
}: {
    audioRef: React.RefObject<HTMLAudioElement> | null
}) => {
    const [isOpen, setIsOpen] = useState(true);
    const [volume, setVolume] = useState(10);
    const volumeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (audioRef?.current) {
            const audioElement = audioRef.current;
            const newVolume = volume / 100;

            if (audioElement.volume !== newVolume) {
                audioElement.volume = newVolume;
            }
        }
    }, [volume, audioRef]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen &&
                volumeRef.current &&
                !volumeRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const VolumeSrc = (volume: number) => {
        switch (true) {
            case volume === 0:
                return 0;
            case volume > 80:
                return 80;
            default:
                return 50;
        }
    };

    return (
        <div
            ref={volumeRef}
            className="mr-2 w-6 flex flex-col items-center cursor-pointer shrink-0"
        >
            {isOpen && (
                <div className="w-6 py-2 bg-background border border-border rounded-md flex items-end justify-center absolute z-20 -top-28">
                    <div
                        className="w-1"
                        onClick={(event) => {
                            const slider =
                                event.currentTarget.getBoundingClientRect();

                            let volume = event.clientY - slider.bottom;

                            volume = -volume < 5 ? 0 : -volume;

                            setVolume(volume);
                        }}
                        style={{
                            height: 100,
                            background: `linear-gradient(180deg, rgb(50, 50, 50) 0%, rgb(50,50,50) ${100 - volume}%, rgb(255,0,0) ${100 - volume}%)`
                        }}
                    />
                </div>
            )}
            <Image
                src={`/assets/icons/volume_${VolumeSrc(volume)}.svg`}
                className="w-6 h-6"
                width={24}
                height={24}
                onClick={() => setIsOpen(!isOpen)}
                alt="volume"
            />
            <span className="text-xs">{volume}%</span>
        </div>
    );
};
