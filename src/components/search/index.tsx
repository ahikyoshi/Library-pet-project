"use client";

// libs
import { Dispatch, FormEvent, SetStateAction } from "react";
// components
import { Svg } from "../Svg";

export const Search = ({
    setSearchedValue
}: {
    setSearchedValue: Dispatch<SetStateAction<string>>
}) => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const searchedValue = formData.get("searchedValue") as string;

        setSearchedValue(searchedValue);
    };
    return (
        <form
            onSubmit={handleSubmit}
            className="w-full flex border border-secondary rounded-md"
        >
            <input
                type="text"
                name="searchedValue"
                className=" pl-2 placeholder:text-text-secondary w-full"
                placeholder="Поиск"
            />
            <button className="px-2 py-2 rounded-r" type="submit">
                <Svg src="/assets/icons/all/theme/search.svg" size={24} />
            </button>
        </form>
    );
};
