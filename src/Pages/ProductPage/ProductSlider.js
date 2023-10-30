import React, { useEffect, useState } from 'react'
import ProductCard from '../../Components/Products/ProductCard';
import 'react-multi-carousel/lib/styles.css';
import Carousel from 'react-multi-carousel';
import './ProductSlider.css'
import { getAllProducts, getAllProductsByCategory } from '../../Services/ProductService';
import { faConnectdevelop } from '@fortawesome/free-brands-svg-icons';


function ProductSlider(){
    const[products,setproduct]=useState([]);
    const responsive = {
        display6: {
            breakpoint: { max: 2000, min: 1700 },
            items: 5
        },
        display5:{
            breakpoint: { max: 1700, min: 1200 },
            items: 4
        },

        display4:{
            breakpoint: { max: 1200, min: 900 },
            items: 3
        },
        display3:{
            breakpoint: { max: 900, min: 600 },
            items: 2
        },
        display1:{
            breakpoint: { max: 600, min: 550 },
            items: 2
        },
        display0:{
            breakpoint: { max: 550, min: 0 },
            items: 1
        }
    };
    
    useEffect(()=> {
     getAllProducts().then(res=>{
         setproduct(res);
        
        }).catch(err=>{
         console.log(err);
       })
        
     },[])
  return (
    <div className='productsliderout'>
        
        <Carousel responsive={responsive}
        autoPlay={true}
         autoPlaySpeed={2000}
         swipeable={true}
         draggable={true}>
{products.map((p)=>{
    return(
        <ProductCard data={p} key={p.product_id}/>
    )
})}
            </Carousel></div>
  )
}

export default ProductSlider