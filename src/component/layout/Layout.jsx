import React, { useEffect } from 'react'
import Navbar from '../header/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../footer/Footer'

function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isJoinPage = location.pathname === '/joinnow';
  const isforcandidate = location.pathname === '/forcandidate';

   useEffect(() => {
    window.scrollTo(0,0);
  }, [location.pathname]);

   const isAuthPage = isLoginPage || isJoinPage || isforcandidate;

  return (
    <>
      <Navbar isLoginVariant={isLoginPage} isjoinnow={isJoinPage} isforcandidate={isforcandidate} />
      
      <main>
        <Outlet />
      </main>

       {!isAuthPage && <Footer />}
    </>
  )
}

export default Layout;