import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.container}>
        <div className={styles.footer_wrapper}>
            <div className={styles.footer_box}>
                <h3>Join our family</h3>
                <p>Bring your ideas to life with special discounts, inspiration, and lots of good things in store. It's all free.</p>

                <Link href="/login">See more</Link>
            </div>
            
            <div className={styles.footer_box}>
                <h3>Help</h3>
                <nav>
                    <ul>
                        <li><Link href="/customer-service">Customer service</Link></li>
                        <li><Link href="/faq">FAQ</Link></li>
                        <li><Link href="/my-orders">My orders</Link></li>
                        <li><Link href="/contact-us">Contact us</Link></li>
                        <li><Link href="/return-policy">Return policy</Link></li>
                        <li><Link href="/warranties">Warranties</Link></li>
                        <li><Link href="/feedback">Feedback</Link></li>
                    </ul>
                </nav>
            </div>

            <div className={styles.footer_box}>            
                <h3>About JdonL</h3>
                <nav>
                    <ul>
                        <li><Link href="/about-us">This is JdonL</Link></li>
                        <li><Link href="/careers">Careers</Link></li>
                        <li><Link href="/newsroom">Newsroom</Link></li>
                        <li><Link href="/parners">Parners</Link></li>
                    </ul>
                </nav>
            </div>

            <div className={styles.footer_box}>            
                <h3>Legal</h3>
                <nav>
                    <ul>
                        <li><Link href="/privacy-policy">Privacy policy</Link></li>
                        <li><Link href="/terms-and-condition">Terms and conditions</Link></li>                    
                    </ul>
                </nav>
            </div>                      
        </div>
    </footer>
  )
}

export default Footer;