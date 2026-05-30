import React, { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { MdLanguage, MdNotificationsNone, MdKeyboardArrowDown } from "react-icons/md";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";  
import { FiSettings, FiBookmark, FiLogOut, FiUser } from "react-icons/fi"; // أيقونات القائمة الجديدة
import logo from "../../../public/imge/Group 7.svg";
import logoo from "../../../public/imge/logoo.svg";

function Navbar({ isLoginVariant, isLoginVariant2, isjoinnow, isforcandidate, isDetailsPage }) {
  const isAuthPage = isLoginVariant || isLoginVariant2 || isjoinnow || isforcandidate;
  const location = useLocation();
  const navigate = useNavigate();

  // 1. قراءة حالة التسجيل الحقيقية من الـ localStorage
  const [token, setToken] = useState(localStorage.getItem('user_token'));
  const [userName, setUserName] = useState(localStorage.getItem('user_name') || "User");
  const [userTitle, setUserTitle] = useState(localStorage.getItem('user_title') || "Consultant Internist");

  // 2. State للتحكم في فتح وقفل قائمة الـ Profile Dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // تحديث البيانات فوراً عند تنقل المستخدم بين الصفحات
  useEffect(() => {
    setToken(localStorage.getItem('user_token'));
    setUserName(localStorage.getItem('user_name') || "User");
    setUserTitle(localStorage.getItem('user_title') || "Consultant Internist");
  }, [location]);

  // 3.دالة تسجيل الخروج (Logout)
  const handleLogout = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_title');
    setToken(null);
    setIsDropdownOpen(false);
    navigate("/"); // التوجيه لصفحة الهوم       
    window.location.reload(); // لإعادة بناء الـ Navbar على الوضع الافتراضي
  };

  const normalLink = "pb-1 text-gray-700 hover:text-[#00694B] hover:border-b-2 border-green-600 transition duration-300";
  const activeLink = "pb-1 text-[#00694B] border-b-2 border-[#00694B] font-bold";

  const activeLinkk = "text-[#00694B] font-semibold border-b-2 border-[#00694B] pb-1";
  const normalLinkk = "text-[#4D4D4D] font-medium hover:text-[#00694B] transition-all";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md select-none">
      <div className="container mx-auto px-30">
        <div className="flex items-center justify-between py-4">

          {/* الـ Logo الافتراضي */}
          {!isDetailsPage && (
            <div className="logo-section flex items-center gap-2">
              <Link to="/" className="logo flex flex-col items-center justify-center">
                <img src={logo} alt="logo" />
              </Link>
            </div>
          )}
           

          {/* تصميم صفحة الـ Details */}
          {isDetailsPage && (
            <nav className="flex items-center justify-between px-10 py-4 w-full">
              <div className="logo-section flex items-center">
                <Link to="/details" className="logo">
                  <img src={logoo} alt="JooCare Logo" className="h-10" />
                </Link>
              </div>

              <div className="flex items-center gap-10">
                <ul className="flex items-center gap-8 list-none">
                  <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? activeLinkk : normalLinkk)}>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about" className={({ isActive }) => (isActive ? activeLinkk : normalLinkk)}>
                      About
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact" className={({ isActive }) => (isActive ? activeLinkk : normalLinkk)}>
                      Contact
                    </NavLink>
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-6">
                <div className="relative p-2 bg-gray-50 rounded-full cursor-pointer hover:bg-gray-100 transition-colors">
                  <MdNotificationsNone className="text-2xl text-gray-700" />
                  <span className="absolute top-1 right-1 bg-[#00694B] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
                    2
                  </span>
                </div>

                {/* زر الـ Profile المطور لصفحة الـ Details */}
                <div className="relative flex items-center gap-2 cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <div className="w-10 h-10 bg-[#2D3134] rounded-full flex items-center justify-center text-white font-bold uppercase">
                    {userName[0]}
                  </div>
                  <MdKeyboardArrowDown className={`text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  
                  {/* القائمة المنسدلة (Dropdown Menu) كامة التفاصيل */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 top-12 w-[280px] bg-white border border-gray-100 rounded-2xl shadow-xl py-5 px-4 z-50 flex flex-col gap-4">
                      <div className="flex items-center gap-3 border-b pb-3 border-gray-100">
                        <div className="w-12 h-12 bg-[#2D3134] rounded-full flex items-center justify-center text-white text-lg font-bold uppercase">
                          {userName[0]}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-[#0D0D0D] text-[16px]">{userName}</span>
                          <span className="text-gray-500 text-[13px]">{userTitle}</span>
                        </div>
                      </div>
                      <Link to="/profile" className="w-full py-2 border border-black rounded-full text-center font-semibold text-sm hover:bg-gray-50 transition">
                        View Profile
                      </Link>
                      <div className="flex flex-col gap-1 text-gray-600 font-medium text-sm">
                        <Link to="/settings" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition">
                          <FiSettings className="text-lg" /> Account settings
                        </Link>
                        <Link to="/saved" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition">
                          <FiBookmark className="text-lg" /> Saved
                        </Link>
                      </div>
                      <button onClick={handleLogout} className="flex items-center gap-3 p-2 text-red-600 font-semibold text-sm border-t border-gray-100 pt-3 w-full hover:bg-red-50 rounded-lg transition">
                        <FiLogOut className="text-lg" /> Logout
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-1 cursor-pointer text-gray-700 hover:text-[#00694B] transition-colors">
                  <MdLanguage className="text-xl" />
                  <span className="font-semibold text-sm uppercase">En</span>
                  <MdKeyboardArrowDown />
                </div>
              </div>
            </nav>
          )}

          {/* الـ Navbar العادية (صفحة الهوم) - تتغير ديناميكياً فقط عند الـ Login */}
          {!isAuthPage && !isDetailsPage && (
            <>
              <div className="hidden md:flex justify-center">
                <ul className="flex gap-8">
                  <li><NavLink to="/" className={({ isActive }) => isActive ? activeLink : normalLink}>Home</NavLink></li>
                  <li><NavLink to="/about" className={({ isActive }) => isActive ? activeLink : normalLink}>About</NavLink></li>
                  <li><NavLink to="/jobs" className={({ isActive }) => isActive ? activeLink : normalLink}>Jobs</NavLink></li>
                  <li><NavLink to="/contact" className={({ isActive }) => isActive ? activeLink : normalLink}>Contact</NavLink></li>
                </ul>
              </div>

              <div className="flex items-center gap-4">
                {token ? (
                  // الحساب والقائمة المنسدلة الكاملة (تظهر فقط إذا كان الـ Token موجوداً)
                  <div className="flex items-center gap-6">
                    <div className="relative p-2 bg-gray-50 rounded-full cursor-pointer hover:bg-gray-100 transition-colors">
                      <MdNotificationsNone className="text-2xl text-gray-700" />
                      <span className="absolute top-1 right-1 bg-[#00694B] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
                        2
                      </span>
                    </div>

                    <div className="relative flex items-center gap-2 cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                      <div className="w-10 h-10 bg-[#2D3134] rounded-full flex items-center justify-center text-white font-bold uppercase">
                        {userName[0]}
                      </div>
                      <MdKeyboardArrowDown className={`text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      
                      {/* قائمة الـ Dropdown الكاملة المطابقة للتصميم */}
                      {isDropdownOpen && (
                        <div className="absolute right-0 top-12 w-[280px] bg-white border border-gray-100 rounded-2xl shadow-xl py-5 px-4 z-50 flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-3 border-b pb-3 border-gray-100">
                            <div className="w-12 h-12 bg-[#2D3134] rounded-full flex items-center justify-center text-white text-lg font-bold uppercase">
                              {userName[0]}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-[#0D0D0D] text-[16px]">{userName}</span>
                              <span className="text-gray-500 text-[13px]">{userTitle}</span>
                            </div>
                          </div>
                          <Link to="/profile" className="w-full py-2 border border-black rounded-full text-center font-semibold text-sm hover:bg-gray-50 transition" onClick={() => setIsDropdownOpen(false)}>
                            View Profile
                          </Link>
                          <div className="flex flex-col gap-1 text-gray-600 font-medium text-sm">
                            <Link to="/settings" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition" onClick={() => setIsDropdownOpen(false)}>
                              <FiSettings className="text-lg" /> Account settings
                            </Link>
                            <Link to="/saved" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition" onClick={() => setIsDropdownOpen(false)}>
                              <FiBookmark className="text-lg" /> Saved
                            </Link>
                          </div>
                          <button onClick={handleLogout} className="flex items-center gap-3 p-2 text-red-600 font-semibold text-sm border-t border-gray-100 pt-3 w-full hover:bg-red-50 rounded-lg transition">
                            <FiLogOut className="text-lg" /> Logout
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  // إذا لم يسجل دخول: تظهر زراير الـ Login و Join Now الافتراضية
                  <>
                    <NavLink to='/login2' className="px-5 py-2 bg-[#00694B] text-white rounded-full font-medium hover:bg-black transition duration-300 cursor-pointer">Login</NavLink>
                    <NavLink to='/joinnow' className="px-5 py-2 bg-white text-black border border-gray-200 rounded-full hover:bg-[#00694B] hover:text-white transition duration-500 cursor-pointer">Join Now</NavLink>
                  </>
                )}

                <div className="flex items-center gap-1 text-gray-600 p-2 rounded-full hover:bg-[#00694B] hover:text-white transition duration-500 cursor-pointer">
                  <TbWorld /><span className="text-sm font-bold">EN</span><MdKeyboardArrowDown />
                </div>
                
                {!token && (
                  <NavLink to={'/foremployer'} className="py-[16px] px-[32px] cursor-pointer rounded-[12px] border-[1px] border-transparent hover:border-[black] transition duration-500 flex items-center gap-[10px]">
                    For Employer <MdArrowForwardIos />
                  </NavLink>
                )}
              </div>
            </>
          )}

          {/* صفحات الـ Auth (Login/Register) */}
          {isAuthPage && !isDetailsPage && (
            <div className="flex items-center justify-between gap-[18px]">
              {!isforcandidate ? (
                <Link to={'/forcandidate'}>
                  <button className="py-[16px] px-[32px] cursor-pointer bg-black rounded-full text-white">For candidate </button>
                </Link>
              ) : (
                <Link to={'/joinnow'}>
                  <button className="py-[16px] px-[32px] cursor-pointer bg-black rounded-full text-white">For Employer</button>
                </Link>
              )}
              <div className="flex items-center gap-1 text-gray-600 cursor-pointer select-none hover:bg-[#00694B] transition duration-500 p-2 rounded-full hover:text-white">
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