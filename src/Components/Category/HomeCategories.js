import React, { useEffect, useState } from 'react'
import './HomeCategories.css'


import { getAllCategories } from '../../Services/CategoryService'

import { Link } from 'react-router-dom'
function HomeCategories() {

   const [categories, setCategories] = useState(null);
  

   useEffect(() => {
     getAllCategories().then(res=>{
      console.log(res);

      let catArr = [];
      let count = 0;
      res.map(cat=>{
         if(count<=5){
            catArr.push(cat);
            count+=1;
         }
      })

      setCategories(catArr);
     })
   }, [])


   console.log(categories);
   
   
if(categories!==null){
  return (

   
    <div className='homecategories'>
     {categories.map(cat=>{return(
   <div className='container'>
      <img src={cat.cat_img} alt='img1'/>
      <div className='content'>
         <h1>{cat.category_name} at your doorstep</h1> 
       
        <Link to={`/products/${cat.category_name}`}> <button className='btneffect'>Shop now</button></Link>
      </div>
   </div>)
     })}
        

         
           
        </div>
  )
}
}

export default HomeCategories