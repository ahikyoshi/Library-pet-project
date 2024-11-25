import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";

export const Controls = ({
    setCurrentPage,
    setIsOpenMenu,
    isOpenMenu
}: {
    setCurrentPage: Dispatch<SetStateAction<number>>,
    setIsOpenMenu: Dispatch<SetStateAction<boolean>>,
    isOpenMenu: boolean
}) => {
    const handleNextPage = () => {
        setCurrentPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prev) => {
            if (prev > 0) {
                return prev - 1;
            }
            return prev;
        });
    };

    const handleShow = () => {
        setIsOpenMenu((prev) => !prev);
    };

    return (
        <div
            className={clsx(
                "fixed flex left-0 w-screen",
                isOpenMenu ? "top-14" : "top-0"
            )}
            style={{ height: isOpenMenu ? "calc(100vh - 112px)" : "100vh" }}
        >
            <div className="w-1/3" onClick={handlePrevPage} />
            <div className="w-1/3" onClick={handleShow} />
            <div className="w-1/3" onClick={handleNextPage} />
        </div>
    );
};
