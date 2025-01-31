// libs
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// components
import Loading from "@/components/Loading/Loading";
import { Header } from "./components/header";
import { Chapters } from "./components/chapters";
import { Content } from "./components/content";
// utils
import { getBookInfo, getReaderFile, parseFB2 } from "./utils";
// types
import { IBookCard } from "@/globalTypes";

export interface IChapters {
    chapterTitle: string;
    content: string;
}

const Page = () => {
    const router = useRouter();
    const { id } = router.query;

    const [chapters, setChapters] = useState<null | IChapters[]>(null);
    const [bookDetails, setBookDetails] = useState<null | IBookCard>(null);

    const [currentChapter, setCurrentChapter] = useState<number>(0);

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        if (!Array.isArray(id) && id !== undefined) {
            void (async () => {
                try {
                    const readerFile = (await getReaderFile(id)) as string;
                    const bookDetails = (await getBookInfo(id)) as IBookCard;
                    setChapters(parseFB2(readerFile));
                    setBookDetails(bookDetails);
                } catch (error) {
                    console.error("Error fetching reader file:", error);
                }
            })();
        }
    }, [id]);

    useEffect(() => {
        setIsMenuOpen(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentChapter]);

    if (!chapters || !bookDetails) {
        return <Loading />;
    }

    return (
        <main className="w-screen bg-background">
            {isMenuOpen && (
                <Header
                    title={bookDetails.title}
                    cycle={bookDetails.cycle}
                    author={bookDetails.author}
                />
            )}
            <Content
                chapters={chapters}
                currentChapter={currentChapter}
                setIsMenuOpen={setIsMenuOpen}
            />
            {isMenuOpen && (
                <Chapters
                    chapters={chapters}
                    currentChapter={currentChapter}
                    setCurrentChapter={setCurrentChapter}
                />
            )}
        </main>
    );
};

export default Page;
