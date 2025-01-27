
import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
     name : 'user',
     initialState : {
          selectedCategory : '',
          secondaryNav : false
     },
     reducers : {
          setSecondaryNav (state,action){
               state.secondaryNav = action.payload;
          },
          setSelectedCategory (state,action){
               state.selectedCategory = action.payload;
          }
     }
})

export const {setUserInfo,isEmail,setEmail,isVerify,setMessage,setCarts,setFavourites,setSecondaryNav,setSelectedCategory} = userSlice.actions;
export default userSlice.reducer;