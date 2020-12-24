import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.css';
import 'react-circular-progressbar/dist/styles.css';
import '../styles/globals.scss';
import '../translations';
import { Provider } from 'react-redux';
import store from '../store';
import { firebaseContext, useFirebase } from '../firebase';
import useAuth from '../hooks/useAuth';

const MyApp = ({ Component, pageProps }) => {
    // User login
    const { auth, firestore } = useFirebase();
    const user = useAuth(auth);

    return (
        <>
            <Head>
                <title>Super8</title>
            </Head>
            <Provider store={store}>
                <firebaseContext.Provider value={{ auth, firestore, user }}>
                    <Component {...pageProps} />
                </firebaseContext.Provider>
            </Provider>
        </>
    );
};

export default MyApp
