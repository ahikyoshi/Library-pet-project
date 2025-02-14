"use client";

// libs
import { useEffect, useState } from "react";

export const Svg = ({
    src,
    size,
    styles
}: {
    src: string,
    size: number,
    styles?: string
}) => {
    const [href, setHref] = useState<string>("");

    useEffect(() => {
        const theme = localStorage.getItem("theme") || "light";
        if (theme != null) {
            setHref(src.replace("theme", theme));
        }
    }, [src]);
    return (
        <div
            className={styles}
            style={{
                background: `url(${href}) no-repeat center/100% 100%`,
                width: size,
                height: size
            }}
        />
    );
};
