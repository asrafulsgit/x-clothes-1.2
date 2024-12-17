import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom'
import {Provider, useSelector} from 'react-redux'

import './index.css'

import App from './App.jsx'
import Men from './Components/Products/Men/Men.jsx'
import Kids from './Components/Products/Kids/Kids.jsx'
import Women from './Components/Products/Women/Women.jsx'
import Productinfo from './Components/ProducInfo/Productinfo/Productinfo.jsx'
import Shop from './Components/Shops/Shop/Shop.jsx'
import Login from './Components/Authentication/Login/Login.jsx'
import ForgotPass from './Components/Authentication/ForgotPassword/FindUser/ForgotPass.jsx'
import SignUp from './Components/Authentication/SignIn/SignUp.jsx'
import Cart from './Components/PrivateSection/Cart/Cart.jsx'
import Favourite from './Components/PrivateSection/Favourite/Favourite.jsx'
import userInfoStore from './Components/Authentication/Controllers/UserInfoStore.jsx'
import AuthenticatorsPrivate from './Components/Authentication/Authenticators/AuthenticatorsPrivate.jsx'
import Profile from './Components/PrivateSection/Profile/Profile.jsx'
import Authenticate from './Components/Authentication/Authenticators/Authenticate.jsx'
import SetLocalStorage from './Components/SetLocalStorage/SetLocalStorage.jsx'
import AboutUs from './Components/Others/AboutUs/AboutUs.jsx'
import ReturnPolicy from './Components/Others/ReturnPolicy/ReturnPolicy.jsx'
import Home from './Components/Admin/Home/Home.jsx'
import AddProduct from './Components/Admin/Add-product/AddProduct.jsx'
import DashBoard from './Components/Admin/Dash-Board/DashBoard.jsx'
import AllProducts from './Components/Admin/All-product/AllProducts.jsx'
import ScrollProblem from './Components/Others/ScrollProblem.jsx'

import ResetPassword from './Components/Authentication/ForgotPassword/ResetPassword/ResetPassword.jsx'
import IsEmail from './Components/Authentication/ForgotPassword/PrivateRoute/IsEmail.jsx'
import IsVerify from './Components/Authentication/ForgotPassword/PrivateRoute/IsVerify.jsx'
import IsEmailExist from './Components/Authentication/ForgotPassword/PrivateRoute/IsEmail.jsx'
import IsVerified from './Components/Authentication/ForgotPassword/PrivateRoute/IsVerify.jsx'
import EmailVerification from './Components/Authentication/ForgotPassword/EmailVerification/EmailVerification.jsx'
import GetCarts from './Components/Others/GetCarts.jsx'
import Winter from './Components/Products/Winter/Winter.jsx'
import UpdateProduct from './Components/Admin/Update-product/UpdateProduct.jsx'




createRoot(document.getElementById('root')).render(
  <Provider store={userInfoStore}>
     <BrowserRouter >
      <ScrollProblem />
      {/* <GetCarts /> */}
      <Routes>
        <Route element={<SetLocalStorage />}>
          // public Route
          <Route path='/' element={<App />}/>
          <Route path='/men' element={<Men />}/>
          <Route path='/women' element={<Women />}/>
          <Route path='/kids' element={<Kids />}/>
          <Route path='/winter' element={<Winter />} />
          <Route path='/product/:id' element={<Productinfo />}/>
          <Route path='/products/shop' element={<Shop />}/>  

          // authenticator Route
          <Route element={<AuthenticatorsPrivate />}>
            <Route path='/login' element={<Login />}/>
            <Route path='/signup' element={<SignUp />}/>

            // forgot-password
            <Route path='/find-user' element={<ForgotPass />} />
            
            <Route element={<IsEmailExist />}>
              <Route path='/eamil-verication' element={<EmailVerification />} />
            </Route>
            <Route element={<IsVerified />}>
              <Route path='/reset-password' element={<ResetPassword />} />
            </Route>
          </Route>
          
          //Private Route   
          //only authenticated person can access this pages
          <Route element={<Authenticate />}>
            <Route path='/cart' element={<Cart />}/>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/favourite' element={<Favourite />}/>
          </Route>

          // admin Route
          <Route element={<Home />} >
            <Route path='/admin/add-product' element={<AddProduct />}/>
            <Route path='/admin/all-product' element={<AllProducts />} />
            <Route path='/admin/dashboard' element={<DashBoard />} />
            <Route path='/admin/update-product/:id' element={<UpdateProduct />} />
          </Route>

          // Others Route
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/return-policy' element={<ReturnPolicy />} />

        </Route>
      </Routes>
     </BrowserRouter>
  </Provider>,
)
