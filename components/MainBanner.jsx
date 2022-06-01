import { useState } from "react";
import Image from 'next/image'
import styles from "../styles/MainBanner.module.scss";

const MainBanner = () => {
    const [index, setIndex] = useState(0)

    const images = [
        '/assets/home_banner_1.webp',
        '/assets/home_banner_2.webp'
    ]    

    const handleArrow = (direction) => {
        if (direction === 'left') setIndex(index !== 0 ? index-1 : images.length - 1)        
        if (direction === 'right') setIndex(index !== images.length - 1 ? index + 1 : 0)        
    }    

    return (
        <section className={styles.container}>
            <div className={styles.arrowContainer} style={{ left: 0 }} onClick={()=>handleArrow("left")}>
                <Image src="/assets/arrowl.png" alt="left arrow" layout="fill" objectFit="contain" />
            </div>  
            <div className={styles.arrowContainer} style={{ right: 0 }} onClick={()=>handleArrow("right")}>
                <Image src="/assets/arrowr.png" alt="left arrow" layout="fill" objectFit="contain" />
            </div>    

            <div className={styles.wrapper} style={{transform: `translateX(${-100*index}vw)`}}>
                {images.map((image, idx) => (                    
                    <div key={idx} className={styles.imgContainer}>
                        <Image src={image} key={idx} alt="featured banner" layout="fill" objectFit="cover" />
                    </div>
                ))}         
            </div>
        </section>
    )
}

export default MainBanner