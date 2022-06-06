import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import cartReducer from "./cartSlice";
import storage from "redux-persist/lib/storage";
// import storageSession from 'reduxjs-toolkit-persist/lib/storage/session' //different storage
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({ 
    cart: cartReducer    
})

const persistConfig = {
    key: 'root',    
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})

export const persistor = persistStore(store)
