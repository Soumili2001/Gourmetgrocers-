import React from 'react'
import './Footer.css'

import logo from '../../Images/logo5.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faYoutube,faGithub, faInstagram, faFacebookF, faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='footer'>
      <div className='footerin1'>
        <div className='f1'>
          <img src={logo} alt='logo' className='logo'/>
          <p>At our grocery shop, we are passionate about providing you with exceptional quality products. With a curated selection, we strive to be your trusted destination for all your grocery needs.</p>
        
        </div>

        <div className='f2'>
          <h3>Useful Links</h3>
          <Link  className='astyle' to="/home" style={{ textDecoration: "none",color:'inherit'}}>
          <p> Home</p>
       </Link>
       <Link  className='astyle' to="/about" style={{ textDecoration: "none",color:'inherit'}}>
          <p>About Us</p>
       </Link>
       <Link  className='astyle' to="/products" style={{ textDecoration: "none",color:'inherit'}}>
          <p>Products</p>
       </Link>
        
          
        </div>
        
        <div className='f3'>
          
          
          <FontAwesomeIcon icon={faYoutube
        } className="icons"></FontAwesomeIcon>
         <FontAwesomeIcon icon={faGithub
        }className="icons"></FontAwesomeIcon>
         <FontAwesomeIcon icon={faInstagram
        }className="icons"></FontAwesomeIcon>
         <FontAwesomeIcon icon={faFacebookF
        }className="icons"></FontAwesomeIcon>
         <FontAwesomeIcon icon={faLinkedin
        }className="icons"></FontAwesomeIcon>
        </div>
      </div>
      <div className='footerin2'>
        <h3>© Copyright 2023 Gourmet Grocers, Inc. All rights reserved</h3>
      </div>
    </div>
  )
}

export default Footer