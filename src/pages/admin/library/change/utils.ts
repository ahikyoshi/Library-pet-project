// types
import { IBook } from "@/globalTypes";
import { IHandleSubmitProps } from "./types";

export const handleSubmit = ({
    event,
    content,
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
        .then(({ success }: { success: boolean }) => {
            if (success) {
                window.location.pathname = "/admin/library";
            } else {
                setIsLoading(false);
            }
        })
        .catch(() => {
            console.log("something went wrong");
            setIsLoading(false);
        });
};
