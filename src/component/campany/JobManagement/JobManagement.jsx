import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
 import { Link, NavLink, useNavigate } from "react-router-dom";
import background from "../../../../public/imge/a6680f4f77b6b9212dae35d94f66c6ab33d89f64 (1).png";
import cam from "../../../../public/imge/cam.svg";
import { motion } from "framer-motion";
 
  import smallimg from "../../../../public/imge/smallimg.png";
 import {  MdMoreHoriz } from 'react-icons/md';
import { HiLocationMarker } from 'react-icons/hi';
import { MdWork, MdAttachMoney } from 'react-icons/md';
import logo from '../../../../public/imge/16 [Converted].svg';
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

function JobManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [statusOpen, setStatusOpen] = useState(false);

  const statuses = ["Open", "Closed", "Paused", "Draft"];

  const statusStyle = {
    Open: { dot: "bg-[#00694B]", text: "text-[#00694B]" },
    Closed: { dot: "bg-gray-400", text: "text-gray-500" },
    Draft: { dot: "bg-gray-300", text: "text-gray-400" },
    paused: { dot: "bg-red-400", text: "text-red-400" },
  };

  const jobs = [
    { id: 1, status: "Open", candidates: 280, hasBtn: true },
    { id: 2, status: "Closed", candidates: 280, hasBtn: true },
    { id: 3, status: "Draft", candidates: null, hasBtn: false },
    { id: 4, status: "paused", candidates: 2, hasBtn: true },
  ];

  const menuItems = {
    Open: [
      { icon: "✏️", label: "Edit" },
      { icon: "✅", label: "Closed" },
      { icon: "⏸️", label: "Paused" },
      { icon: "🗑️", label: "Delete", red: true },
    ],
    Closed: [
      { icon: "✏️", label: "Edit" },
      { icon: "🗑️", label: "Delete", red: true },
    ],
    Draft: [
      { icon: "📢", label: "Complete Post" },
      { icon: "🗑️", label: "Delete", red: true },
    ],
    paused: [
      { icon: "▶️", label: "Resume" },
      { icon: "🗑️", label: "Delete", red: true },
    ],
  };

  const JobCard = ({ job }) => {
    const s = statusStyle[job.status] || statusStyle.Open;
    const [menuOpen, setMenuOpen] = useState(false);
    const currentMenu = menuItems[job.status] || menuItems.Open;

    return (
      <div className={`rounded-[16px] border flex flex-col min-h-[260px] p-[16px] gap-[10px]
        ${job.status === "paused" ? "border-red-200 bg-[#FFF5F5]" : "border-gray-100 bg-white"}`}>

        {/* Header */}
        <div className="flex items-start justify-between relative">
          <div className="flex items-center gap-[10px]">
            <img src={logo} alt="logo" className="w-[40px] h-[40px] rounded-[8px] object-cover" />
            <div>
              <h3 className="font-[700] text-[16px] text-[#0D0D0D]">Medical Approval</h3>
              <p className="text-[13px] text-[#8F8F8F]">Health care</p>
              <p className="text-[12px] text-[#8F8F8F]">21 December 2026 , 4:00AM</p>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[#8F8F8F] hover:text-[#0D0D0D] transition cursor-pointer p-1"
            >
              <MdMoreHoriz size={22} />
            </button>
            {menuOpen && (
              <div className="absolute top-[110%] right-0 bg-white border border-gray-100 rounded-[16px] shadow-lg py-[8px] w-[170px] z-50">
                {currentMenu.map((item) => (
                  <div
                    key={item.label}
                    onClick={() => setMenuOpen(false)}
                    className={`px-[16px] py-[10px] text-[14px] flex items-center gap-2 cursor-pointer transition
                      ${item.red ? "text-red-500 hover:bg-red-50" : "text-[#0D0D0D] hover:bg-[#F0F9F4]"}`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex items-center gap-[12px] text-[13px] text-[#4D4D4D]">
          <div className="flex items-center gap-1"><HiLocationMarker className="text-[#8F8F8F]" /><span>cairo, Egypt</span></div>
          <div className="flex items-center gap-1"><MdWork className="text-[#8F8F8F]" /><span>Pharmce</span></div>
          <div className="flex items-center gap-1"><MdAttachMoney className="text-[#8F8F8F]" /><span>2000$ : 4000$</span></div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-[6px]">
          {["+3 Exp", "Full time", "Pharmaceutical"].map((tag) => (
            <span key={tag} className="bg-[#F3F4F6] text-[#4D4D4D] text-[12px] py-[3px] px-[10px] rounded-full">{tag}</span>
          ))}
        </div>

        {/* Description */}
        <p className="text-[13px] text-[#8F8F8F] line-clamp-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>

        {/* Buttons - mt-auto عشان ينزلوا لأسفل */}
        {job.hasBtn && (
          <div className="flex items-center gap-[8px] mt-auto">
            <button className="flex-1 bg-[#152126] hover:bg-black text-white text-[13px] font-[600] py-[10px] rounded-full transition cursor-pointer">
              View Candidates {job.candidates}
            </button>
            <button className="flex items-center gap-1 border border-[#00694B] text-[#00694B] hover:bg-[#00694B] hover:text-white text-[13px] font-[600] py-[10px] px-[16px] rounded-full transition cursor-pointer">
              View Details →
            </button>
          </div>
        )}

        {/* Footer Status - mt-auto عشان ينزل لأسفل */}
        <div className="flex items-center justify-between pt-[8px] border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-[6px]">
            <span className={`w-2 h-2 rounded-full ${s.dot}`}></span>
            <span className={`text-[13px] font-[500] ${s.text}`}>{job.status}</span>
          </div>
          <span className="text-[12px] text-[#8F8F8F]">21 December 2026 , 4:00AM</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] ">
      <div className="grid grid-cols-12 px-20 w-[1100px]">

        {/* Sidebar */}
        <aside className="w-[300px] h-fit flex flex-col gap-4 col-span-4 bg-white pt-[120px] mt-[-80px] pb-8 px-[12px] rounded-b-[32px] shadow-sm">
          <div className="bg-[#F7FAF7] rounded-[24px] p-5 border border-[#F1F1F1] shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-[#2D3134] rounded-full flex items-center justify-center text-white font-bold text-xl">A</div>
              <div>
                <h3 className="font-bold text-[16px] text-[#0D0D0D]">Saudi German Hospital</h3>
                <p className="text-[14px] text-[#4D4D4D]">Egypt</p>
              </div>
            </div>
            <p className="text-[12px] text-[#8F8F8F] leading-relaxed mb-4">Saudi German Hospitals is the leading healthcare provider...</p>
            <div className="bg-[#FFF9E6] text-[#FFB800] text-center py-2 rounded-full text-[13px] font-semibold border border-[#FFB800]/10">
              Account under review.
            </div>
          </div>

          <div className="bg-[#FFF5F5] rounded-[24px] p-6 border border-[#FFDADA]">
            <h4 className="text-[#FF4D4D] font-bold text-[18px] mb-2 leading-tight">Please complete your details.</h4>
            <p className="text-[13px] text-[#4D4D4D] mb-5">Please complete your account details so you can use the platform normally.</p>
            <button className="w-full bg-[#E32B2B] text-white font-bold py-3 rounded-full hover:bg-[#C22424] transition-all">Complete Now</button>
          </div>

          <div className="flex flex-col gap-1 px-2 mt-2">
            {[
              { to: "/companyprofile", icon: <MdPersonOutline className="text-xl" />, label: "Company Profile" },
              { to: "/Dashboard", icon: <MdDashboard className="text-xl" />, label: "Dashboard" },
              { to: "/JobManagement", icon: <MdWorkOutline className="text-xl" />, label: "Job Management" },
              { to: "/Accountsettings", icon: <MdSettings className="text-xl" />, label: "Account settings" },
            ].map(({ to, icon, label }) => (
              <NavLink key={to} to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${
                    isActive ? "bg-[#E6F3EF] text-[#00694B] font-bold border border-[#00694B]/10" : "text-[#8F8F8F]"
                  }`
                }
              >
                {icon} {label}
              </NavLink>
            ))}
          </div>

          <button className="mt-10 w-full bg-[#00694B] text-white font-bold py-4 rounded-full flex items-center justify-center gap-2">
            Post a Job
          </button>
        </aside>

        {/* Main */}
        <main className="flex-1 col-span-8 w-[1020px] py-[70px]">
          <div className="profile-details px-[40px] py-[32px] bg-[#F7FAF7] min-h-screen">

            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="relative">
                <button
                  onClick={() => setStatusOpen(!statusOpen)}
                  className="flex items-center gap-2 bg-white border border-gray-200 text-[#0D0D0D] text-[14px] font-[500] py-[10px] px-[20px] rounded-full hover:border-[#00694B] transition cursor-pointer"
                >
                  {selectedStatus} <MdKeyboardArrowDown size={18} />
                </button>
                {statusOpen && (
                  <div className="absolute top-[110%] left-0 bg-white border border-gray-100 rounded-[16px] shadow-lg py-[8px] w-[160px] z-50">
                    {statuses.map((s) => (
                      <div key={s} onClick={() => { setSelectedStatus(s); setStatusOpen(false); }}
                        className="px-[16px] py-[10px] text-[14px] text-[#0D0D0D] hover:bg-[#F0F9F4] hover:text-[#00694B] cursor-pointer transition">
                        {s}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button className="bg-[#00694B] hover:bg-black text-white font-[600] text-[14px] py-[12px] px-[28px] rounded-full transition cursor-pointer">
                Post a Job
              </button>
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-2 gap-[16px]">
              {jobs.map((job) => <JobCard key={job.id} job={job} />)}
            </div>

            {/* Pagination */}
            <div className="flex items-center gap-[8px] mt-8 text-[13px] text-[#4D4D4D]">
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
  );
}


export default JobManagement