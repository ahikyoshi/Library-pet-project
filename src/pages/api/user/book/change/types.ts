import { IUserBook } from "@/globalTypes";
import { NextApiRequest } from "next";

export interface IExtendedNextApiRequest extends NextApiRequest {
    body: {
        newBook: IUserBook
    };
}
