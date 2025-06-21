import { IServerResponse } from "@/globalTypes";
import { useState } from "react";

interface IComponentsProps {
    id: string;
    closeModal: () => void;
    deleteImage: () => void;
}

export const Delete = ({ id, closeModal, deleteImage }: IComponentsProps) => {
    const [error, setError] = useState("");

    const handleDelete = () => {
        fetch(`/api/library/book/assets/image/delete?id=${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
            .then((res) => res.json())
            .then((data: IServerResponse<null>) => {
                if (data.success) {
                    deleteImage();
                    closeModal();
                } else {
                    setError(data.message);
                }
            })
            .catch(() => {
                setError("Ой. Что-то пошло не так");
            });
    };
    return (
        <>
            <h1 className="text-xl">Вы уверены что хотите удалить?</h1>
            <div className="text-xs text-primary text-center">{error}</div>
            <div className="w-full mt-2 flex">
                <button
                    onClick={handleDelete}
                    type="button"
                    className="w-full px-2 py-1 bg-primary rounded"
                >
                    Удалить
                </button>
                <button
                    type="button"
                    onClick={closeModal}
                    className="ml-2 text-text-secondary hover:text-text-primary"
                >
                    закрыть
                </button>
            </div>
        </>
    );
};
