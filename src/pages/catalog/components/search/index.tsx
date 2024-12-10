"use client";

// libs
import { Dispatch, FormEvent, SetStateAction } from "react";

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
        <form onSubmit={handleSubmit} className="w-full flex">
            <input
                type="text"
                name="searchedValue"
                className="border pl-2 placeholder:text-gray-500 w-full border-white"
                placeholder="Поиск"
            />
            <button
                className="border border-white px-2 py-2 rounded-r"
                type="submit"
            >
                Поиск
            </button>
        </form>
    );
};
