
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
class MyDocument extends Document {
    render() {
        return (
            <Html lang="ru">
                <Head>
                    <style>
                        {`
                            @font-face {
                                font-family: Roboto;
                                src: url(/fonts/Roboto-Regular.ttf);
                                font-display: swap;
                            }

                            @font-face {
                                font-family: Gilroy;
                                src: url(/fonts/Gilroy-Light.otf);
                                font-weight: 400;
                            }

                            @font-face {
                                font-family: Gilroy;
                                src: url(/fonts/Gilroy-ExtraBold.otf);
                                font-weight: 800;
                            }
                        `}
                    </style>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;