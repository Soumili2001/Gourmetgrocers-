import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../Contexts/LoginContext";
import { toast } from "react-toastify";
import {
  
  getCategoryById,
  updateCategories,
} from "../../Services/CategoryService";
import CategoryValidation from "../../Components/Validations/CategoryValidation";

function CategoryUpdate() {
  
  const catId = useParams();
  const navigate = useNavigate();
  const { login, setlogin } = useContext(LoginContext);
  const [values, setvalues] = useState({
    catname: "",
    catdesc: "",
    catimg: ""
  });
  const [errors, setErrors] = useState({});
  

  useEffect(() => {
    getCategoryById(catId.catid)
      .then((res) => {
        const newdetails={
          catname:res.category_name,
          catdesc:res.category_desc,
          catimg:res.cat_img,
        
        }
      setvalues(newdetails)
      
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    setErrors(CategoryValidation(values));
  }, [values]);
  function handleInput(event) {
    const newObj = { ...values, [event.target.name]: event.target.value };
    setvalues(newObj);
  }
  const handlesubmitProduct = (e) => {
    e.preventDefault();
    if (errors.catname || errors.catdesc || errors.catimg) {
      return toast.error("Enter correct details");
    }
    const catData = {
      category_name: values.catname,
      category_desc: values.catdesc,
      cat_img: values.catimg,
    };
    updateCategories(catData,values.catname, login.userName)
      .then((response) => {
        toast.success(response.message);
        navigate("/dashboard/categories");
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
                  Category Update
                </h3>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Category Name</label>
                      <input
                        required
                        value={values.catname}
                         name="catname" onChange={handleInput}
                     
                    
                        className="form-control"
                      ></input>
                      {errors.catname && (
                        <span className="text-danger">{errors.catname}</span>
                      )}
                     
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Category Description</label>
                      <input
                        required
                        value={values.catdesc} name="catdesc" onChange={handleInput}
                        className="form-control"
                      ></input>
                      {errors.catdesc && (
                        <span className="text-danger">{errors.catdesc}</span>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Category Image</label>
                      <input
                        required
                        value={values.catimg} name="catimg" onChange={handleInput}
                        className="form-control"
                      ></input>
                      {errors.catimg && (
                        <span className="text-danger">{errors.catimg}</span>
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
                      to="/dashboard/categories"
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

export default CategoryUpdate;
