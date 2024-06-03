import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRestaurants = createAsyncThunk('restaurants/fetchRestaurants',async()=>{
   const result = await axios.get('https://restaurant-listing-app-server.onrender.com/restaurants')
   localStorage.setItem("allRestaurants",JSON.stringify(result.data))
   return result.data
})

const restaurantSlice = createSlice({
    name:'restaurantSlice',initialState:{
        allRestaurants:[],
        allRestaurantsDummy:[],
        loading:false,
        error:""
    },
    reducers:{
         searchRestaurant : (state,action)=>{
        state.allRestaurants = state.allRestaurantsDummy.filter(res=>res.neighborhood.toLowerCase().includes(action.payload))
         }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchRestaurants.fulfilled,(state,action)=>{
            state.allRestaurants = action.payload
            state.allRestaurantsDummy = action.payload
            state.loading = false
            state.error = ""
        })

        builder.addCase(fetchRestaurants.pending,(state,action)=>{
            state.allRestaurants = []
            state.allRestaurantsDummy = []
            state.loading = true
            state.error = ""
        })

        builder.addCase(fetchRestaurants.rejected,(state,action)=>{
            state.allRestaurants = []
            state.allRestaurantsDummy = []
            state.loading = false
            state.error = "API call failed... Please try again after some times!!!"
        })
    }
})

export const {searchRestaurant} = restaurantSlice.actions
export default restaurantSlice.reducer