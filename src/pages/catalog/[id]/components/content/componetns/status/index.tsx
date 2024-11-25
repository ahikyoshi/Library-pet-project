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

    useEffect(() => {
        setCurrentStatus(userMeta.status);
    }, [userMeta]);

    const changeStatus = (status: IUserBook["status"]) => {
        if (status !== "new") {
            setCurrentStatus(status);
            const updatedUserMeta = { ...userMeta, status };
            updateBook(updatedUserMeta);
        }
    };

    if (!userMeta) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <select
                defaultValue={currentStatus}
                className="bg-main"
                onChange={(e) =>
                    changeStatus(e.target.value as IUserBook["status"])
                }
            >
                <option value="in progress">В процессе</option>
                <option value="finished">Прочитана</option>
                <option value="soon">Отложено</option>
                <option value="new">Новая</option>
            </select>
        </div>
    );
};
