// libs
import { useEffect, useState } from "react";
import clsx from "clsx";
// components
import { Modal } from "@/components/modal";
import { NavItem } from "./Components/NavItem";
import { View } from "./Components/View";
import { Upload } from "./Components/Upload";
import { Delete } from "./Components/Delete";
import { Download } from "./Components/Download";
// utils
import { getMeta } from "./utils";
import { dateTransform, sizeTransform } from "@/globalUtils";
import { ModalType, TMeta } from "../../types";
//types

export const ImageForm = ({
    isAdded,
    id
}: {
    isAdded: boolean,
    id: string
}) => {
    const [added, setAdded] = useState(isAdded);
    const [meta, setMeta] = useState<TMeta | null>(null);

    const [openModal, setOpenModal] = useState(ModalType.None);

    const closeModal = () => {
        setOpenModal(ModalType.None);
    };
    const addImage = () => {
        if (!added) {
            setAdded(true);
        }
    };
    const deleteImage = () => {
        setAdded(false);
    };

    useEffect(() => {
        if (added) {
            getMeta(id, setMeta, setAdded);
        }
    }, [added]);

    if (Array.isArray(id)) {
        return;
    }

    return (
        <div className="flex">
            {/* Info*/}
            <div className="w-full p-2 rounded border border-border flex items-center justify-between">
                <div className="flex items-center">
                    <div>Изображение:</div>
                    <div
                        className={clsx(
                            added ? "text-success" : "text-notification",
                            "ml-2"
                        )}
                    >
                        {added ? "Присутствует" : "Отсутствует"}
                    </div>
                </div>
                {added && meta != null && (
                    <div className="flex">
                        <div className="mr-2 text-xs">
                            {meta?.modified && dateTransform(meta?.modified)}
                        </div>
                        <div className="text-xs">
                            {meta?.size && sizeTransform(Number(meta?.size))}
                        </div>
                    </div>
                )}
            </div>
            {/* Navigation */}
            <ul className="ml-2 flex border border-border rounded">
                {added && (
                    <>
                        <NavItem
                            type={ModalType.View}
                            setOpenModal={setOpenModal}
                        />
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
                    {openModal === ModalType.View && (
                        <View id={id} closeModal={closeModal} />
                    )}
                    {openModal === ModalType.Download && (
                        <Download id={id} closeModal={closeModal} />
                    )}
                    {openModal === ModalType.Upload && (
                        <Upload
                            id={id}
                            closeModal={closeModal}
                            addImage={addImage}
                        />
                    )}
                    {openModal === ModalType.Delete && (
                        <Delete
                            id={id}
                            closeModal={closeModal}
                            deleteImage={deleteImage}
                        />
                    )}
                </Modal>
            )}
        </div>
    );
};
