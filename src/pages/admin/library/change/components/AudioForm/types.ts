import { IBook } from "@/globalTypes";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

export interface IAudioFormComponentProps {
    content: IBook | null;
    setIsAudioOpen: Dispatch<SetStateAction<boolean>>;
    setContent: Dispatch<SetStateAction<IBook | null>>;
}

export interface IHandleChangeFilesProps {
    event: ChangeEvent<HTMLInputElement>;
    setIsFileUpload: Dispatch<SetStateAction<boolean>>;
    setFilesName: Dispatch<SetStateAction<string[] | null>>;
}

export interface IHandleUploadAudio {
    event: FormEvent<HTMLFormElement>;
    content: IBook | null;
    setContent: Dispatch<SetStateAction<IBook | null>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    setIsAudioOpen: Dispatch<SetStateAction<boolean>>;
}
