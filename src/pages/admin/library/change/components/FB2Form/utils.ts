import { IHandleChangeFilesProps, IHandleUploadText } from "./types";

export const handleChangeFiles = ({
    event,
    setIsFileUpload,
    setFileName
}: IHandleChangeFilesProps) => {
    setIsFileUpload(true);

    const files = event.target.files;

    if (files) {
        setFileName(files[0].name);
    }
};

export const handleUploadText = ({
    event,
    content,
    setIsFB2Open
}: IHandleUploadText) => {
    event.preventDefault();

    if (!content) {
        return;
    }

    const input = event.currentTarget.fb2 as HTMLInputElement;

    if (input.files && input.files.length > 0) {
        const file = input.files[0];

        const newFile = new File([file], `${content.id}.fb2`, {
            type: file.type
        });

        const formData = new FormData();
        formData.append("fb2", newFile);

        fetch("/api/library/book/change/text", {
            method: "POST",
            body: formData
        })
            .then((res) => res.json())
            .then(
                ({
                    success,
                    message
                }: {
                    success: boolean,
                    message: string
                }) => {
                    if (success) {
                        setIsFB2Open(false);
                    } else {
                        console.log(message);
                    }
                }
            )
            .catch((e) => {
                console.log(e);
            });
    } else {
        console.log("Файл не выбран");
    }
};
