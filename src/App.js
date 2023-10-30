import React, { useEffect, useState } from 'react'
import {Route,Routes, BrowserRouter} from 'react-router-dom'
import Home from './Pages/Home'

import './App.css'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; // import first
import { LoginContext } from './Contexts/LoginContext'
import Register from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'
import Product from './Pages/Product'
import SingleProduct from './Pages/ProductPage/SingleProduct'
import Dashboard from './Pages/Admin/Dashboard'
import AdminProducts from './Pages/Admin/AdminProducts'
import AdminCategories from './Pages/Admin/AdminCategories'
import AdminOrders from './Pages/Admin/AdminOrders'
import ProductCreate from './Pages/Admin/ProductCreate'
import ProdUpdate from './Pages/Admin/ProdUpdate'

import ProductDetails from './Pages/Admin/ProductDetails'
import CategoryCreate from './Pages/Admin/CategoryCreate'
import CategoryUpdate from './Pages/Admin/CategoryUpdate'
import CategoryDetails from './Pages/Admin/CategoryDetails'
import Cart from './Pages/Cart/Cart'
import OrderDetails from './Pages/Admin/OrderDetails'
import AboutUs from './Pages/AboutUs'
import MyOrders from './Pages/Orders/MyOrders'
import OrderInfo from './Pages/Orders/OrderInfo'
const App = () => {



  const [login, setlogin] = useState({});

  useEffect(() => {
    if(localStorage.getItem("loggedInUser")!==null){
      const loggedInUser = localStorage.getItem("loggedInUser");
      var items=JSON.parse(loggedInUser);
      console.log(items)
      const logindata={
           
            email: items.email,
            fullName: items.fullName,
            loggedIn: items.loggedIn,
            userId:items.userId,
            userRole:items.userRole,
            userName:items.userName
      }
      setlogin(logindata);
    
    console.log(login)}
  }, [])
 


  return (
    <BrowserRouter>
    <LoginContext.Provider value={{login,setlogin}}>
     
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products"  element={<Product />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:prodid" element={<SingleProduct />} />
      <Route path="/products/:prodcat" element={<Product />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/products" element={<AdminProducts />} />
      <Route path="/dashboard/products/create" element={<ProductCreate />} />
      <Route path="/dashboard/products/update/:prodid" element={<ProdUpdate /> } />
      <Route path="/dashboard/products/details/:prodid" element={<ProductDetails />} />
      
      <Route path="/dashboard/categories" element={<AdminCategories />} />
      <Route path="/dashboard/categories/create" element={<CategoryCreate />} />
      <Route path="/dashboard/categories/update/:catid" element={<CategoryUpdate /> } />
      <Route path="/dashboard/categories/details/:catid" element={<CategoryDetails />} />
      <Route path="/dashboard/orders" element={<AdminOrders />} />
      <Route path="/dashboard/orders/:orderid" element={<OrderDetails />} />
      <Route path="/about" element={<AboutUs/>} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/myorders" element={<MyOrders />} />
      <Route path="/myorders/:orderid" element={<OrderInfo />} />

      
       <Route path="*" element={<div>
        <h1>404 NOT FOUND</h1>
        </div>} /> 
    </Routes>
    <ToastContainer/>
    </LoginContext.Provider>
    </BrowserRouter>

  )
}

export default App