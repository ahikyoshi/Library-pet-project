import { NextApiRequest } from "next";

export interface IExtendedNextApiRequest extends NextApiRequest {
    body: {
        id: string
    };
}
