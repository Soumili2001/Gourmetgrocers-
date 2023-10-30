import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import img1 from '../../Images/vegetables.jpg'
import './AllProducts.css'
import { useNavigate } from 'react-router-dom'
import { getAllProducts, getAllProductsByCategory } from '../../Services/ProductService';
function AllProducts(props) {
    const navigate=useNavigate();
  

    const [products, setProducts] = useState(null);
    const[category,setCategory] = useState(null);

console.log(props.result)

    useEffect(() => {
        if(props.category.prodcat==null){
            console.log(props.category);
      getAllProducts().then(res=>{
        console.log(res);
        setProducts(res);
      }).catch(err=>{
        console.log(err);
      })
      
     
    }
    else{
        console.log(props.category);
        getAllProductsByCategory(props.category.prodcat).then(res=>{
            console.log(res);
            console.log(res.length);
            setProducts(res);
        }).catch(err=>{
            console.log(err);
        })
    }
    }, [category])


    if(props.category!==null && props.category!==category){
        setCategory(props.category);
    }
    
    


if(products!==null){
  return (
    <div className='allproducts'>
    <h1>{category.prodcat==null?'All Products':category.prodcat}</h1>
    <div className='products'>
        {
            products.map((item=>{
                return(
                    <ProductCard data={item} key={item.id}/>
                )
            }))
        }
    </div>
    </div>
  )
    }
}

export default AllProducts