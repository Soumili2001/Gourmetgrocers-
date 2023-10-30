import React, { useEffect, useState } from 'react'
import img1 from '../../Images/fruits1.jpeg'
import './CategorySidebar.css'
import { getAllCategories } from '../../Services/CategoryService';
import { useNavigate } from 'react-router-dom';
function CategorySidebar(props) {

    const navigate = useNavigate();
    const [activecat, setactivecat] = useState();
 const [categories, setcategories] = useState(null);


 useEffect(() => {
   getAllCategories().then(res=>{
    console.log(
        res
    );
    setcategories(res);
   }).catch(err=>{
    console.log(err);
   })
 }, [])


 const categoryClickHandler = ((event,name)=>{



    const categories = document.querySelectorAll(".category");
    const activeCat = event.target;

    categories.forEach(cat=>{
        cat.classList.remove("active");
    })

    console.log(activeCat);
    activeCat.classList.add("active");


    // console.log(name);
    navigate(`/products/${name}`);
 })
 


 useEffect(() => {
    if(props.category.prodcat!=null){
        console.log(props.category);
        setactivecat(props.category.prodcat);
  
}
else{
    
   setactivecat(null);
   const categories = document.querySelectorAll(".category");
 

   categories.forEach(cat=>{
       cat.classList.remove("active");
   })

  
   
  
}
}
, [activecat])


 if(categories!==null){
  return (
    <div className='categorysidebar'>
        
{
    categories.map((item)=>{
        return(
            
                      <div id={item.category_id} className={`category ${activecat == item.category_name ? 'active':''}`} onClick={(event)=>{categoryClickHandler(event,item.category_name)}} >
        <img src={item.cat_img} alt='categoryimage' style={{pointerEvents:'none'}}/>
        <p style={{pointerEvents:'none'}}>{item.category_name}</p>
</div>)
    })
}
    </div>
  )
}
}

export default CategorySidebar