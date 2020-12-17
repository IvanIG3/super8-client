import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';
import 'react-circular-progressbar/dist/styles.css';
import '../styles/globals.scss';
import '../translations';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import rrfProps from '../firebase';
import store from '../store';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Super8</title>
            </Head>
            <Provider store={store}>
                <ReactReduxFirebaseProvider {...rrfProps}>
                    <Component {...pageProps} />
                </ReactReduxFirebaseProvider>
            </Provider>
        </>
    )
}

export default MyApp
