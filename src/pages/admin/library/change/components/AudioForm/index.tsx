// libs
import { useState } from "react";
import Image from "next/image";
// utils
import { handleChangeFiles, handleUploadAudio } from "./utils";
// types
import { IAudioFormComponentProps } from "./types";

export const AudioForm = ({
    content,
    setIsAudioOpen,
    setContent
}: IAudioFormComponentProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isFileUpload, setIsFileUpload] = useState(false);
    const [filesName, setFilesName] = useState<null | string[]>(null);

    if (!content) {
        return <div>Loading</div>;
    }
    return (
        <div className="w-screen h-screen bg-black/70 fixed top-0 left-0 flex items-center justify-center">
            <form
                onSubmit={(event) =>
                    handleUploadAudio({
                        event,
                        content,
                        setIsLoading,
                        setIsAudioOpen,
                        setContent
                    })
                }
                className="bg-slate-800 rounded-sm p-4 w-10/12"
            >
                {!content.assets.audio ? (
                    <h1 className="w-full text-center text-2xl">
                        Аудио пока нет
                    </h1>
                ) : (
                    <div className="w-full flex justify-center">
                        Аудио уже присутсвует
                    </div>
                )}
                {filesName && (
                    <ul className="flex flex-col h-28 overflow-y-scroll my-2">
                        {filesName.map((item) => {
                            return (
                                <li
                                    key={item}
                                    className="w-full odd:bg-gray-600 py-2"
                                >
                                    {item}
                                </li>
                            );
                        })}
                    </ul>
                )}
                <div>
                    <label htmlFor="audio" className="flex items-center my-4">
                        <Image
                            src={"/assets/icons/admin/file.svg"}
                            width={24}
                            height={24}
                            alt="file"
                        />
                        <div>
                            {isFileUpload ? "Изменить файлы" : "Добавить файл"}
                        </div>
                    </label>
                    <input
                        type="file"
                        multiple={true}
                        onChange={(event) =>
                            handleChangeFiles({
                                event,
                                setIsFileUpload,
                                setFilesName
                            })
                        }
                        name="audio"
                        id="audio"
                        required
                        hidden
                    />
                </div>
                <div className="flex justify-between mt-2">
                    <button
                        onClick={() => setIsAudioOpen(false)}
                        type="button"
                        className="bg-rose-800 py-1 px-2 rounded-sm"
                        disabled={isLoading}
                    >
                        Выйти
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-800 py-1 px-2 rounded-sm"
                        disabled={isLoading}
                    >
                        {isLoading ? "Загрузка" : "Изменить аудио файлы"}
                    </button>
                </div>
            </form>
        </div>
    );
};
