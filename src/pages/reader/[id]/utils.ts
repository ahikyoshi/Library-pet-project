import { IBookCard } from "@/globalTypes";

export async function getBookInfo(id: string) {
    try {
        const response = await fetch("/api/library/book/get", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id,
                typeOfResponse: "card"
            })
        });

        const { success, message, body } = (await response.json()) as {
            success: boolean,
            message: string,
            body: IBookCard
        };

        if (!success) {
            console.log(message);
        } else {
            return body;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getReaderFile(id: string) {
    try {
        const response = await fetch(`/api/library/book/get/fb2?id=${id}`);

        const { success, message, body } = (await response.json()) as {
            success: boolean,
            message: string,
            body: string
        };

        if (!success) {
            console.log(message);
        } else {
            return body;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const parseFB2 = (
    readerFile: string
): { chapterTitle: string, content: string }[] => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(readerFile, "application/xml");

    const chapters = Array.from(xmlDoc.querySelectorAll("section"))
        .map((section) => {
            // Title
            const chapterParentElement = section.querySelector("title");
            if (!chapterParentElement || !chapterParentElement.parentElement)
                return null;

            const chapterElement = chapterParentElement.firstElementChild;
            if (chapterElement) {
                const newChapterTitle = document.createElement("h1");
                newChapterTitle.innerHTML = chapterElement.innerHTML;
                chapterElement.replaceWith(newChapterTitle);
            }

            while (chapterParentElement.firstChild) {
                chapterParentElement.parentElement.insertBefore(
                    chapterParentElement.firstChild,
                    chapterParentElement
                );
            }
            chapterParentElement.remove();

            const content = section.innerHTML;

            const chapterTitle = chapterElement?.innerHTML;
            if (!chapterTitle) return null;

            return {
                chapterTitle,
                content
            };
        })
        .filter(
            (section): section is { chapterTitle: string, content: string } => {
                return section != null;
            }
        );

    return chapters;
};
