import { IBook, IUserBook } from "@/globalTypes";
import { Dispatch, SetStateAction } from "react";

export interface IContentComponentProps {
    content: IBook;
    isAuth: boolean;
    userMeta: IUserBook | undefined;
    isPlayerOpen: boolean;
    setIsPlayerOpen: Dispatch<SetStateAction<boolean>>;
}
