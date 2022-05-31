import Image from "next/image";
import styles from "../styles/Header.module.scss";
import Link from "next/link";

const Header = () => {   
    
    return (
        <header className={styles.header}>
            <nav className={styles.header_nav}>
                <h1 className={styles.home_link}>
                    <Link href="/">JdonL</Link>
                </h1>                

                <nav className={styles.collection_nav}>
                    <ul className={styles.collection_ul}>
                        <li>
                            <Link href="/collections/all">Shop</Link>  
                            <ul className={styles.nested_nav}>
                                <li><Link href="/collections/furniture">Furniture</Link></li>
                                <li><Link href="/collections/lighting">Lights</Link></li>
                                <li><Link href="/collections/decor">Decor</Link></li>
                            </ul>
                        </li>

                        <li><Link href="/collections/furniture">Furniture</Link></li>
                        <li><Link href="/collections/lighting">Lights</Link></li>
                        <li><Link href="/collections/decor">Decor</Link></li>
                    </ul>
                </nav>
                
                <nav className={styles.right_nav}>
                    <ul className={styles.right_ul}>
                        <li>
                            <input type="text" placeholder="search" />
                        </li>
                        <li>
                            <Link href="/login">Login</Link>
                        </li>
                        <li>
                            <Link href="/cart">Cart</Link>
                        </li>
                    </ul>
                </nav>
            </nav>
        </header>
    )
}

export default Header