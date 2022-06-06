import Layout from "../components/Layout";
import '../styles/globals.css'
import { persistor, store } from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </PersistGate>
        </Provider>
    )
}

export default MyApp
