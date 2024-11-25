import { IBook } from "@/globalTypes";
import { Dispatch, SetStateAction } from "react";

export interface IDeleteComponentsProps {
    currentTarget: IBook | null;
    setCurrentTarget: Dispatch<SetStateAction<IBook | null>>;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}
