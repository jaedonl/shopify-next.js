import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { fetchCollectionInfo } from '../../lib/shopify'
import styles from '../../styles/Collection.module.scss'
import ProductCard from '../../components/ProductCard'
import FilterListIcon from '@mui/icons-material/FilterList';

const Collection = ({ collectionInfo }) => {
    const [collection, setCollection] = useState(collectionInfo)    
    const [products, setProducts] = useState([collectionInfo.products.edges])
    const [productsByQuery, setProductsByQuery] = useState([collectionInfo.products.edges])
    const router = useRouter()          
    const {query} = router    

    useEffect(() => {
        setCollection(collectionInfo)                
        setProducts([collectionInfo.products.edges]) 

        if (query.category) { 
            setProducts(productsByQuery)               
            setProducts([
                productsByQuery[0].filter(item => (item.node.materials.value.toLowerCase() === query.category && 
                item.node.productType.toLowerCase() === query.id))
            ])
        }              
    }, [router]) 

    const handleSort = (e) => {
        if (e.target.value === "low-high") {                      
            setProducts([            
                products[0].sort((a, b) => Number(a.node.variants.edges[0].node.priceV2.amount) - Number(b.node.variants.edges[0].node.priceV2.amount))
            ])            
        } 
        else if (e.target.value === "high-low") {
            setProducts([            
                products[0].sort((a, b) => Number(b.node.variants.edges[0].node.priceV2.amount) - Number(a.node.variants.edges[0].node.priceV2.amount))
            ])        
        } 
        else if (e.target.value === "name") {
            setProducts([
                products[0].sort((a, b) => (a.node.title > b.node.title) ? 1 : -1)
            ])            
        }
        else if (e.target.value === "newest") {
            setProducts([            
                products[0].sort((a, b) => (b.node.createdAt > a.node.createdAt) ? 1 : -1)
            ])
        }                 
    }

    
    return (
        <main className={styles.template}>
            <Head>
                <title>JdonL | {collection.title}</title>
                <meta name="description" content={collection.description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <nav className={styles.breadcrumb}>
                <ul>                        
                    <li><Link href="/collections"><a>collections</a></Link><span>/</span></li>
                    <li>{collection.title}</li>
                </ul>
            </nav>

            <section id="collection-info" className={styles.collection_header}>                
                <div className={styles.collection_header_flex}>
                    <div className={styles.collection_info}>
                        <h1 className={styles.page_title}>{collection.title}</h1>
                        <p className={styles.page_description}>{collection.description}</p>
                    </div>                    

                    <div className={styles.collection_banner}>
                        <Image src={collection.image.url} layout="fill" objectFit="cover" />
                    </div>
                </div>                
            </section>

            <section id="collection-products" className={styles.collection_main}>
                <div className={styles.sort_filter_wrapper}>
                    <div className={styles.sorting_box}>                        
                        <select name="sort_options" id="sort_options" onChange={handleSort}>                        
                            <option value="newest" selected>Newest</option>  
                            <option value="low-high">Price: low to high</option>
                            <option value="high-low">Price: high to low</option>
                            <option value="name">Name</option>                                                      
                        </select>
                    </div>       

                    <div className={styles.filter_box}>
                        <button><FilterListIcon/><span>Filter</span></button>                        
                    </div>             
                </div>
                
                <div className={styles.product_list}>
                    {products[0].map((product, idx) => {     
                        let intAndDec = Number(product.node.variants.edges[0].node.priceV2.amount).toFixed(2).split('.')
                        return (
                            <ProductCard 
                                key={idx}
                                handle={product.node.handle} 
                                imgUrl={product.node.variants.edges[0].node.image.url} 
                                title={product.node.title} 
                                productType={product.node.productType} 
                                tags={product.node.tags} 
                                integer={intAndDec[0]} 
                                decimals={intAndDec[1]} 
                                currency={product.node.variants.edges[0].node.priceV2.currencyCode} 
                            />
                        )                        
                    })}
                </div>
            </section>
        </main>
    )
}

export const getServerSideProps = async ({params}) => {            
    const handle = params.id        
    const res = await fetchCollectionInfo(handle)        

    const collectionInfo = res.body.data.collection    
    collectionInfo.id = collectionInfo.id.split('/').pop()        
    
    return {
        props: {
            collectionInfo: collectionInfo,            
        },
    }
}

export default Collection