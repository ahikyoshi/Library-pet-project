import { Dispatch, SetStateAction } from "react";

export interface IPagesComponentProps {
    number: number;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}
