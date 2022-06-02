import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/ProductCard.module.scss'

const ProductCard = ({key, handle, imgUrl, title, productType, tags, integer, decimals, currency}) => {
  return (
    <article key={key} className={styles.product_item}>
        <Link href={`/product/${handle}`} passHref>
            <a>
                <div className={styles.image_wrapper}>
                    <Image src={imgUrl} layout="fill" objectFit="contain" className={styles.image} />    
                </div>
                
                <h2 className={styles.product_title}>{title}</h2>
                <p className={styles.product_type_tags}>
                    <span className={styles.tags}>{productType},</span> 
                    {tags.map((tag, idx) => (
                        <span key={idx} className={styles.tags}> {tag}<span className={styles.comma}>,</span></span>
                    ))}
                </p>                                    
                <span className={styles.product_price}>          
                    <span className={styles.dollar}>$</span>
                    <span className={styles.integer}>{integer}</span>
                    <span className={styles.decimals}>.{decimals}</span>
                    <span className={styles.currency}>{currency}</span>
                </span>                  
            </a>
        </Link>                  
    </article>
  )
}

export default ProductCard