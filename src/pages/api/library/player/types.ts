import { NextApiRequest } from "next";

export interface IPlayerRequest extends NextApiRequest {
    body: {
        id: string
    };
}
