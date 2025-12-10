import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';
import logo from '../../assets/logo.png'; // replace with your actual logo
import facebook_icon from '../../assets/facebook_icon.png';
import twitter_icon from '../../assets/twitter_icon.png';
import linkedin_icon from '../../assets/linkedin_icon.png';
const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>

        {/* Left Section */}
        <div className='footer-content-left'>
          <div className='footer-logo'>  
             <a href="#explore-menu">
                <img src={logo} alt="Foodify Logo" style={{ width: "120px", borderRadius: "10px" }} />
             </a>
          </div>
          <p>
            Crave it. Click it. Get it – Foodify!<br></br> Order your favorite meals quickly and easily.
          </p>
          <div className='footer-social-icons'>
            <img src={facebook_icon} alt="Facebook" />
            <img src={twitter_icon} alt="Twitter" />
            <img src={linkedin_icon} alt="" />
          </div>
        </div>

        {/* Center Section */}
        <div className='footer-content-center'>
          <h2>Company</h2>
          <ul>
            <li onClick={() => navigate('/')}>Home</li>
            <li onClick={() => navigate('/about')}>About Us</li>
            <li onClick={() => navigate('/delivery')}>Delivery</li>
            <li onClick={() => navigate('/privacy-policy')}>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className='footer-content-right'>
          <h2>Get In Touch</h2>
          <ul>
            <li>+91 9876543210</li>
            <li>support@foodify.com</li>
          </ul>
        </div>

      </div>

      <hr />
      <p className='footer-copyright'>
        © {new Date().getFullYear()} Foodify. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
