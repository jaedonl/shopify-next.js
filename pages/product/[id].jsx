import {useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { fetchProductByHandle } from '../../lib/shopify'
import styles from '../../styles/Product.module.scss'
import { useDispatch } from "react-redux";
import { addProduct, cartPopup } from "../../redux/cartSlice";


const Proudct = ({productData}) => {    
    const [product, setProduct] = useState(productData)    
    const [productImages, setProductImages] = useState(product.images.edges)
    const [productInfoFields, setProductInfoFields] = useState([product.dimensions, product.weight, product.colors, product.materials])        
    const [qty, setQty] = useState(1)        
    const [price, setPrice] = useState(Number(product.variants.nodes[0].priceV2.amount))    
    const [windowSize, setWindowSize] = useState(window.innerWidth);    
    const [index, setIndex] = useState(0)
    const [cartPop, setCartPop] = useState(false)
    const [popupData, setPopupData] = useState()


    const amountIntAndDec = Number(product.variants.nodes[0].priceV2.amount).toFixed(2).split('.')
    const comparedIntAndDec = Number(product.compareAtPriceRange.maxVariantPrice.amount).toFixed(2)    
    const dispatch = useDispatch()        

    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);        
        handleResize();
        
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    useEffect(() => {
        document.querySelector(`.${styles.product_images_container}`).style.width = `${productImages.length * 100}vw`        
    }, [productImages])



    const changeIndex = (e) => {
        const newIndex = Number(e.currentTarget.getAttribute('data_index'))
        setIndex(newIndex)        
    }
    
    const openDetail = (e) => {        
        const node = e.currentTarget.lastElementChild        
        if (node.classList.contains('rotate')) node.classList.remove('rotate')            
        else node.classList.add('rotate')
    }

    const handleQty = (e) => {
        if ((qty > 1 && e.currentTarget.getAttribute('name') === 'minus')) setQty(qty - 1)
        else if (e.currentTarget.getAttribute('name') === 'plus') setQty(qty + 1)            
    }


    useEffect(() => {
        if (cartPop) {            
            document.querySelector(`.${styles.header}`).style.top = '0'
            document.querySelector(`.${styles.cart_popop}`).style.opacity = "1"

            setTimeout(() => {                
                setCartPop(false)
            }, 5000);            
        }
    }, [cartPop])

    const addToCart = () => {        
        dispatch(            
            addProduct({ ...product, qty, price})
        )          
        setCartPop(true)
        setPopupData(product)        
    }        

    console.log(product);
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

            {cartPop && 
                                <div className={styles.cart_popop}>
                                    <h3>Item is added to cart.</h3>
                                    <div>
                                        <h4>{product.title}</h4>
                                        <span className={styles.product_price}>          
                                            <span className={styles.dollar}>$</span>
                                            <span className={styles.integer}>{Number(product.variants.nodes[0].priceV2.amount).toFixed(2)}</span>
                                            <span className={styles.currency}>USD</span>

                                            { product.compareAtPriceRange.maxVariantPrice.amount > 0 && <span className={styles.compared_price}>${product.compareAtPriceRange.maxVariantPrice.amount}</span>}
                                        </span>   
                                        <div className={styles.image_wrapper}>
                                            <Image src={product.images.edges[0].node.url} layout="fill" objectFit="contain" className={styles.image} />    
                                        </div>                         
                                        
                                    </div>                                
                                </div>
                            }

            <section id="product-info" className={styles.product_main}>
                {windowSize > 576 ?
                <>
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
                            <span key={idx} className={styles.tag}> {tag}<span className={styles.comma}>,</span></span>
                        ))}
                    </div>

                    <div className={styles.product_price}>          
                        <span className={styles.dollar}>$</span>
                        <span className={styles.integer}>{amountIntAndDec[0]}</span>
                        <span className={styles.decimals}>.{amountIntAndDec[1]}</span>
                        <span className={styles.currency}>USD</span>
                        {comparedIntAndDec > 0 && <span className={styles.compared_price}>${comparedIntAndDec}</span>}                        
                    </div>

                    <p className={styles.product_description}>
                        {product.description}
                    </p>       
                    
                    <div className={styles.qty_and_cart}>
                        <div className={styles.input_quantity_wrapper}>
                            <label htmlFor="quantity" className={styles.input_label}>QTY</label>

                            <div className={styles.input_container}>
                                <div className={styles.input_quantity_box}>                            
                                    <button className={styles.quantity_button} name="minus" type="button" aria-label="Decrease quantity for Bed One" onClick={handleQty}>
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" className={`${styles.icon} ${styles.icon_minus}`} fill="none" viewBox="0 0 10 2"><path fillRule="evenodd" clipRule="evenodd" d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z" fill="currentColor"></path></svg>
                                    </button>

                                    <input 
                                        className={styles.quantity_input} 
                                        type="number" 
                                        name="quantity" 
                                        id="quantity_input"                                                                                 
                                        aria-label="quantity input" 
                                        min="1"
                                        value={qty}
                                        onChange={(e)=>setQty(e.target.value)}
                                        
                                    />

                                    <button className={styles.quantity_button} name="plus" type="button" aria-label="Increase quantity for Bed On" onClick={handleQty} >
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" className={`${styles.icon} ${styles.icon_plus}`}fill="none" viewBox="0 0 10 10"><path fillRule="evenodd" clipRule="evenodd" d="M1 4.51a.5.5 0 000 1h3.5l.01 3.5a.5.5 0 001-.01V5.5l3.5-.01a.5.5 0 00-.01-1H5.5L5.49.99a.5.5 0 00-1 .01v3.5l-3.5.01H1z" fill="currentColor"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.cart_checkout}>
                            <div className={styles.button_wrapper}>
                                <button type="submit" name="add to cart" aria-label="add to cart" className={styles.add_to_cart_button} onClick={addToCart}>ADD TO CART</button>
                            </div>                        
                        </div>
                    </div>
                    <div className={styles.detail_info}>                                                
                        {productInfoFields.map((item, idx) => {                
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
                </>
                : <>
                <div className={styles.product_info_container}>
                    <span className={styles.product_vendor}>{product.vendor}</span>
                    <h1 className={styles.product_title}>{product.title}</h1>
                    <div className={styles.product_tags}>
                        {product.tags.map((tag, idx) => (
                            <span key={idx} className={styles.tag}> {tag}<span className={styles.comma}>,</span></span>
                        ))}
                    </div>

                    <div className={styles.product_images_container} style={{transform: `translateX(${-100*index}vw)`}}>
                        <div className={styles.thumbnail_container}>
                            {productImages.map((image, idx) => {                                
                                return (
                                    <div key={idx} className={styles.imageWrapper}>
                                        <Image src={image.node.url} layout="fill" objectFit="cover" className={styles.thumbnail} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <ul className={styles.thumbnail_index_container}>
                        {productImages.map((image, idx) => (
                            <li key={idx} className={`${styles.imageWrapper} ${idx === index && styles.current}`} data_index={idx} onClick={changeIndex}>
                                <Image src={image.node.url} layout="fill" objectFit="cover" className={styles.thumbnail} />
                            </li>
                        ))}
                    </ul>
                    

                    <div className={styles.product_price}>          
                        <span className={styles.dollar}>$</span>
                        <span className={styles.integer}>{amountIntAndDec[0]}</span>
                        <span className={styles.decimals}>.{amountIntAndDec[1]}</span>
                        <span className={styles.currency}>USD</span>
                        {comparedIntAndDec > 0 && <span className={styles.compared_price}>${comparedIntAndDec}</span>}                        
                    </div>

                    <p className={styles.product_description}>
                        {product.description}
                    </p>       
                    
                    <div className={styles.qty_and_cart}>
                        <div className={styles.input_quantity_wrapper}>
                            <label htmlFor="quantity" className={styles.input_label}>QTY</label>

                            <div className={styles.input_container}>
                                <div className={styles.input_quantity_box}>                            
                                    <button className={styles.quantity_button} name="minus" type="button" aria-label="Decrease quantity for Bed One" onClick={handleQty}>
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" className={`${styles.icon} ${styles.icon_minus}`} fill="none" viewBox="0 0 10 2"><path fillRule="evenodd" clipRule="evenodd" d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z" fill="currentColor"></path></svg>
                                    </button>

                                    <input 
                                        className={styles.quantity_input} 
                                        type="number" 
                                        name="quantity" 
                                        id="quantity_input"                                                                                 
                                        aria-label="quantity input" 
                                        min="1"
                                        value={qty}
                                        onChange={(e)=>setQty(e.target.value)}
                                        
                                    />

                                    <button className={styles.quantity_button} name="plus" type="button" aria-label="Increase quantity for Bed On" onClick={handleQty} >
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" className={`${styles.icon} ${styles.icon_plus}`}fill="none" viewBox="0 0 10 10"><path fillRule="evenodd" clipRule="evenodd" d="M1 4.51a.5.5 0 000 1h3.5l.01 3.5a.5.5 0 001-.01V5.5l3.5-.01a.5.5 0 00-.01-1H5.5L5.49.99a.5.5 0 00-1 .01v3.5l-3.5.01H1z" fill="currentColor"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.cart_checkout}>
                            <div className={styles.button_wrapper}>
                                <button type="submit" name="add to cart" aria-label="add to cart" className={styles.add_to_cart_button} onClick={addToCart}>ADD TO CART</button>
                            </div>                                     
                        </div>
                    </div>
                    <div className={styles.detail_info}>                                                
                        {productInfoFields.map((item, idx) => {                
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
                </>}          
            </section>                          
        </main>
    )
}

export const getServerSideProps = async ({params}) => {                
    const handle = params.id        
    const res = await fetchProductByHandle(handle)      
        
    const data = res.body.data.product    
    
    return {
        props: {
            productData: data,       
        },
    }
}

export default Proudct