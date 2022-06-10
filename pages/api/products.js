import { fetchCollectionInfo } from '../../lib/shopify'

const handler = async (req, res) => {    
    let string = "All"    
    const allCollection = await fetchCollectionInfo(string)

    try {
        res.status(200).json(allCollection)   
    } catch (error) {
        res.status(500).json(error)   
    }    
}
  
export default handler;