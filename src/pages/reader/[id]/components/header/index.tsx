// libs
import { motion } from "motion/react";
// components
import Link from "next/link";
// types
import { IHeaderProps } from "./types";

export const Header = ({ author, cycle, title }: IHeaderProps) => {
    return (
        <motion.div
            initial={{ top: -56 }}
            animate={{ top: 0 }}
            className="w-screen h-14 px-2 bg-background border-b-2 border-border flex items-center fixed top-0 left-0"
        >
            <Link href={"/profile"} className="mr-2 text-2xl">
                &larr;
            </Link>
            <div className="w-full flex items-center justify-between">
                <div>
                    <div>{author}</div>
                    <div className="text-sm">{`${cycle.title} ${cycle.number}`}</div>
                </div>
                <div className="text-xl font-bold">{title}</div>
            </div>
        </motion.div>
    );
};
