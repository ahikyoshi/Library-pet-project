// types
import { IHandleSubmit } from "./types";

export const handleSubmit = ({
    event,
    mode,
    setIsStatus,
    setIsLoading
}: IHandleSubmit) => {
    event.preventDefault();

    const form = event.currentTarget;
    const inputs = form.querySelectorAll("input");

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

    if (Number(meta.writtingDate) < 1980 || Number(meta.writtingDate) > 2025) {
        setIsStatus({
            success: false,
            message: "Ошибка при заполнении года написания"
        });
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
            setIsStatus({ success, message: message });
            setIsLoading(false);
        })
        .catch(() => {
            console.log("something went wrong");
            setIsStatus({
                success: false,
                message: "Ошибка соединения с сервером"
            });
            setIsLoading(false);
        });

    if (mode != "back") {
        inputs.forEach((input) => {
            if (
                input.name === "title" ||
                input.name === "description" ||
                input.name === "writtingDate"
            ) {
                input.value = "";
            }
            if (input.name === "cycle_number") {
                input.value = String(Number(input.value) + 1);
            }
        });
    }
    if (mode === "continue-author") {
        inputs.forEach((inputs) => {
            if (
                inputs.name === "cycle_name" ||
                inputs.name === "cycle_number"
            ) {
                inputs.value = "";
            }
        });
    }
};
