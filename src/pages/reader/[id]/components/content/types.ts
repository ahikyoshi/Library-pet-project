import { Dispatch, SetStateAction } from "react";
import { IChapters } from "../../index.page";

export interface IContentProps {
    chapters: IChapters[];
    currentChapter: number;
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}
