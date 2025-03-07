import { Dispatch, SetStateAction } from "react";
import { IPlayerState, TPlayerAction } from "./types";
import { IBookPageContent } from "../../types";
import { IUserBook } from "@/globalTypes";

export const getTracks = ({
    id,
    playerDispatch
}: {
    id: string,
    playerDispatch: Dispatch<TPlayerAction>
}) => {
    fetch("/api/library/player", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: id })
    })
        .then((res) => res.json())
        .then((data: { body: string[] }) => {
            playerDispatch({
                type: "SET_TRACKS",
                payload: data.body.sort((a, b) => {
                    return parseInt(a) - parseInt(b);
                })
            });
        })
        .catch((e) => console.log(e));
};

export const trackTransform = (track: string, title: string): string => {
    if (track === undefined) {
        return "";
    }
    const chapterNumber = track
        .replace(/\.[^/.]+$/, "")
        .replace(/\[\d+\]/, "")
        .replace(/\[(\d+)\]/, "");

    return `Глава ${parseInt(chapterNumber, 10)} - ${title}`;
};

export const trackDurationTransform = (track: string) => {
    if (track === undefined) {
        return "";
    }
    const match = track.match(/\[(\d+)\]/);
    const duration = match ? parseInt(match[1], 10) : null;

    return timeTransform(Number(duration));
};

export function playerReducer(
    state: IPlayerState,
    action: TPlayerAction
): IPlayerState {
    switch (action.type) {
        case "SET_TRACKS": {
            return {
                ...state,
                tracks: { current: state.tracks.current, list: action.payload }
            };
        }
        case "CHANGE_TRACK": {
            return {
                ...state,
                tracks: { list: state.tracks.list, current: action.payload },
                time: { current: 0, duration: 0 }
            };
        }
        case "CHANGE_TIME": {
            if (state.time.current === action.payload) return state;

            return {
                ...state,
                time: {
                    ...state.time,
                    current: action.payload
                }
            };
        }
        case "CHANGE_DURATION": {
            return {
                ...state,
                time: { current: state.time.current, duration: action.payload }
            };
        }
        default:
            return state;
    }
}

export const timeTransform = (timeSwamp: number): string => {
    const time: number = Math.floor(timeSwamp);
    let minutes: number | string = Math.floor(time / 60);
    let second: number | string = time % 60;
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (second < 10) {
        second = `0${second}`;
    }
    return `${minutes}:${second}`;
};

export const updateUserBook = (newUserMeta: IUserBook) => {
    fetch("/api/user/book/change", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            newBook: newUserMeta
        })
    }).catch((e) => console.log(e));
};

export const bookEnded = (
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    setContent: Dispatch<SetStateAction<IBookPageContent | null>>,
    userMeta: IUserBook
) => {
    setIsOpen(false);

    const newUserMeta: IUserBook = {
        ...userMeta,
        status: "finished",
        audio: {
            currentTime: 0,
            currentChapter: 0
        }
    };

    updateUserBook(newUserMeta);
    setContent((prev) =>
        prev
            ? {
                  ...prev,
                  user: {
                      ...prev.user,
                      status: "finished",
                      audio: {
                          ...prev.user.audio,
                          currentTime: 0,
                          currentChapter: 0
                      }
                  }
              }
            : null
    );
};

export const nextTrack = (
    state: IPlayerState,
    dispatch: React.Dispatch<TPlayerAction>
) => {
    const { list, current } = state.tracks;
    if (current < list.length - 1) {
        dispatch({ type: "CHANGE_TRACK", payload: current + 1 });
        return false;
    } else {
        dispatch({ type: "CHANGE_TRACK", payload: 0 });
        return true;
    }
};
