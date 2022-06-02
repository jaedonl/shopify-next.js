import {useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { fetchProductByHandle } from '../../lib/shopify'
import styles from '../../styles/Product.module.scss'

const Proudct = ({productData}) => {
    const [product, setProduct] = useState(productData)
    const [productImages, setProductImages] = useState(product.images.edges)     
    // for cart
    const [price, setPrice] = useState()
    const [quantity, setQuantity] = useState(1)

    const intAndDec = Number(product.variants.nodes[0].price).toFixed(2).split('.')

    console.log(product);        
    
    const openDetail = (e) => {
        const nodes = document.querySelector(`#${e.target.getAttribute('name')}`).classList.add('rotate')        
    }

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
                    <div className={styles.thumbnail_container}>
                        {productImages.map((image, idx) => (
                            <div key={idx} className={styles.imageWrapper}>
                                <Image src={image.node.url} layout="fill" objectFit="cover" className={styles.thumbnail} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.product_info_container}>
                    <span className={styles.product_vendor}>{product.vendor}</span>
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

                    <p className={styles.product_description}>
                        {product.description}
                    </p>       
                    
                    <div className={styles.qty_and_cart}>
                        <div className={styles.input_quantity_wrapper}>
                            <label for="quantity" className={styles.input_label}>QTY</label>

                            <div className={styles.input_container}>
                                <div className={styles.input_quantity_box}>                            
                                    <button className={styles.quantity_button} name="minus" type="button" aria-label="Decrease quantity for Bed One">
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" className={`${styles.icon} ${styles.icon_minus}`} fill="none" viewBox="0 0 10 2"><path fill-rule="evenodd" clip-rule="evenodd" d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z" fill="currentColor"></path></svg>
                                    </button>

                                    <input className={styles.quantity_input} type="number" name="quantity" id="quantity_input" min="1" value="1" aria-label="quantity input" />

                                    <button className={styles.quantity_button} name="plus" type="button" aria-label="Increase quantity for Bed On">
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" className={`${styles.icon} ${styles.icon_plus}`}fill="none" viewBox="0 0 10 10"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 4.51a.5.5 0 000 1h3.5l.01 3.5a.5.5 0 001-.01V5.5l3.5-.01a.5.5 0 00-.01-1H5.5L5.49.99a.5.5 0 00-1 .01v3.5l-3.5.01H1z" fill="currentColor"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.cart_checkout}>
                            <div className={styles.button_wrapper}>
                                <button type="submit" name="add to cart" aria-label="add to cart" className={styles.add_to_cart_button}>ADD TO CART</button>
                            </div>                        
                            <div className={styles.button_wrapper}>
                                <button type="submit" name="buy now" aria-label="buy now" className={styles.buy_now_button}>BUY NOW</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.detail_info}>                            
                        {product.metafields.nodes.map((item, idx) => {                
                            return (
                                <details key={idx}>
                                    <summary onClick={openDetail} id={item.key} name={item.key}>
                                        <span className={styles.key}>{item.key}</span> 
                                        <span className={styles.indicator}>+</span>
                                    </summary>
                                    <li className={styles.value}>{item.value}</li>
                                </details>
                            )
                        })}
                    </div>              
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