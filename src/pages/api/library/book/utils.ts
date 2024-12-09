import { readFile } from "fs/promises";

export async function loadBookDB() {
    const stringDB = (await readFile("./public/data/bookDB.json")).toString();

    return stringDB;
}
