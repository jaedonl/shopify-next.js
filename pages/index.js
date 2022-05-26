import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import MainBanner from '../components/MainBanner'
import ProductList from '../components/ProductList'
import CollectionList from '../components/CollectionList'
import axios from 'axios'

export default function Home({collections}) {
    console.log(collections)
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
                <CollectionList collections={collections} />
            </section>

            <section style={{height: "30vh"}}>
                
            </section>
        
        </main>
    )
}

export const getServerSideProps = async (context) => {
    const domain = process.env.SHOPIFY_STORE_DOMAIN
    const adminAccessToken = process.env.SHOPIFY_ADMIN_ACCESSTOKEN
    
    const smartCollection = `https://${domain}/admin/api/2022-04/smart_collections.json`
    const customCollection = `https://${domain}/admin/api/2022-04/collections/270853537837.json`

    const headers = {
        "X-Shopify-Access-Token": adminAccessToken,
        "Content-Type": "application/json",
    }

    const smartRes = await axios.get(smartCollection, { headers })
    const bestsellerRes = await axios.get(customCollection, { headers })    

    const smartcollections = smartRes.data.smart_collections.filter(item => item.title !== 'All Products')
    const bestsellerCollections = [bestsellerRes.data.collection]

    const allCollections = bestsellerCollections.concat(smartcollections)
    


    return {
        props: {
            collections: allCollections,            
        },
    }
}