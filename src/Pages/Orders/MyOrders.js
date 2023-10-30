import React, { useContext, useEffect, useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../Components/Navbar/Navbar";
import { LoginContext } from "../../Contexts/LoginContext";
import { deleteordersById, getorders } from "../../Services/OrderService";
import Footer from "../../Components/Footer/Footer";

function OrderDetails() {
  const [orderdata, setorderdata] = useState([]);
  const { login, setlogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const LoadDetail = (id) => {
    navigate(`/myorders/${id}`);
  };

  const once = useRef(false);

  const loggedinuser = localStorage.getItem("loggedInUser");
  var items = JSON.parse(loggedinuser);

  const DeleteFunction = (username, id) => {
    if (window.confirm("Do you want to remove?")) {
      deleteordersById(username, id)
        .then((res) => {
          window.location.reload();
          toast.success(res.message);
        })
        .catch((err) => {

          toast.error(err?.response?.data?.message)
          
        });
    }
  };
  useEffect(() => {
    if (items === null) {
      if (!once.current) {
        toast.error("Please login...");
        navigate("/login");
      }
    } else {
      getorders(items.userName)
        .then((res) => {
          console.log(res);
          setorderdata(res);
        })
        .catch((err) => {
          console.log(err);
         
        });
    }
    return () => {
      once.current = true;
    };
  }, []);

  return (
    <div>
      <Navbar reloadnavbar={false} />
      <div className="container">
        <div className="card" style={{ marginTop: "2%",height:'50vh'}}>
          <div className="card-title">
            <h3 style={{ textAlign: "center", paddingTop: "5px" }}>
              My Orders
            </h3>
          </div>
          {orderdata.length != 0 ? (
            <div className="card-body" style={{ textAlign: "center" }}>
               <div class="table-responsive text-nowrap">
              <table className="table table-bordered">
                <thead style={{ color: "white", backgroundColor: "#55862C" }}>
                  <tr>
                    <td>Order Date</td>
                    <td>Total Amount</td>
                    <td>No. of Products</td>
                    <td>Payment Method</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {orderdata &&
                    orderdata.map((item) => (
                      <tr key={item.order_id}>
                        <td>{item.orderDate}</td>
                        <td>{item.totalPrice}</td>

                        <td>{item.quantity}</td>
                        <td>{item.paymentMethod}</td>
                        <td>
                          <a
                            onClick={() => {
                              LoadDetail(item.order_id);
                            }}
                            className="btn btn-warning probtn"
                          >
                            Details
                          </a>
                          <a
                            onClick={() => {
                              DeleteFunction(item.username, item.order_id);
                            }}
                            className="btn btn-danger probtn"
                          >
                            Cancel
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              </div>
            </div>
          ) : (
            <div className="emptycart">
              <p
                style={{
                  textAlign: "center",
                  color: "#55862C",
                  fontSize: "1.5rem",
                }}
              >
                No orders yet!
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default OrderDetails;
