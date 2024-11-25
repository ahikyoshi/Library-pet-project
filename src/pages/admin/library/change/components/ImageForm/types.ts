import { IBook } from "@/globalTypes";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

export interface IImageFormComponentProps {
    content: IBook | null;
    setContent: Dispatch<SetStateAction<IBook | null>>;
    setIsImageOpen: Dispatch<SetStateAction<boolean>>;
}

export interface IHandleChangeFilesProps {
    event: ChangeEvent<HTMLInputElement>;
    setIsFileUpload: Dispatch<SetStateAction<boolean>>;
    setFileName: Dispatch<SetStateAction<string | null>>;
}

export interface IHandleUploadImage {
    event: FormEvent<HTMLFormElement>;
    content: IBook | null;
    setContent: Dispatch<SetStateAction<IBook | null>>;
    setIsImageOpen: Dispatch<SetStateAction<boolean>>;
    setServerResponse: Dispatch<SetStateAction<string | null>>;
}
