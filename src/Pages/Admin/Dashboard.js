import React, { useContext, useEffect, useRef } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import { Card, Row, Col, Container } from "react-bootstrap";
import './Dashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../../Images/vegetables.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../Contexts/LoginContext';
import { toast } from 'react-toastify';
import Footer from '../../Components/Footer/Footer';


function Dashboard() {
  const navigate=useNavigate();
  const { login, setlogin } = useContext(LoginContext);
  const once = useRef(false);
  const loggedinuser = localStorage.getItem("loggedInUser");
var items=JSON.parse(loggedinuser);
useEffect(()=>{
  if(items === null){
    if(!once.current){
      
          toast.error("Please login...")
          navigate("/login");
        }
      }
      else if(items.userRole === 'user'){
        if(!once.current){
        toast.error("Not allowed to continue...")
        navigate("/home");
        }}
 

  return () => {
    once.current = true;
  };
   
    }, []);
  return (
    <div>
        <Navbar reloadnavbar={false}/>
        <div className='cardcontainer'>
        <ul className="cards">
    <li className="cards_item">
      <div className="card">
        <div className="card_image"><img src='https://media.istockphoto.com/id/622795204/photo/red-delicious-apples.jpg?s=612x612&w=0&k=20&c=-uu4u0m62t1nz3kcOVkallOgSWoOj_KtcVTCIlyfpXY=' /></div>
        <div className="card_content">
          
         
         <Link to='/dashboard/products' style={{textDecoration:'none'}}> <button className="btn card_btn">Manage Products</button></Link>
        </div>
      </div>
    </li>
    <li className="cards_item">
      <div className="card">
        <div className="card_image"><img src="https://domf5oio6qrcr.cloudfront.net/medialibrary/12257/conversions/b599a20a-a453-425a-9d2f-fa2ff8ba2776-thumb.jpg"/></div>
        <div className="card_content">
          <h2 className="card_title"></h2>
        
          <Link to='/dashboard/categories' style={{textDecoration:'none'}}> <button className="btn card_btn">Manage Categories</button></Link>
        </div>
      </div>
    </li>
    <li className="cards_item">
      <div className="card">
        <div className="card_image"><img src="https://images.moneycontrol.com/static-mcnews/2021/04/E-commerce-770x433.jpg?impolicy=website&width=770&height=431" /></div>
        <div className="card_content">
          
         
        <Link to='/dashboard/orders' style={{textDecoration:'none'}}><button className="btn card_btn">Manage Orders</button></Link>
        </div>
      </div>
    </li></ul>
     </div>
     
    <Footer/></div>
  )
}

export default Dashboard