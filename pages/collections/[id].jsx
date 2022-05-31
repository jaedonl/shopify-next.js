import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { fetchCollectionInfo } from '../../lib/shopify'
import styles from '../../styles/Collection.module.scss'

const Collection = ({ collectionInfo }) => {
    const [products, setProducts] = useState([collectionInfo.products.edges])
    const router = useRouter()         

    useEffect(() => {
        setProducts([collectionInfo.products.edges])
    }, [router])              
    
    return (
        <main className={styles.container}>
            <Head>
                <title>JdonL | {collectionInfo.title}</title>
                <meta name="description" content={collectionInfo.description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <section id="collection-info" className={styles.collection_header}>
                <nav className={styles.breadcrumb}>
                    <ul>
                        <li><Link href="/"><a>home</a></Link><span>/</span></li>
                        <li><Link href="/collections"><a>collections</a></Link><span>/</span></li>
                        <li>{router.query.id}</li>
                    </ul>
                </nav>

                <div className={styles.collection_header_flex}>
                    <div className={styles.collection_info}>
                        <h1 className={styles.page_title}>{collectionInfo.title}</h1>
                        <p className={styles.page_description}>{collectionInfo.description}</p>
                    </div>                    

                    <div className={styles.collection_banner}>
                        <Image src={collectionInfo.image.url} layout="fill" objectFit="cover" />
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
                            <article key={idx} className={styles.product_item}>
                                <Link href={`/product/${product.node.handle}`} passHref>
                                    <a>
                                        <Image src={product.node.variants.edges[0].node.image.url} layout="fill" objectFit="contain" className={styles.image} />                                    
                                        <h2 className={styles.product_title}>{product.node.title}</h2>
                                        <p className={styles.product_type_tags}>
                                            <span className={styles.tags}>{product.node.productType},</span> 
                                            {product.node.tags.map((tag, idx) => (
                                            <span key={idx} className={styles.tags}> {tag}<span className={styles.comma}>,</span></span>
                                            ))}
                                        </p>                                    
                                        <span className={styles.product_price}>          
                                            <span className={styles.dollar}>$</span>
                                            <span className={styles.integer}>{intAndDec[0]}</span>
                                            <span className={styles.decimals}>.{intAndDec[1]}</span>
                                            <span className={styles.currency}>{product.node.variants.edges[0].node.priceV2.currencyCode}</span>
                                        </span>                  
                                    </a>
                                </Link>                  
                            </article>
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