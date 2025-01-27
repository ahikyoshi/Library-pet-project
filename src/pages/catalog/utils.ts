import { IGetCatalogProps, IServerResponse } from "./types";

export const getCatalog = ({
    limit,
    currentPage,
    searchedValue,
    setBooks,
    setPages
}: IGetCatalogProps) => {
    fetch("/api/library/catalog/get", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            settings: {
                limit: limit,
                currentPage: currentPage,
                searchedValue: searchedValue
            }
        })
    })
        .then((response) => response.json())
        .then((data: IServerResponse) => {
            setBooks(data.catalog);
            setPages(data.pages);
        })
        .catch((e) => console.log(e));
};
