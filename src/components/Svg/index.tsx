"use client";

// libs
import { useEffect, useState } from "react";
import Image from "next/image";

export const Svg = ({
    src,
    size,
    alt
}: {
    src: string,
    size: number,
    alt: string
}) => {
    const [href, setHref] = useState<string>("");

    useEffect(() => {
        const theme = localStorage.getItem("theme") || "light";
        if (theme != null) {
            setHref(src.replace("theme", theme));
        }
    }, [src]);
    return <Image src={href} width={size} height={size} alt={alt} />;
};
