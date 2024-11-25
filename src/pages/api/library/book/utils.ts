import { IBook } from "@/globalTypes";
import { readFile } from "fs/promises";

export let bookCache: IBook[] | null = null;

export async function loadBookDB() {
    if (!bookCache) {
        const stringDB = (
            await readFile("./public/data/bookDB.json")
        ).toString();
        bookCache = JSON.parse(stringDB) as IBook[];
    }
    return bookCache;
}
