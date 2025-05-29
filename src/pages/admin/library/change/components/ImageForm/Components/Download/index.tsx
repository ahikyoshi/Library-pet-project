import { Svg } from "@/components/Svg";

interface IComponentsProps {
    id: string;
    closeModal: () => void;
}

export const Download = ({ id, closeModal }: IComponentsProps) => {
    return (
        <div className="">
            <a
                href={`/api/image?id=${id}`}
                className="flex items-center underline cursor-pointe"
                download={`${id}.webp`}
            >
                <Svg src={`/assets/icons/admin/theme/Download.svg`} size={20} />
                <span className="ml-2">Скачать изображение</span>
            </a>
            <div
                onClick={closeModal}
                className=" cursor-pointer w-full text-center mt-2 py-2 bg-primary rounded"
            >
                Закрыть
            </div>
        </div>
    );
};
