import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
// import {query, getShopifyCollectionByHandle} from '../../lib/shopify2.js'
import { getShopifyCollectionByHandle } from '../../lib/shopify2'

const Collection = ({ title }) => {
    const [collection, setCollection] = useState(null)
    const router = useRouter()            
        
    return (
        <div>
            collection
        </div>
    )
}

export const getServerSideProps = async ({params}) => {            
    const handle = params.id

    console.log(handle)

    await getShopifyCollectionByHandle(handle)

    return {
        props: {
            // title: res.data,            
        },
    }
}

export default Collection