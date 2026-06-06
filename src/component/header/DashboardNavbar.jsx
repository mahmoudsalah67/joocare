import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { MdNotificationsNone, MdKeyboardArrowDown, MdLanguage, MdClose } from "react-icons/md";
import { FiSettings, FiGrid, FiUsers, FiLogOut, FiMenu } from "react-icons/fi"; // ضفنا FiMenu هنا
import axios from "axios";
import logoo from "../../../public/imge/logoo.svg";

function DashboardNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State جديدة للموبايل منيو
  const [profileData, setProfileData] = useState(null); 
  const [notifications, setNotifications] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 
  
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null); 
  const mobileMenuRef = useRef(null); // Ref للمنيو بتاعة الموبايل
  const navigate = useNavigate();

  const activeLinkk = "text-[#00694B] font-semibold md:border-b-2 border-[#00694B] pb-1 block py-2 md:py-0";
  const normalLinkk = "text-[#4D4D4D] font-medium hover:text-[#00694B] transition-all block py-2 md:py-0";

  useEffect(() => {
    const fetchNavbarData = async () => {
      const token = localStorage.getItem("company_token") || localStorage.getItem("token");
      
      if (!token) {
        setIsLoading(false);
        navigate("/login");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        "Accept": "application/json"
      };

      try {
        setIsLoading(true);
        
        // 1. بيانات البروفايل
        const profileRes = await axios.get("https://joocare.nami-tec.com/api/company/auth/profile", { headers });
        if (profileRes.data) {
          setProfileData(profileRes.data?.data?.company || profileRes.data?.data || profileRes.data);
        }

        const notificationsRes = await axios.get("https://joocare.nami-tec.com/api/company/notifications", { headers });
        if (notificationsRes.data?.data) {
          setNotifications(notificationsRes.data.data);  
        }
      } catch (err) {
        console.error("Failed to fetch navbar data:", err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("company_token");
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchNavbarData();
  }, [navigate]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target) && !event.target.closest('.notification-btn')) {
        setIsNotificationsOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('.mobile-menu-btn')) {
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("company_token");
    navigate("/login");
  };

  const firstLetter = profileData?.person_name 
    ? profileData.person_name.charAt(0).toUpperCase() 
    : "A";

  return (
    <>
      {/* تعديل الـ padding من ثابت (px-30) ليكون ريسبونسيف مع الشاشات (px-4 md:px-16 lg:px-24) */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md px-4 md:px-16 lg:px-24">
        <div className="container mx-auto flex items-center justify-between py-4 w-full relative">
          
          {/* الـ Logo مع زرار الهامبرجر للموبايل */}
          <div className="logo-section flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="mobile-menu-btn text-2xl text-gray-700 md:hidden p-1 hover:bg-gray-100 rounded transition-colors"
            >
              {isMobileMenuOpen ? <MdClose /> : <FiMenu />}
            </button>
            <Link to="/" className="logo">
              <img src={logoo} alt="JooCare Logo" className="h-8 md:h-10" />
            </Link>
          </div>

          {/* روابط التنقل - مخفية في الشاشات الصغيرة وتظهر من أول الـ md */}
          <div className="hidden md:flex items-center gap-10">
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

          {/* التحكم والـ Dropdown للبروفايل والإشعارات */}
          <div className="flex items-center gap-3 md:gap-6">
            
            {/* زرار الإشعارات */}
            <div 
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="notification-btn relative p-2 bg-gray-50 rounded-full cursor-pointer hover:bg-gray-100 transition-colors select-none"
            >
              <MdNotificationsNone className="text-xl md:text-2xl text-gray-700" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#00694B] text-white text-[9px] md:text-[10px] w-3.5 h-3.5 md:w-4 md:h-4 rounded-full flex items-center justify-center border border-white">
                  {notifications.length}
                </span>
              )}
            </div>

            {/* زرار الحساب الشخصي والـ Dropdown */}
            <div 
              ref={dropdownRef}
              className="relative flex items-center gap-1 md:gap-2 cursor-pointer select-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#2D3134] rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base transition-all">
                {firstLetter}
              </div>
              <MdKeyboardArrowDown className={`text-gray-500 text-sm md:text-base transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />

               {isDropdownOpen && (
                <div 
                  className="absolute top-[45px] md:top-[50px] right-0 w-[240px] md:w-[260px] bg-white border border-gray-100 rounded-2xl shadow-xl py-4 z-[999]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-4 md:px-5 pb-3 pt-1 flex items-center gap-3 border-b border-gray-100">
                    <div className="w-9 h-9 md:w-11 md:h-11 bg-[#2D3134] text-white rounded-full flex items-center justify-center font-bold text-base md:text-[18px]">
                      {firstLetter}
                    </div>
                    <div className="flex flex-col min-w-0 text-left">
                      <span className="text-[14px] md:text-[15px] font-bold text-[#0D0D0D] truncate">
                        {isLoading ? "Loading..." : (profileData?.person_name || "No Name")}
                      </span>
                      <span className="text-[12px] md:text-[13px] text-gray-500 truncate">
                        {profileData?.specialty_title || profileData?.domain?.title || "Consultant Internist"}
                      </span>
                    </div>
                  </div>

                  <div className="px-2 md:px-3 py-2 flex flex-col gap-0.5 text-left">
                    <Link 
                      to="/companyprofile" 
                      className="w-full text-center border border-gray-300 text-gray-700 py-1.5 rounded-xl text-[13px] md:text-[14px] font-semibold hover:bg-gray-50 transition-all mt-1 mb-2 block"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      View Profile
                    </Link>

                    <Link 
                      to="/accountsettings" 
                      className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:text-[#00694B] hover:bg-gray-50 rounded-xl text-[14px] md:text-[14.5px] font-medium transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FiSettings className="text-[16px]" />
                      Account settings
                    </Link>

                    <Link 
                      to="/dashboard" 
                      className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:text-[#00694B] hover:bg-gray-50 rounded-xl text-[14px] md:text-[14.5px] font-medium transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FiGrid className="text-[16px]" />
                      Dashboard
                    </Link>

                    <Link 
                      to="/jobmanagement" 
                      className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:text-[#00694B] hover:bg-gray-50 rounded-xl text-[14px] md:text-[14.5px] font-medium transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FiUsers className="text-[16px]" />
                      Job Management
                    </Link>
                  </div>

                  <div className="border-t border-gray-100 px-3 pt-1.5 mt-1.5">
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-red-500 hover:bg-red-50 rounded-xl text-[14px] md:text-[14.5px] font-bold text-left transition-colors cursor-pointer"
                    >
                      <FiLogOut className="text-[16px]" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* زر اللغة */}
            <div className="flex items-center gap-1 cursor-pointer text-gray-700 hover:text-[#00694B] transition-colors">
              <MdLanguage className="text-lg md:text-xl" />
              <span className="font-semibold text-xs md:text-sm uppercase">En</span>
              <MdKeyboardArrowDown className="text-sm md:text-base" />
            </div>
          </div>

           {isMobileMenuOpen && (
            <div 
              ref={mobileMenuRef}
              className="absolute top-[64px] left-0 w-full bg-white shadow-lg border-b border-gray-100 px-6 py-4 flex flex-col gap-2 md:hidden z-40 animate-fadeIn"
            >
              <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => (isActive ? activeLinkk : normalLinkk)}>Home</NavLink>
              <NavLink to="/about" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => (isActive ? activeLinkk : normalLinkk)}>About</NavLink>
              <NavLink to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => (isActive ? activeLinkk : normalLinkk)}>Contact</NavLink>
            </div>
          )}

        </div>
      </nav>

      {/* لوحة الإشعارات الجانبية (Drawer) - أصبحت ريسبونسيف وبعرض متناسق على الموبايل */}
      <div className={`fixed inset-0 z-[9999] transition-visibility duration-300 ${isNotificationsOpen ? "visible" : "invisible"}`}>
        <div 
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isNotificationsOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsNotificationsOpen(false)}
        />
        
        <div 
          ref={notificationRef}
          className={`fixed top-0 left-0 h-full w-full sm:w-[350px] bg-white shadow-2xl flex flex-col transition-transform duration-300 text-left ${isNotificationsOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          {/* هيدر لوحة الإشعارات */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">Notifications</h3>
            <button 
              onClick={() => setIsNotificationsOpen(false)}
              className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors cursor-pointer"
            >
              <MdClose className="text-2xl" />
            </button>
          </div>

          {/* محتوى الإشعارات */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {notifications.length === 0 ? (
              <div className="text-center text-gray-400 py-10 font-medium">
                No notifications found
              </div>
            ) : (
              notifications.map((notif) => (
                <div 
                  key={notif.id} 
                  className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-100/50 transition-all cursor-pointer"
                >
                  <h4 className="text-[14.5px] font-bold text-gray-900 mb-1">{notif.title || "Notification"}</h4>
                  <p className="text-[13px] text-gray-600 leading-relaxed mb-2">{notif.message || notif.body}</p>
                  <span className="text-[11px] text-gray-400 font-medium">{notif.created_at}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardNavbar;