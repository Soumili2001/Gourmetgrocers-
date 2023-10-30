import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { getordersById } from '../../Services/OrderService';

function OrderDetails() {
    const orderId=useParams();
 const[orderData,setorderData]=useState();
    
    useEffect(()=>{
        getordersById(orderId.orderid).then(res=>{
       setorderData(res);
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
                <h3>Order Details</h3>
                </div>
                <Link  to="/dashboard/orders" style={{textDecoration:'none'}} ><button className='btn btn-danger listing'>Back to Listing</button></Link>
                
               
        { orderData &&
        <div className='picdiv'>
            
        <div style={{marginTop:'2%',textTransform:'uppercase'}} className='middle'>
        <h5><span style={{color:'#55862C',fontWeight:'400'}}>Order Id: </span>{orderData.order_id}</h5>
        <h5 ><span style={{color:'#55862C',fontWeight:'400',textTransform:'uppercase'}}>Username: </span>{orderData.username}</h5>
        <h5 ><span style={{color:'#55862C',fontWeight:'400',textTransform:'uppercase'}}>Order Date: </span>{orderData.orderDate}</h5>
        <h5 ><span style={{color:'#55862C',fontWeight:'400',textTransform:'uppercase'}}>Total Price: </span>{orderData.totalPrice}</h5>
        <h5 ><span style={{color:'#55862C',fontWeight:'400',textTransform:'uppercase'}}>Address: </span>{orderData.address}</h5>
        <h5 ><span style={{color:'#55862C',fontWeight:'400',textTransform:'uppercase'}}>Payment Method: </span>{orderData.paymentMethod}</h5>
       </div>
      
    </div>}
    {orderData &&
<div style={{fontSize:'medium'}} className='desc'>
             <h5 style={{color:'#55862C',fontWeight:'600',textAlign:'center',textTransform:'uppercase',paddingTop:'5px'}}>Order Detail List:</h5>
             
             
             <div className='cartcont'>
        
            
            <table className='carttable'>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Category</th>
                       
                        
                    </tr>
                </thead>
                <tbody>
             
             {

              
     orderData.orderDetailList.map((item,index)=>{
return(
    <tr key={index} className="cartitemrow">
        <td data-label="PRODUCT">
            <div className='cartproduct'>
            <Link to ={`/product/${item.productDto.product_id}`}>
            <img src={item.productDto.product_img} alt={item.productDto.product_name}/></Link>
            
        <span>{item.productDto.product_name}</span>
        </div>
        </td>
        <td data-label="Quantity">
           
            <p>{item.product_quantity}</p>
            
        </td>
        <td data-label="PRODUCT PRICE">
            <p>Rs. {item.productDto.product_price}</p>
        </td>
        <td data-label="TOTAL PRICE">
            <p >{item.productDto.category_name}</p>
        </td>
        
        <td>
           
        </td>
    </tr>
)
})}
                    
    </tbody>
    </table></div>                
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    

                    
                    
                    
                    <tr></tr>
          </div>    }    </div>

              <Footer/>
            </div>
  )
}

export default OrderDetails