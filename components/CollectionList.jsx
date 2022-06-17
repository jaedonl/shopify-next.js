import {useEffect, useState} from 'react'
import styles from '../styles/CollectionList.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CollectionList = ({collections}) => {
    const [allCollections, setAllCollections] = useState(collections)    
    
    return (
        <section className={styles.container}>
            <div className={styles.collections}>
                <h2>Collections</h2>
                <Link href={`/collections`} passHref>
                    <a>
                        <span>More colletions</span>                        
                        <ArrowForwardIcon/>
                    </a>                    
                </Link>
            </div>            

            <div className={styles.collection_lists}>
                {allCollections.map((collection, idx) => (
                    <div className={styles.collection_listItem} key={idx}>
                        <figure>
                            <Link href={`/collections/${collection.handle}`} passHref>
                                <a>
                                    <Image src={collection.image.url} alt="" layout="fill" objectFit="cover" className={styles.image} />        
                                    <figcaption>
                                        <div>
                                            <h2>{collection.title}</h2>
                                            <ArrowForwardIcon/>
                                        </div>
                                    </figcaption>
                                </a>
                            </Link>      
                        </figure>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default CollectionList