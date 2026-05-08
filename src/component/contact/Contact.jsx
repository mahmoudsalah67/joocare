import { motion } from "framer-motion";
import React from "react";
import arrow from "../../../public/imge/img-jobs/arrow-square-left.svg";
import contact from "../../../public/imge/img-contact/svgContactUs.png";
import { FaStar } from "react-icons/fa";
import sochial from '../../../public/imge/img-contact/Frame 2608822.svg'
import { NavLink } from "react-router-dom";

function Contact() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="section-contact pt-19 bg-gray-50">
          <div className="topp h-[200px] py-[40px]    text-white">
            <div className="container px-30 flex  items-center justify-between">
              <h1 className="text-[18px] font-[600]">Contact Us</h1>
              <div className="flex items-center  text-[18px] font-[600]">
                <p className=" cursor-pointer">Title</p>
                <img src={arrow} alt="" className="text-white" />
                <p>Contact Us</p>
              </div>
            </div>
          </div>

          <div className="container mx-auto bg-white  mb-[79px] p-8  max-w-[1300px] rounded-[32px] mt-[-100px] z-10 shadow-lg">
  <div className="content flex flex-col lg:flex-row items-start gap-[60px]">
    
     <div className="leftt lg:w-[40%] bg-[#F7FAF7] p-[40px] rounded-[32px] w-full">
      <div className="title-1 flex items-center gap-2 mb-6 border-[1px] border-[#2E90A61A] rounded-[12px] py-[8px] px-[16px] w-fit bg-white">
        <FaStar className="text-[#00694B] text-[16px]" />
        <p className="text-[#1C2628] text-[14px] font-[500]">Contact Us</p>
      </div>
      <h2 className="font-bold text-[32px] text-[#111827] mb-6">Get in Touch with us</h2>
      
      <div className="image-container mb-8">
        <img src={contact} alt="Contact Us" className="w-full h-auto" />
      </div>

      <NavLink to={'/forcandidate'} className="text-[16px] px-[150px] font-semibold text-white w-full bg-[#00694B] hover:bg-black transition duration-300 rounded-full py-[16px]">
        For Employer
      </NavLink>

      <div className="social mt-10">
        <p className="text-[16px] font-bold mb-4">Follow us</p>
        <img src={sochial} alt="Social links" className="h-8" />
      </div>
    </div>

     <div className="right flex-1 w-full py-4">
      <div className="title-1 flex items-center gap-2 mb-4 border-[1px] border-[#2E90A61A] rounded-[12px] py-[8px] px-[16px] w-fit bg-[#12121205]">
        <FaStar className="text-[#00694B] text-[16px]" />
        <p className="text-[#1C2628] text-[14px] font-[500]">REQUEST FOR DEMO</p>
      </div>
      <h2 className="font-bold text-[36px] text-[#111827] mb-8">Send your message</h2>

      <form className="flex flex-col gap-6 ">

         <div className="flex flex-col gap-2">
          <label htmlFor="full-name" className="text-[16px] font-bold text-[#111827] px-1">Full Name</label>
          <input 
            type="text" 
            id="full-name" 
            placeholder="ex:Ahmed eltatawy" 
            className="w-full h-[56px] px-6  rounded-[20px] bg-[#f3f4f6] border border-transparent focus:border-[#00694B] focus:bg-white outline-none transition duration-300"
          />
        </div>

         <div className="flex flex-col gap-2">
          <label htmlFor="user-email" className="text-[16px] font-bold text-[#111827] px-1">Email</label>
          <input 
            type="email" 
            id="user-email"
            placeholder="ex:mail@mail.com" 
            className="w-full h-[56px] px-6 rounded-[20px] bg-[#f3f4f6] border border-transparent focus:border-[#00694B] focus:bg-white outline-none transition duration-300"
          />
        </div>

         <div className="flex flex-col gap-2">
          <label className="text-[16px] font-bold text-[#111827] px-1">Type of inquiry</label>
          <select className="w-full h-[56px] px-6 rounded-[20px] bg-[#f3f4f6] border border-transparent focus:border-[#00694B] focus:bg-white outline-none appearance-none transition duration-300 text-gray-400">
            <option>ex:Type of inquiry</option>
            <option>ex:Type of inquiry</option>
          </select>
        </div>

         <div className="flex flex-col gap-2">
          <label className="text-[16px] font-bold text-[#111827] px-1">Message</label>
          <textarea 
            placeholder="Message gose here..." 
            className="w-full h-[150px] p-6 rounded-[24px] bg-[#f3f4f6] border border-transparent focus:border-[#00694B] focus:bg-white outline-none transition resize-none"></textarea>
        </div>

        <button type="submit" className="w-full h-[60px] bg-[#111827] text-white rounded-full font-bold text-[18px] mt-4 hover:bg-black transition-all">
          Send
        </button>
      </form>
    </div>

  </div>
</div>
        </div>
      </motion.div>
    </>
  );
}

export default Contact;
