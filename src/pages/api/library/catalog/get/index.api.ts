// utils
import { catalogPagination, catalogSearch, catalogSort } from "./utils";
import { loadDB } from "../../utils";
// types
import { NextApiResponse } from "next";
import { ICatalogRequest } from "./types";
async function handler(req: ICatalogRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res
            .status(405)
            .json({ success: false, message: "Method not allowed" });
    }

    try {
        const { settings } = req.body;

        if (!settings) {
            return res.status(400).json({
                success: false,
                message: "Данные запроса не верны"
            });
        }

        let DB = await loadDB();

        const pages = Math.floor(DB.length / settings.limit) + 1;

        if (settings.searchedValue != "") {
            DB = catalogSearch(DB, settings.searchedValue);
        }

        DB = catalogSort(DB);
        const catalog = catalogPagination(settings, DB);

        res.status(200).json({
            success: true,
            catalog: catalog,
            pages: pages
        });
    } catch (error) {
        console.log("Ошибка сервера:", error);
        return res.status(500).json({
            success: false,
            message: "Ошибка сервера"
        });
    }
}

export default handler;
