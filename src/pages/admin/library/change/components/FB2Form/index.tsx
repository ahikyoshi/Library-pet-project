// libs
import { useState } from "react";
import Image from "next/image";
// utils
import { handleChangeFiles, handleUploadText } from "./utils";
// types
import { ITextFormComponentProps } from "./types";

export const FB2Form = ({ content, setIsFB2Open }: ITextFormComponentProps) => {
    const [isFileUpload, setIsFileUpload] = useState(false);
    const [fileName, setFileName] = useState<null | string>(null);

    if (!content) {
        return <div>loading</div>;
    }

    return (
        <div className="w-screen h-screen bg-black/70 fixed top-0 left-0 flex items-center justify-center">
            <form
                onSubmit={(event) =>
                    handleUploadText({ event, content, setIsFB2Open })
                }
                className="bg-background rounded p-4 w-10/12"
            >
                {!content.assets.text ? (
                    <h1 className="w-full text-center text-2xl">
                        Текстового файла еще нет
                    </h1>
                ) : (
                    <div className="w-full flex justify-center">
                        Текстовый файл уже есть
                    </div>
                )}
                <div>
                    <label
                        htmlFor="fb2"
                        className="flex flex-col w-full items-center my-4"
                    >
                        <div className="flex items-center">
                            {isFileUpload ? "Изменить файл" : "Добавить файл"}
                            <Image
                                src={"/assets/icons/admin/light/file.svg"}
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
                        name="fb2"
                        id="fb2"
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
                <div className="flex flex-col justify-between mt-2">
                    <button
                        type="submit"
                        className="bg-primary my-2 py-1 px-2 text-text-contrast rounded"
                    >
                        Изменить текстовый файл
                    </button>
                    <button
                        onClick={() => setIsFB2Open(false)}
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
