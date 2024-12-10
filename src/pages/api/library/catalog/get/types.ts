import { NextApiRequest } from "next";

export interface ICatalogRequest extends NextApiRequest {
    body: {
        settings: {
            currentPage: number,
            limit: number,
            searchedValue: string
        }
    };
}
