import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../Contexts/LoginContext';
import { toast } from 'react-toastify';
import { getallorders } from '../../Services/OrderService';
import Footer from '../../Components/Footer/Footer';

function AdminOrders() {
  const[orderdata,setorderdata]=useState();
    const { login, setlogin } = useContext(LoginContext);
const navigate = useNavigate();
const LoadDetail=(username,id)=>{
navigate(`/dashboard/orders/${id}`)
}

const once = useRef(false);

const loggedinuser = localStorage.getItem("loggedInUser");
var items=JSON.parse(loggedinuser);
useEffect(()=>{
  if(items === null){
    if(!once.current){
      
          toast.error("Please login...")
          navigate("/login");
        }
      }
      else if(items.userRole === 'user'){
        if(!once.current){
        toast.error("Not allowed to continue...")
        navigate("/home");
        }}
    
    else{
  getallorders(login.userName).then((res)=>{
  console.log(res);
  setorderdata(res);
  
  }).catch((err)=>{
      console.log(err);
  })}
  return () => {
    once.current = true;
  };
},[])


   
  return (
<div>
    <Navbar reloadnavbar={false} />
<div className='container' >
        <div className='card' style={{marginTop:'2%',height:'50vh'}}>
        <div className='card-title'>
                <h2 style={{textAlign:'center',paddingTop:'5px'}}>Orders</h2>
            </div>
            <div className='card-body' style={{textAlign:'center'}}>
            
            <div class="table-responsive text-nowrap">
                <table className='table table-bordered'>
                    <thead className='bg-dark text-white'>
                        <tr>
                            <td>Id</td>
                            <td>Order Date</td>
                            <td>Username</td>
                            <td>Total Amount</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
{
    orderdata &&
    orderdata.map(item=>(
     <tr key={item.order_id}>
         <td>{item.order_id}</td>
        <td>{item.orderDate}</td>
        <td>{item.username}</td>
        <td>{item.totalPrice}</td>
        <td>
        
        <a onClick={()=>{LoadDetail(item.username,item.order_id)}}className='btn btn-primary probtn'>Details</a></td>
     </tr>   
    ))
    }

                    </tbody>
                </table>
                </div>
            </div>
            </div>
    </div>
  
    
    <Footer/>
    </div>
  )
}

export default AdminOrders