import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { createProduct } from "../../Services/ProductService";
import { LoginContext } from "../../Contexts/LoginContext";
import { toast } from "react-toastify";
import ProductValidation from "../../Components/Validations/ProductValidation";


function ProductCreate() {
  const navigate = useNavigate();
  const { login, setlogin } = useContext(LoginContext);
  const [prodimgerror,setprodimgerror]=useState();
  const [isvalidclicked,setisvalidclicked]=useState(false);
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
  function isImgUrl(url) {
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
      img.onerror = () => resolve(true);
      img.onload = () => resolve(false);
    });
  }
  const validate=(e)=>{
    e.preventDefault();
    Promise.resolve(isImgUrl(values.prodimg)).then((res)=>{
      console.log(res);
     setprodimgerror(res);
     setisvalidclicked(true);

    
    });
  }
  useEffect(() => {
    setErrors(ProductValidation(values));
  }, [values]);

  const handlesubmitProduct = (e) => {
    e.preventDefault();
    if(!isvalidclicked){
      return toast.error("Validate the url")
   }
    if (errors.prodname || errors.prodprice || errors.stockcount || errors.catname || errors.proddesc || prodimgerror) {
      return toast.error("Enter correct details");
    }

    const prodData = {
      product_name: values.prodname,
      product_price: values.prodprice,
      stock_count: values.stockcount,
      product_desc: values.proddesc,
      category_name: values.catname,
      product_img: values.prodimg,
    };
    createProduct(prodData, login.userName)
      .then((response) => {
        toast.success(response.message);
        navigate("/dashboard/products");
      })
      .catch((err) => {
        console.log(err);
        if (err?.response?.status === 400) {
          const errors = err?.response?.data;
          console.log(errors);
          Object.entries(errors).forEach(([key, val]) => {
            toast.error(key + ": " + val);
          });
        } else {
          toast.error(err?.response?.data?.message);
        }
      });
  };

  return (
    <div>
      <Navbar reloadnavbar={false} />
      <div className="row" style={{ margin: "3%" }}>
        <div className="offset-lg-3 col-lg-6">
          <form className="container" onSubmit={handlesubmitProduct}>
            <div className="card" style={{ textAlign: "left" }}>
              <div className="card-title">
                <h3 style={{ textAlign: "center", paddingTop: "2%" }}>
                  Product Create
                </h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Product Name</label>
                      <input
                        type="text"
                       
                        name="prodname"
                       required
                        onChange={handleInput}
                        className="form-control"
                      ></input>
                      {errors.prodname && (
                        <span className="text-danger">{errors.prodname}</span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Product Price</label>
                      <input
                        type="number"
                        required
                        name="prodprice"
                        onChange={handleInput}
                        className="form-control"
                      ></input>
                      {errors.prodprice && (
                        <span className="text-danger">{errors.prodprice}</span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Stock Count</label>
                      <input
                        type="number"
                        required
                        name="stockcount"
                        onChange={handleInput}
                        className="form-control"
                      ></input>
                       {errors.stockcount && (
                        <span className="text-danger">{errors.stockcount}</span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Product Description</label>
                      <input
                        type="text"
                        required
                        name="proddesc"
                        onChange={handleInput}
                        className="form-control"
                      ></input>
                       {errors.proddesc && (
                        <span className="text-danger">{errors.proddesc}</span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Category Name</label>
                      <input
                        required
                        name="catname"
                        onChange={handleInput}
                        className="form-control"
                      ></input>
                       {errors.catname && (
                        <span className="text-danger">{errors.catname}</span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Product Image</label>
                      <input
                        required
                        name="prodimg"
                        onChange={handleInput}
                        className="form-control"
                      ></input>
                       <button className='btn btn-warning' onClick={validate} style={{margin:'2%'}} >validate</button>
                      {prodimgerror && (
                        <span className="text-danger">Please enter correct Image url</span>
                      )}
                       
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <button
                      className="btn btn-success"
                      style={{ margin: "2%" }}
                      type="submit"
                    >
                      Save
                    </button>
                    <Link
                      to="/dashboard/products"
                      style={{ margin: "2%" }}
                      className="btn btn-warning"
                    >
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductCreate;
