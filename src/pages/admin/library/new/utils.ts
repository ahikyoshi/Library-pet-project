// types
import { IHandleSubmit } from "./types";

export const handleSubmit = ({
    event,
    setIsStatus,
    setIsLoading
}: IHandleSubmit) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title")).trim();
    const author = String(formData.get("author")).trim();
    const cycle = {
        title: String(formData.get("cycle_name")).trim(),
        number: formData.get("cycle_number")
    };
    const description = String(formData.get("description")).trim();
    const meta = {
        writtingDate: String(formData.get("writtingDate")).trim()
    };

    if (!title || !author) {
        return;
    }

    fetch("/api/library/book/new", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            author,
            cycle,
            description,
            meta
        })
    })
        .then((res) => res.json())
        .then(({ success, message }: { success: boolean, message: string }) => {
            if (success) {
                window.location.href = "/admin/library";
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
