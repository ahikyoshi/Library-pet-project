import clsx from "clsx";
import { useEffect, useState } from "react";
import { NavItem } from "../ImageForm/Components/NavItem";
import { Modal } from "@/components/modal";
import { Upload } from "./Components/Upload";
import { Delete } from "./Components/Delete";
import { Download } from "./Components/Download";

export enum ModalType {
    None = "none",
    View = "view",
    Upload = "upload",
    Download = "download",
    Delete = "Delete"
}

type TMeta = {
    modified: string,
    size: string
};

export const FB2Form = ({
    isAdded,
    id
}: {
    isAdded: boolean,
    id: string | string[]
}) => {
    const [added, setAdded] = useState(isAdded);
    const [meta, setMeta] = useState<TMeta | null>(null);

    const [openModal, setOpenModal] = useState(ModalType.None);

    const closeModal = () => {
        setOpenModal(ModalType.None);
    };

    const addFB2 = () => {
        if (!added) {
            setAdded(true);
        }
    };

    const deleteText = () => {
        setAdded(false);
    };

    const sizeTransform = (size: number) => {
        return `${Math.round(size / 1024)} КБ`;
    };

    const dateTransform = (date: string) => {
        const dateform = new Date(date);
        const formatted = dateform
            .toLocaleString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            })
            .replace(",", "");
        return formatted;
    };

    useEffect(() => {
        if (isAdded) {
            fetch(`/api/library/book/assets/text/meta?id=${id}`)
                .then((req) => req.json())
                .then((data: { success: boolean, body: TMeta }) => {
                    if (data.success) {
                        setMeta(data.body);
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [isAdded]);
    return (
        <div className="flex">
            {/* Info */}
            <div className="w-full p-2 rounded border border-border flex items-center justify-between">
                <div className="flex">
                    <div>FB2 файл:</div>
                    <div
                        className={clsx(
                            added ? "text-success" : "text-notification",
                            "ml-2"
                        )}
                    >
                        {added ? "Добавлено" : "Отсутствует"}
                    </div>
                </div>
                {added && (
                    <div className="flex">
                        <div className="mr-2 text-xs">
                            {dateTransform(meta?.modified)}
                        </div>
                        <div className="text-xs">
                            {sizeTransform(Number(meta?.size))}
                        </div>
                    </div>
                )}
            </div>
            {/* Navigation */}
            <ul className="ml-2 flex border border-border rounded">
                {added && (
                    <>
                        <NavItem
                            type={ModalType.Download}
                            setOpenModal={setOpenModal}
                        />
                        <NavItem
                            type={ModalType.Delete}
                            setOpenModal={setOpenModal}
                        />
                    </>
                )}
                <NavItem type={ModalType.Upload} setOpenModal={setOpenModal} />
            </ul>
            {/* Modal */}
            {openModal != ModalType.None && (
                <Modal closeAction={closeModal}>
                    {openModal === ModalType.Upload && (
                        <Upload
                            id={id}
                            closeModal={closeModal}
                            addFB2={addFB2}
                        />
                    )}
                    {openModal === ModalType.Delete && (
                        <Delete
                            closeModal={closeModal}
                            id={id}
                            deleteText={deleteText}
                        />
                    )}
                    {openModal === ModalType.Download && (
                        <Download
                            closeModal={closeModal}
                            id={id}
                            deleteText={deleteText}
                        />
                    )}
                </Modal>
            )}
        </div>
    );
};
