import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
 import { Link, NavLink, useNavigate } from "react-router-dom";
import background from "../../../../public/imge/a6680f4f77b6b9212dae35d94f66c6ab33d89f64 (1).png";
import cam from "../../../../public/imge/cam.svg";
import { motion } from "framer-motion";
 
  import smallimg from "../../../../public/imge/smallimg.png";
 import linkedin from "../../../../public/imge/linkedin.svg";
import facebook from "../../../../public/imge/facebook.svg";
import insta from "../../../../public/imge/insta-2.svg";
import twitter from "../../../../public/imge/twitter.svg";
import snap from "../../../../public/imge/snap.svg";
import jobIcon from "../../../../public/imge/Layer_1 (1).svg";
import people from "../../../../public/imge/Frame (3).svg";
import acctive from "../../../../public/imge/acctive.svg";
import Correct from "../../../../public/imge/Correct.svg";
import {
  MdDashboard,
  MdKeyboardArrowDown,
  MdPersonOutline,
  MdRemoveRedEye,
  MdSettings,
  MdWorkOutline,
} from "react-icons/md";
function Dashboard() {
      const [currentPage, setCurrentPage] = useState(1);
    
  return (
   <div className="Dashboard ">
           <div className="min-h-screen  ">
             <div className="flex grid grid-cols-12 px-20 w-[1100px]">
               <aside className="w-[300px] h-fit flex flex-col gap-4 col-span-4 bg-white pt-[120px] mt-[-80px] pb-8 px-[12px] rounded-b-[32px] shadow-sm">
                 {/* كارت المستشفى */}
                 <div className="bg-[#F7FAF7] rounded-[24px] p-5 border border-[#F1F1F1] shadow-sm">
                   <div className="flex items-center gap-3 mb-3">
                     <div className="w-12 h-12 bg-[#2D3134] rounded-full flex items-center justify-center text-white font-bold text-xl">
                       A
                     </div>
                     <div>
                       <h3 className="font-bold text-[16px] text-[#0D0D0D]">
                         Saudi German Hospital
                       </h3>
                       <p className="text-[14px] text-[#4D4D4D]">Egypt</p>
                     </div>
                   </div>
                   <p className="text-[12px] text-[#8F8F8F] leading-relaxed mb-4">
                     Saudi German Hospitals is the leading healthcare provider...
                   </p>
                   <div className="bg-[#FFF9E6] text-[#FFB800] text-center py-2 rounded-full text-[13px] font-semibold border border-[#FFB800]/10">
                     Account under review.
                   </div>
                 </div>
   
                 {/* كارت الـ Please complete */}
                 <div className="bg-[#FFF5F5] rounded-[24px] p-6 border border-[#FFDADA]">
                   <h4 className="text-[#FF4D4D] font-bold text-[18px] mb-2 leading-tight">
                     Please complete your details.
                   </h4>
                   <p className="text-[13px] text-[#4D4D4D] mb-5">
                     Please complete your account details so you can use the
                     platform normally.
                   </p>
                   <button className="w-full bg-[#E32B2B] text-white font-bold py-3 rounded-full hover:bg-[#C22424] transition-all">
                     Complete Now
                   </button>
                 </div>
   
                 {/* قائمة الروابط */}
                 <div className="flex flex-col gap-1 px-2 mt-2">
                   {/* Company Profile */}
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
   
                   {/* Dashboard */}
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
                     <MdDashboard className="text-xl" /> Dashboard
                   </NavLink>
   
                   {/* Job Management */}
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
                     <MdWorkOutline className="text-xl" /> Job Management
                   </NavLink>
   
                   {/* Account settings */}
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
   
                 <button className="mt-10 w-full bg-[#00694B] text-white font-bold py-4 rounded-full flex items-center justify-center gap-2">
                   Post a Job
                 </button>
               </aside>
   
               <main className="flex-1 col-span-8 w-[1020px] py-[70px]">
                 {/* profile-details */}
                <div className="profile-details px-[40px] py-[32px] bg-[#F7FAF7] min-h-screen">
  <h2 className="text-[20px] font-bold text-[#0D0D0D] mb-6">Active Jobs</h2>

  {/* 1. Stats Row - الكروت العلوية */}
  <div className="grid grid-cols-3 gap-6 mb-8">
    {/* Active job postings */}
    <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50 relative overflow-hidden">
      <p className="text-[14px] font-bold text-[#0D0D0D] mb-2">Active job postings</p>
      <h3 className="text-[32px] font-bold text-[#00694B]">+12</h3>
      <p className="text-[12px] text-[#8F8F8F]">Current active job postings</p>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20">
         <img src={jobIcon} className="w-12 h-12" alt="icon" />     
      </div>
    </div>

    {/* Total Application Volume */}
    <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50">
      <p className="text-[14px] font-bold text-[#0D0D0D] mb-2">Total Application Volume</p>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[32px] font-bold text-[#00694B]">327</h3>
        <span className="text-[12px] font-bold text-[#0D0D0D]">+12 <span className="font-normal text-[#8F8F8F]">this week</span></span>
        <img src={people} alt="" />
      </div>
      <p className="text-[12px] text-[#8F8F8F]">Total applications across all jobs</p>
    </div>

    {/* Latest Activity */}
    <div className="bg-white p-6  rounded-[24px] shadow-sm border border-gray-50">
      <p className="text-[14px] font-bold text-[#0D0D0D] mb-2">Latest Activity</p>
<div className="flex items-center justify-between">
          <h3 className="text-[32px] font-bold text-[#00694B]">+12 <span className="text-[16px] font-bold">Application</span></h3>
<img src={acctive} alt="" />
</div>
      <p className="text-[12px] text-[#8F8F8F]">2hours ago</p>
    </div>
  </div>

  {/* 2. Main Content Grid - الجدول والرسوم البيانية */}
  <div className="grid grid-cols-12 gap-6">
    
    {/* Left Column (Charts) */}
    <div className="col-span-4 space-y-6">
      {/* Talent intake */}
      <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50">
        <p className="text-[14px] font-bold text-[#0D0D0D] mb-2">Talant intake</p>
<div className="flex items-center justify-between" >
            <h3 className="text-[32px] font-bold text-[#00694B]">320</h3>
            <img src={Correct} alt="" />

</div>
        <p className="text-[12px] text-[#8F8F8F]">CVs downloaded</p>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50">
        <h4 className="text-[16px] font-bold text-[#0D0D0D] mb-6">Category Breakdown</h4>
        <div className="flex items-center justify-between gap-4">
           <div className="w-24 h-24 rounded-full border-[20px] border-l-[#00694B] border-b-[#FFB800] border-r-[#4A90E2] border-t-[#7ED321]"></div>
           <div className="text-[12px] space-y-2">
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#4A90E2] rounded-sm"></span> nursing</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#7ED321] rounded-sm"></span> Physicians</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#FFB800] rounded-sm"></span> Allied Health</div>
           </div>
        </div>
      </div>
    </div>

    {/* Right Column (Table) */}
    <div className="col-span-8 bg-white p-6 rounded-[24px] shadow-sm border border-gray-50">
      <h4 className="text-[18px] font-bold text-[#0D0D0D] mb-4">Active Jobs</h4>
      <table className="w-full text-left">
        <thead className="bg-[#F3F4F6] rounded-xl text-[#4D4D4D] text-[13px]">
          <tr>
            <th className="p-4 rounded-l-xl font-bold">Job Title</th>
            <th className="p-4 font-bold">Job Views</th>
            <th className="p-4 font-bold">Applicants</th>
            <th className="p-4 font-bold">Posted Since</th>
            <th className="p-4 rounded-r-xl font-bold"></th>
          </tr>
        </thead>
        <tbody className="text-[14px] text-[#0D0D0D]">
          {[1, 2, 3, 4].map((_, i) => (
            <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
              <td className="p-4 font-medium text-[#4D4D4D]">Consultant I...</td>
              <td className="p-4 text-center">12</td>
              <td className="p-4 text-center">3</td>
              <td className="p-4 text-[#4D4D4D]">21 December 2026</td>
              <td className="p-4">
                <button className="bg-[#00694B] text-white text-[12px] px-4 py-1.5 rounded-full flex items-center gap-1">
                  <MdRemoveRedEye /> View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>

  </div>
   {/* Pagination */}
  <div className="flex justify-center gap-[20px] ml-80 items-center mt-6 text-[12px] text-[#4D4D4D]">
      <p>Show 1 - 10 from 57</p>
              <div className="flex items-center gap-1">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition cursor-pointer">‹</button>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} onClick={() => setCurrentPage(n)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-[500] transition cursor-pointer
                      ${currentPage === n ? "bg-[#00694B] text-white" : "hover:bg-gray-100 text-[#4D4D4D]"}`}>
                    {n}
                  </button>
                ))}
                <span className="px-1">...</span>
                <button onClick={() => setCurrentPage(prev => prev + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition cursor-pointer">›</button>
              </div>
  </div>
</div>
               </main>
             </div>
           </div>
         </div>
  )
}

export default Dashboard