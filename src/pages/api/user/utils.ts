import { IUser } from "@/globalTypes";
import { readFile } from "fs/promises";

export let userCache: IUser[] | null = null;

export async function loadDB() {
    if (!userCache) {
        const stringDB = (
            await readFile("./public/data/users/users.json")
        ).toString();
        userCache = JSON.parse(stringDB) as IUser[];
    }
    return userCache;
}
