// All users types
export interface IUserBook {
    _id: string;
    status: "new" | "in progress" | "finished" | "soon";
    audio: {
        currentTime: number,
        currentChapter: number
    };
}
export interface IUser {
    login: string;
    password: string;
    role: "user" | "admin";
    display_name: string;
    avatar: string;
    library: IUserBook[];
    id: string;
}
// All books type
export interface IBook {
    title: string;
    author: string;
    cycle: {
        title: string,
        number: number
    };
    description: string;
    meta: {
        addedDate: string,
        writtingDate: string
    };
    assets: {
        image: boolean,
        audio: boolean,
        text: boolean
    };
    reviews: {
        userID: string,
        content: string,
        addedDate: string
    }[];
    id: string;
}

export interface IBookCard {
    title: string;
    author: string;
    assets: {
        image: boolean,
        audio: boolean,
        text: boolean
    };
    cycle: {
        title: string,
        number: number
    };
    id: string;
}

export interface INewBook {
    title: string;
    author: string;
    discribe: string;
    cycle: {
        name: string,
        number: number
    };
}
