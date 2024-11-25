// types
import { IDeleteComponentsProps } from "./types";

export const handleDelete = ({
    currentTarget,
    setCurrentTarget,
    setIsOpen,
    setCurrentPage
}: IDeleteComponentsProps) => {
    if (!currentTarget) {
        return;
    }
    fetch("/api/library/book/delete", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: currentTarget.id })
    })
        .then((res) => res.json())
        .then(({ success, message }: { success: boolean, message: string }) => {
            if (success) {
                setCurrentTarget(null);
                setIsOpen(false);
                setCurrentPage(2);
            } else {
                alert(message);
            }
        })
        .catch(() => console.log("Something went wrong"));
};
