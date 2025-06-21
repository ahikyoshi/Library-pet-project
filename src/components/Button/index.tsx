import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: "primary" | "secondary";
    text: string;
}

export const Button = ({ variant, text, className, ...rest }: IButtonProps) => {
    return (
        <button
            className={clsx(
                variant === "primary" && "p-2 bg-primary w-full rounded",
                className
            )}
            {...rest}
        >
            {text}
        </button>
    );
};
