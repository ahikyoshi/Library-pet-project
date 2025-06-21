import clsx from "clsx";
import { InputHTMLAttributes } from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    border?: boolean;
}

export const Input = ({ className, border, ...rest }: IInputProps) => {
    return (
        <input
            className={clsx(
                border && "border border-border focus:border-white rounded",
                "py-2 px-2 text-text-secondary focus:text-text-primary hover:border-white transition-all",
                className
            )}
            {...rest}
        />
    );
};
