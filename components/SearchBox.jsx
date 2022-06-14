import {useState, useEffect} from 'react'
import styles from "../styles/SearchBox.module.scss";
import {Search, Close} from '@mui/icons-material';
import axios from 'axios';
import Link from 'next/link'
import ProductCard from './ProductCard';

const SearchBox = ({setIsSearchOn, isOn}) => {    
    const [allProducts, setAllProducts] = useState([])
    const [keyword, setKeyword] = useState('')
    const [filteredProducts, setFilterProducts] = useState([])        
    
    useEffect(() => {                            
        const fetchAllProducts = async () => {            
            const res = await axios.get('/api/products', { params: { handle: "all"}})
            const products = res.data.body.data.collection.products.edges            
            setAllProducts(products)            
        }        
        fetchAllProducts()
        document.querySelector(`.${styles.search_input}`).focus()             
    }, [isOn])

    const handleInput = (e) => {                  
        setKeyword(e.currentTarget.value)      
        const filtered = allProducts.filter(item => item.node.title.toLowerCase().includes(e.currentTarget.value))        
        setFilterProducts(filtered)     
        if (e.currentTarget.value === "") setFilterProducts([])   
    }           

    return (
        <div className={styles.search_box}>
            <div className={styles.search_wrapper}>
                <Search/>
                <input type="search" className={styles.search_input} name="search" placeholder="Search products" aria-label="Search products" onChange={handleInput} />
                <Close className={styles.search_close} onClick={() => setIsSearchOn(false)} />
            </div>        

            <div className={styles.search_result}>                 
                <h2 className={styles.search_title}>Search result: ({filteredProducts.length} items)</h2> 
                <ul className={styles.result_list}>                    
                    {filteredProducts?.map((product, idx) => {
                        let intAndDec = Number(product.node.variants.edges[0].node.priceV2.amount).toFixed(2).split('.')
                        let comparedIntAndDec = Number(product.node.compareAtPriceRange.maxVariantPrice.amount).toFixed(2)
                        return (
                            <li key={idx} className={styles.list_item}>
                                <Link href={`/product/${product.node.handle}`}>
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
                                </Link>     
                            </li>
                        )
                    })}
                </ul>                 
            </div>
        </div>
    )
}

export default SearchBox    