import { NextApiRequest } from "next";

export interface IReviewRequest extends NextApiRequest {
    body: {
        bookID: string,
        review: string
    };
}
