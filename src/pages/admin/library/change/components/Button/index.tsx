import clsx from "clsx";
import { IButtonComponentProps } from "./types";

export const Button = ({
    color,
    text,
    isActive,
    setStateOpen
}: IButtonComponentProps) => {
    return (
        <button
            className={clsx(
                `w-full mt-2 py-2 rounded border border-border`,
                color === "light" && "text-text-dark"
            )}
            onClick={() => setStateOpen(true)}
            type="button"
        >
            {isActive ? `Изменить ${text}` : `Добавить ${text}`}
        </button>
    );
};
