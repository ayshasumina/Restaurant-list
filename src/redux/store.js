import { configureStore } from "@reduxjs/toolkit";
import restaurantSlice from "./restaurantSlice";


const ffStore = configureStore({
    reducer:{
      restaurantReducer:restaurantSlice
    }
})

export default ffStore