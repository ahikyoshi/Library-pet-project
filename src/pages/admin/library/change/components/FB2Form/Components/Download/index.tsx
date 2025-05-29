import { Svg } from "@/components/Svg";

interface IComponentsProps {
    id: string;
    closeModal: () => void;
}

export const Download = ({ id, closeModal }: IComponentsProps) => {
    return (
        <div className="">
            <span>В процессе разработки</span>
            <div
                onClick={closeModal}
                className=" cursor-pointer w-full text-center mt-2 py-2 bg-primary rounded"
            >
                Закрыть
            </div>
        </div>
    );
};
