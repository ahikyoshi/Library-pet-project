import { Svg } from "@/components/Svg";
import { upload } from "./utils";

interface IComponentProps {
    id: string;
    closeModal: () => void;
    addFB2: () => void;
}

export const Upload = ({ id, closeModal, addFB2 }: IComponentProps) => {
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
                        addFB2,
                        setFileWarning
                    };
                    upload(props);
                }}
                hidden
            />
            <p className="mt-2">Внимание! Поддерживается только формат fb2.</p>
            <div className=" text-rose-600 text-xs">{fileWarning}</div>
            <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center">
                    <Svg src="/assets/icons/admin/theme/file.svg" size={24} />
                    <label
                        htmlFor="upload"
                        className="ml-2 text-xs underline cursor-pointer"
                    >
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
