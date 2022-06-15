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
    const [childMenus, setChildMenus] = useState([])
    const [isMenuOn, setIsMenuOn] = useState(true)
    const [isSearchOn, setIsSearchOn] = useState(false)
    const cart = useSelector(state => state.cart)
    const router = useRouter()

    const handleSearch = () => setIsSearchOn(!isSearchOn)

    const showCategory = async (e) => {
        setChildMenus([])
        const res = await axios.get('/api/childmenus', {
            params: { handle: e.currentTarget.getAttribute('name').toLowerCase() }}
        )
        var childList = res.data.body.data.collection            
        var material = childList.material?.value.replace(/[\[\]']+/g,'').replaceAll('"', '').split(',')
        var size = childList.size?.value.replace(/[\[\]']+/g,'').replaceAll('"', '').split(',')
        var style = childList.style?.value.replace(/[\[\]']+/g,'').replaceAll('"', '').split(',')        

        var x = []
        var materialObject = new Object();
        materialObject.material = material
        
        var styleObject = new Object();
        styleObject.style = style

        var sizeObject = new Object();
        sizeObject.size = size        

        x.push(materialObject, styleObject, sizeObject)        

        setChildMenus(x)

        
        // setChildMenus(arr => [...arr, material])  
        // setChildMenus(arr => [...arr, size])  
        // setChildMenus(arr => [...arr, style])  
    }
        

    useEffect(() => {
        const fetchMenu = async () => {
            const res = await axios.get('/api/menus')            
            setMenus(res.data.body.data.menu.items[0].items)
        }
        fetchMenu()
    }, [])

    useEffect(() => {        
        setIsMenuOn(true)
        setIsSearchOn(false)
    }, [router])    

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
        

        childMenus.forEach((child, idx) => {   
            var x = child.material  
            console.log(x);
        });
    }, [childMenus])    

    return (
        <header className={styles.header}>
            <nav className={styles.header_nav}>
                <h1 className={styles.home_link}>
                    <Link href="/">JdonL</Link>
                </h1>                

                <nav className={styles.collection_nav}>                    
                    <ul className={styles.collection_ul}>
                        <li className={`${styles.menu_item} ${styles.parent_menu}`} onMouseEnter={() => setIsMenuOn(true)} onMouseLeave={() => setIsMenuOn(true)}>
                            <span>Shop</span>
                            { isMenuOn &&
                            <div className={styles.navigation_grid}>
                                <ul className={styles.nested_nav}>
                                    <li className={styles.child_menu}>
                                        <Link href="/collections/all">
                                            <a className={styles.child_link}>Shop All</a>
                                        </Link>
                                    </li>
                                    {menus.map((menu, idx) => {                
                                        return ( 
                                            <li key={idx} className={styles.child_menu} name={menu.title} onMouseOver={showCategory}>
                                                <Link href={`/collections/${menu.title.toLowerCase()}`}>
                                                    <a className={styles.child_link}>{menu.title}</a>
                                                </Link>                                                          
                                            </li>         
                                        )              
                                        // if (menu.items.length > 0) {
                                        //     return (
                                        //         <li key={idx} className={styles.child_menu} name={menu.title} onMouseOver={showCategory}>
                                        //             <Link href={`/collections/${menu.title.toLowerCase()}`}>
                                        //                 <a className={styles.child_link}>{menu.title}</a>
                                        //             </Link>          


                                        //             <ul className={styles.grand_child}>
                                        //                 {menu.items.map((item, idx) => (
                                        //                     <li key={idx}>
                                        //                         <Link href={`/collections/${menu.title.toLowerCase()}?category=${item.title.toLowerCase()}`}>
                                        //                             <a>– {item.title}</a>
                                        //                         </Link>
                                        //                     </li>
                                        //                 ))}
                                        //             </ul>
                                        //         </li>
                                        //     )                                        
                                        // } else {
                                        //     return (                                        
                                        //         <li className={styles.child_menu}>
                                        //             <Link href={`/collections/${menu.title.toLowerCase()}`}>
                                        //                 <a className={styles.menu_link}>{menu.title}</a>                                      
                                        //             </Link>
                                        //         </li>
                                        //     )
                                        // }                                                                           
                                    })}                                
                                </ul>                  
                                <ul className={styles.grand_child}>
                                    { childMenus.length > 0 && childMenus.map((child, idx) => {          
                                        // console.log(child);                           
                                        if (Object.keys(child))   

                                        return (
                                            <li>
                                                <h3>{Object.keys(child)}</h3>
                                                
                                                <ul>
                                                    {/* {child && childMenus.child.map(item => (
                                                        // <li>{childMenus.child}</li>
                                                        123
                                                    ))} */}
                                                </ul>
                                            </li>
                                        )
                                    })}
                                </ul>             
                            </div> 
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

