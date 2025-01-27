// libs
import { useState } from "react";
// utils
import { handleChangeFiles, handleUploadAudio } from "./utils";
// types
import { IAudioFormComponentProps } from "./types";
import { Svg } from "@/components/Svg";

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
                className="rounded p-4 w-10/12 bg-background"
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
                                <li key={item} className="w-full py-2">
                                    {item}
                                </li>
                            );
                        })}
                    </ul>
                )}
                <div>
                    <label htmlFor="audio" className="flex items-center my-4">
                        <Svg
                            src="/assets/icons/admin/theme/file.svg"
                            size={24}
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
                        type="submit"
                        className="my-2 py-1 px-2 bg-primary text-text-contrast rounded"
                        disabled={isLoading}
                    >
                        {isLoading ? "Загрузка" : "Изменить аудио файлы"}
                    </button>
                    <button
                        onClick={() => setIsAudioOpen(false)}
                        type="button"
                        disabled={isLoading}
                    >
                        Выйти
                    </button>
                </div>
            </form>
        </div>
    );
};
