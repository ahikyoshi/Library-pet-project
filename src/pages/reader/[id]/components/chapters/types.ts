import { Dispatch, SetStateAction } from "react";
import { IChapters } from "../../index.page";

export interface IChaptersProps {
    chapters: IChapters[];
    currentChapter: number;
    setCurrentChapter: Dispatch<SetStateAction<number>>;
}
