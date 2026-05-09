import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from 'react-router-dom';
import arrow from "../../../public/imge/arrow-square-left.svg";
import img from "../../../public/imge/job-details/imgi_2_image-2 1.svg";
import { HiPlus, HiMinus } from "react-icons/hi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
 import contact from "../../../public/imge/img-contact/svgContactUs.png";
import { FaStar } from "react-icons/fa";
import sochial from '../../../public/imge/img-contact/Frame 2608822.svg'
 
function Faq() {
  const [faqdata, setfaqdata] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  async function fetchdatafaq(page = 1) {
    try {
      const response = await fetch(
        `https://admin.joocare.com/api/faqs?pagination=on&limit_per_page=10&page=${page}`,
        { headers: { "Accept-Language": "en" } }
      );
      const data = await response.json();
      setfaqdata(data);
    } catch (error) {
      console.error("Error fetching faq data:", error);
    }
  }

  useEffect(() => {
    fetchdatafaq(currentPage);
  }, [currentPage]);

  const FaqItem = ({ item }) => {
  const isOpen = openIndex === item.id;

  return (
    <div className="bg-[#F5F5F5] rounded-[16px] overflow-hidden mb-[12px]">
      
      <button
        onClick={() => setOpenIndex(isOpen ? null : item.id)}
        className="w-full flex items-center justify-between px-[20px] py-[18px] cursor-pointer"
      >
        <p className="text-[16px] font-[600] text-left text-[#0D0D0D]">
          {item.question}
        </p>

        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 ml-4 w-[32px] h-[32px] rounded-full bg-black flex items-center justify-center"
        >
          <HiPlus className="text-white text-[18px]" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
            className="overflow-hidden"
          >
            <p className="px-[20px] pb-[18px] text-[14px] text-[#0D0D0DA6] leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="section-faq mt-22">
        {/* Fake Nav */}
        <div className="fakenav bg-[#0D0D0D0D] py-5">
          <div className="container px-30 flex items-center justify-between">
            <h1 className="text-[18px] font-[600]">FAQ</h1>
            <div className="flex items-center text-[18px] font-[600]">
              <NavLink to="/" className="text-[18px] font-[600]">home</NavLink>
              <img src={arrow} alt="" />
              <span>FAQ</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container  py-[80px] px-[88px]">
          <div className="flex py-[80px] px-[50px] gap-[100px]">
            
            {/* Left - Image & Title */}
            <div className="flex flex-col items-center w-[120px] shrink-0">
              <img src={img} alt="" className="w-[80px]" />
              <h1 className='text-[51px] font-[700] text-[#1C2628]'>FAQ</h1>
            </div>

            {/* Right - FAQ Items */}
            <div className="flex-1">
              {faqdata?.data?.map((item) => (
                <FaqItem key={item.id} item={item} />
              ))}

              {/* Pagination */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-white disabled:opacity-40 cursor-pointer hover:bg-gray-50 transition"
                >
                  <MdKeyboardArrowLeft size={20} className="text-gray-500" />
                </button>

                <div className="flex gap-2">
                  {[...Array(faqdata?.last_page || 0)].map((_, index) => {
                    const pageNum = index + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-[500] transition-all cursor-pointer
                          ${currentPage === pageNum
                            ? "bg-[#00694B] text-white shadow-md"
                            : "text-gray-600 hover:bg-gray-100"}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, faqdata?.last_page || 1))}
                  disabled={currentPage === faqdata?.last_page}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 bg-white disabled:opacity-40 cursor-pointer hover:bg-gray-50 transition"
                >
                  <MdKeyboardArrowRight size={20} className="text-gray-500" />
                </button>

                <p className="text-gray-500 text-[14px] ml-2">
                  Show {faqdata?.from || 0} - {faqdata?.to || 0} from {faqdata?.total || 0}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
          {/* contact */}
          <div className="contact bg-[#F7FAF7] py-[80px] px-[88px]">
            <div className="title">
                <h1 className='font-[700] text-[48px] text-[#1C2628] text-center font-[Outfit/48px: Bold]'>Try it now</h1>
            </div>

                    <div className="container  mt-[80px] container mx-auto bg-white  mb-[79px] p-8  max-w-[1300px] rounded-[32px] mt-[-100px] z-10 shadow-lg">
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
          {/* contact */}
    </motion.div>
  );
}

export default Faq;