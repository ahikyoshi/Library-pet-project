import { IBook } from "@/globalTypes";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";

export interface ITextFormComponentProps {
    content: IBook | null;
    setIsFB2Open: Dispatch<SetStateAction<boolean>>;
}

export interface IHandleChangeFilesProps {
    event: ChangeEvent<HTMLInputElement>;
    setIsFileUpload: Dispatch<SetStateAction<boolean>>;
    setFileName: Dispatch<SetStateAction<string | null>>;
}

export interface IHandleUploadText {
    event: FormEvent<HTMLFormElement>;
    content: IBook | null;
    setIsFB2Open: Dispatch<SetStateAction<boolean>>;
}
