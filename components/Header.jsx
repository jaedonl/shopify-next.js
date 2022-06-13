import { useEffect, useState } from 'react'
import Image from "next/image";
import styles from "../styles/Header.module.scss";
import Link from "next/link";
import { useSelector } from "react-redux";
import {Search, PersonOutlineOutlined, ShoppingBagOutlined} from '@mui/icons-material';
import axios from 'axios';
import { useRouter } from 'next/router'
import SearchBox from './SearchBox';

const Header = () => {   
    const [menus, setMenus] = useState([])
    const [isMenuOn, setIsMenuOn] = useState(false)
    const [isSearchOn, setIsSearchOn] = useState(false)
    const cart = useSelector(state => state.cart)
    const router = useRouter()

    useEffect(() => {
        const fetchMenu = async () => {
            const res = await axios.get('/api/menus')            
            setMenus(res.data.body.data.menu.items[0].items)
        }
        fetchMenu()
    }, [])

    useEffect(() => {        
        setIsMenuOn(false)
        setIsSearchOn(false)
    }, [router])

    const handleSearch = () => {        
        setIsSearchOn(!isSearchOn)                
    }

    useEffect(() => {
        if (isSearchOn) {
            document.querySelector('main').classList.add('blur')        
            document.body.style.overflow = "hidden";
        } else {
            document.querySelector('main').classList.remove('blur')        
            document.body.style.overflow = "auto";
        }        
    }, [isSearchOn])

    return (
        <header className={styles.header}>
            <nav className={styles.header_nav}>
                <h1 className={styles.home_link}>
                    <Link href="/">JdonL</Link>
                </h1>                

                <nav className={styles.collection_nav}>                    
                    <ul className={styles.collection_ul}>
                        <li className={`${styles.menu_item} ${styles.parent_menu}`} onMouseEnter={() => setIsMenuOn(true)} onMouseLeave={() => setIsMenuOn(false)}>
                            <span>Shop</span>
                            { isMenuOn &&
                                <ul className={styles.nested_nav}>
                                    <li className={styles.child_menu}>
                                        <Link href="/collections/all">
                                            <a className={styles.child_link}>Shop All</a>
                                        </Link>
                                    </li>
                                    {menus.map((menu, idx) => {
                                        if (menu.items.length > 0) {
                                            return (
                                                <li className={styles.child_menu}>
                                                    <Link href={`/collections/${menu.title.toLowerCase()}`}>
                                                        <a className={styles.child_link}>{menu.title}</a>
                                                    </Link>                                                
                                                    <ul>
                                                        {menu.items.map((item, idx) => (
                                                            <li key={idx}>
                                                                <Link href={`/collections/${menu.title.toLowerCase()}?category=${item.title.toLowerCase()}`}>
                                                                    <a>– {item.title}</a>
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                            )                                        
                                        } else {
                                            return (                                        
                                                <li className={styles.child_menu}>
                                                    <Link href={`/collections/${menu.title.toLowerCase()}`}>
                                                        <a className={styles.menu_link}>{menu.title}</a>                                      
                                                    </Link>
                                                </li>
                                            )
                                        }                                                                           
                                    })}                                
                                </ul>                                
                            }
                        </li>

                        <li className={styles.menu_item}><Link href="/collections/beds">Beds</Link></li>
                        <li className={styles.menu_item}><Link href="/collections/lighting">Lights</Link></li>
                        <li className={styles.menu_item}><Link href="/collections/tables">Tables</Link></li>
                    </ul>
                </nav>
                
                <nav className={styles.right_nav}>
                    <ul className={styles.right_ul}>
                        <li>                            
                            <Search onClick={() => setIsSearchOn(!isSearchOn)} />                                                        
                        </li>
                        <li>
                            <Link href="/login">
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

