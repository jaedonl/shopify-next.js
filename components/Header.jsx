import { useEffect, useState, useCallback } from 'react'
import Image from "next/image";
import styles from "../styles/Header.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {Search, PersonOutlineOutlined, ShoppingBagOutlined, Menu, Close} from '@mui/icons-material';
import axios from 'axios';
import { useRouter } from 'next/router'
import SearchBox from './SearchBox';

const Header = () => {   
    const [menus, setMenus] = useState([])    
    const [isMenuOn, setIsMenuOn] = useState(false)
    const [isSearchOn, setIsSearchOn] = useState(false)
    const [isMobileMenu, setIsMobileMenu] = useState(false)
    const [y, setY] = useState(window.pageYOffset || document.documentElement.scrollTop);
    const [cartPop, setCartPop] = useState(false)
    const cart = useSelector(state => state.cart)
    const router = useRouter()

    const handleNavigation = useCallback(() => {
        y > window.scrollY  ? document.querySelector(`.${styles.header}`).style.top = '0' //scrolling up
                            : document.querySelector(`.${styles.header}`).style.top = '-4.5rem' //scrolling down        
        setY(window.scrollY)
    }, [y]);    

    const handleSearch = () => setIsSearchOn(!isSearchOn)

    useEffect(() => {
        window.addEventListener("scroll", handleNavigation);
        return () => {
          window.removeEventListener("scroll", handleNavigation);
        };
    }, [handleNavigation]);


    useEffect(() => {
        if (isMobileMenu ) {
            setIsMenuOn(true)
            document.querySelector(`.${styles.collection_nav}`).style.left = "0"
            setIsMobileMenu(true)
        } else {
            document.querySelector(`.${styles.collection_nav}`).style.left = "-100vw"
            setIsMobileMenu(false)
        }                
    }, [isMobileMenu, isMenuOn])


    useEffect(() => {
        const fetchMenu = async () => {
            const res = await axios.get('/api/menus')            
            setMenus(res.data.body.data.menu.items[0].items)
        }
        fetchMenu()
    }, [])


    useEffect(() => {
        if (isSearchOn) {
            document.querySelector('main').classList.add('blur')        
            document.body.style.overflow = "hidden";
        } else {
            document.querySelector('main').classList.remove('blur')        
            document.body.style.overflow = "auto";
        }        
    }, [isSearchOn])   
    
    useEffect(() => {        
        setIsMenuOn(false)
        setIsMobileMenu(false)
        setIsSearchOn(false)
        setCartPop(false)
    }, [router])    

    return (
        <header className={styles.header}>
            <nav className={styles.header_nav}>
                <div className={styles.hamburger_menu} onClick={()=>setIsMobileMenu(true)}><Menu/></div>

                <h1 className={styles.home_link}>
                    <Link href="/">JdonL</Link>
                </h1>                

                <nav className={styles.collection_nav}>  
                    <button type='button' aria-label='close button' onClick={()=>setIsMobileMenu(false)} className={styles.mobile_menu_close}><Close/></button>                                 
                    <ul className={styles.collection_ul}>                        
                        <li className={`${styles.menu_item} ${styles.parent_menu}`} onMouseEnter={()=>setIsMenuOn(true)} onMouseLeave={() => setIsMenuOn(false)}>
                            { !isMobileMenu ? <span>Shop</span> : <span>JdonL</span>}
                            { isMenuOn &&
                            <div className={styles.navigation_grid}>
                                <ul className={styles.nested_nav}>
                                    <li className={styles.child_menu}>
                                        <Link href="/collections/all">
                                            <a className={styles.child_link}>Shop All</a>
                                        </Link>
                                    </li>
                                    {menus.map((menu, idx) => {                
                                        if (menu.items.length > 0) {
                                            return (
                                                <li key={idx} className={styles.child_menu} name={menu.title}>
                                                    <Link href={`/collections/${menu.title.toLowerCase()}`}>
                                                        <a className={styles.child_link}>{menu.title}</a>
                                                    </Link>          


                                                    <ul className={styles.grand_child}>
                                                        {menu.items.map((item, idx) => {
                                                            return (
                                                                <li key={idx}>
                                                                    <Link href={`/collections/${menu.title.toLowerCase()}?category=${item.title.toLowerCase()}`}>
                                                                        <a>{item.title}</a>
                                                                    </Link>
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </li>
                                            )                                        
                                        } else {
                                            return (                                        
                                                <li className={styles.child_menu}>
                                                    <Link href={`/collections/${menu.title.toLowerCase()}`}>
                                                        <a className={styles.child_link}>{menu.title}</a>
                                                    </Link>
                                                </li>
                                            )
                                        }
                                    })}                                
                                </ul>                                      
                            </div> 
                            }
                        </li>

                        <li className={styles.menu_item}><Link href="/collections">Collections</Link></li>
                        <li className={styles.menu_item}><Link href="#">About</Link></li>                        
                    </ul>
                </nav>
                
                <nav className={styles.right_nav}>
                    <ul className={styles.right_ul}>
                        <li>                            
                            <Search onClick={() => setIsSearchOn(!isSearchOn)} />                                                        
                        </li>
                        <li>
                            <Link href="#">
                                <PersonOutlineOutlined />                                
                            </Link>
                        </li>
                        <li>
                            <Link href="/cart">
                                <ShoppingBagOutlined />                                
                            </Link>
                            
                            <span className={styles.cart_qty}>{cart.quantity}</span>
                            
                        </li>
                    </ul>
                </nav>

                
            </nav>

            { isSearchOn && <SearchBox setIsSearchOn={handleSearch} isOn={isSearchOn} /> }
        </header>
    )
}

export default Header

