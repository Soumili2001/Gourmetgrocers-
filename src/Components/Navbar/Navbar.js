import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../Images/logo5.png";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../Contexts/LoginContext";
import { LogoutUser } from "../../Services/UserServices";
import { toast } from "react-toastify";
import { getAllProducts } from "../../Services/ProductService";


let divstyle = {
  backgroundColor: "#55862C",
  color: "white",
  borderRadius: "50%",
  position: "absolute",
  Width: "25px",
  height: "25px",
  padding: "9px",
  top: "-15px",
  right: "-15px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "12px",
  textAlign: "center",
};
const Navbar = ({ reloadnavbar }) => {
  const [cartQty, setcartQty] = useState(0);
  const navigate = useNavigate();
  const [input, setinput] = useState("");
  const [result, setresult] = useState([]);
  const [shows3, setshows3] = useState(false)
  const { login, setlogin } = useContext(LoginContext);

  

  const fetchData = (value) => {
    getAllProducts()
      .then((res) => {
        console.log(res);
        const results = res.filter((product) => {
          return (
            product &&
            product.product_name &&
            product.product_name.toLowerCase().includes(value)
          );
        });

        console.log(results);
        setresult(results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (value) => {
    setinput(value);
    fetchData(value);
  };
  const handlesubmitsearch = () => {
    if (result.length === 0) {
      alert("No item for this Search");
    } else {
      navigate(`/product/${result[0].product_id}`);
    }
  };

  const submitFormHandler = (event) => {
    event.preventDefault();

    console.log(login.userName);
    LogoutUser(login.userName)
      .then((response) => {
        console.log(response);
        localStorage.clear();
        toast.success(response.message);
        setlogin({
          loggedIn: false,
        });
        localStorage.clear();

        navigate("/");
      })
      .catch((err) => {
        console.log(err);

        toast.error(err?.response?.data?.message);
      });
  };
  const getcarttotal = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      let total = 0;
      cart.cartItem.forEach((item) => {
        total += item.quantity;
      });
      setcartQty(total);
    } else {
      setcartQty(0);
    }
  };

  useEffect(() => {
    getcarttotal();
  }, [reloadnavbar]);

  return (
    <nav>
      <div className="s1">
        <Link to="/home" style={{ textDecoration: "none" }}>
        
          <img src={logo} alt="logo" className="logo"></img>
        </Link>
        <div className="searchbar">
          <input
            type="text"
            placeholder="Search for different products"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            className="search"
      />
          <button onClick={(e) => handlesubmitsearch()}>
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
        <div className="right">
          {login.loggedIn === true ? (
            <div className="cart">
              <span classname="qty" style={divstyle}>
                {cartQty}
              </span>
              <Link
                to={"/cart"}
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "inherit",
                }}
              >
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
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </Link>
            </div>
          ) : (
            <div></div>
          )}

          <span className="ustyle">
            {login.loggedIn === true ? (
              <span>Hello! {login.userName}</span>
            ) : (
              <div></div>
            )}
          </span>
          <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">
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
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </Dropdown.Toggle>
            <Dropdown.Menu className="user">
              {login.loggedIn === true ? (
                <div>
                  <Dropdown.Item>
                    <Link className="u" to={"/myorders"}>
                      My Orders
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={submitFormHandler}>
                    <Link className="u">Logout</Link>
                  </Dropdown.Item>
                </div>
              ) : (
                <div>
                  <Dropdown.Item>
                    <Link className="u" to="/login">
                      Login
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link className="u" to={"/register"}>
                      Register
                    </Link>
                  </Dropdown.Item>
                </div>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="s2">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <p className="astyle">Home</p>
        </Link>

        <Link to={"/about"} style={{ textDecoration: "none" }}>
        
          <p className="astyle">About Us</p>
        </Link>
        <Link to="/products" style={{ textDecoration: "none" }}>
          <p className="astyle">Products</p>
        </Link>

        
        {login.userRole == "Admin" ? (
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <p className="astyle">Admin</p>
          </Link>
        ) : (
          <div></div>
        )}
      </div>
      {
                shows3 ?
                    <div className='s3'>
                        <div className='s31'>
                          
                        <Link to="/home" style={{ textDecoration: "none" }}>
        
        <img src={logo} alt="logo" className="logo" style={{width:'50%'}} ></img>
      </Link>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick={() => setshows3(!shows3)}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>

                        <div className='searchbar'>
                        <input
            type="text"
            placeholder="Search for different products"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            className="search"
          />
          <button onClick={(e) => handlesubmitsearch()}>
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
                        </div>

                        <ul className='s32'>
                          <li>
                        <Link to="/home" style={{ textDecoration: "none",color:'inherit' }}>
          <p className="astyle">Home</p>
        </Link></li>

        <li><Link to={"/about"} style={{ textDecoration: "none",color:'inherit' }}>
        
          <p className="astyle">About Us</p>
        </Link></li>

        <li><Link to="/products" style={{ textDecoration: "none" ,color:'inherit'}}>
          <p className="astyle">Products</p>
        </Link>
</li>
        
        {login.userRole == "Admin" ? (
        <li>  <Link to="/dashboard" style={{ textDecoration: "none",color:'inherit'}}>
            <p className="astyle">Admin</p>
          </Link></li>
        ) : (
          <div></div>
        )}
                           

                           


                           

                            <li>
                                

                                {login.loggedIn === true ? (
            <div className="cart">
              <span classname="qty" style={divstyle} >
                {cartQty}
              </span>
              <Link
                to={"/cart"}
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "inherit",
                }}
              >
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
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </Link>
            </div>
          ) : (
            <div></div>
          )}

                                

          <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">
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
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </Dropdown.Toggle>
            <Dropdown.Menu className="user">
              {login.loggedIn === true ? (
                <div>
                  <Dropdown.Item>
                    <Link className="u" to={"/myorders"}>
                      My Orders
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={submitFormHandler}>
                    <Link className="u">Logout</Link>
                  </Dropdown.Item>
                </div>
              ) : (
                <div>
                  <Dropdown.Item>
                    <Link className="u" to="/login">
                      Login
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link className="u" to={"/register"}>
                      Register
                    </Link>
                  </Dropdown.Item>
                </div>
              )}
            </Dropdown.Menu>
          </Dropdown>
                            </li>

                          
                        </ul>
                    </div>
                    :
                    <div className='s3'>
                        <div className='s31'>
                            <img src={logo} alt='logo' className='logo' style={{width:'50%'}}/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"
                                onClick={() => setshows3(!shows3)}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>

                        </div>
                    </div>
            }
    </nav>
  );
};

export default Navbar;
