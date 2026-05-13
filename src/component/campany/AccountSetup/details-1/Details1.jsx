import React, { useState } from 'react';

import { useForm, Controller } from 'react-hook-form';

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import { Link,  NavLink, useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';

import '../../forcandidate/ForCandidate.css';

import country from '../../../../../public/imge/img-contact/Country Flag.svg';
import arrow from '../../../../../public/imge/img-contact/Arrow Down Icon.svg';
import eye from '../../../../../public/imge/img-contact/eye.svg';
import cv from '../../../../../public/imge/img-contact/Upload Icon.svg';
import truee from '../../../../../public/imge/img-contact/checkbox.svg';
import { MdDashboard, MdKeyboardArrowDown, MdPersonOutline, MdSettings, MdWorkOutline } from 'react-icons/md';
 function Details1() {
  const { control, handleSubmit, register, formState: { errors } } = useForm();
 
const [currentStep, setCurrentStep] = useState(1);
const navigate = useNavigate();

const onSubmit = (data) => {
  console.log("Form Data:", data);
  
  navigate("/details2");
};
  return (


 <div className="min-h-screen bg-[#F8F9FA] ">
   

  <div className="flex grid grid-cols-12 px-20 w-[1100px]">
    <aside className="w-[300px] h-fit flex flex-col gap-4 col-span-4 bg-white pt-[120px] mt-[-80px] pb-8 px-[12px] rounded-b-[32px] shadow-sm">
      {/* كارت المستشفى */}
      <div className=" rounded-[24px] p-5 border bg-[#F7FAF7] border-[#F1F1F1] shadow-sm">
        <div className="flex items-center gap-3 mb-3 ">
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

      {/* كارت الـ Please complete */}
      <div className="bg-[#FFF5F5] rounded-[24px] p-6 border border-[#FFDADA]">
        <h4 className="text-[#FF4D4D] font-bold text-[18px] mb-2 leading-tight">Please complete your details.</h4>
        <p className="text-[13px] text-[#4D4D4D] mb-5">Please complete your account details so you can use the platform normally.</p>
        <button className="w-full bg-[#E32B2B] text-white font-bold py-3 rounded-full hover:bg-[#C22424] transition-all">Complete Now</button>
      </div>

      {/* قائمة الروابط */}
     <div className="flex flex-col gap-1 px-2 mt-2">
  {/* Company Profile */}
  <NavLink 
    to="/companyprofile" 
    className={({ isActive }) => 
      `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${
        isActive ? "bg-[#E6F3EF] text-[#00694B] font-bold border border-[#00694B]/10" : "text-[#8F8F8F]"
      }`
    }
  >
    <MdPersonOutline className="text-xl"/> Company Profile
  </NavLink>

  {/* Dashboard */}
  <NavLink 
    to="/Dashboard" 
    className={({ isActive }) => 
      `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${
        isActive ? "bg-[#E6F3EF] text-[#00694B] font-bold border border-[#00694B]/10" : "text-[#8F8F8F]"
      }`
    }
  >
    <MdDashboard className="text-xl"/> Dashboard
  </NavLink>

  {/* Job Management */}
  <NavLink 
    to="/JobManagement" 
    className={({ isActive }) => 
      `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${
        isActive ? "bg-[#E6F3EF] text-[#00694B] font-bold border border-[#00694B]/10" : "text-[#8F8F8F]"
      }`
    }
  >
    <MdWorkOutline className="text-xl"/> Job Management
  </NavLink>

  {/* Account settings */}
  <NavLink 
    to="/Accountsettings" 
    className={({ isActive }) => 
      `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${
        isActive ? "bg-[#E6F3EF] text-[#00694B] font-bold border border-[#00694B]/10" : "text-[#8F8F8F]"
      }`
    }
  >
    <MdSettings className="text-xl"/> Account settings
  </NavLink>
</div>

      <button className="mt-auto w-full bg-[#00694B] text-white font-bold py-4 rounded-full flex items-center justify-center gap-2">Post a Job</button>
    </aside>
 
    {/* 3. الجزء الرئيسي (الـ Form والـ Steps) */}
    <main className="flex-1 col-span-8 w-[1020px] py-[70px]">
      <div className="bg-white rounded-[24px] shadow-[0_4px_30px_rgba(0,0,0,0.06)] px-[40px] py-[32px] border border-[#F1F1F1]">
        
       
<div className="flex items-center justify-between mb-[80px] relative max-w-[95%] mx-auto">
  
   <div 
    className="absolute top-[16px] left-0 right-0 h-[4px] bg-[#E5E5E5] z-0"
    style={{ transform: 'translateY(-50%)' }}
  ></div>

   <div 
    className="absolute top-[16px] left-0 h-[4px] bg-[#00694B] z-0 transition-all duration-500 ease-in-out"
    style={{ 
      transform: 'translateY(-50%)',
      width: currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%" 
    }}
  ></div>

  {/* Steps Wrapper */}
  {/* Step 1 */}
  <div className="flex flex-col items-center relative z-10">
    <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[14px] font-bold transition-colors duration-300
      ${currentStep >= 1 ? "bg-[#00694B] text-white" : "bg-[#EAEAEA] text-[#9E9E9E]"}`}>
      1
    </div>
    <p className={`text-[14px] mt-4 absolute top-8 whitespace-nowrap ${currentStep >= 1 ? "font-bold text-[#0D0D0D]" : "font-medium text-[#A3A3A3]"}`}>
      Account Setup
    </p>
  </div>

  {/* Step 2 */}
  <div className="flex flex-col items-center relative z-10">
    <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[14px] font-bold transition-colors duration-300
      ${currentStep >= 2 ? "bg-[#00694B] text-white" : "bg-[#EAEAEA] text-[#9E9E9E]"}`}>
      2
    </div>
    <p className={`text-[14px] mt-4 absolute top-8 whitespace-nowrap ${currentStep >= 2 ? "font-bold text-[#0D0D0D]" : "font-medium text-[#A3A3A3]"}`}>
      Business Verification
    </p>
  </div>

  {/* Step 3 */}
  <div className="flex flex-col items-center relative z-10">
    <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[14px] font-bold transition-colors duration-300
      ${currentStep >= 3 ? "bg-[#00694B] text-white" : "bg-[#EAEAEA] text-[#9E9E9E]"}`}>
      3
    </div>
    <p className={`text-[14px] mt-4 absolute top-8 whitespace-nowrap ${currentStep >= 3 ? "font-bold text-[#0D0D0D]" : "font-medium text-[#A3A3A3]"}`}>
      Company Profile
    </p>
  </div>
</div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-[850px] mx-auto">
          {/* Company Name */}
          <div className="flex flex-col ">
            <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">Company name</label>
            <input type="text" placeholder="ex: Nami" {...register("company_name")} 
                   className="w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 outline-none focus:ring-2 focus:ring-[#00694B]/20 border-transparent transition-all placeholder:text-[#8F8F8F]" />
          </div>

          {/* Official Email */}
          <div className="flex flex-col">
            <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">Official Email</label>
            <input type="email" placeholder="ex: mail@mail.com" {...register("email")}
                   className="w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 outline-none focus:ring-2 focus:ring-[#00694B]/20 transition-all" />
          </div>

          {/* Domain */}
          <div className="flex flex-col">
            <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">Domain</label>
            <div className="relative">
              <select {...register("domain")} className="w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 appearance-none outline-none cursor-pointer text-[#8F8F8F]">
                <option value="">ex: Hospital</option>
              </select>
              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#00694B]"><MdKeyboardArrowDown size={24}/></div>
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col">
            <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">Contact person _ Phone number</label>
            <div className="flex gap-3">
              <div className="w-[120px] h-[56px] rounded-full bg-[#EAEAEA] flex items-center justify-center gap-2 text-[#0D0D0D] font-medium cursor-pointer">
                <img src={country} className="w-6 h-6 rounded-sm" /> <span>+966</span> <MdKeyboardArrowDown />
              </div>
              <input type="tel" placeholder="ex: 52 987 6543" className="flex-1 h-[56px] bg-[#EAEAEA] rounded-full px-6 outline-none" />
            </div>
          </div>

          <button type="submit" className="w-[200px] h-[56px] bg-[#152126] hover:bg-black text-white rounded-full font-bold text-[16px] mx-auto flex items-center justify-center transition-all mt-10">
            Next
          </button>
        </form>
      </div>
    </main>
  </div>
</div>
  );
  };
 
 
 export default Details1