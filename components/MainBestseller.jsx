import {useState} from 'react'
import styles from '../styles/MainBestseller.module.scss'
import Link from 'next/link';
import ProductCard from './ProductCard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const MainBestseller = ({bestseller}) => {
    const [best, setBest] = useState([bestseller.products.edges])        
    
    return (
        <section className={styles.container}>
            <div className={styles.bestseller}>
                <div className={styles.header}>
                    <h2>Bestseller</h2>
                    <Link href='/collections/bestseller'>
                        <a>
                            <span>More Bestseller</span>
                            <ArrowForwardIcon/>
                        </a>                    
                    </Link>
                </div>                

                <div className={styles.product_list}>
                    {best[0].slice(0, 5).map((product, idx) => {     
                        let intAndDec = Number(product.node.variants.edges[0].node.priceV2.amount).toFixed(2).split('.')
                        let comparedIntAndDec = Number(product.node.compareAtPriceRange.maxVariantPrice.amount).toFixed(2)    

                        return (
                            <ProductCard 
                                key={idx}
                                handle={product.node.handle} 
                                imgUrl={product.node.variants.edges[0].node.image.url} 
                                title={product.node.title} 
                                productType={product.node.productType} 
                                keywords={product.node.keywords}
                                integer={intAndDec[0]} 
                                decimals={intAndDec[1]} 
                                currency={product.node.variants.edges[0].node.priceV2.currencyCode} 
                                comparedPrice={comparedIntAndDec}
                            />
                        )                        
                    })}
                </div>
            </div>        
        </section>
    )
}

export default MainBestseller