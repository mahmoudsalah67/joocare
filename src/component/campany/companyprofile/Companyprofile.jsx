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
import {
  MdDashboard,
  MdKeyboardArrowDown,
  MdPersonOutline,
  MdSettings,
  MdWorkOutline,
} from "react-icons/md";
function Companyprofile() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  return (
    <>
      <div className="comapny-profile  ">
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
              <div className="profile-details  px-[40px] py-[32px] ">
                {/* {imgs} */}
                <div className="imgs relative group max-w-[1020px]">
                  <div className="background relative overflow-hidden rounded-[50px] h-[300px]">
                    <label htmlFor="img_cover">
                      <img
                        src={
                          selectedImage
                            ? URL.createObjectURL(selectedImage)
                            : background
                        }
                        alt="cover"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-9 right-8 bg-black/30 p-2 rounded-full">
                        <img src={cam} alt="change cover" className="w-6 h-6" />
                      </div>
                    </label>
                    <input
                      type="file"
                      id="img_cover"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) =>
                        e.target.files[0] && setSelectedImage(e.target.files[0])
                      }
                    />
                  </div>
                  <div className="absolute -bottom-16 left-12">
                    <div className="relative group">
                      <label htmlFor="img_logo" className="">
                        <div className=" rounded-full border-4 border-white overflow-hidden bg-white shadow-lg">
                          <img
                            src={
                              selectedLogo
                                ? URL.createObjectURL(selectedLogo)
                                : smallimg
                            }
                            alt="logo"
                            className="w-[140px] h-[140px] object-contain"
                          />
                        </div>

                        <div className="absolute bottom-2 right-2 bg-[#1F2937] p-2  cursor-pointer rounded-full border-2 border-white shadow-md">
                          <img
                            src={cam}
                            alt="change logo"
                            className="w-4 h-4 invert"
                          />
                        </div>
                      </label>

                      <input
                        type="file"
                        id="img_logo"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) =>
                          e.target.files[0] &&
                          setSelectedLogo(e.target.files[0])
                        }
                      />
                    </div>
                  </div>
                  {/* ---  (Logo) --- */}
                </div>
                {/* {imges} */}

                {/* {about} */}
                <div className=" bg-white mt-[100px] border border-[#E5E7EB] rounded-2xl p-6 relative shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-[20px] font-bold text-[#0D0D0D]">
                      About
                    </h2>
                    <button
                      onClick={() => setIsAboutModalOpen(true)}
                      className="text-gray-400 hover:text-[#00694B] transition-colors"
                    >
                      <svg
                        className="cursor-pointer"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                      </svg>
                    </button>
                  </div>

                  <p className="text-[#666666] text-[15px]">
                    Saudi German Hospitals is the leading healthcare provider
                    and the number one healthcare brand in the MENA region.
                    Saudi German Hospital – Egypt is part of the renowned SGH
                    Group, founded in 1988 by the El Batterji family. Today, the
                    group operates 14 hospitals across 4 countries: Egypt, Saudi
                    Arabia, the UAE, and Yemen.
                  </p>
                </div>
                {/* small about */}
                {isAboutModalOpen && (
                  <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 cursor-pointer">
                    <div
                      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                      onClick={() => setIsAboutModalOpen(false)}
                    ></div>

                    <div className="bg-white rounded-[32px] w-full max-w-[620px] p-8 relative z-10 shadow-2xl">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-[24px] font-bold text-[#0D0D0D]">
                          Edit About
                        </h2>
                        <button
                          onClick={() => setIsAboutModalOpen(false)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <svg
                            className="cursor-pointer"
                            width="24"
                            height="24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>

                      <div className="bg-[#F9FAFB] border border-[#F3F4F6] rounded-2xl p-5 mb-8">
                        <textarea
                          className="w-full h-[220px] bg-transparent border-none focus:ring-0 text-[#4B5563] text-[15px] leading-relaxed resize-none"
                          placeholder="Describe your company..."
                          defaultValue="Saudi German Hospitals is the leading healthcare provider and the number one healthcare brand in the MENA region. Saudi German Hospital – Egypt is part of the renowned SGH Group..."
                        ></textarea>
                      </div>

                      <div className="flex justify-center">
                        <button
                          className="bg-[#00694B] cursor-pointer text-white px-20 py-3.5 rounded-full font-bold text-[18px] hover:bg-[#00523B] transition-all transform active:scale-95 shadow-md"
                          onClick={() => setIsAboutModalOpen(false)}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {/* small about */}
                {/* {about} */}

                  
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
  {/* كارد السوشيال ميديا */}
<div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-xl font-bold text-[#0D0D0D]">Social Media</h2>
    <button onClick={() => setIsSocialModalOpen(true)} className="text-gray-400 hover:text-black">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
    </button>
  </div>

  <div className="space-y-4">
  {[
    { name: 'LinkedIn', iconImg: linkedin }, 
    { name: 'Facebook', iconImg: facebook },
    { name: 'X/Twitter', iconImg: twitter },
    { name: 'Instagram', iconImg: insta },
    { name: 'Snapchat', iconImg: snap },
  ].map((social, index) => (
    <div key={index} className="flex items-center justify-between group">
      <div className="flex items-center gap-3">
         <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm border border-gray-50 overflow-hidden">
          <img 
            src={social.iconImg} 
            alt={social.name} 
            className="w-full h-full object-contain" 
          />
        </div>
        
        <div>
          <p className="text-sm font-semibold text-gray-700">{social.name}</p>
          <p className="text-[11px] text-[#00694B] truncate max-w-[220px]">
            https://www.linkedin.com/in/ahmed-eltatawe-30997923a/
          </p>
        </div>
      </div>

      <button className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-full">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        </svg>
      </button>
    </div>
  ))}
</div>
</div>

  {/* كارد معلومات الشركة (Base Info) */}
  <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
    <h2 className="text-xl font-bold text-[#0D0D0D] mb-8">Base Info</h2>
    <div className="space-y-6">
      {[
        { label: 'Official Email', value: 'sgheg@gmail.com' },
        { label: 'Location', value: 'Cairo, Egypt' },
        { label: 'Official phone number', value: '+96612345678' },
        { label: 'Founded', value: '2015' },
      ].map((info, idx) => (
        <div key={idx} className="flex justify-between items-center border-b border-gray-50 pb-4">
          <span className="text-gray-500 text-sm">{info.label}</span>
          <span className="font-bold text-sm text-[#0D0D0D]">{info.value}</span>
        </div>
      ))}
    </div>
  </div>
  {isSocialModalOpen && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsSocialModalOpen(false)}></div>
    
    <div className="bg-white rounded-[40px] w-full max-w-[550px] p-10 relative z-10 shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#0D0D0D]">Edit Online profile</h2>
        <button onClick={() => setIsSocialModalOpen(false)} className="text-gray-400 hover:text-black">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>

 <div className="space-y-5">
  {[
    { label: 'LinkedIn', placeholder: 'linkedin.com/in/username', iconImg: linkedin }, 
    { label: 'Facebook', placeholder: 'facebook.com/username', iconImg: facebook },
    { label: 'X/Twitter', placeholder: 'x.com/username', iconImg: twitter },
    { label: 'Instagram', placeholder: 'instagram.com/username', iconImg: insta },
    { label: 'snapchat', placeholder: 'snapchat.com/username', iconImg: snap },
  ].map((field, i) => (
    <div key={i}>
      <label className="block text-[15px] font-bold mb-2 text-[#0D0D0D] ml-1">
        {field.label}
      </label>
      <div className="relative group">
        <input 
          type="text" 
          placeholder={field.placeholder}
          className={`w-full bg-[#F3F4F6] border rounded-full py-3.5 px-6 text-[14px] transition-all placeholder:text-gray-400 focus:outline-none focus:bg-white
            ${i === 0 ? 'border-[#00694B] focus:ring-1 focus:ring-[#00694B]' : 'border-transparent focus:border-[#00694B] focus:border-[#00694B]'}`}
        />
        
         <div className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-100 overflow-hidden">
           <img 
             src={field.iconImg} 
             alt={`${field.label} icon`} 
             className="w-5 h-5 object-contain" 
           />
        </div>
      </div>
    </div>
  ))}
</div>
      <div className="mt-10 flex justify-center">
        <button 
          onClick={() => setIsSocialModalOpen(false)}
          className="bg-[#00694B] text-white px-20 py-3 rounded-full font-bold text-lg hover:bg-[#00523B] transition-all"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}
</div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Companyprofile;
