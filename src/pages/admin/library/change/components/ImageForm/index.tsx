// libs
import { useState } from "react";
// components
import { Svg } from "@/components/Svg";
import { LocalImage } from "@/components/LocalImage";
// utils
import { handleChangeFiles, handleUploadImage } from "./utils";
// types
import { IImageFormComponentProps } from "./types";

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
                className="bg-background rounded p-4 w-10/12"
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
                            <Svg
                                src="/assets/icons/admin/theme/file.svg"
                                size={24}
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
                    <div className="text-notification w-full text-center">
                        {serverResponse}
                    </div>
                )}
                <div className="flex flex-col justify-between mt-2">
                    <button
                        type="submit"
                        className="bg-primary my-2 py-1 px-2 text-text-contrast rounded"
                    >
                        Изменить изображение
                    </button>
                    <button
                        onClick={() => setIsImageOpen(false)}
                        type="button"
                        className="text-text-secondaryLight"
                    >
                        Выйти
                    </button>
                </div>
            </form>
        </div>
    );
};
