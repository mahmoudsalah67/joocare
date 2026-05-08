import React from "react";
import { MdArrowForwardIos, MdKeyboardArrowDown } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { NavLink, Link, Links } from "react-router-dom";  
import logo from "../../../public/imge/Group 7.svg";

function Navbar({ isLoginVariant, isjoinnow,isforcandidate }) {
  const isAuthPage = isLoginVariant || isjoinnow || isforcandidate; 

  const normalLink = "pb-1 text-gray-700 hover:text-[#00694B] hover:border-b-2 border-green-600 transition duration-300";
  const activeLink = "pb-1 text-[#00694B] border-b-2 border-[#00694B] font-bold";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="container mx-auto px-30">
        <div className="flex items-center justify-between py-4">
          
          <div className="logo-section flex items-center gap-2">
            <Link to="/" className="logo flex flex-col items-center justify-center">
              <img src={logo} alt="logo" />
            </Link>
          </div>

           {!isAuthPage && (
            <>
              <div className="hidden md:flex justify-center">
                <ul className="flex gap-8">
                  <li><NavLink to="/" className={({ isActive }) => isActive ? activeLink : normalLink}>Home</NavLink></li>
                  <li><NavLink to="/about" className={({ isActive }) => isActive ? activeLink : normalLink}>About</NavLink></li>
                  <li><NavLink to="/jobs" className={({ isActive }) => isActive ? activeLink : normalLink}>Jobs</NavLink></li>
                  <li><NavLink to="/contact" className={({ isActive }) => isActive ? activeLink : normalLink}>Contact</NavLink></li>
                </ul>
              </div>

              <div className="flex items-center gap-2">
                <NavLink to='/login' className="px-5 py-2 bg-[#00694B] text-white rounded-full font-medium hover:bg-black transition duration-300 cursor-pointer">Login</NavLink>
                <NavLink to='/joinnow' className="px-5 py-2 bg-white text-black border border-gray-200 rounded-full hover:bg-[#00694B] hover:text-white transition duration-500 cursor-pointer">Join Now</NavLink>
                <div className="flex items-center gap-1 text-gray-600 p-2 rounded-full hover:bg-[#00694B] hover:text-white transition duration-500 cursor-pointer">
                  <TbWorld /><span className="text-sm font-bold">EN</span><MdKeyboardArrowDown />
                </div>
                
                <NavLink to={'/foremployer'} className="py-[16px] px-[32px] cursor-pointer  rounded-[12px] border-[1px] border-transparent hover:border-[black] transition duration-500 flex items-center gap-[10px]">For Employer <MdArrowForwardIos/></NavLink>

              </div>
            </>
          )}
           {isAuthPage && (
            <div className="flex items-center justify-between gap-[18px]">
             {!isforcandidate ?  <Link to={'/forcandidate'}>
                <button className="py-[16px] px-[32px] cursor-pointer bg-black rounded-full text-white">For Employer</button>
              </Link> :  <Link to={'/joinnow'}>
                <button className="py-[16px] px-[32px] cursor-pointer bg-black rounded-full text-white">For candidate</button>
              </Link>}
              <div className="flex items-center gap-1  text-gray-600 cursor-pointer select-none hover:bg-[#00694B] transition duration-500 p-2 rounded-full hover:text-white ">
                <TbWorld />
                <span className="text-sm font-bold">EN</span>
                <MdKeyboardArrowDown />
              </div>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;