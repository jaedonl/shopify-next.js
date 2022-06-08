import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { fetchCollectionInfo } from '../../lib/shopify'
import styles from '../../styles/Collection.module.scss'
import ProductCard from '../../components/ProductCard'

const Collection = ({ collectionInfo }) => {
    const [collection, setCollection] = useState(collectionInfo)
    const [products, setProducts] = useState([collectionInfo.products.edges])
    const router = useRouter()             

    useEffect(() => {
        setCollection(collectionInfo)
        setProducts([collectionInfo.products.edges])
    }, [router])              
    
    return (
        <main className={styles.template}>
            <Head>
                <title>JdonL | {collection.title}</title>
                <meta name="description" content={collection.description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <nav className={styles.breadcrumb}>
                <ul>                        
                    <li><Link href="/collections"><a>collections</a></Link><span>/</span></li>
                    <li>{collection.title}</li>
                </ul>
            </nav>

            <section id="collection-info" className={styles.collection_header}>                
                <div className={styles.collection_header_flex}>
                    <div className={styles.collection_info}>
                        <h1 className={styles.page_title}>{collection.title}</h1>
                        <p className={styles.page_description}>{collection.description}</p>
                    </div>                    

                    <div className={styles.collection_banner}>
                        <Image src={collection.image.url} layout="fill" objectFit="cover" />
                    </div>
                </div>                
            </section>

            <section id="collection-products" className={styles.collection_main}>
                <div className={styles.sorting_filter}>
                    <select name="products" id="products">
                        <option value="high-low">Price: low to high</option>
                        <option value="low-high">Price: high to low</option>
                        <option value="name">Name</option>
                        <option value="newest">Newest</option>
                        <option value="popular">Popular</option>
                    </select>
                </div>
                <div className={styles.product_list}>
                    {products[0].map((product, idx) => {     
                        let intAndDec = Number(product.node.variants.edges[0].node.priceV2.amount).toFixed(2).split('.')
                        
                        return (
                            <ProductCard 
                                key={idx}
                                handle={product.node.handle} 
                                imgUrl={product.node.variants.edges[0].node.image.url} 
                                title={product.node.title} 
                                productType={product.node.productType} 
                                tags={product.node.tags} integer={intAndDec[0]} 
                                decimals={intAndDec[1]} 
                                currency={product.node.variants.edges[0].node.priceV2.currencyCode} 
                            />
                        )                        
                    })}
                </div>
            </section>
        </main>
    )
}

export const getServerSideProps = async ({params}) => {            
    const handle = params.id        
    const res = await fetchCollectionInfo(handle)        

    const collectionInfo = res.body.data.collectionByHandle    
    collectionInfo.id = collectionInfo.id.split('/').pop()        
    
    return {
        props: {
            collectionInfo: collectionInfo,            
        },
    }
}

export default Collection