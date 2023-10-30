import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import { getCategoryById } from '../../Services/CategoryService';

function CategoryDetails() {
    const catId=useParams();
 const[catData,setcatData]=useState({});
    
    useEffect(()=>{
        getCategoryById(catId.catid).then(res=>{
       setcatData(res);
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
                <h3>Category Details</h3>
                </div>
                <Link  to="/dashboard/categories" style={{textDecoration:'none'}} ><button className='btn btn-danger listing'>Back to Listing</button></Link>
                <div className='card-body' style={{padding:'0px',width:'100%'}}></div>
               
        { catData &&
        <div className='picdiv'>
            <div className='picdiv2'>
            <img src={catData.cat_img} style={{height:'25vh',verticalAlign:'middle',maxWidth:'100%'}} />
            </div>
        <div className="middle" style={{marginTop:'2%',textAlign:'left',textTransform:'uppercase'}}>
        <h5><span style={{color:'#55862C',fontWeight:'400'}}>Category Id: </span>{catData.category_id}</h5>
        <h5 ><span style={{color:'#55862C',fontWeight:'400',textTransform:'uppercase'}}>Category name: </span>{catData.category_name}</h5>
       </div>
      
    </div>}
    {catData &&
<div style={{fontSize:'medium',marginTop:'2%'}} className='desc'>
             <h5 style={{color:'#55862C',fontWeight:'600',textAlign:'center',textTransform:'uppercase'}}>Category Description:</h5>
             <p>{catData.category_desc}</p>
          </div>    }    </div>

              <Footer/>
            </div>
  )
}

export default CategoryDetails