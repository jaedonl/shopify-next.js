import React from 'react'
import styles from '../styles/CollectionList.module.scss'
import Link from 'next/link'
import Image from 'next/image'

const CollectionList = ({collections}) => {
  return (
    <div className={styles.container}>
        <h2>Collections</h2>

        <div className={styles.collection_lists}>
            {collections.map((collection, idx) => (
                <Link href={`/collections/${collection.handle}`} passHref>
                    <a className={styles.collection_listItem}>
                        <figure>
                            <Image src={collection.image.src} alt="" layout="fill" objectFit="cover" className={styles.image} />                             
                            <figcaption>{collection.title}</figcaption>
                        </figure>
                    </a>                        
                </Link>                    
            ))}
        </div>
    </div>
  )
}

export default CollectionList