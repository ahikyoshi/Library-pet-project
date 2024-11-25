import { NextApiRequest } from "next";

export interface INewBookRequest extends NextApiRequest {
    body: {
        title: string,
        author: string,
        cycle: {
            title: string,
            number: number
        },
        description: string,
        meta: {
            writtingDate: string
        }
    };
}
