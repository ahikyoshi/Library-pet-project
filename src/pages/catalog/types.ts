import { IBook } from "@/globalTypes";
import { Dispatch, SetStateAction } from "react";

export interface IServerResponse {
    catalog: IBook[];
    pages: number;
    success: boolean;
}

export interface IGetCatalogProps {
    limit: 10 | 25 | 50;
    currentPage: number;
    setBooks: Dispatch<SetStateAction<IBook[]>>;
    setPages: Dispatch<SetStateAction<number>>;
}
