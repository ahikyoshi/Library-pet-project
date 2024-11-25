import { NextApiRequest } from "next";

export interface IReaderRequest extends NextApiRequest {
    body: {
        id: string
    };
}
