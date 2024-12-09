// libs
import Image from "next/image";
import { useState } from "react";
// utils
import { handleChangeFiles, handleUploadImage } from "./utils";
// types
import { IImageFormComponentProps } from "./types";
import { LocalImage } from "@/components/LocalImage";

export const ImageForm = ({
    content,
    setContent,
    setIsImageOpen
}: IImageFormComponentProps) => {
    const [serverResponse, setServerResponse] = useState<null | string>(null);
    const [isFileUpload, setIsFileUpload] = useState(false);
    const [fileName, setFileName] = useState<null | string>(null);

    if (!content) {
        return <div>Loading</div>;
    }
    return (
        <div className="w-screen h-screen bg-black/70 fixed top-0 left-0 flex items-center justify-center">
            <form
                onSubmit={(event) =>
                    handleUploadImage({
                        event,
                        content,
                        setContent,
                        setIsImageOpen,
                        setServerResponse
                    })
                }
                className="bg-slate-800 rounded-sm p-4 w-10/12"
            >
                {!content.assets.image ? (
                    <h1 className="w-full text-center text-2xl">
                        Изображения еще нет
                    </h1>
                ) : (
                    <div className="w-full flex justify-center">
                        <LocalImage id={content.id} />
                    </div>
                )}
                <div>
                    <label
                        htmlFor="image"
                        className="flex flex-col w-full items-center my-4"
                    >
                        <div className="flex items-center">
                            {isFileUpload ? "Изменить файл" : "Добавить файл"}
                            <Image
                                src={"/assets/icons/admin/file.svg"}
                                width={24}
                                height={24}
                                alt="file"
                            />
                        </div>
                        <div>
                            {fileName && <div>Имя файла: {fileName}</div>}
                        </div>
                    </label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={(event) =>
                            handleChangeFiles({
                                event,
                                setIsFileUpload,
                                setFileName
                            })
                        }
                        hidden
                        required
                    />
                </div>
                {serverResponse && (
                    <div className="text-rose-700 w-full text-center">
                        {serverResponse}
                    </div>
                )}
                <div className="flex flex-col justify-between mt-2">
                    <button
                        onClick={() => setIsImageOpen(false)}
                        type="button"
                        className="bg-rose-800 py-1 px-2 rounded-sm"
                    >
                        Выйти
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-800 mt-2 py-1 px-2 rounded-sm"
                    >
                        Изменить изображение
                    </button>
                </div>
            </form>
        </div>
    );
};
