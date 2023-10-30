import React, { useState } from 'react'
import Footer from '../Components/Footer/Footer'
import Navbar from '../Components/Navbar/Navbar'
import AllProducts from '../Components/Products/AllProducts'
import CategorySidebar from '../Components/Products/CategorySidebar'
import './Product.css'
import { useParams } from 'react-router-dom'

function Product(props) {


  const Category=useParams();

  //console.log(props.refresh);


  return (
    <div>
    <Navbar />
    
    <div className='products'>
    
       <CategorySidebar category={Category}/>
       <AllProducts category={Category}/>
       </div>
     <Footer />
     </div>
  )
}

export default Product