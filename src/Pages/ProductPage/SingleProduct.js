import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import img from "../../Images/vegetables.jpg";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./SingleProduct.css";
import ProductSlider from "./ProductSlider";
import { getProductById } from "../../Services/ProductService";
import { toast } from "react-toastify";
import { LoginContext } from "../../Contexts/LoginContext";
import { addItemtocart } from "../../Services/CartService";


function SingleProduct() {
    const navigate=useNavigate()
    const[reloadnavbar,setreloadnavbar]=React.useState(false);
  const prodId = useParams();
  const { login, setlogin } = useContext(LoginContext);
  const [productdata, setproductdata] = useState([]);
  const [activeimg, setactiveimg] = useState({});
  const [count, setCount] = useState(1);
 

  const addtocart=()=>{
    const cartdata={
        product_id:prodId.prodid,
        product_quantity:count
    }
    addItemtocart(cartdata,login.userName).then((response)=>{
        console.log(response);
    
        localStorage.setItem('cart',JSON.stringify(response))
        setreloadnavbar(!reloadnavbar)
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

  useEffect(() => {
    getProductById(prodId.prodid)
      .then((res) => {
        setproductdata(res);

        setactiveimg(res);

        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const imageset = [
    { id: 1, product_img: productdata.product_img },
    { id: 2, product_img: productdata.product_img },
    { id: 3, product_img: productdata.product_img },
  ];

  return (
    <div className="singleProduct">
      <Navbar reloadnavbar={reloadnavbar}/>

      <div className="pc1">
        <Link to={"/products"}>
          <button className="back">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Go Back
          </button>
        </Link>

        <div className="c11">
          <div className="imgset">
            {imageset &&
              imageset?.map((item, index) => {
                return (
                  <div
                    className="imgsmall"
                    onClick={() => {
                      setactiveimg(item);
                    }}
                  >
                    <img
                      src={item.product_img}
                      alt=""
                      className={activeimg.id == item.id ? "active" : ""}
                    />
                  </div>
                );
              })}
          </div>
          <div className="imgbig">
            <img src={activeimg.product_img} alt="hii" />
          </div>
        </div>
        <div className="c12">
          <h1 className="head1">{productdata.product_name}</h1>
          <div className="c121">
            <p className="price">Rs. {productdata.product_price}</p>
            <div className="incrdecr">
              <button
                onClick={() => {
                  if (count > 1) {
                    setCount(count - 1);
                  }
                }}
              >
                -
              </button>
              <p>{count}</p>
              <button
                onClick={() => {
                  if (count < 10) {
                    setCount(count + 1);
                  }
                }}
              >
                +
              </button>
            </div>
          </div>
          <div className="btncont">{login.loggedIn == true ?
            <button onClick={() => {addtocart()}}>Add to Cart</button> : (<div><button disabled="disabled" style={{backgroundColor:'grey'}}>Add to Cart</button></div>)}
            <button
              onClick={() => {
                
                navigate('/cart')
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="pc2">
        <h2 className="desc" style={{textAlign:'center'}}>Product Description</h2>
        <p className="description">{productdata.product_desc}</p>
      </div>

      <Footer />
    </div>
  );
}

export default SingleProduct;
