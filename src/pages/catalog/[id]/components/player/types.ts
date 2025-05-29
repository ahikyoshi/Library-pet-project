import { IUserBook } from "@/globalTypes";
import { IBookPageContent } from "../../types";
import { Dispatch, SetStateAction } from "react";

export interface IPlayerComponentProps {
    id: string;
    userMeta: IUserBook;
    title: string;
    setContent: Dispatch<SetStateAction<IBookPageContent | null>>;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface IPlayerState {
    tracks: {
        current: number,
        list: string[]
    };
    time: {
        current: number,
        duration: number
    };
}

export type TPlayerAction =
    | {
          type: "SET_TRACKS",
          payload: string[]
      }
    | {
          type: "CHANGE_TRACK",
          payload: number
      }
    | {
          type: "CHANGE_TIME",
          payload: number
      }
    | {
          type: "CHANGE_DURATION",
          payload: number
      };
