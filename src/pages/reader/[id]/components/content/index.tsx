//types
import { IContentProps } from "./types";

export const Content = ({
    chapters,
    currentChapter,
    setIsMenuOpen
}: IContentProps) => {
    return (
        <div
            className="reader"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            dangerouslySetInnerHTML={{
                __html: chapters[currentChapter].content
            }}
        />
    );
};
