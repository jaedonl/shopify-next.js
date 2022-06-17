import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { fetchCollectionInfo, fetchCollectionMetafields } from '../../lib/shopify'
import styles from '../../styles/Collection.module.scss'
import ProductCard from '../../components/ProductCard'
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

const Collection = ({ collectionInfo, categories, handle }) => {
    const [collection, setCollection] = useState(collectionInfo)    
    const [products, setProducts] = useState([collectionInfo.products.edges])
    const [isFilterOn, setIsFilterOn] = useState(false)
    const router = useRouter()          
    const {query} = router        
       
    // var material = categories.material?.value.replace(/[\[\]']+/g,'').replaceAll('"', '').split(',')
    // var size = categories.size?.value.replace(/[\[\]']+/g,'').replaceAll('"', '').split(',')
    // var style = categories.style?.value.replace(/[\[\]']+/g,'').replaceAll('"', '').split(',')            

    useEffect(() => {
        setIsFilterOn(false)
        setCollection(collectionInfo)                
        setProducts([collectionInfo.products.edges]) 
        
        if (query.category) {       
            if (handle !== 'all') {
                setProducts([
                    [collectionInfo.products.edges][0].filter(item => (                                                        
                        item.node.productType.toLowerCase() === query.id) &&
                        item.node.keywords.value.split(', ').includes(query.category)
                    )
                ])   
            } else {
                setProducts([
                    [collectionInfo.products.edges][0].filter(item =>                                                                           
                        item.node.keywords.value.split(', ').includes(query.category)
                    )
                ])   
            }
                     
        }       
    }, [router]) 

    useEffect(() => {
        {isFilterOn === true
            ? document.querySelector(`.${styles.filter_list}`).style.left = "0"
            : document.querySelector(`.${styles.filter_list}`).style.left = "-100%"
        }
    }, [isFilterOn])


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
                            <option value="newest">Newest</option>  
                            <option value="low-high">Price: low to high</option>
                            <option value="high-low">Price: high to low</option>
                            <option value="name">Name</option>                                                      
                        </select>
                    </div>       

                    <div className={styles.filter_box}>
                        <button onClick={() => setIsFilterOn(true)}><FilterListIcon/><span>Filter</span></button>                        
                    </div>           

                    {/* { isFilterOn && */}
                        <div className={styles.filter_list}>                        
                            <div className={styles.filter_wrapper}>
                                <h3 className={styles.filter_title}>Filter:</h3>
                                <button type='button' aria-label='close button' onClick={() => setIsFilterOn(false)} className={styles.filter_close}><CloseIcon/></button>
                                { categories.material && <>
                                    <h3 className={styles.filter_key}>Material</h3>
                                    <ul>
                                        {categories.material?.value.replace(/[\[\]']+/g,'').replaceAll('"', '').split(',').map((item, idx) => {
                                            return (
                                                <li><Link href={`/collections/${handle}?category=${item}`}><a>{item}</a></Link></li>
                                            )
                                        })}                                    
                                    </ul></>                                    
                                }
                                { categories.style && <>
                                    <h3 className={styles.filter_key}>Style</h3>
                                    <ul>                                    
                                        {categories.style?.value.replace(/[\[\]']+/g,'').replaceAll('"', '').split(',').map((item, idx) => {
                                            return (
                                                <li><Link href={`/collections/${handle}?category=${item}`}><a>{item}</a></Link></li>
                                            )
                                        })}                                    
                                    </ul></>
                                }
                                { categories.size && <>
                                    <h3 className={styles.filter_key}>Size</h3>
                                    <ul>                                    
                                        {categories.size?.value.replace(/[\[\]']+/g,'').replaceAll('"', '').split(',').map((item, idx) => {
                                            return (
                                                <li><Link href={`/collections/${handle}?category=${item}`}><a>{item}</a></Link></li>
                                            )
                                        })}                                    
                                    </ul></>
                                }
                            </div>                        
                        </div>
                    {/* }   */}
                </div>
                
                <div className={styles.product_list}>
                    {products[0].map((product, idx) => {                             
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
            </section>
        </main>
    )
}

export const getServerSideProps = async ({params}) => {            
    const handle = params.id        
    const resCollection = await fetchCollectionInfo(handle)       
    const resMetafields = await fetchCollectionMetafields(handle)     

    const collectionInfo = resCollection.body.data.collection    
    collectionInfo.id = collectionInfo.id.split('/').pop()        

    const metafields = resMetafields.body.data.collection    
    
    return {
        props: {
            collectionInfo: collectionInfo,      
            categories: metafields,
            handle: handle,  
        },
    }
}

export default Collection