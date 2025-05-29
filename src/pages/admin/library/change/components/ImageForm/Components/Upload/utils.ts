import { Dispatch, FormEvent, SetStateAction } from "react";

interface IUploadProps {
    event: FormEvent<HTMLInputElement>;
    id: string;
    addImage: () => void;
    closeModal: () => void;
    setFileWarning: Dispatch<SetStateAction<string>>;
}

export const upload = ({
    event,
    id,
    addImage,
    closeModal,
    setFileWarning
}: IUploadProps) => {
    event.preventDefault();

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
        const file = input.files[0];

        const newFile = new File([file], `${id}.webp`, {
            type: file.type
        });

        const formData = new FormData();
        formData.append("image", newFile);
        fetch("/api/library/book/assets/image/post", {
            method: "POST",
            body: formData
        })
            .then((response) => {
                return response.json();
            })
            .then((data: { success: boolean, message: string }) => {
                if (data.success) {
                    closeModal();
                    addImage();
                } else {
                    setFileWarning(data.message);
                }
            })
            .catch((error) => {
                setFileWarning("Ошибка при отправке файла: " + error);
            });
    }
};
