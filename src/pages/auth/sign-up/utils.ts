import { IHandleSubmitProps, IServerResponse } from "./types";

export const handleSubmit = ({
    event,
    setStatus,
    setIsLoading
}: IHandleSubmitProps) => {
    event.preventDefault();

    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const login = String(formData.get("login")).trim();
    const password = String(formData.get("password")).trim();
    const password_confirm = String(formData.get("password_confirm")).trim();
    const display_name = String(formData.get("display_name")).trim();

    if (password_confirm != password) {
        setStatus({
            success: false,
            message: "Пароли не совпадают"
        });
        setIsLoading(false);
        return;
    }

    if (login.trim().length < 4) {
        setStatus({
            success: false,
            message: "Логин должен содержать не менее 4 символов"
        });
        setIsLoading(false);
        return;
    }
    if (password.trim().length < 8) {
        setStatus({
            success: false,
            message: "Пароль должен содержать не менее 8 символов"
        });
        setIsLoading(false);
        return;
    }

    fetch("/api/auth/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password, display_name })
    })
        .then((res) => res.json())
        .then((data: IServerResponse) => {
            if (data.success) {
                window.location.href = "/catalog";
            } else {
                setStatus(data);
                setIsLoading(false);

                setTimeout(() => setStatus(null), 3000);
            }
        })
        .catch(() => {
            setStatus({
                success: false,
                message: "Ошибка соединения с сервером"
            });
            setIsLoading(false);
        });
};
