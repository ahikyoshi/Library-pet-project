import { FormEvent } from "react";

interface IUploadProps {
    event: FormEvent<HTMLInputElement>;
    id: string;
    addImage: () => void;
    closeModal: () => void;
}

export const upload = ({ event, id, addImage, closeModal }: IUploadProps) => {
    event.preventDefault();

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
        const file = input.files[0];

        const extension = file.name.split(".").pop(); // получаем расширение
        const newFile = new File([file], `${id}.${extension}`, {
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
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
};
