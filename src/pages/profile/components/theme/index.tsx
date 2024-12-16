// libs
import { useEffect, useState } from "react";
// component
import { Svg } from "@/components/Svg";

export const ThemeToggle = () => {
    const [isLight, setIsLight] = useState<boolean | null>(null);

    useEffect(() => {
        const selectedTheme = localStorage.getItem("theme") || "light";

        setIsLight(selectedTheme === "light");
    }, []);

    useEffect(() => {
        if (isLight === null) {
            return;
        }
        document.body.className = isLight ? "light" : "dark";
        localStorage.setItem("theme", isLight ? "light" : "dark");
    }, [isLight]);
    return (
        <div onClick={() => setIsLight((prev) => !prev)} className="w-6 h-6">
            <Svg src={"/assets/icons/profile/theme/mode.svg"} size={24} />
        </div>
    );
};
