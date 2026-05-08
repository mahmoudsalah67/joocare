import { motion } from "framer-motion";
import React from "react";
import country from "../../../public/imge/img-contact/Country Flag.svg";
import arrow from "../../../public/imge/img-contact/Arrow Down Icon.svg";
import { Link, useNavigate } from "react-router-dom";
import eye from "../../../public/imge//img-contact/eye.svg";
import cv from '../../../public/imge/img-contact/Upload Icon.svg'
import truee from '../../../public/imge/img-contact/checkbox.svg'
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
 

import './JoinNow.css'
function JoinNow() {
  const { register, handleSubmit } = useForm();
 const navigate =  useNavigate()
     function get(data){
      console.log('...joinnow',data)
      navigate('/login')
     }
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
  <div className="section-joinnow bg-white">
   <div className="contentt flex ">
    
     
    <div className="left sticky top-0 flex items-center justify-center w-[715px] h-screen pl-[30px] bg-[#00422F] text-white">
      <div className="middle  w-[513px] ">
        <div className="title ">
          <h2 className="text-[48px] mb-[24px] font-[600] leading-tight flex items-center">
            Match Faster <br />
            work smarter
          </h2>
    <p className=" text-[21px] font-[400]  text-justify opacity-90 ">
  With smart tools and AI-powered insights, joocare helps you to find the right 
  opportunity and land the job you deserve with confidence. Joocare leverages 
  AI-driven tools and insights to connect you with opportunities that match your 
  skills and career goals, empowering you to succeed with confidence.
</p>
        </div>
      </div>
    </div>

     <div className="right  px-[40px] pt-[120px] pb-[100px]  w-[715px]">
      <div className="content w-[539px] mx-auto">
        <div className="title">
          <h2 className="text-[48px] font-[700]">Let’s Get Started</h2>
        </div>
        
        <div className="form mt-[24px]">
          <form onSubmit={handleSubmit(get)}>
            {/* Full Name */}
            <div className="name flex flex-col">
              <label htmlFor="name" className="text-[#0D0D0D] font-[600]">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="ex:Ahmed eltatawy"
                className="p-[16px] focus:border-[#00694B] outline-none transition duration-300 bg-[#0D0D0D0D] border-[1px] border-[#0D0D0D14] rounded-[999px] mt-[4px]"
                {...register("name", { required: true })}
              />
            </div>

            {/* Email */}
            <div className="email flex flex-col mt-[24px]">
              <label htmlFor="email" className="text-[#0D0D0D] font-[600]">Email</label>
              <input
                type="email"
                id="email"
                placeholder="ex:mail@mail.com"
                className="p-[16px] bg-[#0D0D0D0D] focus:border-[#00694B] outline-none transition duration-300 border-[1px] border-[#0D0D0D14] rounded-[999px] mt-[4px]"
                {...register("email", { required: true })}
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col mt-[24px]">
              <label className="text-[#0D0D0D] font-[600]">Phone Number</label>
              <div className="search-jobs flex items-center justify-between mt-[4px]">
                <div className="country border-[#0D0D0D14] bg-[#0D0D0D0D] border-[1px] py-[14px] px-[14px] w-[114px] rounded-full flex justify-between items-center">
                  <img src={country} alt="" className="w-[24px] mr-[4px]" />
                  <p>+966</p>
                  <img src={arrow} alt="" />
                </div>
                <input
                  type="tel"
                  id="tel"
                  placeholder="ex:52 987 6543"
                  className="p-[16px] bg-[#0D0D0D0D] focus:border-[#00694B] w-[413px] outline-none transition duration-300 border-[1px] border-[#0D0D0D14] rounded-[999px]"
                  {...register("phone", { required: true })}
                />
              </div>
            </div>
 
            <div className="flex flex-col mt-[24px]">
              <label className="font-[600] text-[#111827] mb-[8px] ml-[4px]">Job Title</label>
              <div className="flex justify-between items-center p-[16px] bg-[#0D0D0D0D] border-[1px] border-[#0D0D0D14] rounded-[999px] focus-within:border-[#00694B] transition duration-300">
                <select defaultValue="" className="w-full bg-transparent outline-none cursor-pointer text-gray-500" {...register("jobTitle", { required: true })}>
                  <option value="" disabled >ex:Consultant Internist</option>
                  <option value="developer">Software Developer</option>
                  <option value="lawyer">Commercial Lawyer</option>
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="flex flex-col mt-[24px]">
              <label className="font-[600] text-[#111827] mb-[8px] ml-[4px]">Current Location</label>
              <div className="flex items-center justify-center gap-4">
                <div className="flex w-full p-[16px] bg-[#0D0D0D0D] border-[1px] border-[#0D0D0D14] rounded-[999px] focus-within:border-[#00694B]">
                  <select defaultValue="" className="w-full bg-transparent outline-none text-gray-500" {...register("country", { required: "Please select a job location" })}>
                    <option value="" disabled >Country</option>
                    <option value="sa">Saudi Arabia</option>
                    <option value="eg">Egypt</option>
                  </select>
                </div>
                <div className="flex w-full p-[16px] bg-[#0D0D0D0D] border-[1px] border-[#0D0D0D14] rounded-[999px] focus-within:border-[#00694B]">
                  <select defaultValue="" className="w-full bg-transparent outline-none text-gray-500" {...register("jobcity", { required: "Please select a job location" })}>
                    <option value="" disabled >City</option>
                    <option value="riyadh">Riyadh</option>
                    <option value="dubai">Dubai</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="password flex flex-col mt-[24px] relative">
              <label className="font-[600] text-[#111827]">Create Password</label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="p-[16px] w-full bg-[#0D0D0D0D] focus:border-[#00694B] outline-none transition duration-300 border-[1px] border-[#0D0D0D14] rounded-[999px] mt-[4px]"
                  {...register("password", { required: true })}
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2 mt-[2px] cursor-pointer">
                  <img src={eye} alt="" />
                </div>
              </div>
            </div>

         {/* CV Upload */}
<div className="cv mt-[24px]">
  <p className="font-[600] mb-[8px]">Upload CV</p>
  
   <label 
    htmlFor="cv-upload" 
    className="flex flex-col justify-center items-center p-[24px] rounded-[12px] bg-[#0D0D0D0D] border-[1px] border-dashed border-[#0D0D0D14] hover:border-[#00694B] cursor-pointer transition duration-500"
  >
    <img src={cv} alt="" className="mb-2" />
    <p className="text-center">
      Drag & Drop your files or <span className="text-[#00694B] font-bold">Browse</span>
    </p>

     <input 
      type="file" 
      id="cv-upload" 
      className="hidden" 
      accept=".pdf,.doc,.docx" 
      {...register("cvFile", { required: "Please upload your CV" })} 
    />
  </label>

  
  
</div>

           
            <div className="contant2 mt-[24px]">
              <div className="flex gap-[8px] mb-[16px] items-center">
                <img src={truee} alt="" />
                <p className="text-[#0D0D0D]">Do you hold a valid medical license?</p>
              </div>
              {/* country section */}
              <div className="country">
                <label className="font-[600] text-[#111827] ml-[4px]">Country</label>
                <div className="p-[16px] bg-[#0D0D0D0D] border-[1px] mt-[4px] cursor-pointer border-[#0D0D0D14] transition duration-500 rounded-[999px] focus-within:border-[#00694B] ">
                  <select defaultValue='' className="w-full bg-transparent  text-gray-500 cursor-pointer" {...register("jobcountry", { required: "Please select a job location" })}>
                    <option value="" disabled >Country</option>
                    <option value="sa">Saudi Arabia</option>
                    <option value="eg">Egypt</option>
                  </select>
                </div>
              </div>
              <p className="text-[#00694B] mt-[8px] text-sm">Please specify the country issuing your license.</p>
               {/* License Section */}
              <div className="mt-[16px] flex flex-col">
                <label className="font-[600] text-[#111827] ml-[4px]">License Title</label>
                <input type="text" placeholder="ex: MOH, DOH, CST" className="p-[16px] bg-[#0D0D0D0D] focus:border-[#00694B] outline-none transition duration-500 border-[1px] border-[#0D0D0D14] rounded-[999px] mt-[4px]" {...register("licenseTitle", { required: true })} />
              </div>
            </div>
            {/* License Number */}
            <div className="LicenseNumber flex flex-col mt-[16px]">
              <label htmlFor="LicenseNumber" className="font-[600] text-[#111827] ml-[4px] ">License Number <span className="font-[400] text-[#0D0D0DA6] pl-[8px]">"Optional"</span></label>
                <input type="number" {...register("LicenseNumber", { required: "Please select a job location" })} id="LicenseNumber" placeholder="ex:23121212" className="bg-[#0D0D0D0D] border-[1px] mt-[4px] p-[16px]  transition duration-500 rounded-full outline-none focus:border-[#00694B] border-[#0D0D0D14]" {...register("licenseNumber", { required: false })}/>
            </div>
<div className="LicenseNumber flex flex-col mt-[16px]">
  <label htmlFor="license-fille" className="font-[600] text-[#111827] ml-[4px]">
    License Certificate <span className="font-[400] text-[#0D0D0DA6] pl-[8px]">"Optional"</span>
  </label>
  
  <label 
    htmlFor="license-fille" 
    className="flex flex-col justify-center items-center p-[24px] rounded-[12px] mt-[4px] bg-[#0D0D0D0D] border-[1px] border-dashed border-[#0D0D0D14] hover:border-[#00694B] cursor-pointer transition duration-500"
  >
    <img src={cv} alt="" className="mb-2" />
    <p>Drag & Drop your license or <span className="text-[#00694B] font-bold">Browse</span></p>
    
    <input 
      type="file" 
      id="license-fille" 
      className="hidden" 
      {...register("licenseFile", { required: true })}
    />
  </label>
  
 
</div>

            <button
              to="/login"
              className="py-[16px] cursor-pointer px-[32px] w-[223px] flex items-center justify-center mt-[32px] mx-auto bg-[#00694B] hover:bg-black transition duration-500 rounded-full text-white font-bold"
            >
              Register
            </button>

            <div className="or flex items-center mt-[16px] gap-[13px]">
                   <div className="br border-[1px] w-[247px] border-[#0D0D0D14]"></div>
                   <div className="p">Or</div>
                   <div className="br border-[1px] w-[247px] border-[#0D0D0D14]"></div>
                   </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
      </motion.div>
    </>
  );
}

export default JoinNow;
