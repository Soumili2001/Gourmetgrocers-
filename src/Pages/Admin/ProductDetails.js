import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../../Services/ProductService';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import './ProductDetails.css'

function ProductDetails() {
    const prodId=useParams();
 const[prodData,setprodData]=useState({});
    
    useEffect(()=>{
        getProductById(prodId.prodid).then(res=>{
       setprodData(res);
        console.log(res);
      
       }).catch(err=>{
        console.log(err);
      })
       
    },[])
  return (
    <div>
        <Navbar reloadnavbar={false}/>
        <div className='card' style={{paddingBottom:'2%'}}>
            <div className='card-title' style={{marginTop:'2%',textAlign:'center'}}>
                <h3>Product Details</h3>
                </div>
                <Link  to="/dashboard/products" style={{textDecoration:'none'}} ><button className='btn btn-danger listing'>Back to Listing</button></Link>
                <div className='card-body' style={{padding:'0px',width:'100%'}}></div>
               
        { prodData &&
        <div className="picdiv" >
            <div className="picdiv2" >
            <img src={prodData.product_img} style={{height:'25vh',verticalAlign:'middle',maxWidth:'100%'}} />
            </div>
        <div className="middle" style={{marginTop:'2%',textAlign:'left',textTransform:'uppercase'} }>
        <h5 ><span style={{color:'#55862C',fontWeight:'400',textTransform:'uppercase'}}>Product name: </span>{prodData.product_name} (Id: {prodData.product_id})</h5>
        <h5><span style={{color:'#55862C',fontWeight:'400'}}>Product Price: </span>{prodData.product_price}</h5>
        <h5><span style={{color:'#55862C',fontWeight:'400'}}>Stock Count: </span>{prodData.stock_count}</h5>
       
        <h5><span style={{color:'#55862C',fontWeight:'400'}}>Category Name: </span>{prodData.category_name}</h5>
       </div>
      
    </div>}
    {prodData &&
<div style={{fontSize:'medium',marginTop:'2%'}} className='desc'>
             <h5 style={{color:'#55862C',fontWeight:'600',textAlign:'center',textTransform:'uppercase'}}>Product Description:</h5>
             <p>{prodData.product_desc}</p>
          </div>    }    </div>

              <Footer/>
            </div>
  )
}

export default ProductDetails