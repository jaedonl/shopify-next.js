import {useEffect, useState} from 'react'
import styles from '../styles/CollectionList.module.scss'
import Link from 'next/link'
import Image from 'next/image'

const CollectionList = ({collections}) => {
    return (
        <div className={styles.container}>
            <div className={styles.collections}>
                <h2>Collections</h2>
                <Link href={`/collections/all`} passHref>
                    <a>
                        <span>Shop All</span>                        
                        <svg width="24" height="22" xmlns="http://www.w3.org/2000/svg"><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/></svg>
                    </a>                    
                </Link>
            </div>            

            <div className={styles.collection_lists}>
                {collections.map((collection, idx) => (
                    <div className={styles.collection_listItem} key={idx}>
                        <Link href={`/collections/${collection.handle}`} passHref>
                            <a>
                                <figure>
                                    <Image src={collection.image.src} alt="" layout="fill" objectFit="cover" className={styles.image} />                             
                                    <figcaption>
                                        <span>{collection.title}</span>
                                        <svg width="24" height="22" xmlns="http://www.w3.org/2000/svg"><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/></svg>
                                        </figcaption>
                                </figure>
                            </a>        
                        </Link>        
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CollectionList