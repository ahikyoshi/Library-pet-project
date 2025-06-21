export function debounce<T extends (...args: unknown[]) => void>(
    func: T,
    delay: number
): T {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    return function (...args: Parameters<T>) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    } as T;
}
export const trim = (string: string) => {
    return string.replace(/^\s+|\s+$/g, "");
};

export const sizeTransform = (size: number): string => {
    if (size >= 1024 * 1024) {
        return `${(size / (1024 * 1024)).toFixed(2)} МБ`;
    } else {
        return `${Math.round(size / 1024)} КБ`;
    }
};

export const dateTransform = (date: string) => {
    const dateform = new Date(date);
    const formatted = dateform
        .toLocaleString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
        .replace(",", "");
    return formatted;
};

export const getExtension = (filename: string): string =>
    filename.split(".").pop()?.toLowerCase() || "";
