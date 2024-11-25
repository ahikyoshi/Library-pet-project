import { IBook } from "@/globalTypes";
import { readFile } from "fs/promises";

export let bookCache: IBook[] | null;

export async function loadDB() {
    if (!bookCache) {
        const stringDB = (
            await readFile("./public/data/library/books.json")
        ).toString();
        bookCache = JSON.parse(stringDB) as IBook[];
    }
    return bookCache;
}
