import { RefObject } from "react";

export interface IControlsComponentProps {
    current: number;
    audioRef: RefObject<HTMLAudioElement> | null;
}

export interface IChangeTimeProps {
    audioRef: RefObject<HTMLAudioElement>;
    isNext: boolean;
}
