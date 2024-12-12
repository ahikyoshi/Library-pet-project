// libs
import { useEffect, useState } from "react";
import Image from "next/image";

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
            {isLight ? (
                <Image
                    src={"/assets/icons/profile/light_mode.svg"}
                    width={24}
                    height={24}
                    alt="light_mode"
                />
            ) : (
                <Image
                    src={"/assets/icons/profile/dark_mode.svg"}
                    width={24}
                    height={24}
                    alt="dark_mode"
                />
            )}
        </div>
    );
};
