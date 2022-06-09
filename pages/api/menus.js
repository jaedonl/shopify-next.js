import { fetchMenuItems } from '../../lib/shopify'

const handler = async (req, res) => {
    const menus = await fetchMenuItems()

    try {
        res.status(200).json(menus)   
    } catch (error) {
        res.status(500).json(error)   
    }    
}
  
export default handler;