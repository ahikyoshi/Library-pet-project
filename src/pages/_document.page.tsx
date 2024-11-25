import { Html, Head, Main, NextScript } from "next/document";
import React, { ReactElement } from "react";

export default function Document(): ReactElement {
    return (
        <Html>
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
