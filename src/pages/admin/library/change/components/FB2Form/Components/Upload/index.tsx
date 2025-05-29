import { Svg } from "@/components/Svg";
import { useState } from "react";
import { upload } from "./utils";

interface IComponentProps {
    id: string;
    closeModal: () => void;
    addImage: () => void;
}

export const Upload = ({ id, closeModal, addImage }: IComponentProps) => {
    const [fileWarning, setFileWarning] = useState("");

    return (
        <>
            <input
                type="file"
                id="upload"
                onChange={(event) => {
                    const props = {
                        event,
                        id,
                        closeModal,
                        addImage,
                        setFileWarning
                    };
                    upload(props);
                }}
                hidden
            />
            <p className="mt-2">Внимание! Поддерживается только формат fb2.</p>
            <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center">
                    <Svg src="/assets/icons/admin/theme/file.svg" size={24} />

                    <label htmlFor="upload" className="ml-2 text-xs">
                        Добавить файл
                    </label>
                </div>
                <div
                    onClick={closeModal}
                    className=" bg-primary px-2 py-1 rounded cursor-pointer"
                >
                    Закрыть
                </div>
            </div>
        </>
    );
};
