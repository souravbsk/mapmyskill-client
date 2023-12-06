import React from 'react';
import Banner from './Banner/Banner';
import Request from './Request/Request';
import HowItWork from './HowItWork/HowItWork';
import Banner2 from './Banner2/Banner2';
import NewBanner from './newBanner/newBanner';

import Services from './Services/Services';
import Testimonials from './Testimonials/Testimonials';
import Tutors from './Tutors/Tutors';
import Stats from './Stats/Stats';
import Faq from './Faq/Faq';


const Home = () => {
    return (
        <div>
              <NewBanner></NewBanner>
            <Request></Request>
            <HowItWork></HowItWork>

         <div className='lg:px-[100px] px-2'>
         <Services></Services>
            <Testimonials></Testimonials>
            <Faq></Faq>
           
            <Tutors></Tutors>
            <Stats></Stats>
         </div>

        </div>
    );
};

export default Home;