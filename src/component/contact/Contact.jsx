import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";

// الصور
import arrow from "../../../public/imge/img-jobs/arrow-square-left.svg";
import contactImg from "../../../public/imge/img-contact/svgContactUs.png";
import sochial from '../../../public/imge/img-contact/Frame 2608822.svg';

function Contact() {
  const [inquiryTypes, setInquiryTypes] = useState([]);
  const { register, handleSubmit, reset } = useForm();

   useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const res = await axios.get('https://joocare.nami-tec.com/api/inquiry-types');
        setInquiryTypes(res.data.data);
      } catch (err) {
        console.error("Inquiry Fetch Error:", err);
      }
    };
    fetchInquiry();
  }, []);

  const onSubmit = async (data) => {
    try {
       await axios.post("https://joocare.nami-tec.com/api/contacts", data);
      toast.success("Message sent successfully!");
      reset();  
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to send message");
    }
  };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }}>
        <div className="section-contact pt-19 bg-gray-50 min-h-screen">
          <div className="topp h-[200px] py-[40px] text-white bg-[#00694B]">
            <div className="container px-4 md:px-8 lg:px-30 mx-auto flex items-center justify-between">
              <h1 className="text-[18px] font-[600]">Contact Us</h1>
              <div className="flex items-center text-[18px] font-[600] gap-2">
                <NavLink to="/" className="cursor-pointer hover:underline">Home</NavLink>
                <img src={arrow} alt="" />
                <p>Contact Us</p>
              </div>
            </div>
          </div>

          <div className="container mx-auto bg-white mb-[79px] p-6 md:p-10 max-w-[1300px] rounded-[32px] mt-[-100px] relative z-10 shadow-lg">
            <div className="content flex flex-col lg:flex-row items-start gap-[40px] lg:gap-[60px]">
              
              <div className="leftt lg:w-[40%] bg-[#F7FAF7] p-6 md:p-[40px] rounded-[32px] w-full flex flex-col justify-between">
                <div>
                  <div className="title-1 flex items-center gap-2 mb-6 border-[1px] border-[#2E90A61A] rounded-[12px] py-[8px] px-[16px] w-fit bg-white">
                    <FaStar className="text-[#00694B] text-[16px]" />
                    <p className="text-[#1C2628] text-[14px] font-[500]">Contact Us</p>
                  </div>
                  <h2 className="font-bold text-[28px] md:text-[32px] text-[#111827] mb-6">Get in Touch with us</h2>
                  <div className="image-container mb-8">
                    <img src={contactImg} alt="Contact Us" className="w-full h-auto object-contain mx-auto max-h-[250px]" />
                  </div>
                </div>
                <div>
                  <NavLink to='/forcandidate' className="block text-[16px] font-semibold text-white w-full bg-[#00694B] hover:bg-black text-center transition duration-300 rounded-full py-[16px] mb-8">
                    For Employer
                  </NavLink>
                  <div className="social mt-6">
                    <p className="text-[16px] font-bold mb-4">Follow us</p>
                    <img src={sochial} alt="Social links" className="h-8 cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="right flex-1 w-full py-4">
                <div className="title-1 flex items-center gap-2 mb-4 border-[1px] border-[#2E90A61A] rounded-[12px] py-[8px] px-[16px] w-fit bg-[#12121205]">
                  <FaStar className="text-[#00694B] text-[16px]" />
                  <p className="text-[#1C2628] text-[14px] font-[500]">REQUEST FOR DEMO</p>
                </div>
                <h2 className="font-bold text-[30px] md:text-[36px] text-[#111827] mb-8">Send your message</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] font-bold text-[#111827] px-1">Full Name</label>
                    <input {...register("name", { required: true })} type="text" placeholder="ex: Ahmed eltatawy" className="w-full h-[56px] px-6 rounded-[20px] bg-[#f3f4f6] outline-none" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] font-bold text-[#111827] px-1">Email</label>
                    <input {...register("email", { required: true })} type="email" placeholder="ex: mail@mail.com" className="w-full h-[56px] px-6 rounded-[20px] bg-[#f3f4f6] outline-none" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] font-bold text-[#111827] px-1">Type of inquiry</label>
                    <div className="relative w-full">
                      <select {...register("inquiry_type_id", { required: true })} className="w-full h-[56px] px-6 rounded-[20px] bg-[#f3f4f6] appearance-none outline-none">
                        <option value="" disabled>ex: Type of inquiry</option>
                        {inquiryTypes.map((inq) => (
                          <option key={inq.id} value={inq.id}>{inq.title}</option>
                        ))}
                      </select>
                      <MdKeyboardArrowDown className="absolute right-4 top-4 text-gray-500 size-6 pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[16px] font-bold text-[#111827] px-1">Message</label>
                    <textarea {...register("message", { required: true })} placeholder="Message goes here..." className="w-full h-[150px] p-6 rounded-[24px] bg-[#f3f4f6] outline-none resize-none"></textarea>
                  </div>

                  <button type="submit" className="w-full h-[60px] bg-[#111827] text-white rounded-full font-bold text-[18px] mt-4 hover:bg-[#00694B] transition-all">
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