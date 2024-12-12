import { Html, Head, Main, NextScript } from "next/document";
import React, { ReactElement } from "react";

export default function Document(): ReactElement {
    return (
        <Html>
            <Head />
            <body id="body" className="dark">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
