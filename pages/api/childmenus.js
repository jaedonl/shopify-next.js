import { fetchCollectionMetafields } from '../../lib/shopify'

const handler = async (req, res) => {            
    const data = await fetchCollectionMetafields(req.query.handle)
    
    try {
        res.status(200).json(data)   
    } catch (error) {
        res.status(500).json(error)   
    }    
}
  
export default handler;