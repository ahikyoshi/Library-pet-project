import { Dispatch, SetStateAction } from "react";

export interface IButtonComponentProps {
    color: string;
    text: string;
    isActive: boolean;
    setStateOpen: Dispatch<SetStateAction<boolean>>;
}
