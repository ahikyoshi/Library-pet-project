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

export interface IHandleSubmit {
    event: FormEvent<HTMLFormElement>;
    setIsStatus: Dispatch<SetStateAction<IResponse | null>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}
