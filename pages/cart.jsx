import {useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Cart.module.scss'
import { useDispatch, useSelector } from "react-redux";

const cart = () => {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()    

    console.log(cart);
    
    return (
        <div className={styles.template}>
            <Head>
                <title>JdonL | Cart</title>
                <meta name="description" content="Cart page JdonL" />
                <link rel="icon" href="/favicon.ico" />
            </Head>            

            <div className={styles.cart_container}>
                <div className={styles.cart_items}>
                    <h1>Your Cart</h1>

                    <div className={styles.item_container}>
                        <div></div>
                        {cart.products.map((item, idx) => (
                            <li></li>
                            
                        ))}
                    </div>                    
                </div>

                <div className={styles.cart_subtotal}>
                    
                </div>
            </div>
                        
        </div>
    )
}

export default cart