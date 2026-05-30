 import {
  MdDashboard,
  MdEdit,
  MdKeyboardArrowDown,
   MdSettings,
  MdWorkOutline,
} from "react-icons/md";

import Icon from "../../../../../public/imge/Icon.svg";
import Icon2 from "../../../../../public/imge/Icon (1).svg";
import logo from "../../../../../public/imge/16 [Converted].svg";
import { MdPersonOutline, MdOutlineEdit } from "react-icons/md";
 import { FiDollarSign, FiMapPin, FiBriefcase, FiAward, FiBookOpen, FiEye, FiSearch } from "react-icons/fi";
import { AiOutlinePauseCircle, AiOutlineCloseCircle, AiOutlineDelete, AiOutlineDownload } from "react-icons/ai";

import { Link, NavLink, useNavigate } from "react-router-dom";
  import { BsCheckCircle } from "react-icons/bs";
import { useState } from "react";
  
function ViewCandidates() {
    const [jobStatus, setJobStatus] = useState('open');
  return (
     <div className="Viewdetails grid grid-cols-12 gap-8 px-10 max-w-[1440px] mx-auto w-full bg-[#FAFAFA] min-h-screen">
      
      {/* ==================== الـ Aside (الجانب الأيسر) ==================== */}
      <aside className="w-[300px] h-fit flex flex-col gap-4 col-span-3 bg-white pt-[120px] mt-[-80px] pb-8 px-4 rounded-b-[32px] shadow-sm z-10">
        {/* كارت المستشفى */}
        <div className="bg-[#F7FAF7] rounded-[24px] p-5 border border-[#F1F1F1] shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-[#2D3134] rounded-full flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <div>
              <h3 className="font-bold text-[16px] text-[#0D0D0D]">Saudi German Hospital</h3>
              <p className="text-[14px] text-[#4D4D4D]">Egypt</p>
            </div>
          </div>
          <p className="text-[12px] text-[#8F8F8F] leading-relaxed mb-4">
            Saudi German Hospitals is the leading healthcare provider and the number one healthcare brand in the MENA re..
          </p>
          <div className="bg-[#FFF9E6] text-[#FFB800] text-center py-2 rounded-full text-[13px] font-semibold border border-[#FFB800]/10">
            Account under review.
          </div>
        </div>

        {/* كارت التفعيل */}
        <div className="bg-[#FFF5F5] rounded-[24px] p-6 border border-[#FFDADA]">
          <h4 className="text-[#FF4D4D] font-bold text-[18px] mb-2 leading-tight">Please complete your details.</h4>
          <p className="text-[13px] text-[#4D4D4D] mb-5">
            Please complete your account details so you can use the platform normally and benefit from all its features.
          </p>
          <Link to={'/Details2'}>
            <button className="w-full cursor-pointer bg-[#E32B2B] text-white font-bold py-3 rounded-full hover:bg-[#C22424] transition-all">
              Complete Now
            </button>
          </Link>
        </div>

        {/* الروابط والتنقل */}
        <div className="flex flex-col gap-1 px-2 mt-2">
          <NavLink to="/companyprofile" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${isActive ? "bg-[#E6F3EF] text-[#00694B] font-bold" : "text-[#8F8F8F]"}`}>
            <MdPersonOutline className="text-xl" /> Company Profile
          </NavLink>
          <NavLink to="/Dashboard" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${isActive ? "bg-[#E6F3EF] text-[#00694B] font-bold" : "text-[#8F8F8F]"}`}>
            <img src={Icon} className="text-xl w-5 h-5 object-contain" alt="" /> Dashboard
          </NavLink>
          <NavLink to="/JobManagement" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${isActive ? "bg-[#E6F3EF] text-[#00694B] font-bold" : "text-[#8F8F8F]"}`}>
            <img src={Icon2} className="text-xl w-5 h-5 object-contain" alt="" /> Job Management
          </NavLink>
          <NavLink to="/Accountsettings" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${isActive ? "bg-[#E6F3EF] text-[#00694B] font-bold" : "text-[#8F8F8F]"}`}>
            <MdSettings className="text-xl" /> Account settings
          </NavLink>
        </div>

        <Link to={'/postjob'}>
          <button className="mt-10 w-full cursor-pointer bg-[#00694B] text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-[#00523A] transition-all">
            Post a Job
          </button>
        </Link>
      </aside>

      {/* ==================== الـ Content الرئيسي (الجانب الأيمن) ==================== */}
      <div className="col-span-9 py-[32px]">
      <div className="job-review-details rounded-[24px] p-8  ">
        
        {/* ==================== الـ Header الخاص بالوظيفة وأزرار التحكم ==================== */}
        <div className="title flex flex-col gap-4 border-b border-[#F1F1F1] pb-6 mb-6">
          <div className="flex items-center justify-between w-full flex-wrap gap-4">
            <div className="flex items-center gap-[25px]">
              <div className="logo   p-2 rounded-[16px]">
                <img src={logo} alt="Healthcare logo" className="w-[90px] h-[80px] object-contain" />
              </div>
              <div className="titlee">
                <h2 className="text-[#0D0D0D] text-[24px] font-bold">Senior Specialist Physician</h2>
                <div className="flex gap-[8px] items-center mt-[4px]">
                  <p className="text-[#0D0D0DA6] text-[15px]">at Health care</p>
                  <span className="bg-[#00A854] rounded-[4px] py-[2px] px-[8px] text-white text-[12px] font-bold tracking-wide">
                    FULL-TIME
                  </span>
                </div>
              </div>
            </div>
 
          </div>


        </div>

        {/* ==================== جدول المتقدمين    ==================== */}
        <div className="mt-10 pt-4">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
             
            {/* بار الفلاتر الكامل كما يظهر في التصميم */}
            <div className="flex items-center gap-[12px] flex-wrap bg-[#FAFAFA] p-3 rounded-[20px]">
  {/* حقل إدخال البحث */}
  <div className="relative flex items-center">
    <FiSearch className="absolute left-5 text-[#888888] text-[16px]" />
    <input 
      type="text" 
      placeholder="search name...." 
      className="border border-[#EAEAEA] bg-white rounded-full pl-11 pr-5 py-[10px] text-[14px] text-[#0D0D0D] focus:outline-none focus:border-[#005F41] w-[260px] placeholder:text-[#A0A0A0] shadow-sm" 
    />
  </div>

  {/* زر البحث */}
  <button className="bg-[#005F41] text-white px-7 py-[10px] rounded-full text-[14px] font-medium hover:bg-[#004A32] transition-all cursor-pointer shadow-sm">
    Search
  </button>

  {/* فلتر Recent Applied */}
  <div className="relative min-w-[150px]">
    <select className="w-full border border-[#EAEAEA] rounded-full pl-5 pr-10 py-[10px] text-[14px] text-[#7E7E7E] bg-white cursor-pointer focus:outline-none appearance-none shadow-sm">
      <option>recent applied</option>
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#7E7E7E]">
      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
      </svg>
    </div>
  </div>

  {/* فلتر Country */}
  <div className="relative min-w-[120px]">
    <select className="w-full border border-[#EAEAEA] rounded-full pl-5 pr-10 py-[10px] text-[14px] text-[#7E7E7E] bg-white cursor-pointer focus:outline-none appearance-none shadow-sm">
      <option>Country</option>
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#7E7E7E]">
      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
      </svg>
    </div>
  </div>

  {/* فلتر Medical License */}
  <div className="relative min-w-[160px]">
    <select className="w-full border border-[#EAEAEA] rounded-full pl-5 pr-10 py-[10px] text-[14px] text-[#7E7E7E] bg-white cursor-pointer focus:outline-none appearance-none shadow-sm">
      <option>Medical License</option>
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[#7E7E7E]">
      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
      </svg>
    </div>
  </div>
</div>
          </div>

          {/* الجدول */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs font-bold text-[#0D0D0D] border-b border-[#F1F1F1] bg-[#FAFAFA]">
                  <th className="py-3.5 px-4 w-[60px]">#</th>
                  <th className="py-3.5 px-4">Name</th>
                  <th className="py-3.5 px-4">Email</th>
                  <th className="py-3.5 px-4">Phone</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-center w-[240px]">Cv</th>
                </tr>
              </thead>
              <tbody className="text-[14px] text-[#4D4D4D]">
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                  <tr key={index} className="border-b border-[#F1F1F1] hover:bg-[#FAFAFA]/40 transition-all">
                    <td className="py-4 px-4 font-medium text-[#0D0D0D]">#{item}</td>
                    <td className="py-4 px-4 font-bold text-[#0D0D0D]">Ahmed Abdulmajeed Eltatawy</td>
                    <td className="py-4 px-4 text-[#4D4D4D]">Mail@mail.com</td>
                    <td className="py-4 px-4 text-[#4D4D4D]">966 5462123331</td>
                    <td className="py-4 px-4 text-xs text-[#8F8F8F] leading-tight">
                      21 December <br /> 2026 , 4:00AM
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="flex items-center gap-1.5 bg-[#1C2434] text-white text-xs font-semibold py-2 px-4 rounded-lg hover:bg-black transition-all cursor-pointer">
                          <AiOutlineDownload className="text-sm" /> Download
                        </button>
                        <button className="flex items-center gap-1.5 border border-[#D9D9D9] text-[#1C2434] text-xs font-semibold py-2 px-5 rounded-lg hover:bg-[#F5F5F5] transition-all cursor-pointer">
                          <FiEye className="text-sm" /> View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
    </div>
  )
}

export default ViewCandidates