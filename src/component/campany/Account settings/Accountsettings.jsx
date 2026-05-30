import React, { useEffect, useState } from "react";
import { Link, Links, NavLink, Outlet } from "react-router-dom";
import Icon from "../../../../public/imge/Icon.svg";
import Icon2 from "../../../../public/imge/Icon (1).svg";

import {
  MdDashboard,
  MdPersonOutline,
  MdSettings,
  MdWorkOutline,
} from "react-icons/md";
import Basicinfo from "./basicinfo/Basicinfo";
import axios from "axios";

function Accountsettings() {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  
   const token = localStorage.getItem("company_token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Accept-Language": "en",
      Accept: "application/json",
    };
  useEffect(() => {
          const fetchProfile = async () => {
            try {
              setLoading(true);
       const res = await axios.get("https://joocare.nami-tec.com/api/company/auth/profile", { headers });      
         const company = res.data.data.company;
              setProfileData(company);
              
               
              setError(null);
            } catch (err) {
              console.error("Profile Fetch Error:", err);
              setError("Failed to load profile data");
            } finally {
              setLoading(false);
            }
          };
          fetchProfile();
        }, []);
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="grid grid-cols-12 gap-4 max-w-[1450px] mx-auto px-6">
        {/* Sidebar - الجزء الثابت على الشمال */}
        <aside className="col-span-3 flex flex-col gap-4 bg-white h-fit py-[120px] mt-[-80px] px-4 border-r border-[#ECECEC] rounded-b-[32px] shadow-sm">
            {/* Card: Saudi German Hospital */}
          <div className="bg-[#F7FAF7] rounded-[24px] p-5 border border-[#F1F1F1] shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-[#2D3134] rounded-full flex items-center justify-center text-white font-bold text-xl overflow-hidden">
                    {profileData?.image ? (
                      <img src={profileData.image} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      profileData?.name?.charAt(0).toUpperCase() || "C"
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-[16px] text-[#0D0D0D]">
                      {profileData?.name || "Company Name"}
                    </h3>
                    <p className="text-[14px] text-[#4D4D4D]">{profileData?.city?.title || "Egypt"}</p>
                  </div>
                </div>
                <p className="text-[12px] text-[#8F8F8F] leading-relaxed mb-4 line-clamp-3">
                  {profileData?.bio || "No description provided yet. Click edit to add an about section."}
                </p>
                <div className={`text-center py-2 rounded-full text-[13px] font-semibold border ${
                  profileData?.status === "Approved" 
                    ? "bg-[#E6F3EF] text-[#00694B] border-[#00694B]/10" 
                    : "bg-[#FFF9E6] text-[#FFB800] border-[#FFB800]/10"
                }`}>
                  Account status: {profileData?.status || "Under review"}
                </div>
              </div>
          {/* Card: Complete Details */}
          <div className="bg-[#FFF5F5] rounded-[24px] p-6 border border-[#FFDADA]">
            <h4 className="text-[#FF4D4D] font-bold text-[18px] mb-2 leading-tight">
              Please complete your details.
            </h4>
            <p className="text-[13px] text-[#4D4D4D] mb-5">
              Please complete your account details so you can use the platform
              normally.
            </p>
                <Link to={'/Details2'} className="">
                   <button  className="w-full cursor-pointer bg-[#E32B2B] text-white font-bold py-3 rounded-full hover:bg-[#C22424] transition-all">
                     Complete Now
                   </button>
                
                </Link>
               
          </div>
          {/* Navigation Links */}
            <div className="flex flex-col gap-1 px-2 mt-2">
              <NavLink
                to="/companyprofile"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${
                    isActive
                      ? "bg-[#E6F3EF] text-[#00694B] font-bold border border-[#00694B]/10"
                      : "text-[#8F8F8F]"
                  }`
                }
              >
                <MdPersonOutline className="text-xl" /> Company Profile
              </NavLink>

              <NavLink
                to="/Dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${
                    isActive
                      ? "bg-[#E6F3EF] text-[#00694B] font-bold border border-[#00694B]/10"
                      : "text-[#8F8F8F]"
                  }`
                }
              >
                <img src ={Icon} className="text-xl" /> Dashboard
              </NavLink>

              <NavLink
                to="/JobManagement"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${
                    isActive
                      ? "bg-[#E6F3EF] text-[#00694B] font-bold border border-[#00694B]/10"
                      : "text-[#8F8F8F]"
                  }`
                }
              >
                <img src ={Icon2} className="text-xl" /> Job Management
              </NavLink>






              <NavLink
                to="/Accountsettings"
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${
                    isActive
                      ? "bg-[#E6F3EF] text-[#00694B] font-bold border border-[#00694B]/10"
                      : "text-[#8F8F8F]"
                  }`
                }
              >
                <MdSettings className="text-xl" /> Account settings
              </NavLink>
            </div>
            <Link to={'/postjob'}>
                        <button className="mt-10 w-full cursor-pointer bg-[#00694B] text-white font-bold py-4 rounded-full flex items-center justify-center gap-2">
                          Post a Job
                        </button>
                        </Link>
        </aside>

        <main className="col-span-8 py-[90px] flex flex-col gap-6">
          <div className="bg-white flex items-center justify-between w-fit gap-2 rounded-full shadow-sm p-[6px] border border-[#F1F1F1]">
            <NavLink
              to="/Accountsettings/basicinfo"
              className={({ isActive }) =>
                `rounded-full cursor-pointer py-[10px] px-[24px] text-[15px] font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-[#00694B] text-white shadow-md"
                    : "text-[#666666] hover:bg-gray-50"
                }`
              }
            >
              Basic Info
            </NavLink>
            <NavLink
              to="/Accountsettings/verification"
              className={({ isActive }) =>
                `rounded-full cursor-pointer py-[10px] px-[24px] text-[15px] font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-[#00694B] text-white shadow-md"
                    : "text-[#666666] hover:bg-gray-50"
                }`
              }
            >
              Business Verification
            </NavLink>
            <NavLink
              to="/Accountsettings/Changepassword"
              className={({ isActive }) =>
                `rounded-full cursor-pointer py-[10px] px-[24px] text-[15px] font-bold transition-all duration-300 ${
                  isActive
                    ? "bg-[#00694B] text-white shadow-md"
                    : "text-[#666666] hover:bg-gray-50"
                }`
              }
            >
              Change password
            </NavLink>
          </div>

          <div className="w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Accountsettings;
