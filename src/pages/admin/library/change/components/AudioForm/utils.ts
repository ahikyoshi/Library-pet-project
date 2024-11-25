import { IHandleChangeFilesProps, IHandleUploadAudio } from "./types";

export const handleChangeFiles = ({
    event,
    setIsFileUpload,
    setFilesName
}: IHandleChangeFilesProps) => {
    setIsFileUpload(true);

    const files = event.target.files;

    if (files) {
        setFilesName(
            Array.from(files).map((file) => {
                return file.name;
            })
        );
    }
};

export const handleUploadAudio = ({
    event,
    content,
    setIsLoading,
    setIsAudioOpen
}: IHandleUploadAudio) => {
    event.preventDefault();
    setIsLoading(true);

    if (!content) {
        return;
    }

    const input = event.currentTarget.audio as HTMLInputElement;

    const formData = new FormData();

    if (!input.files) {
        return;
    }
    Array.from(input.files).forEach((file) => {
        formData.append("audio", file);
    });

    formData.append("message", content.id);

    fetch("/api/library/book/change/audio", {
        method: "POST",
        body: formData
    })
        .then((res) => res.json())
        .then(({ success, message }: { success: boolean, message: string }) => {
            setIsLoading(false);
            if (success) {
                setIsAudioOpen(false);
            } else {
                console.log(message);
            }
        })
        .catch((e) => {
            console.error(e);
        });
};
