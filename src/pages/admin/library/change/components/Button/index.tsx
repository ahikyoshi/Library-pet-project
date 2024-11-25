import { IButtonComponentProps } from "./types";

export const Button = ({
    color,
    text,
    isActive,
    setStateOpen
}: IButtonComponentProps) => {
    return (
        <button
            className={`w-full ${color} mt-2 py-2 rounded`}
            onClick={() => setStateOpen(true)}
            type="button"
        >
            {isActive ? `Изменить ${text}` : `Добавить ${text}`}
        </button>
    );
};
