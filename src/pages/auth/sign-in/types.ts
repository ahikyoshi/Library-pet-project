import { Dispatch, FormEvent, SetStateAction } from "react";

export interface IServerResponse {
    success: boolean;
    message: string;
}

export interface IHandleSubmitProps {
    event: FormEvent<HTMLFormElement>;
    setStatus: Dispatch<SetStateAction<null | IServerResponse>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
}
