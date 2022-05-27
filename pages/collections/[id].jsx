import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { fetchCollectionInfo } from '../../lib/shopify'
import styles from '../../styles/Collection.module.scss'

const Collection = ({ collection }) => {
    const router = useRouter()                   

    console.log(collection)

    return (
        <main className={styles.container}>
            <Head>
                <title>JdonL | {collection.title}</title>
                <meta name="description" content={collection.description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <section className={styles.collection_header}>
                <nav className={styles.breadcrumb}>
                    <ul>
                        <li><Link href="/"><a>home</a></Link><span>/</span></li>
                        <li><Link href="/collections"><a>collections</a></Link><span>/</span></li>
                        <li>{router.query.id}</li>
                    </ul>
                </nav>
                <h1 className={styles.page_title}>{collection.title}</h1>    
            </section>

            <section className={styles.collection_main}>
                <div className={styles.productList}>
                    {/* {collection.map((product, idx) => (
                        <div>hi</div>
                    ))} */}
                </div>
            </section>

        </main>
    )
}


export const getServerSideProps = async ({params}) => {            
    const handle = params.id        
    const res = await fetchCollectionInfo(handle)    

    const collection = res.body.data.collectionByHandle    
    collection.id = collection.id.split('/').pop()    
    
    return {
        props: {
            collection: collection        
        },
    }
}
export default Collection