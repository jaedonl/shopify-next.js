import {useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Cart.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { removeProduct, reset, updateQuantity } from '../redux/cartSlice'

const cart = () => {
    const cart = useSelector(state => state.cart)
    const [cartQty, setCartQty] = useState(0)
    const [qty, setQty] = useState()
    const dispatch = useDispatch()

    useEffect(() => {
        cart.products.forEach(item => {
            setCartQty(cartQty += item.qty)
        });
    }, []);

    const handleRemoveProduct = (item) => {
        setCartQty(cartQty -= item.qty)
        dispatch(removeProduct(item))
    }    

    const handleQty = (e, itemQty, idx) => {                      
        dispatch(
            updateQuantity({
                buttonType: e.currentTarget.getAttribute('name'), 
                itemQty: itemQty,
                itemIndex: idx
            })
        )
    }
    
    return (
        <main className={styles.template}>
            <Head>
                <title>JdonL | Cart</title>
                <meta name="description" content="Cart page JdonL" />
                <link rel="icon" href="/favicon.ico" />
            </Head>            
            
            
            <h1 className={styles.page_title}>{ cart.products.length > 0 ? 'Your cart' : 'Your cart is empty'}</h1>
            
            {cart.products.length > 0 && (
            <div className={styles.cart_container}>       
                <div className={styles.item_section}>
                    <div className={styles.cart_header}>
                        <button className={styles.clear_cart} onClick={() => dispatch((reset()))}>Clear cart</button>
                        <div className={styles.cart_qty}>{cartQty} items</div> 
                    </div>                    

                    <div className={styles.cart_items}>                                       
                        {cart.products.map((item, idx) => (
                            <li key={idx} className={styles.list_item}>
                                <div className={styles.item_info}>
                                    <div className={styles.image_wrapper}>
                                        <Image src={item.images.edges[0].node.url} layout="fill" objectFit="cover" className={styles.image} />
                                    </div>

                                    <div className={styles.product_info}>
                                        <h3>{item.title}</h3>
                                        {item.tags.map((tag, idx) => (
                                            <span key={idx} className={styles.tag}> {tag}<span className={styles.comma}>,</span></span>
                                        ))}
                                        <p className={styles.product_dimensions}>{item.dimensions.value}</p>
                                        <p className={styles.product_price}>${Number(item.variants.nodes[0].priceV2.amount).toFixed(2)}</p>

                                        <div className={styles.input_quantity_wrapper}>
                                            <label for="quantity" className={styles.input_label}>QTY</label>

                                            <div className={styles.input_container}>
                                                <div className={styles.input_quantity_box}>                            
                                                    <button className={styles.quantity_button} name="minus" type="button" aria-label="Decrease quantity for Bed One" onClick={(e) => handleQty(e, item.qty, idx)}
                                                    ><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" className={`${styles.icon} ${styles.icon_minus}`} fill="none" viewBox="0 0 10 2"><path fill-rule="evenodd" clip-rule="evenodd" d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z" fill="currentColor"></path></svg>
                                                    </button>

                                                    <input 
                                                        className={styles.quantity_input} 
                                                        type="number" 
                                                        name="quantity" 
                                                        id="quantity_input"                                         
                                                        defaultValue="1" 
                                                        aria-label="quantity input" 
                                                        min="1"
                                                        value={item.qty}
                                                        onChange={(e)=>setQty(e.target.value)}
                                                        
                                                    />

                                                    <button className={styles.quantity_button} name="plus" type="button" aria-label="Increase quantity for Bed On" onClick={(e) => handleQty(e, item.qty, idx)} 
                                                    ><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation" className={`${styles.icon} ${styles.icon_plus}`}fill="none" viewBox="0 0 10 10"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 4.51a.5.5 0 000 1h3.5l.01 3.5a.5.5 0 001-.01V5.5l3.5-.01a.5.5 0 00-.01-1H5.5L5.49.99a.5.5 0 00-1 .01v3.5l-3.5.01H1z" fill="currentColor"></path></svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>     

                                    
                                </div>          

                                <div className={styles.item_subtotal}>
                                    <span className={styles.item_total}>${Number(item.variants.nodes[0].priceV2.amount).toFixed(2) * item.qty}</span>

                                    <button name="remove" type="button" aria-label="remove item" className={styles.remove_item}
                                    onClick={() => handleRemoveProduct(item)}
                                    >Remove</button>                                    
                                </div>                  
                            </li>                            
                        ))}                                          
                    </div>                      
                </div>                      
                

                <div className={styles.cart_subtotal}>
                    <div className={styles.order_summary}>
                        <strong>Order summary</strong>
                    </div>
                    
                    <div className={styles.summary_line}>
                        <span>Subtotal</span>
                        <span className={styles.cart_total}>${Number(cart.total).toFixed(2)}</span>
                    </div>

                    <div className={styles.summary_line}>
                        <span>Tax</span>
                        <span>Calculated at checkout</span>
                    </div>            

                    <div className={styles.summary_line}>
                        <span>Shipping</span>
                        <span>Calculated at checkout</span>
                    </div>            

                    <div className={styles.final_price}>
                        <span>Total</span>
                        <span className={styles.cart_total}>${Number(cart.total).toFixed(2)}</span>
                    </div>


                    <div className={styles.cart_checkout}>
                        <div className={styles.button_wrapper}>
                            <button type="submit" name="add to cart" aria-label="add to cart" className={styles.add_to_cart_button}
                            //  onClick={checkOutHandler}
                            >
                                Checkout
                            </button>
                        </div>                        
                    </div>
                </div>
            </div>
            )}                        
        </main>
    )
}

export default cart