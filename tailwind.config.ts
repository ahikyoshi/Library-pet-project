import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: "rgb(var(--primary))",
                background: "rgb(var(--background))",
                border: "rgb(var(--border))",
                text: {
                    primary: "rgb(var(--text_primary))",
                    secondary: "rgb(var(--text_secondary))",
                    contrast: "rgb(var(--text_contrast))"
                },
                notification: "rgb(var(--notification))"
            }
        }
    },
    plugins: []
};
export default config;
