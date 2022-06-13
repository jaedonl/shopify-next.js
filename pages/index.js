import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import MainBanner from '../components/MainBanner'
import CollectionList from '../components/CollectionList'
import MainBestseller from '../components/MainBestseller';
import { fetchAllCollection, fetchCollectionInfo } from '../lib/shopify'


export default function Home({ collections, promotions, bestseller }) {
    return (
        <main className={styles.template}>
            <Head>
                <title>JdonL | Home</title>
                <meta name="description" content="JdonL Hompage" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Nuosu+SIL&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />
            </Head>            
            
            <h1 className={styles.page_heading} title="Homepage">JdonL Homepage</h1>
            
            <MainBanner promotions={promotions} />
            <CollectionList collections={collections} />
            <MainBestseller bestseller={bestseller} />                        
        </main>
    )
}

export const getServerSideProps = async (context) => {    
    const resAllCollection = await fetchAllCollection()
    const data = resAllCollection.body.data.collections.nodes
    const allCollection = data.filter(item => (item.title !== 'All' && item.title !== 'Bestseller' && item.title !== 'Promo'))

    const resPromo = await fetchCollectionInfo('promo')
    const promotions = resPromo.body.data.collection.products.edges    

    const resBestseller = await fetchCollectionInfo('bestseller')
    const bestsellers = resBestseller.body.data.collection    
    
    return {
        props: {
            collections: allCollection,
            bestseller: bestsellers,
            promotions: promotions
        },
    }
}