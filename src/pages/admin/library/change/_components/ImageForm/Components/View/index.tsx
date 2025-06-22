// Components
import { LocalImage } from "@/components/LocalImage";

interface IComponentProps {
    id: string;
    closeModal: () => void;
}

export const View = ({ id, closeModal }: IComponentProps) => {
    return (
        <>
            <LocalImage id={id} />
            <button
                onClick={closeModal}
                type="button"
                className="w-full mt-2 py-2 bg-primary rounded"
            >
                Закрыть
            </button>
        </>
    );
};
