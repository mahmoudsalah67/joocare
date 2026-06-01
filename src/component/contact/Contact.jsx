import { motion } from "framer-motion";
import React, { useState } from "react";
import arrow from "../../../public/imge/img-jobs/arrow-square-left.svg";
import contact from "../../../public/imge/img-contact/svgContactUs.png";
import { FaStar } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md"; // إضافة أيقونة السهم للـ select
import sochial from '../../../public/imge/img-contact/Frame 2608822.svg';
import { NavLink } from "react-router-dom";

function Contact() {
  const [inquiry, setInquiry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا يمكنك إضافة منطق إرسال البيانات للـ API مستقبلاً
    console.log("Form Submitted");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="section-contact pt-19 bg-gray-50 min-h-screen">
          {/* Header Section */}
          <div className="topp h-[200px] py-[40px] text-white bg-[#00694B]">
            <div className="container px-4 md:px-8 lg:px-30 mx-auto flex items-center justify-between">
              <h1 className="text-[18px] font-[600]">Contact Us</h1>
              <div className="flex items-center text-[18px] font-[600] gap-2">
                <NavLink to="/" className="cursor-pointer hover:underline">
                  Home
                </NavLink>
                <img src={arrow} alt="" className="text-white" />
                <p>Contact Us</p>
              </div>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="container mx-auto bg-white mb-[79px] p-6 md:p-10 max-w-[1300px] rounded-[32px] mt-[-100px] relative z-10 shadow-lg">
            <div className="content flex flex-col lg:flex-row items-start gap-[40px] lg:gap-[60px]">
              
              {/* Left Column */}
              <div className="leftt lg:w-[40%] bg-[#F7FAF7] p-6 md:p-[40px] rounded-[32px] w-full flex flex-col justify-between">
                <div>
                  <div className="title-1 flex items-center gap-2 mb-6 border-[1px] border-[#2E90A61A] rounded-[12px] py-[8px] px-[16px] w-fit bg-white">
                    <FaStar className="text-[#00694B] text-[16px]" />
                    <p className="text-[#1C2628] text-[14px] font-[500]">Contact Us</p>
                  </div>
                  <h2 className="font-bold text-[28px] md:text-[32px] text-[#111827] mb-6">
                    Get in Touch with us
                  </h2>
                  
                  <div className="image-container mb-8">
                    <img src={contact} alt="Contact Us" className="w-full h-auto object-contain mx-auto max-h-[250px] lg:max-h-none" />
                  </div>
                </div>

                <div>
                  {/* تم تعديل الـ Padding هنا ليصبح متجاوباً بـ w-full و text-center */}
                  <NavLink 
                    to='/forcandidate' 
                    className="block text-[16px] font-semibold text-white w-full bg-[#00694B] hover:bg-black text-center transition duration-300 rounded-full py-[16px] mb-8"
                  >
                    For Employer
                  </NavLink>

                  <div className="social mt-6">
                    <p className="text-[16px] font-bold mb-4">Follow us</p>
                    <img src={sochial} alt="Social links" className="h-8 cursor-pointer" />
                  </div>
                </div>
              </div>

              {/* Right Column (Form) */}
              <div className="right flex-1 w-full py-4">
                <div className="title-1 flex items-center gap-2 mb-4 border-[1px] border-[#2E90A61A] rounded-[12px] py-[8px] px-[16px] w-fit bg-[#12121205]">
                  <FaStar className="text-[#00694B] text-[16px]" />
                  <p className="text-[#1C2628] text-[14px] font-[500]">REQUEST FOR DEMO</p>
                </div>
                <h2 className="font-bold text-[30px] md:text-[36px] text-[#111827] mb-8">
                  Send your message
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  {/* Full Name Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="full-name" className="text-[16px] font-bold text-[#111827] px-1">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      id="full-name" 
                      required
                      placeholder="ex: Ahmed eltatawy" 
                      className="w-full h-[56px] px-6 rounded-[20px] bg-[#f3f4f6] border border-transparent focus:border-[#00694B] focus:bg-white outline-none transition duration-300 text-gray-800 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="user-email" className="text-[16px] font-bold text-[#111827] px-1">
                      Email
                    </label>
                    <input 
                      type="email" 
                      id="user-email"
                      required
                      placeholder="ex: mail@mail.com" 
                      className="w-full h-[56px] px-6 rounded-[20px] bg-[#f3f4f6] border border-transparent focus:border-[#00694B] focus:bg-white outline-none transition duration-300 text-gray-800 placeholder:text-gray-400"
                    />
                  </div>

                  {/* Type of Inquiry Select */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] font-bold text-[#111827] px-1">
                      Type of inquiry
                    </label>
                    <div className="relative w-full">
                      <select 
                        value={inquiry}
                        onChange={(e) => setInquiry(e.target.value)}
                        className="w-full h-[56px] px-6 rounded-[20px] bg-[#f3f4f6] border border-transparent focus:border-[#00694B] focus:bg-white outline-none appearance-none transition duration-300 text-gray-700 pr-12"
                      >
                        <option value="" disabled hidden>ex: Type of inquiry</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="demo">Request Demo</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                        <MdKeyboardArrowDown className="text-gray-500 size-6" />
                      </div>
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] font-bold text-[#111827] px-1">
                      Message
                    </label>
                    <textarea 
                      required
                      placeholder="Message goes here..." 
                      className="w-full h-[150px] p-6 rounded-[24px] bg-[#f3f4f6] border border-transparent focus:border-[#00694B] focus:bg-white outline-none transition resize-none text-gray-800 placeholder:text-gray-400"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className="w-full h-[60px] bg-[#111827] text-white rounded-full font-bold text-[18px] mt-4 hover:bg-[#00694B] cursor-pointer transition-all duration-300 shadow-md"
                  >
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