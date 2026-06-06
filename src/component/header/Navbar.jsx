import React, { useEffect, useState, useRef } from "react";
import { MdArrowForwardIos, MdMenu, MdClose } from "react-icons/md"; 
import { TbWorld } from "react-icons/tb";
import { MdLanguage, MdNotificationsNone, MdKeyboardArrowDown } from "react-icons/md";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";  
import { FiSettings, FiBookmark, FiLogOut, FiUser } from "react-icons/fi"; 
import axios from "axios"; 
import logo from "../../../public/imge/Group 7.svg";
import logoo from "../../../public/imge/logoo.svg";

function Navbar({ isLoginVariant, isLoginVariant2, isjoinnow, isforcandidate, isDetailsPage }) {
  const isAuthPage = isLoginVariant || isLoginVariant2 || isjoinnow || isforcandidate;
  const location = useLocation();
  const navigate = useNavigate();
  const notificationsRef = useRef(null);

  const [token, setToken] = useState(localStorage.getItem('user_token'));
  const [userName, setUserName] = useState(localStorage.getItem('user_name') || "User");
  const [userTitle, setUserTitle] = useState(localStorage.getItem('user_title') || "Consultant Internist");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  //  Notifications states 
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem('user_token'));
    setUserName(localStorage.getItem('user_name') || "User");
    setUserTitle(localStorage.getItem('user_title') || "Consultant Internist");
    setIsMobileMenuOpen(false); 
  }, [location]);

  //  جلب الـ notifications - مصلح
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!token) return;
      try {
        const res = await axios.get('https://joocare.nami-tec.com/api/user/notifications', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data?.data) {
          setNotifications(res.data.data); //  
          setNotificationCount(res.data.data.length);  
        }
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };
    fetchNotifications();
  }, [token]);

  //  إغلاق الـ notifications لو ضغط برا
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_name');
    localStorage.removeItem('user_title');
    setToken(null);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/"); 
    window.location.reload(); 
  };

  const normalLink = "pb-1 text-gray-700 hover:text-[#00694B] hover:border-b-2 border-green-600 transition duration-300 white-space-nowrap";
  const activeLink = "pb-1 text-[#00694B] border-b-2 border-[#00694B] font-bold white-space-nowrap";
  const activeLinkk = "text-[#00694B] font-semibold border-b-2 border-[#00694B] pb-1";
  const normalLinkk = "text-[#4D4D4D] font-medium hover:text-[#00694B] transition-all";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md select-none">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 xl:px-20">
        <div className="grid grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto] items-center py-4 gap-4 md:gap-6">

          {/* Logo + Mobile Menu Button */}
          <div className="flex items-center gap-4 justify-self-start">
            {!isAuthPage && (
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="block lg:hidden text-3xl text-gray-700 focus:outline-none cursor-pointer z-50"
              >
                {isMobileMenuOpen ? <MdClose /> : <MdMenu />}
              </button>
            )}
            {!isDetailsPage && (
              <div className="logo-section flex items-center gap-2">
                <Link to="/" className="logo flex flex-col items-center justify-center shrink-0">
                  <img src={logo} alt="logo" className="max-w-[120px] md:max-w-none" />
                </Link>
              </div>
            )}
          </div>

          {/* Details Page Layout */}
          {isDetailsPage && (
            <div className="col-span-1 lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 items-center w-full gap-4">
              <div className="logo-section flex items-center justify-self-start hidden lg:block shrink-0">
                <Link to="/details" className="logo">
                  <img src={logoo} alt="JooCare Logo" className="h-10" />
                </Link>
              </div>
              <div className="hidden lg:flex items-center justify-center gap-8">
                <ul className="flex items-center gap-8 list-none whitespace-nowrap">
                  <li><NavLink to="/" className={({ isActive }) => isActive ? activeLinkk : normalLinkk}>Home</NavLink></li>
                  <li><NavLink to="/about" className={({ isActive }) => isActive ? activeLinkk : normalLinkk}>About</NavLink></li>
                  <li><NavLink to="/contact" className={({ isActive }) => isActive ? activeLinkk : normalLinkk}>Contact</NavLink></li>
                </ul>
              </div>
            </div>
          )}

          {/* Normal Navbar Links */}
          {!isAuthPage && !isDetailsPage && (
            <div className="hidden lg:flex justify-center w-full">
              <ul className="flex items-center gap-6 xl:gap-8 list-none whitespace-nowrap">
                <li><NavLink to="/" className={({ isActive }) => isActive ? activeLink : normalLink}>Home</NavLink></li>
                <li><NavLink to="/about" className={({ isActive }) => isActive ? activeLink : normalLink}>About</NavLink></li>
                <li><NavLink to="/jobs" className={({ isActive }) => isActive ? activeLink : normalLink}>Jobs</NavLink></li>
                <li><NavLink to="/contact" className={({ isActive }) => isActive ? activeLink : normalLink}>Contact</NavLink></li>
              </ul>
            </div>
          )}

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4 justify-self-end whitespace-nowrap col-start-2 lg:col-start-3">
            {!isAuthPage && (
              <>
                {token ? (
                  <div className="flex items-center gap-3 md:gap-4">

                    {/*  Notifications Bell */}
                 <div className="relative" ref={notificationsRef}>
  {/* زر الجرس كما هو */}
  <button
    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
    className="relative p-2 bg-gray-50 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
  >
    <MdNotificationsNone className="text-2xl text-gray-700" />
    {notificationCount > 0 && (
      <span className="absolute top-1 right-1 bg-[#00694B] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
        {notificationCount > 9 ? '9+' : notificationCount}
      </span>
    )}
  </button>

  {/* اللوحة الجانبية (Drawer) */}
  {isNotificationsOpen && (
    <>
      {/* Overlay خلفية معتمة */}
      <div 
        className="fixed inset-0 bg-black/40 z-40" 
        onClick={() => setIsNotificationsOpen(false)} 
      />
      
      {/* الـ Drawer نفسه */}
      <div className="fixed top-0 right-0 h-full w-[400px] bg-white z-50 shadow-2xl flex flex-col p-6 transition-transform duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl text-[#0D0D0D]">Notifications</h3>
          <button onClick={() => setIsNotificationsOpen(false)} className="text-2xl text-gray-500 hover:text-black">
             <MdClose /> 
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {notifications.length > 0 ? (
            notifications.map((notif, index) => (
              <div key={notif.id || index} className="p-4 bg-[#F9F9F9] rounded-[16px] border border-gray-100">
                <p className="text-[14px] font-bold text-[#0D0D0D] mb-1">{notif.title}</p>
                <p className="text-[13px] text-[#4D4D4D] mb-2">{notif.message || notif.body}</p>
                <p className="text-[11px] text-gray-400">{notif.created_at}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 mt-10">No notifications yet</p>
          )}
        </div>
      </div>
    </>
  )}
</div>

                    {/* User Dropdown */}
                    <div className="relative flex items-center gap-2 cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                      <div className="w-10 h-10 bg-[#2D3134] rounded-full flex items-center justify-center text-white font-bold uppercase shrink-0">
                        {userName[0]}
                      </div>
                      <MdKeyboardArrowDown className={`text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                      
                      {isDropdownOpen && (
                        <div className="absolute right-0 top-12 w-[280px] bg-white border border-gray-100 rounded-2xl shadow-xl py-5 px-4 z-50 flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center gap-3 border-b pb-3 border-gray-100">
                            <div className="w-12 h-12 bg-[#2D3134] rounded-full flex items-center justify-center text-white text-lg font-bold uppercase">
                              {userName[0]}
                            </div>
                            <div className="flex flex-col whitespace-normal">
                              <span className="font-bold text-[#0D0D0D] text-[16px]">{userName}</span>
                              <span className="text-gray-500 text-[13px]">{userTitle}</span>
                            </div>
                          </div>
                          <Link to="/profile" className="w-full py-2 border border-black rounded-full text-center font-semibold text-sm hover:bg-gray-50 transition" onClick={() => setIsDropdownOpen(false)}>
                            View Profile
                          </Link>
                          <div className="flex flex-col gap-1 text-gray-600 font-medium text-sm whitespace-normal">
                            <Link to="/settings" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition" onClick={() => setIsDropdownOpen(false)}>
                              <FiSettings className="text-lg" /> Account settings
                            </Link>
                            <Link to="/Savedjobs" className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition" onClick={() => setIsDropdownOpen(false)}>
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
                  <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
                    <NavLink to='/login2' className="px-4 py-2 bg-[#00694B] text-white rounded-full text-sm font-medium hover:bg-black transition duration-300">Login</NavLink>
                    <NavLink to='/joinnow' className="px-4 py-2 bg-white text-black border border-gray-200 rounded-full text-sm hover:bg-[#00694B] hover:text-white transition duration-500">Join Now</NavLink>
                  </div>
                )}

                <div className="flex items-center gap-1 text-gray-600 p-2 rounded-full hover:bg-[#00694B] hover:text-white transition duration-500 cursor-pointer shrink-0">
                  {isDetailsPage ? <MdLanguage className="text-xl" /> : <TbWorld />}
                  <span className="text-sm font-bold uppercase">EN</span>
                  <MdKeyboardArrowDown />
                </div>
                
                {!token && (
                  <NavLink to={'/foremployer'} className="hidden xl:flex py-[12px] px-[24px] cursor-pointer rounded-[12px] border-[1px] border-transparent hover:border-[black] transition duration-500 items-center gap-[10px] shrink-0">
                    For Employer <MdArrowForwardIos />
                  </NavLink>
                )}
              </>
            )}

            {/* Auth Pages */}
            {isAuthPage && (
              <div className="flex items-center gap-[14px] shrink-0">
                {!isforcandidate ? (
                  <Link to={'/forcandidate'}>
                    <button className="py-[12px] px-[24px] text-sm cursor-pointer bg-black rounded-full text-white whitespace-nowrap">For candidate</button>
                  </Link>
                ) : (
                  <Link to={'/joinnow'}>
                    <button className="py-[12px] px-[24px] text-sm cursor-pointer bg-black rounded-full text-white whitespace-nowrap">For Employer</button>
                  </Link>
                )}
                <div className="flex items-center gap-1 text-gray-600 cursor-pointer select-none hover:bg-[#00694B] transition duration-500 p-2 rounded-full hover:text-white shrink-0">
                  <TbWorld />
                  <span className="text-sm font-bold">EN</span>
                  <MdKeyboardArrowDown />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && !isAuthPage && (
        <div className="lg:hidden fixed top-[72px] left-0 w-full bg-white border-t border-gray-100 shadow-xl z-40 transition-all duration-300">
          <div className="grid grid-cols-1 gap-6 p-6">
            <ul className="grid grid-cols-1 gap-4 list-none text-center">
              {!isDetailsPage ? (
                <>
                  <li><NavLink to="/" className={({ isActive }) => isActive ? activeLink : normalLink} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink></li>
                  <li><NavLink to="/about" className={({ isActive }) => isActive ? activeLink : normalLink} onClick={() => setIsMobileMenuOpen(false)}>About</NavLink></li>
                  <li><NavLink to="/jobs" className={({ isActive }) => isActive ? activeLink : normalLink} onClick={() => setIsMobileMenuOpen(false)}>Jobs</NavLink></li>
                  <li><NavLink to="/contact" className={({ isActive }) => isActive ? activeLink : normalLink} onClick={() => setIsMobileMenuOpen(false)}>Contact</NavLink></li>
                </>
              ) : (
                <>
                  <li><NavLink to="/" className={({ isActive }) => isActive ? activeLinkk : normalLinkk} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink></li>
                  <li><NavLink to="/about" className={({ isActive }) => isActive ? activeLinkk : normalLinkk} onClick={() => setIsMobileMenuOpen(false)}>About</NavLink></li>
                  <li><NavLink to="/contact" className={({ isActive }) => isActive ? activeLinkk : normalLinkk} onClick={() => setIsMobileMenuOpen(false)}>Contact</NavLink></li>
                </>
              )}
            </ul>
            {!token && (
              <div className="grid grid-cols-1 gap-3 border-t pt-4 border-gray-100">
                <NavLink to='/login2' className="w-full py-3 bg-[#00694B] text-white text-center rounded-full font-medium" onClick={() => setIsMobileMenuOpen(false)}>Login</NavLink>
                <NavLink to='/joinnow' className="w-full py-3 bg-white text-black border border-gray-200 text-center rounded-full font-medium" onClick={() => setIsMobileMenuOpen(false)}>Join Now</NavLink>
                <NavLink to={'/foremployer'} className="w-full py-3 text-gray-700 font-medium flex items-center justify-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  For Employer <MdArrowForwardIos />
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;