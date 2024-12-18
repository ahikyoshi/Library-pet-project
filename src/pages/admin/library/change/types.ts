import { IBook } from "@/globalTypes";
import { Dispatch, FormEvent, SetStateAction } from "react";

export interface IResponse {
    success: boolean;
    message: string;
}

export interface INewBook {
    title: string;
    author: string;
    cycle: {
        title: string,
        number: number
    };
    description: string;
    meta: {
        writtingDate: string
    };
}

export interface IHandleSubmitProps {
    event: FormEvent<HTMLFormElement>;
    content: IBook;
    setIsStatus: Dispatch<SetStateAction<IResponse | null>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export interface IGetContentProps {
    id: string | string[];
    setContent: Dispatch<SetStateAction<IBook | null>>;
}
