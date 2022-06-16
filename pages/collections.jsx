import {useState, useEffect} from 'react'
import styles from '../styles/Collections.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { fetchAllCollection } from '../lib/shopify'

const collections = ({collections}) => {
    console.log(collections)
    
    return (
        <main className={styles.template}>
            <h1 className={styles.page_title}>Our Collections</h1>
            <div className={styles.collection_grid}>
                {collections.map((collection, idx) => {
                    if (idx % 2 === 1) {
                        return (
                            <Link href={`/collections/${collection.handle}`}>
                                <a>
                                <div className={styles.grid_line}>
                                    <div className={styles.image_wrapper}>
                                        <Image src={collection.image.url} layout="fill" objectFit="cover" className={styles.image} />    
                                    </div>
                                    
                                    <div className={styles.collection_info}>
                                        <h2>{collection.title}</h2>
                                        <p>{collection.description}</p>
                                    </div>
                                </div>
                                </a>
                            </Link>
                        )
                    } else {
                        return (
                            <Link href={`/collections/${collection.handle}`}>
                                <a>
                                <div className={styles.grid_line}>
                                    <div className={styles.collection_info}>
                                        <h2>{collection.title}</h2>
                                        <p>{collection.description}</p>
                                    </div>

                                    <div className={styles.image_wrapper}>
                                        <Image src={collection.image.url} layout="fill" objectFit="cover" className={styles.image} />    
                                    </div>
                                </div></a>
                            </Link>
                        )
                    }
                    
                })}
            </div>
        </main>
    )
}


export const getServerSideProps = async () => {            
    const resCollections = await fetchAllCollection()       
    const data = resCollections.body.data.collections.nodes
    const collections = data.filter(item => (item.title !== 'All' && item.title !== 'Bestseller' && item.title !== 'Promo'))
    
    return {
        props: {
            collections: collections,      
        },
    }
}

export default collections