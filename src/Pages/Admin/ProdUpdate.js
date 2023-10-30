import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createProduct, getProductById, updateProduct } from '../../Services/ProductService';
import { LoginContext } from '../../Contexts/LoginContext';
import { toast } from 'react-toastify';
import ProductValidation from '../../Components/Validations/ProductValidation';

function ProductUpdate() {
  const prodId=useParams();
  const navigate = useNavigate();
  const { login, setlogin } = useContext(LoginContext);
  
  const [values, setvalues] = useState({
    prodname: "",
    prodprice: "",
    stockcount: "",
    proddesc: "",
    catname: "",
    prodimg: "",
  });
  const [errors, setErrors] = useState({});
  function handleInput(event) {
    const newObj = { ...values, [event.target.name]: event.target.value };
    setvalues(newObj);
  }

  useEffect(()=>{
    getProductById(prodId.prodid).then(res=>{
      const newdetails={
        prodname:res.product_name,
        prodprice:res.product_price,
        stockcount:res.stock_count,
        proddesc:res.product_desc,
        catname:res.category_name,
        prodimg:res.product_img
      }
  
   setvalues(newdetails)
    console.log(res);
  
   }).catch(err=>{
    console.log(err);
  })
   
},[])
useEffect(() => {
  setErrors(ProductValidation(values));
}, [values]);
  
  const handlesubmitProduct=(e)=>{
    e.preventDefault();
    if (errors.prodname || errors.prodprice || errors.stockcount || errors.catname || errors.proddesc || errors.prodimg) {
      return toast.error("Enter correct details");
    }
    e.preventDefault();
    const prodData={
       product_name:values.prodname,
       product_price:values.prodprice,
       stock_count:values.stockcount,
       product_desc:values.proddesc,
       category_name:values.catname,
       product_img:values.prodimg
    }
    updateProduct(prodData,prodId.prodid,login.userName).then((response)=>{

      toast.success(response.message);
      navigate('/dashboard/products');
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
              <h3 style={{textAlign:'center',paddingTop:'2%'}}>Product update</h3>
              </div>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label>Product Name</label>
                      <input required value={values.prodname} name="prodname" onChange={handleInput} className='form-control'></input>
                      {errors.prodname && (
                        <span className="text-danger">{errors.prodname}</span>
                      )}
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label>Product Price</label>
                      <input type='number' required value={values.prodprice} name="prodprice" onChange={handleInput} className='form-control'></input>
                      {errors.prodprice && (
                        <span className="text-danger">{errors.prodprice}</span>
                      )}
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label>Stock Count</label>
                      <input type='number' required value={values.stockcount} name="stockcount" onChange={handleInput} className='form-control'></input>
                      {errors.stockcount && (
                        <span className="text-danger">{errors.stockcount}</span>
                      )}
                    </div>

                  </div>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label>Product Description</label>
                      <input required value={values.proddesc} name="proddesc" onChange={handleInput} className='form-control'></input>
                      {errors.proddesc && (
                        <span className="text-danger">{errors.proddesc}</span>
                      )}
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label>Category Name</label>
                      <input required value={values.catname} name="catname" onChange={handleInput} className='form-control'></input>
                      {errors.catname && (
                        <span className="text-danger">{errors.catname}</span>
                      )}
                    </div>
                  </div>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label>Product Image</label>
                      <input required value={values.prodimg} name="prodimg" onChange={handleInput} className='form-control'></input>
                      {errors.prodimg && (
                        <span className="text-danger">{errors.prodimg}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className='col-lg-12'>
                    <div className='form-group'>
                     <button className='btn btn-success' style={{margin:'2%'}} type="submit">Save</button>
                     <Link to='/dashboard/products' style={{margin:'2%'}} className='btn btn-warning'>Back</Link>
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

export default ProductUpdate