import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import img from '../../Images/banner1.jpg'
import './ShippingContainer.css'
import './OrderSuccessfull.css'
import { toast } from "react-toastify";
import './Cart.css'
import './Progress.css'
import './CartContainer.css'
import './PaymentContainer.css'
import { deletecartItem, getcart } from '../../Services/CartService'
import { LoginContext } from '../../Contexts/LoginContext'
import { Link, useNavigate} from 'react-router-dom'
import { getorders, placeorders } from '../../Services/OrderService';
import { useRef } from 'react'
function Cart() {
    const[reloadnavbar,setreloadnavbar]=React.useState(false);
    const [cartdata, setcartdata] = useState([]);
    const { login, setlogin } = useContext(LoginContext);
    const[active,setactive]=useState(1);
    const loggedInUser = localStorage.getItem("loggedInUser");
    var items=JSON.parse(loggedInUser);
    const[address,setaddress]=useState([]);
    const[youraddress,setyouraddress]=useState('');
    const[finaladdress,setfinaladdress]=useState('');
    const[previousaddress,setpreviousaddress]=useState('');
    const[paymentmethod,setpaymentmethod]=useState('');
    const[checked,setCheck] = useState(false);

    const navigate = useNavigate();

    const setyouraddressChangeHandler = (event=>{
      console.log(event.target.value);
      setyouraddress(event.target.value);
    });
  
    const placeorderfunction=()=>{
      const orderdata={
        address:finaladdress,
        paymentMethod:paymentmethod
      }
      placeorders(orderdata,items.userName).then((res)=>{
        //console.log(res);
        getcartitemsfromlocalstorage();
        setactive(4);
        

      })
    }

    const getmyorders=()=>{
getorders(items.userName).then((res)=>{
    console.log(res);
 setaddress(res);
})
    }
    const removeItemfromcart= (id)=>{
      //alert('gg');
      deletecartItem(id,login.userName).then((response)=>{
       
        getcartitemsfromlocalstorage();
       
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
    const getcartitemsfromlocalstorage = () => {
       
       
        getcart(items.userName)
          .then((res) => {
           
            console.log(res);
            localStorage.setItem('cart',JSON.stringify(res))
            setreloadnavbar(!reloadnavbar)
            let cart=JSON.parse(localStorage.getItem('cart'))
            setcartdata(cart);
            
          
          })
          .catch((err) => {
            console.log(err);
          });
    }
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
  
  
       
     else{
       getcartitemsfromlocalstorage();
       getmyorders();
     }
     return () => {
      once.current = true;
    };
      }, []);
     


      const radioClickHandler = (event=>{
        setCheck(!checked);
      })
    
  
  
  return (
    
    <div>
      
      
        <Navbar reloadnavbar={reloadnavbar}/>
        <div className='singlebanner'>
        <div className='bannerimgfilter'></div>
        <img className='bannerimg' src={img} alt='noimg' />
        <div className='bannerheading'>
            <h1>My Cart</h1>
        </div>
    </div>
    {login.loggedIn === true?
    
<div className='cart'>
    <div className='progress'>
{
    active ==1 ?(<div className='c11' onClick={()=>{setactive(1)}}>
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
<span>My Cart</span>
</div>) :
   ( <div className='c1' onClick={()=>{
    setactive(1)
   }}>
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
<span>My Cart</span>
   </div>)}

   {
active ==2 ?(<div className='c11' onClick={()=>{
  
  if(!(cartdata.totalPrices == 0.0))
  {
      setactive(2);
    }}}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
</svg>

<span>Shipping</span>
</div>) :
( <div className='c1' onClick={()=>{
  if(!(cartdata.totalPrices == 0.0))
                {
                    setactive(2);
                  }
}}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
</svg>

<span>Shipping</span>
</div>)

   }
   {
    active ==3 ?(<div className='c11' onClick={()=>{
      
        if(!finaladdress.length==0){
          setactive(3)}}}>
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
</svg>

<span>Payment</span>
</div>) :
   ( <div className='c1' onClick={()=>{
    if(!finaladdress.length==0){
      setactive(3)}
   }}>
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
</svg>

<span>Payment</span>
   </div>)}
   {
    active ==4 ?(<div className='c11'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
</svg>


<span>Order</span>
</div>) :
   ( <div className='c1'
  >
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
</svg>


<span>Order</span>
   </div>)}


    </div>
    {active ==1 && <div className='cartcont'>
        {
            !cartdata.totalPrices == 0.0 ?
            <table className='carttable'>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Total Price</th>
                        <th>Remove</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
     cartdata.cartItem.map((item,index)=>{
return(
    <tr key={index} className="cartitemrow">
        <td data-label="Product">
            <div className='cartproduct'>
            <Link to ={`/product/${item.produtDto.product_id}`}>
            <img src={item.produtDto.product_img} alt={item.produtDto.product_name}/></Link>
            
        <p>{item.produtDto.product_name}</p>
        </div>
        </td>
        <td  data-label="Quantity">
                            
           
            <p>{item.quantity}</p>
            
        </td>
        <td 
                              data-label="Price"
                            >
            <p>Rs. {item.produtDto.product_price}</p>
        </td>
        <td data-label="Total Price">
            <p>Rs. {item.totalPrice}</p>
        </td>
        <td data-label="Remove">
            <div className='delbtn' onClick={()=>{removeItemfromcart(item.produtDto.product_id)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z" />
</svg>

            </div>
        </td>
    </tr>
)
})
                    }
                    <tr>
                        <td></td><td></td>
                        <td className='totaltableleft'>Total Cart Amount: </td>
                        <td className='totaltableright'>
                            Rs. {cartdata.totalPrices}
                        </td>
                    </tr>
                </tbody>
            </table>
            :
            <div className='emptycart'>
                <p>Your cart is empty</p>
                </div>
        }
     
        </div>}
        {active ==2 && <div className='shippingcont'>
       <div className='previous'>
        <h2 className='mainhead1'>Previous saved address</h2>
        {
            address.length >0 ?
            address.map((item,index) =>{
             return(
                <div className='radio' key={index}>
                    <input type='radio'name='address' id={index} onClick={()=>{
                      setpreviousaddress(item.address);
                      setfinaladdress(item.address)
                    }} value={item.address}/>
                    <span>{
             item.address       
            }</span>
            </div>
             )
            }) :<div className='emptyaddress'>
                <p>No address found</p>
                </div>
        }
       
        </div>
    <h3>OR</h3>
    <div className='shippingadd'>
        <input type='text' placeholder='Enter New address' value={youraddress} onChange={setyouraddressChangeHandler}></input>
        <button onClick={()=>{
          if(youraddress.length != 0){
          setfinaladdress(youraddress);}
          else{
            setfinaladdress(previousaddress);
          }
        }}>Save</button>
        </div>
        </div>}
        
        {active ==3 && <div className='paymentcont'>
            <h2 className='mainhead1'>Select Payment method</h2>
            <div className='paymenttypes'>
                <div className='c1'>
                    <input type='radio' name='payment' id='payment1' value={'cash'} onClick={()=>{
                      setpaymentmethod('cash')
                    }}></input>
                    <img src="https://www.pngkey.com/png/full/11-114087_cash-in-hand-icon.png"/>
                    </div>
                    <div className='c1'>
                    <input type='radio' name='payment' id='payment2' value={'upi'} onClick={()=>{
                      setpaymentmethod('upi')
                    }}></input>
                    <img src="https://i0.wp.com/financebuddha.com/blog/wp-content/uploads/2016/12/23155635/UPI1.jpg?fit=1024%2C768&ssl=1"/>
                    </div>
                    <div className='c1'>
                    <input type='radio' name='payment' id='payment3' value={'card'} onClick={()=>{
                      setpaymentmethod('card')
                    }}></input>
                    <img src="https://www.pinclipart.com/picdir/middle/48-488752_credit-card-atm-card-logo-png-clipart.png"/>
                    </div>
                </div>
                <div
              className='paymentagreement'
            >
             
            </div>
            <div className='c2'>
              <span>Net Total</span>
              &nbsp;&nbsp;
              <span>$ {cartdata.totalPrices}</span>
            </div>
       
        </div>}
        {active ==4 && <div className='ordercont'>
        <div className='ordersuccessfull'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>

            <h2 className='mainhead1'>Order Placed Successfully</h2>
            <p>Thank you for shopping with us</p>
          </div>
        </div>}


        {/* CART BUTTONS*/}
        {
            active==1  && <div className='btns'>
                <button className='nextbtn' onClick={()=>{
                  if(!(cartdata.totalPrices == 0.0))
                {
                    setactive(2);
                  }
                }}>
                    Next
                </button>
            </div>
        }
         {
            active==2 && <div className='btns'>
                <button className='backbtn' onClick={()=>{
                    setactive(1)
                }}>
                    Back
                </button>
                <button className='nextbtn' onClick={()=>{
                  if(!finaladdress.length==0){
                    setactive(3)}
                }}>
                    Next
                </button>
            </div>
        }
        {
            active==3 && <div className='btns'>
                <button className='backbtn' onClick={()=>{
                    setactive(2)
                }}>
                    Back
                </button>
                <button className='nextbtn'
                onClick={
                  ()=>{
                  if(!paymentmethod.length ==0){
                  placeorderfunction();
                  }}}
               >
                    Place Order
                </button>
            </div>
        }
         {
            active==4 && <div className='btns'>
               
               <Link to={'/myorders'}> <button className='nextbtn'          >
                    Go to Orders
                </button></Link>
            </div>
        }
    </div>:(<div></div>)}

        <Footer/>
    </div>)


    
      }



export default Cart