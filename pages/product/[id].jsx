import {useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { fetchProductByHandle } from '../../lib/shopify'
import styles from '../../styles/Product.module.scss'

const Proudct = ({productData}) => {
    const [product, setProduct] = useState(productData)
    const [productImages, setProductImages] = useState(product.images.edges)     
    
    console.log(product);

    const intAndDec = Number(product.variants.nodes[0].price).toFixed(2).split('.')       
    console.log(intAndDec);         

    return (
        <main className={styles.template}>
            <Head>
                <title>JdonL | {product.title}</title>
                <meta name="description" content={product.description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <nav className={styles.breadcrumb}>
                <ul>            
                    <li><Link href="/collections"><a>collections</a></Link><span>/</span></li>
                    <li><Link href={`/collections/${product.productType}`}><a>{product.productType}</a></Link><span>/</span></li>
                    <li>{product.title}</li>
                </ul>
            </nav>

            <section id="product-info" className={styles.product_main}>
                <div className={styles.product_images_container}>
                    <div className={styles.current_image}>
                        <Image src={productImages[0].node.url} layout="fill" objectFit="cover" className={styles.image} />
                    </div>                    
                    <div className={styles.thumbnail_container}>
                        {productImages.map((image, idx) => (
                            <Image src={image.node.url} layout="fill" objectFit="cover" className={styles.thumbnail} />
                        ))}
                    </div>
                </div>

                <div className={styles.product_info_container}>
                    <h1 className={styles.product_title}>{product.title}</h1>
                    <div className={styles.product_tags}>
                        {product.tags.map((tag, idx) => (
                            <span className={styles.tag}> {tag}<span className={styles.comma}>,</span></span>
                        ))}
                    </div>

                    <div className={styles.product_price}>          
                        <span className={styles.dollar}>$</span>
                        <span className={styles.integer}>{intAndDec[0]}</span>
                        <span className={styles.decimals}>.{intAndDec[1]}</span>
                        <span className={styles.currency}>USD</span>
                    </div>

                    <p>{product.description}</p>
                </div>                
            </section>            
        </main>
    )
}

export const getServerSideProps = async ({params}) => {            
    const handle = params.id        
    const res = await fetchProductByHandle(handle)        

    const data = res.body.data.productByHandle    
    
    return {
        props: {
            productData: data,       
        },
    }
}

export default Proudct