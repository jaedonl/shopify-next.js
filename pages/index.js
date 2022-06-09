import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import MainBanner from '../components/MainBanner'
import CollectionList from '../components/CollectionList'
import MainBestseller from '../components/MainBestseller';
import { fetchAllCollection, fetchCollectionInfo } from '../lib/shopify'


export default function Home({ collections, bestseller }) {
    const [allCollections, setAllCollections] = useState(collections)    
    const [bestsellerCollection, setBestsellerCollection] = useState(bestseller)

    return (
        <main className={styles.template}>
            <Head>
                <title>JdonL | Home</title>
                <meta name="description" content="JdonL Hompage" />
                <link rel="icon" href="/favicon.ico" />
            </Head>            
            
            <h1 className={styles.page_heading} title="Homepage">JdonL Homepage</h1>
            
            <MainBanner/>
            <CollectionList collections={allCollections} />
            <MainBestseller bestseller={bestsellerCollection} />
                        
        </main>
    )
}

export const getServerSideProps = async (context) => {    
    const res = await fetchAllCollection()
    const data = res.body.data.collections.nodes
    const allCollection = data.filter(item => (item.title !== 'All' && item.title !== 'Bestseller'))

    const resBestseller = await fetchCollectionInfo('bestseller')
    const bestsellers = resBestseller.body.data.collection    
    
    return {
        props: {
            collections: allCollection,
            bestseller: bestsellers,
        },
    }
}