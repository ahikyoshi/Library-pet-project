import { NextApiRequest } from "next";

export interface IGetBookRequest extends NextApiRequest {
    body: {
        id: string,
        typeOfResponse: "card" | "page"
    };
}
