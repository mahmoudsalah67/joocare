import React, { useEffect } from 'react'
import Navbar from '../header/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../footer/Footer'

function Layout() {
  const location = useLocation();
  const path = location.pathname;

  const isLoginPage = path === '/login';
  const isJoinPage = path === '/joinnow';
  const isforcandidate = path === '/forcandidate';
   const isDetailsPage = path.startsWith('/details');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  const isAuthPage = isLoginPage || isJoinPage || isforcandidate;

  return (
    <>
      <Navbar 
        isLoginVariant={isLoginPage} 
        isjoinnow={isJoinPage} 
        isforcandidate={isforcandidate}
        isDetailsPage={isDetailsPage} 
      />
      
      <main>
        <Outlet />
      </main>

       {!isAuthPage && !isDetailsPage && <Footer />}
    </>
  );
}

export default Layout;