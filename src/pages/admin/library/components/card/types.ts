import { IBook } from "@/globalTypes";
import { Dispatch, SetStateAction } from "react";

export interface ICardComponentProps {
    book: IBook;
    index: number;
    setIsDeleteOpen: Dispatch<SetStateAction<boolean>>;
    setCurrentDelete: Dispatch<SetStateAction<IBook | null>>;
    currentPage: number;
}
