import { FormEvent } from "react";

interface IUploadProps {
    event: FormEvent<HTMLInputElement>;
    id: string;
    addFB2: () => void;
    closeModal: () => void;
}

export const upload = ({ event, id, addFB2, closeModal }: IUploadProps) => {
    event.preventDefault();

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
        const file = input.files[0];

        const newFile = new File([file], `${id}.fb2`, {
            type: file.type
        });

        const formData = new FormData();
        formData.append("image", newFile);
        fetch("/api/library/book/assets/text/post", {
            method: "POST",
            body: formData
        })
            .then((response) => {
                return response.json();
            })
            .then((data: { success: boolean, message: string }) => {
                if (data.success) {
                    closeModal();
                    addFB2();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
};
