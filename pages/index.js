import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import MainBanner from '../components/MainBanner'
import ProductList from '../components/ProductList'
import CollectionList from '../components/CollectionList'

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

    // const res = await axios.get("http://localhost:3000/api/products")

    return {
        props: {
        },
    }
}