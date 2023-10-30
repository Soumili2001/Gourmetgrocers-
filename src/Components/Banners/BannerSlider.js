import React from 'react'
import img1 from '../../Images/banner1.jpg'
import img2 from '../../Images/banner2.jpg'
import img3 from '../../Images/banner3.jpg'
import img4 from '../../Images/banner4.jpg'

import Slider from 'react-slick'
import './BannerSlider.css'
import { Link } from 'react-router-dom'

function BannerSlider() {
    const data=[
        {
            id:1,
            image:img1,
            title:'Fresh Vegetables & Fruits at your doorstep',
            description:'Immerse yourself in a garden of fresh, colorful fruits and vegetables, a feast for both the eyes and the palate.',
            button:'https://www.google.com'
        },
        {
          id:2,
          image:img2,
          title:'Premium  Quality Farm fresh Eggs and Meat',
          description:'Indulge in a mouthwatering selection of farm-fresh eggs and premium cuts of meat, satisfying your cravings.',
          button:'https://www.google.com'
           
        },
        {
          id:3,
          image:img3,
          title:'Be Organic and Healthy',
          description:'Discover a wholesome assortment of whole grains and premium oils, elevating your culinary creations.',
          button:'https://www.google.com'
      },{
        id:4,
        image:img4,
        title:'Exotic seafood and fish',
        description:'Dive into an exotic array of ocean-fresh seafood and succulent fish, delivering a taste of the sea to your table.',
        button:'https://www.google.com'
      }

    ]
    var settings={
      dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    speed:500,
    pauseOnHover: true,
  
    };

  return (
    <div className='bannerslider'>
<Slider className='bannerslider' {...settings}>
{
  data.map(item =>{
    return(
      <div className='imagecont' key={item.id}>
        <img src={item.image} alt='noimg'/>
        <div className='content'>
          <h1>{item.title}</h1>
          <span>{item.description}</span>
          <button className='bannerbtn'><Link className='bannerbtn' to='/products'>Shop More</Link></button>
        </div>
      </div>
    );
  })
}

</Slider>

    </div>
  )
}

export default BannerSlider