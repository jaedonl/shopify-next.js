import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        // addProduct: (state, action) => {                        
        //     state.products.push(action.payload)
        //     state.quantity += 1
        //     state.total += action.payload.total * action.payload.qty            
        // },
        addProduct: (state, action) => {                                         
            const itemIndex = state.products.findIndex(item => item.id === action.payload.id)            

            if (itemIndex >= 0) state.products[itemIndex].qty += action.payload.qty   
            else state.products.push(action.payload)                                 

            state.quantity = state.products.length      
            const itemTotal = action.payload.price * action.payload.qty       
            state.total += itemTotal
        },  
        reset: (state) => {
            state.products = []
            state.quantity = 0
            state.total = 0
        }
    },
})

export const { addProduct, reset } = cartSlice.actions
export default cartSlice.reducer