import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import img from "../../Images/fruits1.jpeg";
import { Link } from "react-router-dom";
import "./AuthPage.css";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginContext } from "../../Contexts/LoginContext";
import { LoginNewUser } from "../../Services/UserServices";
import { getcart } from "../../Services/CartService";
function Login() {
  const { login, setlogin } = useContext(LoginContext);
  const navigate = useNavigate();

  const [loginname, setloginname] = useState("");
  const [loginpassword, setloginPassword] = useState("");

  const loginnameChangeHandler = (event) => {
    console.log(event.target.value);
    setloginname(event.target.value);
  };

  const loginpasswordChangeHandler = (event) => {
    console.log(event.target.value);
    setloginPassword(event.target.value);
  };

  const submitLoginFormHandler = (event) => {
    event.preventDefault();

    const user = {
      username: loginname,
      password: loginpassword,
    };

    LoginNewUser(user)
      .then((response) => {
        toast.success(response.message);
        const loggedInUser = {
          email: response.email,
          fullName: response.fullName,
          loggedIn: response.loggedIn,
          userId: response.userId,
          userRole: response.userRole,
          userName: response.username,
        };
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        setlogin(loggedInUser);

        const loggedinuser = localStorage.getItem("loggedInUser");
        var items = JSON.parse(loggedinuser);

        getcart(items.userName).then((res) => {
          //console.log(res);

          localStorage.setItem("cart", JSON.stringify(res));

          navigate("/");
        });
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
    <div className="authPage">
      <Navbar reloadnavbar={false} />
      <div className="authcont">
        <img src={img} alt="login" />
        <form className="authform" onSubmit={submitLoginFormHandler}>
          <h1>Login</h1>
          <div className="formgroup">
            <label htmlFor="username">UserName</label>
            <input required
              type="text"
              id="username"
              value={loginname}
              onChange={loginnameChangeHandler}
            />
          </div>

          <div className="formgroup">
            <label htmlFor="password">Password</label>
            <input required
              type="password"
              id="password"
              value={loginpassword}
              onChange={loginpasswordChangeHandler}
            />
          </div>

          <button className="btn" style={{ marginTop: "20px" }}>
            Login
          </button>
          <h2 className="or">OR</h2>
          <Link to="/register" className="stylenone">
            <button className="btn">Register</button>
          </Link>
        </form>
      </div>
      <div
        style={{
          backgroundColor: "rgb(240,240,240)",
          width: "100%",
          height: "1vh",
        }}
      ></div>
      <Footer />
    </div>
  );
}

export default Login;
