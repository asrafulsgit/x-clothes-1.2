
import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
     name : 'user',
     initialState : {
          userInfo: {},       //user information
          isEmail : false,    // forgot-password
          setEmail :  '',     // forgot-password
          isVerify : false,   // forgot-password
          message : '',
          isLoading : true,
          carts : [],
          selectedCategory : '',
          secondaryNav : false
     },
     reducers : {
          setUserInfo(state,aciton){
               state.userInfo = aciton.payload;
          },
          isEmail (state,action){
               state.isEmail =  action.payload;
          },
          setEmail (state,action){
               state.setEmail = action.payload;
          },
          isVerify (state,action){
               state.isVerify = action.payload;
          },
          setCarts (state,action){
               state.carts =  action.payload;
          },
          setMessage (state,action){
               state.message = action.payload;
          },
          setIsloading (state,action){
               state.isLoading = action.payload;
          },
          setSecondaryNav (state,action){
               state.secondaryNav = action.payload;
          },
          setSelectedCategory (state,action){
               state.selectedCategory = action.payload;
          }
     }
})

export const {setUserInfo,isEmail,setEmail,isVerify,setMessage,setCarts,setSecondaryNav,setSelectedCategory} = userSlice.actions;
export default userSlice.reducer;