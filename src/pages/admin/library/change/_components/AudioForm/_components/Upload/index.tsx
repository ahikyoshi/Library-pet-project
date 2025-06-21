import { Button } from "@/components/Button";
import { Svg } from "@/components/Svg";
import { getExtension, sizeTransform } from "@/globalUtils";
import React, { FormEvent, useEffect, useState } from "react";

interface IUploadedFiles {
    name: string;
    size: number;
    id: number;
}

export const Upload = ({
    closeAction,
    id
}: {
    closeAction: () => void,
    id: string
}) => {
    const [isUpload, setIsUpload] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<IUploadedFiles[]>([]);

    useEffect(() => {
        if (uploadedFiles.length === 0) {
            setIsUpload(false);
        }
    }, [uploadedFiles]);

    const addFiles = (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault();

        setIsUpload(true);

        const input = event.target as HTMLInputElement;

        if (input.files) {
            const uploadedList = [];
            for (let i = 0; i < input.files.length; i++) {
                const file = input.files[i];
                const uploadedFile = {
                    name: file.name,
                    size: file.size,
                    id: i
                };
                uploadedList.push(uploadedFile);
            }
            setUploadedFiles(uploadedList);
        }
    };

    const uploadFiles = () => {
        if (!isUpload) return;

        const input = document.getElementById("upload") as HTMLInputElement;
        if (!input?.files) return;

        const arr = uploadedFiles;

        const files = Array.from(input.files);

        // Достаём нужные файлы по индексам из arr
        const matchedFiles = arr
            .map(({ id }) => files[id])
            .filter((file): file is File => file instanceof File); // защита от undefined

        const formData = new FormData();
        matchedFiles.forEach((file, index) => {
            formData.append(`audio_${index}`, file);
        });

        fetch(`/api/library/book/assets/audio/post?id=${id}`, {
            method: "POST",
            body: formData
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className="grid gap-2">
            <h1 className="text-2xl">Добавление аудиофайлов</h1>
            {uploadedFiles.length != 0 && (
                <div className="grid gap-2">
                    {uploadedFiles.map(
                        ({
                            name,
                            size,
                            id
                        }: {
                            name: string,
                            size: number,
                            id: number
                        }) => {
                            const ext = getExtension(name);
                            return (
                                <div
                                    key={id}
                                    className="flex items-center justify-between"
                                >
                                    <div className="p-2 border border-border rounded">
                                        {id + 1}
                                    </div>
                                    <div className="w-full ml-2 p-2 border border-border rounded flex items-center">
                                        <div className="flex justify-between w-full">
                                            <div>{name}</div>
                                            <div className="mx-2">
                                                {sizeTransform(size)}
                                            </div>
                                        </div>
                                        {ext != "mp3" && (
                                            <div
                                                title="Неверный формат файла"
                                                className="w-5 h-5 bg-notification font-bold rounded-full flex items-center justify-center"
                                            >
                                                !
                                            </div>
                                        )}
                                    </div>
                                    <div
                                        onClick={() => {
                                            setUploadedFiles((prev) =>
                                                prev.filter(
                                                    (file) => file.id !== id
                                                )
                                            );
                                        }}
                                        className="ml-2 p-2 border border-border rounded hover:bg-border cursor-pointer"
                                    >
                                        <Svg
                                            src="/assets/icons/admin/theme/delete.svg"
                                            size={24}
                                        />
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>
            )}
            <input
                type="file"
                id="upload"
                hidden
                onChange={addFiles}
                multiple
                disabled={isUpload}
            />
            {!isUpload && (
                <div className="flex items-center">
                    <Svg src="/assets/icons/admin/theme/file.svg" size={24} />
                    <label
                        htmlFor="upload"
                        className="ml-2 text-xs underline cursor-pointer"
                    >
                        Добавить файлы
                    </label>
                </div>
            )}
            <div className="grid gap-2">
                {isUpload && (
                    <Button
                        type="button"
                        variant="primary"
                        text={!isUpload ? "Добавьте файлы" : "Загрузить"}
                        onClick={() => uploadFiles()}
                    />
                )}
                <Button
                    variant="secondary"
                    text="отменить"
                    onClick={closeAction}
                />
            </div>
        </div>
    );
};
