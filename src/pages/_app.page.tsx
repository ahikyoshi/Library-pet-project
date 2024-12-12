// types
import type { AppProps } from "next/app";
import { ReactElement, useEffect } from "react";
// Components
import Layout from "./layout";
// Styles
import "../global.css";

export default function App({ Component, pageProps }: AppProps): ReactElement {
    useEffect(() => {
        const selectedTheme = localStorage.getItem("theme");
        document.body.className = "";

        if (selectedTheme) {
            document.body.classList.add(selectedTheme);
        } else {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                setTimeout(() => {
                    document.body.classList.add("dark");
                }, 100);
            }
            setTimeout(() => {
                document.body.classList.add("light");
            }, 100);
        }
    }, []);
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}
