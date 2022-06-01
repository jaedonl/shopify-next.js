import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import MainBanner from '../components/MainBanner'
import CollectionList from '../components/CollectionList'
import { fetchAllCollection } from '../lib/shopify'

export default function Home({collections}) {
    const [allCollections, setAllCollections] = useState(collections)    
    
    return (
        <main className={styles.template}>
            <Head>
                <title>Shopify with Next.js</title>
                <meta name="description" content="Shopify with Next.js" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <h1 className={styles.page_heading} title="Homepage">JdonL Homepage</h1>
            
            <section>
                <MainBanner/>
            </section>

            <section>
                <CollectionList collections={allCollections} />
            </section>

            <section style={{height: "30vh"}}></section>        
        </main>
    )
}

export const getServerSideProps = async (context) => {
    // const smartCollection = `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2022-04/smart_collections.json`
    // const customCollection = `https://${process.env.SHOPIFY_STORE_DOMAIN}/admin/api/2022-04/collections/270853537837.json`
    // const headers = {"X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_ACCESSTOKEN,"Content-Type": "application/json"}
    // const smartRes = await axios.get(smartCollection, { headers })
    // const bestsellerRes = await axios.get(customCollection, { headers })    
    // const smartcollections = smartRes.data.smart_collections.filter(item => item.title !== 'All')
    // const bestsellerCollections = [bestsellerRes.data.collection]
    // const allCollections = bestsellerCollections.concat(smartcollections)

    const res = await fetchAllCollection()
    const data = res.body.data.collections.nodes
    
    const allCollection = data.filter(item => item.title !== 'All')    
    const index = allCollection.findIndex(el => el.title == 'Bestseller')
    const node = allCollection[index]
    
    allCollection.splice(index, 1)
    allCollection.unshift(node)

    console.log(allCollection)

    return {
        props: {
            collections: allCollection,
        },
    }
}