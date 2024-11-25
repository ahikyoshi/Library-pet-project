import { NextApiRequest } from "next";

export interface IDeleteBookRequest extends NextApiRequest {
    body: {
        id: string
    };
}
