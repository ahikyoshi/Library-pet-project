import clsx from "clsx";
import { IPagesComponentProps } from "./types";

export const Pages = ({
    number,
    currentPage,
    setCurrentPage
}: IPagesComponentProps) => {
    return (
        <li
            className={clsx(currentPage === number && "underline", "mx-1")}
            onClick={() => setCurrentPage(number)}
            key={number}
        >
            {number}
        </li>
    );
};
