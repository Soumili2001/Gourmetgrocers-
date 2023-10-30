import React, { useContext, useEffect } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import BannerSlider from '../Components/Banners/BannerSlider'
import HomeCategories from '../Components/Category/HomeCategories'
import Slider from 'react-slick'
import img from '../Images/subfooter.jpg'
import img1 from '../Images/vegetables.jpg'
import img2 from '../Images/fruits1.jpeg'
import img3 from '../Images/grains.jpg'
import img4 from '../Images/chicken.jpg'
import './Home.css'
import Footer from '../Components/Footer/Footer'
import ProductSlider from './ProductPage/ProductSlider'
import { getcart } from '../Services/CartService'
import { LoginContext } from '../Contexts/LoginContext'


const Home = () => {
  
  return (
    <div>
        <Navbar reloadnavbar={false}/>
        <BannerSlider/>
        <HomeCategories/>
        <div classname="bestProducts" style={{marginTop:'80px'}}>
          <div classname="top" style={{textAlign:'center',marginBottom:'50px'}}>
          <h3>Our Best-Seller Products</h3>
          <ProductSlider/>
          </div>
          

        </div>
        <div className='subfooter'>
        <div className='left' >
            <img src={img} alt='img' />
        </div>
        <div className='right'>
            <h1>Freshness Delivered to Your Doorstep!</h1>
            <p>Discover a world of fresh flavors and abundant variety at our premier grocery store. From farm-fresh produce to pantry essentials, we're your one-stop shop for all your culinary needs.</p>
        </div>
    </div>
    <Footer/>
      </div>
      
  )
}

export default Home