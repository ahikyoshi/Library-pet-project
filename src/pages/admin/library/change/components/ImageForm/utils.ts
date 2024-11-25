import { IBook } from "@/globalTypes";
import { IHandleChangeFilesProps, IHandleUploadImage } from "./types";

export const handleUploadImage = ({
    event,
    content,
    setContent,
    setIsImageOpen,
    setServerResponse
}: IHandleUploadImage) => {
    event.preventDefault();

    if (!content) {
        return;
    }

    const input = event.currentTarget.image as HTMLInputElement;

    if (input.files && input.files.length > 0) {
        const file = input.files[0];

        const newFile = new File([file], `${content.id}.webp`, {
            type: file.type
        });

        const formData = new FormData();
        formData.append("image", newFile);

        fetch("/api/library/book/change/image", {
            method: "POST",
            body: formData
        })
            .then((res) => res.json())
            .then(
                ({
                    success,
                    message,
                    newBook
                }: {
                    success: boolean,
                    message: string,
                    newBook: IBook
                }) => {
                    console.log(success);
                    if (success) {
                        setContent(newBook);
                        setIsImageOpen(false);
                    } else {
                        setServerResponse(message);
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
