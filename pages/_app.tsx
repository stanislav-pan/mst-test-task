import Head from "next/head";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { RouterContext } from "../contexts/routerContext";
import MainMenuContextProvider from "../contexts/mainMenuContext";


function MyApp({ Component, pageProps }) {
    const router = useRouter();

    return <Fragment>
        <Head>
            <title>MST Test App</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <RouterContext.Provider value={router}>
            <MainMenuContextProvider>
                <Component {...pageProps} />
            </MainMenuContextProvider>
        </RouterContext.Provider>
        <style jsx global>{`
            body {
                margin: 0;
                overflow: hidden;
            }

            html, body, #__next, .container {
                height: 100%;
            } 
        `}</style>
    </Fragment>
}

export default MyApp