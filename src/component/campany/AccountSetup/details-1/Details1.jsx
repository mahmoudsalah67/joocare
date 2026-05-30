import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from 'react-hot-toast';  

import "../../forcandidate/ForCandidate.css";
import country from "../../../../../public/imge/img-contact/Country Flag.svg";
import arrow from "../../../../../public/imge/img-contact/Arrow Down Icon.svg";
import eye from "../../../../../public/imge/img-contact/eye.svg";
import cv from "../../../../../public/imge/img-contact/Upload Icon.svg";
import truee from "../../../../../public/imge/img-contact/checkbox.svg";
import Icon from "../../../../../public/imge/Icon.svg";
import Icon2 from "../../../../../public/imge/Icon (1).svg";
 import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import {
  MdDashboard,
  MdKeyboardArrowDown,
  MdPersonOutline,
  MdSettings,
  MdWorkOutline,
} from "react-icons/md";

function Details1() {
  const [domains, setdomains] = useState([]);

//  domain api

   async function fetchdatadomain() {
 
   try {
     const response = await fetch('https://joocare.nami-tec.com/api/domains?pagination=on&limit_per_page=10&page=1');
     const data = await response.json();
   setdomains(data)
      
   } catch (error) {
     console.error("Error:", error);
   }
 }


 useEffect(()=>{
fetchdatadomain()
 },[])
  //  domain api



  const {
    handleSubmit,
    register,
     formState: { errors },
    control
  } = useForm();

  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

const onSubmit = (data) => {
  const token = localStorage.getItem('company_token');

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'  
    }
  };

   let phoneCode = "";
  let phoneNumber = data.person_phone || "";
  
  if (phoneNumber.startsWith('+')) {
     
    
    phoneCode = phoneNumber.substring(0, 3); 
    phoneNumber = phoneNumber.substring(3);  
  }

  const setupPayload = {
    name: data.name,                  
    domain_id: data.domain_id,         
    person_name: data.person_name,    
    person_phone: phoneNumber,
    person_phone_code: phoneCode       
  };

  console.log("Payload to send:", setupPayload);

  axios
    .post("https://joocare.nami-tec.com/api/company/auth/setup-account", setupPayload, config)
    .then((res) => {
        toast.success("Account setup successful", {
                  position: "top-right",
                  style: {
                    background: "#E6F4EA", 
                    color: "#1E8E3E",
                    borderRadius: "10px",
                  },
                });
      navigate("/details2");
    })
    .catch((err) => {
      console.error(err);
    });
};

  return (
    <div className="min-h-screen bg-[#F8F9FA] ">
      <div className="flex grid grid-cols-12 px-20 w-[1100px]">
        <aside className="w-[300px] h-fit flex flex-col gap-4 col-span-4 bg-white pt-[120px] mt-[-80px] pb-8 px-[12px] rounded-b-[32px] shadow-sm">
          {/* كارت المستشفى */}
          <div className=" rounded-[24px] p-5 border bg-[#F7FAF7] border-[#F1F1F1] shadow-sm">
            <div className="flex items-center gap-3 mb-3 ">
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
              Please complete your account details so you can use the platform
              normally.
            </p>
            <Link to={"/Details2"} className="">
              <button className="w-full cursor-pointer bg-[#E32B2B] text-white font-bold py-3 rounded-full hover:bg-[#C22424] transition-all">
                Complete Now
              </button>
            </Link>{" "}
          </div>

          {/* قائمة الروابط */}
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

        {/* الجزء الرئيسي (الـ Form والـ Steps) */}
        <main className="flex-1 col-span-8 w-[1020px] py-[70px]">
          <div className="bg-white rounded-[24px] shadow-[0_4px_30px_rgba(0,0,0,0.06)] px-[40px] py-[32px] border border-[#F1F1F1]">
            <div className="flex items-center justify-between mb-[80px] relative max-w-[95%] mx-auto">
              <div
                className="absolute top-[16px] left-0 right-0 h-[4px] bg-[#E5E5E5] z-0"
                style={{ transform: "translateY(-50%)" }}></div>

              <div
                className="absolute top-[16px] left-0 h-[4px] bg-[#00694B] z-0 transition-all duration-500 ease-in-out"
                style={{
                  transform: "translateY(-50%)",
                  width:
                    currentStep === 1
                      ? "0%"
                      : currentStep === 2
                        ? "50%"
                        : "100%",
                }}
              ></div>

              {/* Step 1 */}
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[14px] font-bold transition-colors duration-300
                    ${currentStep >= 1 ? "bg-[#00694B] text-white" : "bg-[#EAEAEA] text-[#9E9E9E]"}`}
                >
                  1
                </div>
                <p
                  className={`text-[14px] mt-4 absolute top-8 whitespace-nowrap ${currentStep >= 1 ? "font-bold text-[#0D0D0D]" : "font-medium text-[#A3A3A3]"}`}
                >
                  Account Setup
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[14px] font-bold transition-colors duration-300
                    ${currentStep >= 2 ? "bg-[#00694B] text-white" : "bg-[#EAEAEA] text-[#9E9E9E]"}`}
                >
                  2
                </div>
                <p
                  className={`text-[14px] mt-4 absolute top-8 whitespace-nowrap ${currentStep >= 2 ? "font-bold text-[#0D0D0D]" : "font-medium text-[#A3A3A3]"}`}
                >
                  Business Verification
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[14px] font-bold transition-colors duration-300
                    ${currentStep >= 3 ? "bg-[#00694B] text-white" : "bg-[#EAEAEA] text-[#9E9E9E]"}`}
                >
                  3
                </div>
                <p
                  className={`text-[14px] mt-4 absolute top-8 whitespace-nowrap ${currentStep >= 3 ? "font-bold text-[#0D0D0D]" : "font-medium text-[#A3A3A3]"}`}
                >
                  Company Profile
                </p>
              </div>
            </div>

            {/* FORM */}
            <form
  onSubmit={handleSubmit(onSubmit)}
  className="space-y-6 max-w-[850px] mx-auto"
>
  {/* 1. Company Name (اسم الشركة) */}
  <div className="flex flex-col">
    <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">
      Company name
    </label>
    <input
      type="text"
      placeholder="ex: Nami"
      {...register("name", { required: "Company name is required" })} // تعديل لـ name
      className={`w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 outline-none focus:ring-2 focus:ring-[#00694B]/20 border transition-all placeholder:text-[#8F8F8F] ${errors.name ? "border-red-500" : "border-transparent"}`}
    />
    {errors.name && <p className="text-red-500 text-[13px] mt-1 px-4">{errors.name.message}</p>}
  </div>

   

  {/* 3. Domain */}
  <div className="flex flex-col">
    <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">
      Domain
    </label>
    <div className="relative">
      <select
        {...register("domain_id", { required: "Domain is required" })} // تعديل لـ domain_id
        className={`w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 appearance-none outline-none cursor-pointer text-[#8F8F8F] border ${errors.domain_id ? "border-red-500" : "border-transparent"}`}
      >
        <option value="">ex: Hospital</option>
        {domains?.data?.map((dom) => (
          <option key={dom.id} value={dom.id}>
            {dom.title}
          </option>
        ))}
      </select>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
        <MdKeyboardArrowDown size={24} />
      </div>
    </div>
    {errors.domain_id && <p className="text-red-500 text-[13px] mt-1 px-4">{errors.domain_id.message}</p>}
  </div>

  {/* 4. Contact person _ full name (اسم الشخص المسؤول - الحقل الجديد) */}
  <div className="flex flex-col">
    <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">
      Contact person full name
    </label>
    <input
      type="text"
      placeholder="ex: Mahmoud Keshta"
      {...register("person_name", { required: "Contact person name is required" })} // حقل person_name
      className={`w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 outline-none focus:ring-2 focus:ring-[#00694B]/20 border transition-all placeholder:text-[#8F8F8F] ${errors.person_name ? "border-red-500" : "border-transparent"}`}
    />
    {errors.person_name && <p className="text-red-500 text-[13px] mt-1 px-4">{errors.person_name.message}</p>}
  </div>

  {/* 5. Phone Number */}
  <div className="flex flex-col">
    <label className="text-[15px] font-bold text-[#0D0D0D] mb-2 flex items-center justify-between">
      <span>Contact person _ Phone number <span className="text-red-500">*</span></span>
    </label>
    
    <div className={`phone-input-container flex items-center bg-[#EAEAEA] border rounded-full px-4 transition duration-300 ${errors.person_phone ? 'border-red-500 focus-within:border-red-500' : 'border-transparent focus-within:border-[#00694B]'}`}>
      <Controller
        name="person_phone"
        control={control}
        rules={{ required: "Phone number is required" }}
        render={({ field: { onChange, value } }) => (
          <PhoneInput
            international
            defaultCountry="EG"
            placeholder="Enter phone number"
            value={value}
            onChange={onChange}
            className="w-full h-[56px]"
          />
        )}
      />
    </div>
    {errors.person_phone && <p className="text-red-500 text-[13px] mt-1 px-4 font-medium">{errors.person_phone.message}</p>}
  </div>

  <button
    type="submit"
    className="w-[200px] h-[56px] bg-[#152126] hover:bg-black text-white rounded-full font-bold text-[16px] mx-auto flex items-center justify-center transition-all mt-10"
  >
    Next
  </button>
</form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Details1;