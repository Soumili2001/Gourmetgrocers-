import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { deleteProduct, getAllProducts } from '../../Services/ProductService';
import './AdminProduct.css'
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../Contexts/LoginContext';
import { toast } from 'react-toastify';
import { deleteCategories } from '../../Services/CategoryService';
import Footer from '../../Components/Footer/Footer';

function AdminProducts() {
    const { login, setlogin } = useContext(LoginContext);
const navigate = useNavigate();
const LoadDetail=(id)=>{
navigate(`/dashboard/products/details/${id}`)
}
const LoadUpdate=(id)=>{
    navigate(`/dashboard/products/update/${id}`)
}
const DeleteFunction=(id)=>{
    if(window.confirm("Do you want to remove?")){
       deleteProduct(login.userName,id).then((res)=>{
        setTimeout(()=>{
            window.location.reload();
           },1500);
           
      
        toast.success(res.message);
       }).catch((err)=>{
        console.log(err.message)
       })
    }}
    const once = useRef(false);
const[prodata,setprodata]=useState();
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
        navigate("/login");
        }}
  
        else{
        getAllProducts().then((res)=>{
        setprodata(res)
        console.log(res);
        }).catch((err)=>{
            console.log(err);
        })}
        return () => {
            once.current = true;
          };
    },[])
  return (
<div>
    <Navbar />
<div className='container' >
        <div className='card'>
            <div className='card-title'>
                <h2 style={{textAlign:'center',paddingTop:'5px'}}>Products</h2>
            </div>
            <div className='card-body' style={{textAlign:'center'}}>
               
                <div class="table-responsive text-nowrap">
                <div className='divbtn'>
                    <Link to='/dashboard/products/create' className="btn btn-success">Add Product</Link>
                </div>
                <table className='table table-bordered'>
                    <thead className='bg-dark text-white'>
                        <tr>
                            <td>Id</td>
                            <td>Product Name</td>
                            <td>Product Price</td>
                            <td>Stock Count</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
{
    prodata &&
    prodata.map(item=>(
     <tr key={item.product_id}>
         <td>{item.product_id}</td>
        <td>{item.product_name}</td>
        <td>{item.product_price}</td>
        <td>{item.stock_count}</td>
        <td><a onClick={()=>{LoadUpdate(item.product_id)}} className='btn btn-success probtn'>Edit</a>
        <a onClick={()=>{DeleteFunction(item.product_id)}} className='btn btn-danger probtn'>Delete</a>
        <a onClick={()=>{LoadDetail(item.product_id)}}className='btn btn-primary probtn'>Details</a></td>
     </tr>   
    ))
    }

                    </tbody>
                </table>
                </div>
                
            </div>
            </div>
    </div>
    <div style={{backgroundColor:'rgb(240,240,240)',width:'100%',height:'1vh'}}></div>
    
    <Footer/>
    </div>
  )
}

export default AdminProducts