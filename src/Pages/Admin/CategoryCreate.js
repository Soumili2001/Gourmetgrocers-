import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { LoginContext } from '../../Contexts/LoginContext';
import { toast } from 'react-toastify';
import { createCategories } from '../../Services/CategoryService';
import CategoryValidation from '../../Components/Validations/CategoryValidation';

function CategoryCreate() {

  const navigate = useNavigate();
  const { login, setlogin } = useContext(LoginContext);
 
  const [values, setvalues] = useState({
    catname: "",
    catdesc: "",
    catimg: ""
  });
  const [errors, setErrors] = useState({});
  const [catimgerror,setcatimgerror]=useState();
 const [isvalidclicked,setisvalidclicked]=useState(false);

 function handleInput(event) {
  const newObj = { ...values, [event.target.name]: event.target.value };
  setvalues(newObj);
}

  function isImgUrl(url) {
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
      img.onerror = () => resolve(true);
      img.onload = () => resolve(false);
    });
  }
  useEffect(() => {
    setErrors(CategoryValidation(values));
  }, [values]);


  
  const validate=(e)=>{
    e.preventDefault();
    Promise.resolve(isImgUrl(values.catimg)).then((res)=>{
      console.log(res);
     setcatimgerror(res);
     setisvalidclicked(true);

    
    });
  }
  const handlesubmitProduct=(e)=>{
    e.preventDefault();
   if(!isvalidclicked){
      return toast.error("Validate the url")
   }
    if (errors.catname || errors.catdesc || catimgerror) {
      return toast.error("Enter correct details");
    }
    const catData={
       category_name:values.catname,
       category_desc:values.catdesc,
       cat_img:values.catimg
    }
    createCategories(catData,login.userName).then((response)=>{

      toast.success(response.message);
      navigate('/dashboard/categories');
    }).catch(err=>{
      console.log(err);
      if(err?.response?.status===400){
        const errors = err?.response?.data;
        console.log(errors);
        Object.entries(errors).forEach(([key, val]) => {
          toast.error(key + ": "+val);
        });
      }
      else{
      toast.error(err?.response?.data?.message)
      }
    });
    }
  
  return (
    <div>
      <Navbar reloadnavbar={false}/>
      <div className='row' style={{margin:'3%'}}>
        <div className='offset-lg-3 col-lg-6'>
          <form className='container' onSubmit={handlesubmitProduct}>
            <div className='card' style={{textAlign:'left'}}>
            <div className='card-title'>
              <h3 style={{textAlign:'center',paddingTop:'2%'}}>Category Create</h3>
              </div>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label>Category Name</label>
                      <input required name="catname" onChange={handleInput} className='form-control'></input>
                      {errors.catname && (
                        <span className="text-danger">{errors.catname}</span>
                      )}
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label>Category Description</label>
                      <input required name="catdesc" onChange={handleInput} className='form-control'></input>
                      {errors.catdesc && (
                        <span className="text-danger">{errors.catdesc}</span>
                      )}
                    </div>
                  </div>
                
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label>Category Image</label>
                      <input required name="catimg" onChange={handleInput} className='form-control'></input>
                      <button className='btn btn-warning' onClick={validate} style={{margin:'2%'}} >validate</button>
                      {catimgerror && (
                        <span className="text-danger">Please enter correct Image url</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className='col-lg-12'>
                    <div className='form-group'>
                     <button className='btn btn-success' style={{margin:'2%'}} type="submit">Save</button>
                     <Link to='/dashboard/categories' style={{margin:'2%'}} className='btn btn-warning'>Back</Link>
                    </div>
                  </div>
                </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CategoryCreate