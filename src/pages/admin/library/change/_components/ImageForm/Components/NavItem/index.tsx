import { Svg } from "@/components/Svg";
import { Dispatch, SetStateAction } from "react";
import { ModalType } from "../../../../types";

export const NavItem = ({
    type,
    setOpenModal
}: {
    type: ModalType,
    setOpenModal: Dispatch<SetStateAction<ModalType>>
}) => {
    return (
        <li
            onClick={() => setOpenModal(type)}
            className="px-2 flex items-center rounded cursor-pointer hover:bg-border transition-all"
        >
            <Svg src={`/assets/icons/admin/theme/${type}.svg`} size={20} />
        </li>
    );
};
