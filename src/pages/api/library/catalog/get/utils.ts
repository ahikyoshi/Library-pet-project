import { IBook } from "@/globalTypes";

export function catalogSearch(arr: IBook[], searchedValue: string): IBook[] {
    return arr.filter(
        (book) =>
            book.title.includes(searchedValue) ||
            book.cycle.title.includes(searchedValue) ||
            book.author.includes(searchedValue)
    );
}
export function catalogSort(arr: IBook[]): IBook[] {
    return arr.sort((a: IBook, b: IBook) => {
        const authorA = a.author.toLowerCase();
        const authorB = b.author.toLowerCase();

        if (authorA < authorB) {
            return -1;
        }
        if (authorA > authorB) {
            return 1;
        }
        const cycleNameA = a.cycle.title.toLowerCase();
        const cycleNameB = b.cycle.title.toLowerCase();

        if (cycleNameA < cycleNameB) {
            return -1;
        }
        if (cycleNameA > cycleNameB) {
            return 1;
        }

        const cycleNumberA = Number(a.cycle.number);
        const cycleNumberB = Number(b.cycle.number);

        if (cycleNumberA < cycleNumberB) {
            return -1;
        }
        if (cycleNumberA > cycleNumberB) {
            return 1;
        }

        return 0;
    });
}

export function catalogPagination(
    settings: { currentPage: number, limit: number },
    DB: IBook[]
) {
    const { currentPage, limit } = settings;
    const startIndex: number = (currentPage - 1) * limit;
    const endIndex: number = currentPage * limit;

    return DB.slice(startIndex, endIndex);
}
