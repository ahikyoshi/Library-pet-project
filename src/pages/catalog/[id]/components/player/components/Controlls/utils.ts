import { IChangeTimeProps } from "./types";

export const changeTime = ({ audioRef, isNext }: IChangeTimeProps) => {
    if (audioRef?.current) {
        const audioElement = audioRef.current;

        if (isNext) {
            audioElement.currentTime = Math.min(
                audioElement.currentTime + 10,
                audioElement.duration
            );
        } else {
            audioElement.currentTime = Math.max(
                audioElement.currentTime - 10,
                0
            );
        }
    }
};
