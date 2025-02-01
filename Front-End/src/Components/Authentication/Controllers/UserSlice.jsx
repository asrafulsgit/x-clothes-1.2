
import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
     name : 'user',
     initialState : {
          secondaryNav : false,
          favorites    : 0,
          carts        : 0,
          favoritesProducts: [],
          isLoggedIn  : false,
          loading      : true
     },
     reducers : {
          setSecondaryNav (state,action){
               state.secondaryNav = action.payload;
          },
          setFavorites(state,action){
               state.favorites = action.payload;
          },
          setFavoritesProducts(state,action){
               state.favoritesProducts = action.payload;
          },
          setCarts(state,action){
               state.carts = action.payload;
          },
          setIsLoggedIn(state,action){
               state.isLoggedIn = action.payload;
          },
          setLoading(state,action){
               state.loading = action.payload;
          },
     }
})

export const {setFavorites,setFavoritesProducts,setCarts,setIsLoggedIn,setLoading,setSecondaryNav} = userSlice.actions;
export default userSlice.reducer;