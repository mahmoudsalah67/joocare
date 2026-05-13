import React, { useEffect, useState } from "react";
import country from "../../../../public/imge/img-contact/Country Flag.svg";
import arrow from "../../../../public/imge/img-contact/Arrow Down Icon.svg";
import { NavLink, useNavigate } from "react-router-dom";
import eye from "../../../../public/imge/img-contact/eye.svg";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import EmailVerificationModal from "./EmailVerification/EmailVerification.jsx";
import { Controller } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "./ForCandidate.css";
import { parsePhoneNumber } from "react-phone-number-input";


function ForCandidate() {
  const [value, setValue] = useState();
  const [showModal, setShowModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [domains, setdomains] = useState([]);
 


  //  domain api

   async function fetchdatadomain() {
 
   try {
     const response = await fetch('https://admin.joocare.com/api/domains?pagination=on&limit_per_page=10&page=1');
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
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  function onSubmit(data) {
    try {
       const phoneNumber = data.person_phone
        ? parsePhoneNumber(data.person_phone)
        : null;

      if (!phoneNumber) {
        toast.error("Please enter a valid phone number");
        return;
      }
       
      const { agreeTerms, confirmEmployee, ...restData } = data;

       const finalData = {
        ...restData,
        person_phone: phoneNumber.nationalNumber,
        person_phone_code: `+${phoneNumber.countryCallingCode}`,
      };

      console.log(finalData);

       axios
        .post(
          "https://joocare.nami-tec.com/api/company/auth/register",
          finalData,
        )
        .then((res) => {
          toast.success("Registration successfull! Please verify your email.", {
            position: "top-right",
            style: {
              background: "#E6F4EA", 
              color: "#1E8E3E",
              borderRadius: "10px",
            },
          });

          setUserEmail(data.email);
          setShowModal(true); 
        })
        .catch((err) => {
          console.error(err);
          toast.error(err.response?.data?.message || "Registration failed.");
        });
    } catch (error) {
      console.error("Error parsing phone:", error);
      toast.error("Invalid phone format");
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="section-forcandidate bg-white transition-all duration-500 ">
          <div className="contentt flex">
            {/* LEFT SECTION */}
            <div className="left sticky top-0 flex items-center justify-center w-[715px] h-screen pl-[30px] bg-[#00422F] text-white">
              <div className="middle w-[513px]">
                <div className="title">
                  <h2 className="text-[48px] mb-[24px] font-[600] leading-tight flex items-center">
                    Let’s setup your operating Agreement
                  </h2>
                  <p className="text-[21px] font-[400] text-justify opacity-90">
                    With smart tools and AI-powered insights, joocare helps you
                    find the right opportunity and land the job you deserve with
                    confidence.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SECTION (FORM) */}
            <div className="right px-[40px] pt-[120px] pb-[100px] w-[715px]">
              <div className="content w-[539px] mx-auto">
                <div className="title">
                  <h2 className="text-[48px] font-[700]">
                    Start your business
                  </h2>
                </div>

                <div className="form mt-[24px]">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    {/* COMPANY NAME */}
                    <div className="name flex flex-col">
                      <label
                        htmlFor="name"
                        className="text-[#0D0D0D] font-[600]"
                      >
                        company name
                      </label>
                      <input
                        type="text"
                        id="name"
                        placeholder="ex:Nami"
                        className={`p-[16px] focus:border-[#00694B] outline-none transition duration-300 bg-[#0D0D0D0D] border rounded-[999px] mt-[4px] ${errors.name ? "border-red-500" : "border-[#0D0D0D14]"}`}
                        {...register("name", {
                          required: "company name is required",
                        })}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-[14px] mt-[6px]">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* EMAIL */}
                    <div className="email flex flex-col mt-[24px]">
                      <label
                        htmlFor="email"
                        className="text-[#0D0D0D] font-[600]"
                      >
                        Business Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="ex:mail@mail.com"
                        className={`p-[16px] bg-[#0D0D0D0D] focus:border-[#00694B] outline-none transition duration-300 border rounded-[999px] mt-[4px] ${errors.email ? "border-red-500" : "border-[#0D0D0D14]"}`}
                        {...register("email", {
                          required: "email is required",
                          pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "email is not valid",
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-[14px] mt-[6px]">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* DOMAIN */}
                    <div className="flex flex-col mt-[24px]">
                      <label className="font-[600] text-[#111827] mb-[8px] ml-[4px]">
                        Domain
                      </label>
                      <div
                        className={`flex justify-between items-center p-[16px] bg-[#0D0D0D0D] border rounded-[999px] focus-within:border-[#00694B] transition duration-300 ${errors.domain ? "border-red-500" : "border-[#0D0D0D14]"}`}
                      >
                       <select
  className="w-full bg-transparent outline-none cursor-pointer text-gray-500"
  {...register("domain_id", {
    required: "Domain is required",
  })}
>
  <option value="">ex:Hospital</option>

  {domains?.data?.map((dom) => (
    <option key={dom.id} value={dom.id}>
      {dom.title}
    </option>
  ))}
</select>
                      </div>
                      {errors.domain_id && (
                        <p className="text-red-500 text-[14px] mt-[6px]">
                          {errors.domain_id.message}
                        </p>
                      )}
                    </div>

                    {/* CONTACT PERSON */}
                    <div className="name flex flex-col mt-[24px]">
                      <label
                        htmlFor="person_name"
                        className="font-[600] text-[#111827] mb-[8px] ml-[4px]"
                      >
                        Contact person
                      </label>
                      <input
                        type="text"
                        id="person_name"
                        placeholder="ex:Nami"
                        className={`p-[16px] focus:border-[#00694B] outline-none transition duration-300 bg-[#0D0D0D0D] border rounded-[999px] mt-[4px] ${errors.Contactperson ? "border-red-500" : "border-[#0D0D0D14]"}`}
                        {...register("person_name", {
                          required: "Person full name is required",
                        })}
                      />
                      {errors.person_name && (
                        <p className="text-red-500 text-[14px] mt-[6px]">
                          {errors.person_name.message}
                        </p>
                      )}
                    </div>

                    {/* PHONE */}
                    <div className="flex flex-col mt-[24px]">
                      <label
                        htmlFor="person_phone"
                        className="text-[#0D0D0D] font-[600] mb-[8px] ml-[4px]"
                      >
                        Phone number
                      </label>

                      <div
                        className={`phone-input-container flex items-center bg-[#F5F5F5] border rounded-full px-4 transition duration-300 ${
                          errors.person_phone
                            ? "border-red-500"
                            : "border-[#0D0D0D14]"
                        } focus-within:border-[#00694B]`}
                      >
                        <Controller
                          name="person_phone"
                          control={control}
                          rules={{
                            required: "Phone number is required",
                          }}
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

                      {errors.person_phone && (
                        <p className="text-red-500 text-[14px] mt-[6px] ml-4 font-medium italic">
                          {errors.person_phone.message}
                        </p>
                      )}
                    </div>

                    {/* PASSWORD */}
                    <div className="password flex flex-col mt-[24px] relative">
                      <label
                        htmlFor="password"
                        className="font-[600] text-[#111827]"
                      >
                        Create Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          placeholder="••••••••"
                          className={`p-[16px] w-full bg-[#0D0D0D0D] focus:border-[#00694B] outline-none transition duration-300 border rounded-[999px] mt-[4px] ${errors.password ? "border-red-500" : "border-[#0D0D0D14]"}`}
                          {...register("password", {
                            required: "password is required",
                          })}
                        />
                        <div
                          className="absolute right-5 top-1/2 -translate-y-1/2 mt-[2px] cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <img src={eye} alt="toggle password" />
                        </div>
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-[14px] mt-[6px]">
                          {errors.password.message}
                        </p>
                      )}
                    </div>

                    {/* CHECKS */}
                    <div className="contant2 mt-[24px]">
                      {/* CHECK 1 */}
                      <div className="mb-[18px]">
                        <label className="flex items-start gap-[12px] cursor-pointer group">
                          <div className="relative flex items-center justify-center shrink-0 mt-[2px]">
                            <input
                              type="checkbox"
                              className={`appearance-none w-[24px] h-[24px] border-2 rounded-[4px] cursor-pointer transition-colors ${errors.confirmEmployee ? "border-red-500" : "border-[#D1D5DB]"} checked:bg-[#00694B] checked:border-[#00694B]`}
                              {...register("confirmEmployee", {
                                required: "Confirmation is required",
                              })}
                            />
                            <svg
                              className="absolute w-[16px] h-[16px] text-white hidden pointer-events-none"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <p className="text-[#0D0D0D] text-[18px] leading-[1.3] font-[400]">
                            I confirm that I am an employee of the company and
                            that I am authorised to use JooCare services on its
                            behalf.
                          </p>
                        </label>
                        {errors.confirmEmployee && (
                          <span className="text-red-500 text-[14px] mt-[8px] block ml-[36px]">
                            {errors.confirmEmployee.message}
                          </span>
                        )}
                      </div>

                      {/* CHECK 2 */}
                      <div>
                        <label className="flex items-start gap-[12px] cursor-pointer">
                          <div className="relative flex items-center justify-center shrink-0 mt-[2px]">
                            <input
                              type="checkbox"
                              className={`appearance-none w-[24px] h-[24px] border-2 rounded-[4px] cursor-pointer transition-colors ${errors.agreeTerms ? "border-red-500" : "border-[#D1D5DB]"} checked:bg-[#00694B] checked:border-[#00694B]`}
                              {...register("agreeTerms", {
                                required: "You must accept terms",
                              })}
                            />
                            <svg
                              className="absolute w-[16px] h-[16px] text-white hidden pointer-events-none"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <p className="text-[#0D0D0D] text-[18px] leading-[1.3]">
                            I agree to the{" "}
                            <span className="underline font-[500] cursor-pointer">
                              Terms & Conditions
                            </span>{" "}
                            and{" "}
                            <span className="underline font-[500] cursor-pointer">
                              Privacy Policy
                            </span>
                            .
                          </p>
                        </label>
                        {errors.agreeTerms && (
                          <span className="text-red-500 text-[14px] mt-[8px] block ml-[36px]">
                            {errors.agreeTerms.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="py-[16px] px-[32px] w-[223px] flex items-center justify-center mt-[32px] mx-auto bg-[#00694B] hover:bg-black transition duration-500 rounded-full text-white font-bold cursor-pointer"
                    >
                      Register
                    </button>

                    <div className="footer text-center mt-[16px]">
                      <span className="text-[16px] text-[#0D0D0DA6]">
                        New to JooCare ?
                        <NavLink
                          to={"/login"}
                          className="text-[#00694B] border-b-[1px] font-[600] ml-1"
                        >
                          Sign in
                        </NavLink>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <EmailVerificationModal
                email={userEmail}
                onClose={() => setShowModal(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        input:checked + svg { display: block !important; }
      `}</style>
    </>
  );
}

export default ForCandidate;
