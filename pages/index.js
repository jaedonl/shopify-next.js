import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import MainBanner from '../components/MainBanner'
import ProductList from '../components/ProductList'
import CollectionList from '../components/CollectionList'
import axios from 'axios'

export default function Home({}) {
    return (
        <main className={styles.container}>
            <Head>
                <title>Shopify with Next.js</title>
                <meta name="description" content="Shopify with Next.js" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section>
                <MainBanner/>
            </section>

            <section>
                <CollectionList/>
            </section>
        
        </main>
    )
}

export const getServerSideProps = async (context) => {
    //https://codesandbox.io/s/exapp-eppyvq?file=/server/server.js
    
    // const res = await axios.get("https://jdonlee.myshopify.com/admin/api/2022-04/products.json")

    return {
        props: {
            // products: res.data
        },
    }
}