// libs
// utils
import { handleDelete } from "./utils";
// types
import { IDeleteComponentsProps } from "./types";

export const Delete = ({
    currentTarget,
    setCurrentTarget,
    setIsOpen,
    setCurrentPage
}: IDeleteComponentsProps) => {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black/70 flex items-center justify-center">
            <div className="rounded bg-slate-700 w-5/6 p-4">
                <div>
                    <div className="text-lg font-bold">
                        Вы точно хотите удалить книгу?
                    </div>
                    <div className="text-xs flex mb-1 mt-2">
                        <div>{currentTarget?.title}</div>
                        <div>{currentTarget?.author}</div>
                    </div>
                    <div className="text-xs">ID: {currentTarget?.id}</div>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <button
                        className="bg-rose-600 rounded-sm px-2 py-1"
                        onClick={() => {
                            setIsOpen(false);
                            setCurrentTarget(null);
                        }}
                    >
                        отменить
                    </button>
                    <button
                        className="bg-blue-800 px-2 py-1 rounded-sm"
                        onClick={() =>
                            handleDelete({
                                currentTarget,
                                setCurrentTarget,
                                setIsOpen,
                                setCurrentPage
                            })
                        }
                    >
                        подтвердить
                    </button>
                </div>
            </div>
        </div>
    );
};
