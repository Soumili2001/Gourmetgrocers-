import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'

import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../Contexts/LoginContext';
import { toast } from 'react-toastify';
import { deleteCategories, getAllCategories } from '../../Services/CategoryService';
import Footer from '../../Components/Footer/Footer';

function AdminCategories() {
  const[catdata,setcatdata]=useState();
    const { login, setlogin } = useContext(LoginContext);
const navigate = useNavigate();
const LoadDetail=(id)=>{
navigate(`/dashboard/categories/details/${id}`)
}
const LoadUpdate=(id)=>{
    navigate(`/dashboard/categories/update/${id}`)
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
  getAllCategories().then((res)=>{
  setcatdata(res);
  console.log(res);
  }).catch((err)=>{
      console.log(err);
  })}
  return () => {
    once.current = true;
  };
},[])
const DeleteFunction=(name)=>{
    if(window.confirm("Do you want to remove?")){
       deleteCategories(login.userName,name).then((res)=>{
       setTimeout(()=>{
        window.location.reload();
       },1500);
       
        toast.success(res.message);
       }).catch((err)=>{
        console.log(err.message)
       })
    }}


   
  return (
<div>
    <Navbar />
<div className='container' >
        <div className='card' style={{marginTop:'2%'}}>
            <div className='card-title'>
                <h2 style={{textAlign:'center',paddingTop:'5px'}}>Categories</h2>
            </div>
            <div className='card-body' style={{textAlign:'center'}}>
               
                <div class="table-responsive text-nowrap">
                <div className='divbtn'>
                    <Link to='/dashboard/categories/create' className="btn btn-success">Add Category</Link>
                </div>
                <table className='table table-bordered'>
                    <thead className='bg-dark text-white'>
                        <tr>
                            <td>Id</td>
                            <td>Category Name</td>
                            <td>Category Description</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
{
    catdata &&
    catdata.map(item=>(
     <tr key={item.category_id}>
         <td>{item.category_id}</td>
        <td>{item.category_name}</td>
        <td>{item.category_desc}</td>
        <td><a onClick={()=>{LoadUpdate(item.category_id)}} className='btn btn-success probtn'>Edit</a>
        <a onClick={()=>{DeleteFunction(item.category_name)}} className='btn btn-danger probtn'>Delete</a>
        <a onClick={()=>{LoadDetail(item.category_id)}}className='btn btn-primary probtn'>Details</a></td>
     </tr>   
    ))
    }

                    </tbody>
                </table>
            </div></div>
            </div>
    </div>
    <div style={{backgroundColor:'rgb(240,240,240)',width:'100%',height:'1vh'}}></div>
    
    <Footer/>
    </div>
  )
}

export default AdminCategories