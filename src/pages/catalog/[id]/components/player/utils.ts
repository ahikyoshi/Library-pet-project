import { Dispatch } from "react";
import { IPlayerState, TPlayerAction } from "./types";

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
            const sortedArr = data.body.sort((a, b) => {
                return parseInt(a) - parseInt(b);
            });
            playerDispatch({ type: "SET_TRACKS", payload: sortedArr });
        })
        .catch((e) => console.log(e));
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

export const nextTrack = (
    state: IPlayerState,
    dispatch: React.Dispatch<TPlayerAction>
) => {
    const { list, current } = state.tracks;

    if (current < list.length - 1) {
        dispatch({ type: "CHANGE_TRACK", payload: current + 1 });
    } else {
        dispatch({ type: "CHANGE_TRACK", payload: 0 });
    }
};
