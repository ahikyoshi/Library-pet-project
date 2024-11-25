import { Dispatch, SetStateAction } from "react";

export interface IParsedChapter {
    chapterTitle: string;
    pages: string[];
}

export interface IParsedBook {
    title: string;
    author: string;
    chapters: IParsedChapter[];
}

export interface IBookInfo {
    countOfPages: number;
    chaptersInfo: {
        chapterTitle: string,
        countOfPages: number
    }[];
}

export const getFile = (
    setBook: Dispatch<SetStateAction<IParsedBook | null>>
) => {
    fetch("api/library/book/fb2")
        .then((res) => res.json())
        .then((data: { content: string }) => {
            const parsedBook = parseFB2(data.content);
            setBook(parsedBook);
        })
        .catch((e) => console.error("Ошибка загрузки:", e));
};

const parseFB2 = (fileContent: string): IParsedBook => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(fileContent, "application/xml");

    const title = xmlDoc.querySelector("book-title")?.textContent as string;
    const authorFirstName = xmlDoc.querySelector(
        "author > first-name"
    )?.textContent;
    const authorLastName =
        xmlDoc.querySelector("author > last-name")?.textContent;
    const chapters: IParsedChapter[] = Array.from(
        xmlDoc.querySelectorAll("section")
    ).map((section) => {
        const chapterTitle =
            section.querySelector("title p")?.textContent || "";
        const pages = Array.from(section.querySelectorAll("p"))
            .map((p) => p.textContent || "")
            .filter((text) => text.trim() !== "");
        return { chapterTitle, pages };
    });

    const transformedSections = chapters.filter((section) => {
        return section.chapterTitle != "";
    });

    return {
        title,
        author: `${authorFirstName} ${authorLastName}`,
        chapters: transformedSections.map((section) => {
            return paginationChapter(section);
        })
    };
};

const paginationChapter = (chapter: IParsedChapter) => {
    const chapterTitle = chapter.chapterTitle;
    // Константы
    const maxPageSize = (window.innerWidth - 16) * window.innerHeight;
    const symbolWeight = 220;
    const splitPages = [];
    let currentPage: string[] = [];
    let availableSpace = maxPageSize;

    chapter.pages.forEach((paragraph) => {
        let paragraphSize = paragraph.length * symbolWeight + 7500;

        if (paragraphSize <= availableSpace) {
            const paragraphHTML = `<p class="mb-2 indent-4">${paragraph}</p>`;
            currentPage.push(paragraphHTML);
            availableSpace -= paragraphSize;
        } else {
            while (paragraphSize > availableSpace) {
                const splitIndex = Math.floor(availableSpace / symbolWeight);
                currentPage.push(
                    `<p class="mb-2 indent-4">${paragraph.slice(0, splitIndex)}-</p>`
                );
                splitPages.push([...currentPage]);
                paragraph = paragraph.slice(splitIndex);

                currentPage = [];
                availableSpace = maxPageSize;
                paragraphSize = paragraph.length * symbolWeight;
            }

            currentPage.push(`<p className="mb-2 indent-4">-${paragraph}</p>`);
            availableSpace -= paragraphSize;
        }
    });
    if (currentPage.length > 0) {
        splitPages.push([...currentPage]);
    }

    const page: string[] = splitPages.map((item) => item.join(" "));

    return {
        chapterTitle,
        pages: page
    };
};

export const getInfo = (book: IParsedBook): IBookInfo => {
    let countOfPages = 0;
    book.chapters.forEach((chapter: IParsedChapter) => {
        chapter.pages.forEach(() => {
            countOfPages = countOfPages + 1;
        });
    });

    const chaptersInfo = book.chapters.map((chapter: IParsedChapter) => {
        return {
            chapterTitle: chapter.chapterTitle,
            countOfPages: chapter.pages.length
        };
    });

    return {
        countOfPages,
        chaptersInfo
    };
};

export const getProgress = (
    bookInfo: IBookInfo,
    currentPage: number,
    currentChapter: number
) => {
    let globalCurrentPage = currentPage;

    bookInfo.chaptersInfo.forEach((chapter, index) => {
        if (currentChapter > index) {
            globalCurrentPage += chapter.countOfPages;
        }
    });
    return `${globalCurrentPage + 1} / ${bookInfo.countOfPages}`;
};
