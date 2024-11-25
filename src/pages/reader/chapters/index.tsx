import { getProgress, IBookInfo } from "../utils";

export const Chapters = ({
    bookInfo,
    currentPage,
    currentChapter
}: {
    bookInfo: IBookInfo,
    currentPage: number,
    currentChapter: number
}) => {
    return (
        <div className="fixed bottom-0 w-screen bg-slate-900 left-0 flex justify-between p-4">
            <div className="flex">
                <div className="mr-2">&#9776;</div>
                <div>{bookInfo.chaptersInfo[currentChapter].chapterTitle}</div>
            </div>
            <div>{getProgress(bookInfo, currentPage, currentChapter)}</div>
        </div>
    );
};
