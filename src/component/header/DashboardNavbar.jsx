import React from "react";
import { NavLink, Link } from "react-router-dom";
import { MdNotificationsNone, MdKeyboardArrowDown, MdLanguage } from "react-icons/md";
import logoo from "../../../public/imge/logoo.svg";

function DashboardNavbar() {
  const activeLinkk = "text-[#00694B] font-semibold border-b-2 border-[#00694B] pb-1";
  const normalLinkk = "text-[#4D4D4D] font-medium hover:text-[#00694B] transition-all";

  return (
    <nav className="fixed px-30 top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="container mx-auto px-10 flex items-center justify-between py-4 w-full">
        <div className="logo-section flex items-center">
          <Link to="/" className="logo">
            <img src={logoo} alt="JooCare Logo" className="h-10" />
          </Link>
        </div>

        <div className="flex items-center gap-10">
          <ul className="flex items-center gap-8 list-none">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? activeLinkk : normalLinkk)}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => (isActive ? activeLinkk : normalLinkk)}>About</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? activeLinkk : normalLinkk)}>Contact</NavLink>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative p-2 bg-gray-50 rounded-full cursor-pointer hover:bg-gray-100 transition-colors">
            <MdNotificationsNone className="text-2xl text-gray-700" />
            <span className="absolute top-1 right-1 bg-[#00694B] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-white">2</span>
          </div>

          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 bg-[#2D3134] rounded-full flex items-center justify-center text-white font-bold group-hover:ring-2 group-hover:ring-[#00694B] transition-all">A</div>
            <MdKeyboardArrowDown className="text-gray-500 group-hover:text-[#00694B]" />
          </div>

          <div className="flex items-center gap-1 cursor-pointer text-gray-700 hover:text-[#00694B] transition-colors">
            <MdLanguage className="text-xl" />
            <span className="font-semibold text-sm uppercase">En</span>
            <MdKeyboardArrowDown />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default DashboardNavbar;