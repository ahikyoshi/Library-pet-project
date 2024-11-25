import { IHandleSubmitProps, IServerResponse } from "./types";

export const handleSubmit = ({
    event,
    setStatus,
    setIsLoading
}: IHandleSubmitProps) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const login = formData.get("login");
    const password = formData.get("password");

    fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password })
    })
        .then((res) => res.json())
        .then((data: IServerResponse) => {
            if (data.success) {
                window.location.href = "/catalog";
            } else {
                setStatus(data);
                setIsLoading(false);

                setTimeout(() => setStatus(null), 6000);
            }
        })
        .catch((e) => {
            console.log(e);
            setStatus({
                success: false,
                message: "Ошибка соединения с сервером"
            });
            setIsLoading(false);
        });
};
