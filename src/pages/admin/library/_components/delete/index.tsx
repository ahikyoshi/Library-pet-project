// utils
import { handleDelete } from "./utils";
// types
import { IDeleteComponentsProps } from "./types";
import { Modal } from "@/components/modal";

export const Delete = ({
    currentTarget,
    setCurrentTarget,
    setIsOpen
}: IDeleteComponentsProps) => {
    return (
        <Modal closeAction={setIsOpen}>
            <div className="flex flex-col rounded bg-background p-2">
                <div className="mb-2 text-lg font-bold">
                    Вы точно хотите удалить книгу?
                </div>
                <div className="mb-1 text-xs flex">
                    <div className="mr-2">{currentTarget?.title}</div>
                    <div>{currentTarget?.author}</div>
                </div>
                <div className="mb-2 text-xs">ID: {currentTarget?.id}</div>

                <div className="flex justify-between items-center">
                    <button
                        className=" text-text-secondaryLight"
                        onClick={() => {
                            setIsOpen(false);
                            setCurrentTarget(null);
                        }}
                    >
                        отменить
                    </button>
                    <button
                        className="bg-primary px-2 py-1 text-text-dark rounded"
                        onClick={() =>
                            handleDelete({
                                currentTarget,
                                setCurrentTarget,
                                setIsOpen
                            })
                        }
                    >
                        подтвердить
                    </button>
                </div>
            </div>
        </Modal>
    );
};
