import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import { getordersById } from "../../Services/OrderService";
import './OrderInfo.css'


function OrderInfo() {
  const orderId = useParams();
  const [orderData, setorderData] = useState();

  useEffect(() => {
    getordersById(orderId.orderid)
      .then((res) => {
        setorderData(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Navbar reloadnavbar={false} />
      <div className="card" style={{ paddingBottom: "2%",height:'50vh'}}>
        
      <Link  to="/myorders" style={{textDecoration:'none'}} ><button className='btn btn-danger listing'>Back to Orders</button></Link>
       
            
        {orderData && (
          <div style={{ width: "80%", margin: "auto", fontSize: "medium"}}>
            <h5
              style={{
                color: "#55862C",
                fontWeight: "600",
                textAlign: "center",
                textTransform: "uppercase",
                paddingTop: "5px",
            
              }}
            >
              Order Detail List:
            </h5>

            <div className="cartcont">
              <table className="carttable">
                    <thead style={{color:'#55862C'}}>
                  <tr>
                    <th>Product Name</th>
                    <th>Product Quantity</th>
                    <th>Product Price</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData.orderDetailList.map((item, index) => {
                    return (
                      <tr key={index} className="cartitemrow">
                        <td td data-label="PRODUCT">
                          <div className="cartproduct">
                            <Link to={`/product/${item.productDto.product_id}`}>
                              <img
                                src={item.productDto.product_img}
                                alt={item.productDto.product_name}
                              />
                            </Link>

                            <span>{item.productDto.product_name}</span>
                          </div>
                        </td>
                        <td data-label="QUANTITY">
                          <p>{item.product_quantity}</p>
                        </td>
                        <td data-label="PRODUCT PRICE">
                          <p>Rs. {item.productDto.product_price}</p>
                        </td>
                        <td data-label="CATEGORY NAME">
                          <p>{item.productDto.category_name}</p>
                        </td>

                        <td></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <tr></tr>
          </div>
        )}{" "}
      </div>

      <Footer/>
    </div>
  );
}

export default OrderInfo;
