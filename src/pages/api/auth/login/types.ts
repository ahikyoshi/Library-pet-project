import { NextApiRequest } from "next";

export interface ILoginRequest extends NextApiRequest {
    body: {
        login: string,
        password: string
    };
}
