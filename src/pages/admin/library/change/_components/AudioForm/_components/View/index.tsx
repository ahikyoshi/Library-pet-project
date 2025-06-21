import { Button } from "@/components/Button";
import { Svg } from "@/components/Svg";
import { IServerResponse, TMeta } from "@/globalTypes";
import { sizeTransform } from "@/globalUtils";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const View = ({
    closeAction,
    id
}: {
    closeAction: () => void,
    id: string
}) => {
    const [metaList, setMetaList] = useState<TMeta[]>([]);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        const target = "list";
        fetch(`/api/library/book/assets/audio/meta?id=${id}&target=${target}`)
            .then((req) => req.json())
            .then((data: IServerResponse<TMeta[]>) => {
                if (data.success) {
                    setMetaList(data.body);
                } else {
                    closeAction();
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const DeleteFile = (id: string, fileName: string) => {
        fetch(
            `/api/library/book/assets/audio/delete?id=${id}&target=${fileName}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            }
        )
            .then((res) => res.json())
            .then((data: IServerResponse<null>) => {
                setIsSuccess(data.success);
                setStatus(data.message);

                if (data.status) {
                    setMetaList((prev) =>
                        prev.filter((file) => file.name !== fileName)
                    );
                    console.log(metaList.length);
                    if (metaList.length === 0) {
                        closeAction();
                    }
                }
            })
            .catch(() => {
                setIsSuccess(false);
                setStatus("Непредвиденная ошибка");
            });
    };

    return (
        <div className="grid gap-2">
            <h1 className="text-2xl">Добавить аудиофайлы</h1>
            <ul className="grid gap-2">
                {metaList.map(({ name, size }: TMeta, index) => {
                    return (
                        <li
                            key={index}
                            className="flex items-center justify-between"
                        >
                            <div className="p-2 border border-border rounded">
                                {index + 1}
                            </div>
                            <div className="w-full ml-2 p-2 border border-border rounded flex items-center">
                                <div className="flex justify-between w-full">
                                    <div>{name}</div>
                                    <div className="mx-2">
                                        {sizeTransform(size)}
                                    </div>
                                </div>
                            </div>
                            <div className="ml-2 p-2 border border-border rounded hover:bg-border cursor-pointer">
                                <Svg
                                    src="/assets/icons/admin/theme/download.svg"
                                    size={24}
                                />
                            </div>
                            <div
                                className="ml-2 p-2 border border-border rounded hover:bg-border cursor-pointer"
                                onClick={() => DeleteFile(id, name)}
                            >
                                <Svg
                                    src="/assets/icons/admin/theme/delete.svg"
                                    size={24}
                                />
                            </div>
                        </li>
                    );
                })}
            </ul>
            {status != null && (
                <div
                    className={clsx(
                        "w-full text-center text-xs",
                        !isSuccess ? "text-notification" : "text-green-400"
                    )}
                >
                    {status}
                </div>
            )}
            <Button variant="secondary" text="закрыть" onClick={closeAction} />
        </div>
    );
};
