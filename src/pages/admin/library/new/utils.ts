import { IHandleSubmit } from "./types";

export const handleSubmit = ({
    event,
    setIsStatus,
    setIsLoading
}: IHandleSubmit) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title");
    const author = formData.get("author");
    const cycle = {
        title: formData.get("cycle_name"),
        number: formData.get("cycle_number")
    };
    const description = formData.get("description");
    const meta = {
        writtingDate: formData.get("writtingDate")
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
