import { IBook } from "@/globalTypes";
import { Dispatch, SetStateAction } from "react";

export interface IGetCatalogProps {
    currentPage: number;
    searchedValue: string;
    setList: Dispatch<SetStateAction<IBook[]>>;
    setPages: Dispatch<SetStateAction<number>>;
}

