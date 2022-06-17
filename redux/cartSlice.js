import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action) => {                                         
            const itemIndex = state.products.findIndex(item => item.id === action.payload.id)            

            if (itemIndex >= 0) state.products[itemIndex].qty += action.payload.qty   
            else state.products.push(action.payload)                                 

            state.quantity = state.products.length      
            const itemTotal = action.payload.price * action.payload.qty
            state.total += itemTotal
            
            // const checkout = await createCheckout(item.id, item.qty)
            // const newCheckout = await updateCheckout(checkout.id, cart)      
        },

        removeProduct: (state, action) => {                                     
            const itemTotal = action.payload.price * action.payload.qty

            const nextCartItems = state.products.filter(item => item.id !== action.payload.id)
            state.products = nextCartItems
            state.quantity = state.products.length
            state.total -= itemTotal            
        }, 

        updateQuantity: (state, action) => {
            const idx = action.payload.itemIndex

            if (action.payload.buttonType === 'minus' && action.payload.itemQty > 1) {   
                state.products[idx].qty -= 1
                state.total -= state.products[idx].price
            } else if (action.payload.buttonType === 'plus') {
                state.products[idx].qty += 1
                state.total += state.products[idx].price
            }            
        },
        
        reset: (state) => {
            state.products = []
            state.quantity = 0
            state.total = 0
        }
    },
})

export const { addProduct, removeProduct, updateQuantity, reset } = cartSlice.actions
export default cartSlice.reducer