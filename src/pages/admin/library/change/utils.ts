// types
import { IBook } from "@/globalTypes";
import { IGetContentProps, IHandleSubmitProps } from "./types";

export const handleSubmit = ({
    event,
    content,
    setIsStatus,
    setIsLoading
}: IHandleSubmitProps): void => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title")).trim();
    const author = String(formData.get("author")).trim();
    const cycle = {
        title: String(formData.get("cycle_name")).trim(),
        number: Number(formData.get("cycle_number"))
    };
    const description = String(formData.get("description")).trim();
    const meta = {
        writtingDate: String(formData.get("writtingDate")).trim()
    };

    if (!content) {
        return;
    }

    const newBook: IBook = {
        title: title,
        author: author,
        cycle: {
            title: cycle.title,
            number: cycle.number
        },
        description: description,
        meta: {
            addedDate: content.meta.addedDate,
            writtingDate: meta.writtingDate
        },
        assets: content.assets,
        reviews: content.reviews,
        id: content.id
    };

    if (!title || !author) {
        return;
    }

    fetch("/api/library/book/change", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ changedBook: newBook })
    })
        .then((res) => res.json())
        .then(({ success, message }: { success: boolean, message: string }) => {
            if (success) {
                window.location.pathname = "/admin/library";
            } else {
                setIsStatus({ success, message: message });
                setIsLoading(false);
            }
        })
        .catch(() => {
            console.log("something went wrong");
            setIsStatus({
                success: false,
                message: "Ошибка соединения с сервером"
            });
            setIsLoading(false);
        });
};
export const getContent = ({ id, setContent }: IGetContentProps) => {
    fetch("/api/library/book/get", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: id, typeOfResponse: "page" })
    })
        .then((res) => res.json())
        .then(
            ({
                success,
                message,
                body
            }: {
                success: boolean,
                message: string,
                body: {
                    book: IBook
                }
            }) => {
                if (success) {
                    setContent(body.book);
                } else {
                    alert(message);
                }
            }
        )
        .catch(() => console.log("Something went wrong"));
};
