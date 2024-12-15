"use client";

// libs
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export const Volume = ({
    audioRef
}: {
    audioRef: React.RefObject<HTMLAudioElement> | null
}) => {
    const [isOpen, setIsOpen] = useState(false);
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
            className="px-2 ml-2  flex flex-col items-center cursor-pointer shrink-0"
        >
            {isOpen && (
                <div
                    className="bg-border w-24 h-6 absolute z-20 -top-12 rounded-md flex items-center justify-center"
                    style={{
                        transform: "rotate(-90deg)",
                        transformOrigin: "center"
                    }}
                >
                    <input
                        type="range"
                        min="0"
                        value={volume}
                        max="100"
                        className="h-1 w-20 cursor-pointer bg-gray-200 rounded-full"
                        onChange={(e) => setVolume(Number(e.target.value))}
                    />
                </div>
            )}
            <Image
                src={`/assets/icons/volume_${VolumeSrc(volume)}.svg`}
                className="w-6 h-6"
                width={25}
                height={25}
                onClick={() => setIsOpen(!isOpen)}
                alt="volume"
            />
            <span className="text-xs">{volume}%</span>
        </div>
    );
};
