import { useState } from "react";

interface IComponentsProps {
    id: string;
    closeModal: () => void;
    deleteImage: () => void;
}

export const Delete = ({ id, closeModal, deleteImage }: IComponentsProps) => {
    const [error, setError] = useState("");

    const handleDelete = () => {
        // Сделать чтобы информация о картинке перегружалась в глобальном компоненте
        fetch(`/api/library/book/assets/image/delete?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    deleteImage();
                    closeModal();
                } else {
                    setError(data.message);
                }
            })
            .catch((error) => {
                console.log(error);
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
