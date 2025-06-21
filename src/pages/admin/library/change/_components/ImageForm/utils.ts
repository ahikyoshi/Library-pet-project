import { Dispatch, SetStateAction } from "react";
import { TMeta } from "../../types";

export const getMeta = (
    id: string,
    setMeta: Dispatch<SetStateAction<TMeta | null>>,
    setAdded: Dispatch<SetStateAction<boolean>>
) => {
    fetch(`/api/library/book/assets/image/meta?id=${id}`)
        .then((req) => req.json())
        .then((data: { success: boolean, body: TMeta, message: string }) => {
            if (data.success) {
                setMeta(data.body);
            } else {
                if (data.message === "Файл не найден") {
                    setAdded(false);
                }
            }
        })
        .catch((err) => console.log(err));
};
