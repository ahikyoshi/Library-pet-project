import { IBook, IUserBook } from "@/globalTypes";
// Получение контента страницы
export async function fetchBookAndUserData(
    id: string
): Promise<
    | { book: IBook, series: IBook[], user: IUserBook, isAuth: boolean }
    | undefined
> {
    try {
        // Параллельное выполнение запросов
        const [bookResponse, userResponse] = await Promise.all([
            fetch("/api/library/book/get", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: id, typeOfResponse: "page" })
            }),
            fetch("/api/user/book/get", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: id })
            })
        ]);

        // Обработка результатов запросов
        const bookInfo = (await bookResponse.json()) as {
            success: boolean,
            body: {
                book: IBook,
                series: IBook[]
            }
        };

        const userBookInfo = (await userResponse.json()) as {
            isAuth: boolean,
            book: IUserBook
        };

        return {
            book: bookInfo.body.book,
            series: bookInfo.body.series,
            user: userBookInfo.book,
            isAuth: userBookInfo.isAuth
        };
    } catch (e) {
        return undefined;
    }
}

export function updateBook(newBook: IUserBook) {
    fetch("/api/user/book/change", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ newBook })
    }).catch((error) => console.log(error));
}
