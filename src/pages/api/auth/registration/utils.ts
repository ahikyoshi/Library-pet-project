export const Validate = (login: string, password: string) => {
    const MIN_LOGIN_LENGTH = 4;
    const MAX_LOGIN_LENGTH = 16;
    const MIN_PASSWORD_LENGTH = 8;
    const MAX_PASSWORD_LENGTH = 22;

    if (!login || typeof login !== "string" || login.trim().length === 0) {
        return { valid: false, message: "Логин не может быть пустым" };
    }
    if (login.length < MIN_LOGIN_LENGTH || login.length > MAX_LOGIN_LENGTH) {
        return {
            valid: false,
            message: `Логин должен содержать от ${MIN_LOGIN_LENGTH} до ${MAX_LOGIN_LENGTH} символов`
        };
    }
    if (!/^[a-zA-Z0-9_]+$/.test(login)) {
        return {
            valid: false,
            message:
                "Логин может содержать только буквы, цифры и символ подчёркивания"
        };
    }

    if (
        !password ||
        typeof password !== "string" ||
        password.trim().length === 0
    ) {
        return { valid: false, message: "Пароль не может быть пустым" };
    }
    if (
        password.length < MIN_PASSWORD_LENGTH ||
        password.length > MAX_PASSWORD_LENGTH
    ) {
        return {
            valid: false,
            message: `Пароль должен содержать от ${MIN_PASSWORD_LENGTH} до ${MAX_PASSWORD_LENGTH} символов`
        };
    }
    if (
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/[0-9]/.test(password)
    ) {
        return {
            valid: false,
            message:
                "Пароль должен содержать хотя бы одну заглавную букву, одну строчную букву и одну цифру"
        };
    }

    return { valid: true }; // Всё в порядке
};
