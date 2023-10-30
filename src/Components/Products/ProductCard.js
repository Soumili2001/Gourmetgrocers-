import React from 'react'
import './ProductCard.css'
import { Link } from 'react-router-dom'
import img from '../../Images/vegetables.jpg'
function ProductCard({data}) {
  return (
    <div className='product'>
        <div className='s1'>
            <img src={data.product_img} alt={'no img'}/>
        </div>
        <div className='s2'>
            <p>{data.product_name}</p><h2><span>Rs. {data.product_price}</span> <span>for per kg</span></h2>
        </div>
       
           
        <Link to={`/product/${data.product_id}`}>
       <button className='btn btn-success addbtn'>View Product</button></Link>
        </div>
  )
}

export default ProductCard