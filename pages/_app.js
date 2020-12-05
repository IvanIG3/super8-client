import Head from 'next/head';
import '../styles/globals.scss';
import '../translations';
import { Provider } from 'react-redux';
import store from '../store';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Super8</title>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Rammetto+One&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </>
    )
}

export default MyApp
