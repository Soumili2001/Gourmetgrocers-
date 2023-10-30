import React from "react";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import "./AboutUs.css";
import img from "../Images/subfooter.jpg";

function AboutUs() {
  return (
    <div>
      <Navbar reloadnavbar={false} />
      <div className="aboutusheader">
        <h2>GOURMET GROCERS</h2>
      </div>
      <div className="aboutcontainer">
        <div className="imagecontainer">
          <img src={img}></img>
        </div>

        <div className="aboutustext">
          Welcome to our grocery shopping application! We are dedicated to
          providing you with a seamless and convenient shopping experience right
          at your fingertips. With our website, you can browse through a wide
          selection of high-quality products, create personalized shopping
          lists, and have your groceries delivered to your doorstep with just a
          few taps. We understand the importance of saving time and effort, so
          our user-friendly interface and intuitive features make it easy for
          you to find exactly what you need and manage your grocery needs
          efficiently. Whether you're a busy professional, a parent juggling
          multiple responsibilities, or simply someone who appreciates the
          convenience of online shopping, our application is designed to cater
          to your unique requirements.
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
