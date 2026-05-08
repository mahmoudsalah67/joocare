  import React from "react";
import country from "../../../public/imge/img-contact/Country Flag.svg";
import arrow from "../../../public/imge/img-contact/Arrow Down Icon.svg";
import { Link, NavLink } from "react-router-dom";
import eye from "../../../public/imge//img-contact/eye.svg";
import cv from '../../../public/imge/img-contact/Upload Icon.svg'
import truee from '../../../public/imge/img-contact/checkbox.svg'
import { motion } from 'framer-motion';
function ForCandidate() {
  return (
    <>
    
        <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
  <div className="section-forcandidate bg-white">
   <div className="contentt flex ">
    
     
    <div className="left  flex items-center justify-center w-[715px] mb-[140px] pl-[30px] bg-[#00422F] text-white">
      <div className="middle  w-[513px] ">
        <div className="title ">
          <h2 className="text-[48px] mb-[24px] font-[600] leading-tight flex items-center">
           Let’s setup your operating Agreement
          </h2>
    <p className=" text-[21px] font-[400]  text-justify opacity-90 ">
With smart tools and AI-powered insights, joocare helps you find the right opportunity and land the job you deserve with confidence.
</p>
        </div>
      </div>
    </div>

     <div className="right  px-[40px] pt-[120px] pb-[100px]  w-[715px]">
      <div className="content w-[539px] mx-auto">
        <div className="title">
          <h2 className="text-[48px] font-[700]">Start your business</h2>
        </div>
        
        <div className="form mt-[24px]">
          <form>
  
              <div className="name flex flex-col">
              <label htmlFor="name" className="text-[#0D0D0D] font-[600]">company name</label>
              <input
                type="text"
                id="name"
                placeholder="ex:Nami"
                className="p-[16px] focus:border-[#00694B] outline-none transition duration-300 bg-[#0D0D0D0D] border-[1px] border-[#0D0D0D14] rounded-[999px] mt-[4px]"
              />
            </div>

            {/* Email */}
            <div className="email flex flex-col mt-[24px]">
              <label htmlFor="email" className="text-[#0D0D0D] font-[600]">Official Email</label>
              <input
                type="email"
                id="email"
                placeholder="ex:mail@mail.com"
                className="p-[16px] bg-[#0D0D0D0D] focus:border-[#00694B] outline-none transition duration-300 border-[1px] border-[#0D0D0D14] rounded-[999px] mt-[4px]"
              />
            </div>

            <div className="flex flex-col mt-[24px]">
              <label className="font-[600] text-[#111827] mb-[8px] ml-[4px]">Domain</label>
              <div className="flex justify-between items-center p-[16px] bg-[#0D0D0D0D] border-[1px] border-[#0D0D0D14] rounded-[999px] focus-within:border-[#00694B] transition duration-300">
                <select className="w-full bg-transparent outline-none cursor-pointer text-gray-500">
                  <option value="" disabled selected>ex:Hospital</option>
                 
                </select>
              </div>
            </div>
                 <div className="name flex flex-col mt-[24px]">
              <label htmlFor="name" className="font-[600] text-[#111827] mb-[8px] ml-[4px]">Contact person  ( full name ) </label>
              <input
                type="text"
                id="name"
                placeholder="ex:Nami"
                className="p-[16px] focus:border-[#00694B] outline-none transition duration-300 bg-[#0D0D0D0D] border-[1px] border-[#0D0D0D14] rounded-[999px] mt-[4px]"
              />
            </div>
            {/* Phone Number */}
            <div className="flex flex-col mt-[24px]">
              <label className="text-[#0D0D0D] font-[600] mb-[8px] ml-[4px]">Contact person _ Phone number </label>
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
                />
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
                />
                <div className="absolute right-5 top-1/2 -translate-y-1/2 mt-[2px] cursor-pointer">
                  <img src={eye} alt="" />
                </div>
              </div>
            </div>

          

           
            <div className="contant2 mt-[24px]">
              <div className="flex gap-[8px] mb-[16px] items-center">
                <img src={truee} alt="" />
                <p className="text-[#0D0D0D]">I confirm that I am an employee of the company and that I am authorised to use JooCare services on its behalf.</p>
              </div>
              <div className="flex gap-[8px] mb-[16px] items-center">
                <img src={truee} alt="" />
                <p className="text-[#0D0D0D]">I agree to the Terms & Conditions and Privacy Policy.</p>
              </div>
              
              
            </div>
            
            
           

            <Link
              to="/login"
              className="py-[16px] px-[32px] w-[223px] flex items-center justify-center mt-[32px] mx-auto bg-[#00694B] hover:bg-black transition duration-500 rounded-full text-white font-bold"
            >
              Register
            </Link>
              <div className="footer text-center mt-[16px]">
                    <span  className='text-[16px] text-[#0D0D0DA6]'>New to JooCare ? <NavLink to={'/login'} className='text-[#00694B] border-b-[1px] font-[600]'>Sign in</NavLink></span>
                   </div>
            
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
      </motion.div>
    </>
  )
}

export default ForCandidate