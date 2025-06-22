// Types
import { IBook } from "@/globalTypes";
import { IGetCatalogProps } from "./types";

export const getCatalog = ({
    currentPage,
    searchedValue,
    setList,
    setPages
}: IGetCatalogProps) => {
    document.title = "Aurora: Админ панель";

    const adminListHeight = document.getElementById("admin_list")?.offsetHeight;

    if (!adminListHeight) {
        return;
    }

    const settings = {
        currentPage: currentPage,
        limit: (adminListHeight ? adminListHeight / 40 : 10) - 3,
        searchedValue: searchedValue
    };

    fetch("/api/library/catalog/get", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ settings: settings })
    })
        .then((res) => res.json())
        .then(
            ({
                success,
                catalog,
                pages,
                message
            }: {
                success: boolean,
                catalog: IBook[],
                pages: number,
                message: string
            }) => {
                if (success) {
                    setList(catalog);
                    setPages(pages);
                } else {
                    alert(message);
                }
            }
        )
        .catch(() => console.log("Something went wrong"));
};
