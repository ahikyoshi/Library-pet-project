import { IBook, IUserBook } from "@/globalTypes";

export interface IBookPageContent {
    book: IBook;
    series: IBook[];
    user: IUserBook;
    isAuth: boolean;
}

export interface IBookPageState {
    content: IBook | null;
    cycle: IBook[];
    userMeta: IUserBook | null;
    isPlayerOpen: boolean;
}

export type TBookPageAction =
    | {
          type: "SET_BOOK_DATA",
          payload: { book: IBook, series: IBook[], user: IUserBook }
      }
    | { type: "TOGGLE_PLAYER" }
    | { type: "CHANGE_USERMETA", payload: IUserBook };
