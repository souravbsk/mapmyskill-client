import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Shared/Header/Header';
import AOS from 'aos';
import 'aos/dist/aos.css';

import NewFooter from '../Shared/NewFooter/NewFooter';

const Main = () => {

    useEffect(()=>{
        AOS.init();
    },[])

    return (
        <div className='min-h-screen flex flex-col justify-between'>
            <Header></Header>
            <Outlet></Outlet>
        
            <NewFooter></NewFooter>
        </div>
    );
};

export default Main;