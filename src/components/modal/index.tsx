import { Dispatch, ReactNode, SetStateAction } from "react";

export const Modal = ({
    children,
    closeAction
}: {
    children: ReactNode,
    closeAction?: Dispatch<SetStateAction<boolean>>
}) => {
    const close = (e: React.MouseEvent<HTMLDivElement>) => {
        if (closeAction) {
            if (e.target === e.currentTarget) {
                closeAction(false);
            }
        }
    };
    return (
        <div
            onClick={close}
            className="w-screen h-screen bg-black/40 fixed top-0 left-0 flex items-center justify-center"
        >
            <div className="p-2 bg-background rounded">{children}</div>
        </div>
    );
};
