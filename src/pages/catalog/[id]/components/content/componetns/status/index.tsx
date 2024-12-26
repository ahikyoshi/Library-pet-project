import { IUserBook } from "@/globalTypes";
import { updateBook } from "@/pages/catalog/[id]/utils";
import { useEffect, useState } from "react";

interface IStatusProps {
    userMeta: IUserBook;
}

export const Status = ({ userMeta }: IStatusProps) => {
    const [currentStatus, setCurrentStatus] = useState<IUserBook["status"]>(
        userMeta?.status
    );
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setCurrentStatus(userMeta.status);
    }, [userMeta]);

    const changeStatus = (status: IUserBook["status"]) => {
        if (status !== "new") {
            setCurrentStatus(status);
            const audio = {
                currentTime: 0,
                currentChapter: 0
            };
            const updatedUserMeta =
                status === "finished"
                    ? { ...userMeta, status, audio }
                    : { ...userMeta, status };
            updateBook(updatedUserMeta);
        }
        setIsOpen(false);
    };

    const getName = (status: string) => {
        switch (status) {
            case "in progress":
                return "В процессе";
            case "finished":
                return "Прочитена";
            case "soon":
                return "Отложена";
            case "new":
                return "Новая для вас";
            default:
                return "Ошибка";
        }
    };

    if (!userMeta) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 onClick={() => setIsOpen(true)}>
                Статус: {getName(currentStatus)}
            </h1>
            {isOpen && (
                <ul className="absolute flex flex-col bg-background border border-border rounded">
                    <li
                        className="p-2"
                        onClick={() => changeStatus("in progress")}
                    >
                        В процессе
                    </li>
                    <li
                        className="p-2"
                        onClick={() => changeStatus("finished")}
                    >
                        Прочитана
                    </li>
                    <li className="p-2" onClick={() => changeStatus("soon")}>
                        Отложена
                    </li>
                </ul>
            )}
        </div>
    );
};
