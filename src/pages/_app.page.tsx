// types
import type { AppProps } from "next/app";
import { ReactElement } from "react";
// Components
import Layout from "./layout";
// Styles
import "../global.css";

export default function App({ Component, pageProps }: AppProps): ReactElement {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}
