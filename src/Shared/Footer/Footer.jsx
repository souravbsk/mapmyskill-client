import React from 'react';
import './Footer.css'
const Footer = () => {
    return (
        <div className='footer'>
        <div className='container nav-list'>
            <div className='grid  lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 m-0'>
                <div className='flex flex-col justify-center'>
                    <h4>About</h4>
                    <ul>
                        <li>Who are we ?</li>
                        <li>Our commitment</li>
                        <li>Terms & conditions</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className='flex flex-col justify-center align-items: center;'>
                <h4>Courses</h4>
                    <ul>
                        <li>Maths</li>
                        <li>Physics</li>
                        <li>Programming</li>
                        <li>Biology</li>
                    </ul></div>
                <div className='flex flex-col align-items: center;'>
                <h4>Help</h4>
                    <ul>
                        <li>Need Help ?</li>
                        <li>Contact</li>
                    </ul></div>
                <div className='flex flex-col justify-center align-items: center;'>
                <h4>Follow Us</h4>
                    <ul>
                        <li></li>
                        <li>Our commitment</li>
                        <li>Terms & conditions</li>
                        <li>Privacy policy</li>
                    </ul></div>
            </div>
        
        </div>
        <p className=''>© 2023 Powered by ApnaByte</p>
    </div>
    );
};

export default Footer;