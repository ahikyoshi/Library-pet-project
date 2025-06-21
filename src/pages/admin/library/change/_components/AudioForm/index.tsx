import clsx from "clsx";
import { useEffect, useState } from "react";
import { NavItem } from "../ImageForm/Components/NavItem";
import { ModalType } from "../../types";
import { Modal } from "@/components/modal";
import { Upload } from "./_components/upload";
import { IServerResponse, TMeta } from "@/globalTypes";
import { dateTransform, sizeTransform } from "@/globalUtils";
import { View } from "./_components/View";

export const AudioForm = ({
    isAdded,
    id
}: {
    isAdded: boolean,
    id: string
}) => {
    const [added] = useState(isAdded);
    const [meta, setMeta] = useState<TMeta | null>(null);

    const [openModal, setOpenModal] = useState(ModalType.None);
    const closeModal = () => {
        setOpenModal(ModalType.None);
    };

    useEffect(() => {
        if (isAdded) {
            const target = "total";
            fetch(
                `/api/library/book/assets/audio/meta?id=${id}&target=${target}`
            )
                .then((req) => req.json())
                .then((data: IServerResponse<TMeta>) => {
                    if (data.success) {
                        setMeta(data.body);
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [isAdded]);

    return (
        <div className="flex">
            <div className="w-full p-2 rounded border border-border flex items-center justify-between">
                <div className="flex w-full justify-between items-center">
                    <div className="flex">
                        <span>Аудиофайлы:</span>
                        <span
                            className={clsx(
                                added ? "text-success" : "text-notification",
                                "ml-2"
                            )}
                        >
                            {added ? "Присутствуют" : "Отсутствуют"}
                        </span>
                    </div>
                    {added && (
                        <div className="flex">
                            <div className="text-xs mr-2">
                                {dateTransform(meta?.modified)}
                            </div>
                            <div className="text-xs">
                                {sizeTransform(Number(meta?.size))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ul className="ml-2 flex border border-border rounded">
                <NavItem type={ModalType.Upload} setOpenModal={setOpenModal} />
                <NavItem type={ModalType.View} setOpenModal={setOpenModal} />
            </ul>
            {openModal != ModalType.None && (
                <Modal closeAction={closeModal}>
                    {openModal === ModalType.Upload && (
                        <Upload closeAction={closeModal} id={id} />
                    )}
                    {openModal === ModalType.View && (
                        <View closeAction={closeModal} id={id} />
                    )}
                </Modal>
            )}
        </div>
    );
};
