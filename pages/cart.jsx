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
        <div>cart</div>
    )
}

export default cart