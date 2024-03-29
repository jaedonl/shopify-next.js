import { fetchCollectionInfo } from '../../lib/shopify'

const handler = async (req, res) => {            
    const collection = await fetchCollectionInfo(req.query.handle)

    try {
        res.status(200).json(collection)   
    } catch (error) {
        res.status(500).json(error)   
    }    
}
  
export default handler;