import { NextApiRequest } from "next";

export interface IRegistrationRequest extends NextApiRequest {
    body: {
        login: string,
        password: string,
        display_name?: string
    };
}
