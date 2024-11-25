import { IBook } from "@/globalTypes";
import { NextApiRequest } from "next";

export interface IChangedBookRequest extends NextApiRequest {
    body: {
        changedBook: IBook
    };
}
