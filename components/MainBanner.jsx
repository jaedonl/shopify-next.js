import { useState, useEffect } from "react";
import Image from 'next/image'
import styles from "../styles/MainBanner.module.scss";
import Link from 'next/link'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

const MainBanner = ({ promotions }) => {
    const [index, setIndex] = useState(0)
    const [bannerInfo, setBannerInfo] = useState(promotions)

    useEffect(() => {
        document.querySelector(`.${styles.banner_slider} .${styles.wrapper}`).style.width = `${bannerInfo.length * 100}vw`        
    }, [bannerInfo])

    const handleArrow = (direction) => {
        if (direction === 'left') setIndex(index !== 0 ? index-1 : bannerInfo.length - 1)        
        if (direction === 'right') setIndex(index !== bannerInfo.length - 1 ? index + 1 : 0)        
    }    

    return (
        <section className={styles.banner_slider}>
            <div className={styles.arrowContainer} style={{ left: "0", fontSize: 50 }} onClick={()=>handleArrow("left")}>
                <ArrowBackIosNew />
            </div>  
            <div className={styles.arrowContainer} style={{ right: "0", fontSize: 50 }} onClick={()=>handleArrow("right")}>
                <ArrowForwardIos />
            </div>    

            <div className={styles.wrapper} style={{transform: `translateX(${-100*index}vw)`}}>            
                {bannerInfo.map((item, idx) => {      
                    const amountIntAndDec = Number(item.node.variants.edges[0].node.priceV2.amount).toFixed(2).split('.')   
                    const comparedIntAndDec = Number(item.node.compareAtPriceRange.maxVariantPrice.amount).toFixed(2)
                    
                    return (          
                        <div key={idx} className={styles.imgContainer}>
                            <Image src={item.node.images.edges[0].node.url} key={idx} alt="featured banner" layout="fill" objectFit="cover" className={styles.image} />

                            <div className={styles.right_grid}>                                           
                                <div className={styles.banner_grid}>
                                    <div className={styles.banner_grid_wrapper}>
                                        <h2 className={styles.product_title}>{item.node.title}</h2>
                                        <p className={styles.product_tags}>
                                            {item.node.tags.map((tag, idx) => (
                                                <span key={idx} className={styles.product_tag}>{tag}<span className={styles.comma}>, </span></span>                      
                                            ))}
                                        </p>                                                
                                        <div className={styles.product_price}>          
                                            <span className={styles.dollar}>$</span>
                                            <span className={styles.integer}>{amountIntAndDec[0]}</span>
                                            <span className={styles.decimals}>.{amountIntAndDec[1]}</span>
                                            <span className={styles.currency}>USD</span>
                                            
                                            <span className={styles.compared_price}>${comparedIntAndDec}</span>                       
                                        </div>
                                        
                                        <div className={styles.link_wrapper}>
                                            <Link href={`/product/${item.node.handle}`}>
                                                <button className={styles.see_detail}>See detail</button>
                                            </Link>
                                        </div>
                                    </div>
                                    
                                </div>      

                                <div className={styles.banner_grid}>
                                    <div className={styles.banner_grid_wrapper}>
                                        <h2 className={styles.product_title}>All {item.node.productType}</h2>
                                        
                                        <div className={styles.link_wrapper}>
                                            <Link href={`/collections/${item.node.productType.toLowerCase()}`}>
                                                <button className={styles.see_detail}>Go to Collection</button>
                                            </Link>
                                        </div>
                                    </div>
                                    
                                </div>                             
                            </div>   
                        </div>
                    )
                })}   
                                        
            </div>
        </section>
    )
}

export default MainBanner