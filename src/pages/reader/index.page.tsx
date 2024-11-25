import { useEffect, useState } from "react";
import { getFile, getInfo, IBookInfo, IParsedBook } from "./utils";
import { Controls } from "./controls";
import { Chapters } from "./chapters";

const Page = () => {
    const [book, setBook] = useState<IParsedBook | null>(null);
    const [bookInfo, setBookInfo] = useState<IBookInfo | null>(null);
    const [currentChapter, setCurrentChapter] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);

    const [isOpenMenu, setIsOpenMenu] = useState(false);
    // const [isChaptersListOpen, setIsChaptersListOpen] = useState(false);
    useEffect(() => {
        getFile(setBook);
    }, []);

    useEffect(() => {
        if (book != null) {
            setBookInfo(getInfo(book));
        }
    }, [book]);

    useEffect(() => {
        if (!bookInfo) {
            return;
        }
        if (
            currentPage >
            bookInfo?.chaptersInfo[currentChapter].countOfPages - 1
        ) {
            setCurrentChapter((prev) => {
                return prev + 1;
            });
            setCurrentPage(0);
        }
    }, [currentPage]);

    if (!book || !bookInfo) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="px-2" style={{ height: "100vh", overflow: "hidden" }}>
            {isOpenMenu && (
                <div className="fixed top-0 w-screen bg-slate-900 left-0 flex justify-between items-center px-4 h-14">
                    <div className="text-2xl">&larr;</div>
                    <div>{book.title}</div>
                </div>
            )}
            <div className="text-justify">
                <div
                    dangerouslySetInnerHTML={{
                        __html: book.chapters[currentChapter].pages[currentPage]
                    }}
                />
            </div>
            {isOpenMenu && (
                <Chapters
                    bookInfo={bookInfo}
                    currentPage={currentPage}
                    currentChapter={currentChapter}
                />
            )}
            <Controls
                setCurrentPage={setCurrentPage}
                setIsOpenMenu={setIsOpenMenu}
                isOpenMenu={isOpenMenu}
            />
        </div>
    );
};

export default Page;
