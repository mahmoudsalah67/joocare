import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import toast from "react-hot-toast";
import axios from "axios";
import EmailVerificationModal from "./EmailVerification/EmailVerificationModal";
import eye from "../../../public/imge/img-contact/eye.svg";
import cv from '../../../public/imge/img-contact/Upload Icon.svg';
import './JoinNow.css';
import 'react-phone-number-input/style.css'; 

function JoinNow() {
  const { register, handleSubmit, watch, control, setValue, formState: { errors } } = useForm({
    defaultValues: {
      phone: "",
      has_medical_license: false,
    }
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
const [showVerification, setShowVerification] = useState(false);
const [registeredEmail, setRegisteredEmail] = useState("");
  const [jobtitles, setjobtitles] = useState([]);
  const [countries, setcountries] = useState([]);
  const [cities, setcities] = useState([]);

   const selectedCountry = watch("country_id");
  const watchCvFile = watch("cvFile");
  const watchLicenseFile = watch("licenseFile");

  async function fetchdata(url, res) {
    try {
      const response = await fetch(url, { headers: { "Accept-Language": "en" } });
      const data = await response.json();
      res(data?.data || data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    const baseurl = 'https://joocare.nami-tec.com/api';
    fetchdata(`${baseurl}/job-titles?pagination=off`, setjobtitles);
    fetchdata(`${baseurl}/countries`, setcountries);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetchdata(`https://joocare.nami-tec.com/api/cities?country_id=${selectedCountry}&pagination=off`, setcities);
    } else {
      setcities([]);
    }
  }, [selectedCountry]);

 async function get(data) {
    setLoading(true);
    setApiError("");

    try {
      let uploadedLicensePath = "";
      let uploadedCvPath = "";

      // 1. رفع ملف الـ CV أولاً
      if (data.cvFile && data.cvFile[0]) {
        const cvFormData = new FormData();
        cvFormData.append("image", data.cvFile[0]); 
        
        const cvRes = await axios.post("https://joocare.nami-tec.com/api/images", cvFormData);
        uploadedCvPath = cvRes.data?.data?.image || "";
      }

      // 2. رفع صورة الرخصة
      if (data.has_medical_license && data.licenseFile && data.licenseFile[0]) {
        const licenseFormData = new FormData();
        licenseFormData.append("image", data.licenseFile[0]);
        
        const licenseRes = await axios.post("https://joocare.nami-tec.com/api/images", licenseFormData);
        uploadedLicensePath = licenseRes.data?.data?.image || "";
      }

      // 3. بناء بيانات التسجيل النهائية
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("job_title_id", data.job_title_id);
      formData.append("country_id", data.country_id);
      formData.append("city_id", data.city_id);
      
      // التعامل مع الهاتف
      let phoneNumber = "";
      let phoneCode = "";
      if (data.phone) {
        try {
          const parsed = parsePhoneNumber(data.phone);
          if (parsed) {
            phoneCode = `+${parsed.countryCallingCode}`;
            phoneNumber = parsed.nationalNumber;
          }
        } catch (e) { 
          phoneNumber = data.phone; 
        }
      }
      formData.append("phone", phoneNumber);
      formData.append("phone_code", phoneCode);

      // حقل الـ CV كـ String
      if (uploadedCvPath) {
        formData.append("cv", uploadedCvPath);
      }

      formData.append("has_medical_license", data.has_medical_license ? "1" : "0");
      if (data.has_medical_license) {
        formData.append("license_country_id", data.license_country_id || "");
        formData.append("license_title", data.license_title || ""); 
        if (data.license_number) formData.append("license_number", data.license_number);
        if (uploadedLicensePath) formData.append("license_image", uploadedLicensePath);
      }

      // 4. إرسال طلب التسجيل النهائي
      const response = await axios.post("https://joocare.nami-tec.com/api/user/auth/register", formData);

      // تعديل الشرط هنا لضمان اللقطة سواء رجع status أو code أو رسالة OTP
      if (response.status === 200 || response.data.code === 200 || response.data.status === true || response.data.message?.includes("OTP")) {
        toast.success("Registration successful! Please verify your email.");
        setRegisteredEmail(data.email); 
        setShowVerification(true); // هيفتح المودال هنا فوراً       
      } else {
        setApiError(response.data.message || "Registration failed.");
        toast.error(response.data.message);
      }

    } catch (error) {
      const serverMsg = error.response?.data?.message || "Something went wrong.";
      setApiError(serverMsg);
      toast.error(serverMsg);
    } finally {
      // تعديل هنا: نقفل الـ loading صراحة وبدون شروط معطلة
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="section-joinnow bg-white min-h-screen">
        <div className="contentt flex flex-col lg:flex-row w-full min-h-screen">

          {/* Left Panel */}
          <div className="left hidden lg:flex lg:w-1/2 bg-[#00422F] text-white p-12 justify-center items-center lg:sticky lg:top-0 lg:h-screen">
            <div className="max-w-[513px]">
              <h2 className="text-[48px] mb-[24px] font-[600] leading-tight">
                Match Faster <br /> work smarter
              </h2>
              <p className="text-[21px] font-[400] text-justify opacity-90">
                With smart tools and AI-powered insights, joocare helps you to find the right
                opportunity and land the job you deserve with confidence.
              </p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="right w-full lg:w-1/2 px-4 sm:px-10 py-10 lg:py-[120px] flex justify-center items-center">
            <div className="w-full max-w-[539px] mx-auto">
              <div className="title">
                <h2 className="text-3xl sm:text-[48px] font-[700] text-[#0D0D0D]">Let's Get Started</h2>
              </div>

              {apiError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mt-4 text-sm font-medium">
                  {apiError}
                </div>
              )}

              <div className="form mt-[24px]">
                <form onSubmit={handleSubmit(get)} className="space-y-[24px]">

                  {/* Full Name */}
                  <div className="flex flex-col">
                    <label htmlFor="name" className="text-[#0D0D0D] font-[600]">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="ex: Ahmed eltatawy"
                      className="p-[16px] focus:border-[#00694B] outline-none transition duration-300 bg-[#0D0D0D0D] border-[1px] border-[#0D0D0D14] rounded-[999px] mt-[4px]"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1 ml-2">{errors.name.message}</p>}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-[#0D0D0D] font-[600]">Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="ex: mail@mail.com"
                      className="p-[16px] bg-[#0D0D0D0D] focus:border-[#00694B] outline-none transition duration-300 border-[1px] border-[#0D0D0D14] rounded-[999px] mt-[4px]"
                      {...register("email", {
                        required: "Email is required",
                        pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Invalid email format' }
                      })}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 ml-2">{errors.email.message}</p>}
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col">
                    <label className="text-[#0D0D0D] font-[600] mb-[4px]">Phone Number</label>
                    <div className={`phone-input-container flex items-center bg-[#0D0D0D0D] border rounded-full px-4 transition duration-300 ${errors.phone ? 'border-red-500' : 'border-[#0D0D0D14] focus-within:border-[#00694B]'}`}>
                      <Controller
                        name="phone"
                        control={control}
                        rules={{ required: "Phone number is required" }}
                        render={({ field: { onChange, value } }) => (
                          <PhoneInput
                            international
                            defaultCountry="EG"
                            placeholder="Enter phone number"
                            value={value}
                            onChange={onChange}
                            className="w-full h-[56px] outline-none"
                          />
                        )}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1 ml-2">{errors.phone.message}</p>}
                  </div>

                  {/* Job Title */}
                  <div className="flex flex-col">
                    <label className="font-[600] text-[#111827] mb-[8px]">Job Title</label>
                    <div className="flex items-center p-[16px] bg-[#0D0D0D0D] border-[1px] border-[#0D0D0D14] rounded-[999px] focus-within:border-[#00694B] transition duration-300">
                      <select className="w-full bg-transparent outline-none cursor-pointer text-gray-500"
                        {...register("job_title_id", { required: "Job title is required" })}>
                        <option value="">ex: Consultant Internist</option>
                        {jobtitles && jobtitles.map((j) => (
                          <option key={j.id} value={j.id}>{j.name || j.title}</option>
                        ))}
                      </select>
                    </div>
                    {errors.job_title_id && <p className="text-red-500 text-xs mt-1 ml-2">{errors.job_title_id.message}</p>}
                  </div>

                  {/* Location - Country & City */}
                  <div className="flex flex-col">
                    <label className="font-[600] text-[#111827] mb-[8px]">Current Location</label>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* country_id */}
                      <div className="flex w-full p-[16px] bg-[#0D0D0D0D] border-[1px] border-[#0D0D0D14] rounded-[999px] focus-within:border-[#00694B]">
                        <select className="w-full bg-transparent outline-none text-gray-500"
                          {...register("country_id", { required: "Country is required" })}>
                          <option value="">Country</option>
                          {countries && countries.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>
                      {/* city_id */}
                      <div className="flex w-full p-[16px] bg-[#0D0D0D0D] border-[1px] border-[#0D0D0D14] rounded-[999px] focus-within:border-[#00694B]">
                        <select className="w-full bg-transparent outline-none text-gray-500"
                          {...register("city_id", { required: "City is required" })}
                          disabled={!selectedCountry}>
                          <option value="">City</option>
                          {cities && cities.map((city) => (
                            <option key={city.id} value={city.id}>{city.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {(errors.country_id || errors.city_id) && <p className="text-red-500 text-xs mt-1 ml-2">Location fields are required</p>}
                  </div>

                  {/* Password */}
                  <div className="flex flex-col relative">
                    <label className="font-[600] text-[#111827]">Create Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="p-[16px] w-full bg-[#0D0D0D0D] focus:border-[#00694B] outline-none transition duration-300 border-[1px] border-[#0D0D0D14] rounded-[999px] mt-[4px]"
                        {...register("password", {
                          required: "Password is required",
                          minLength: { value: 6, message: "Password must be at least 6 characters" }
                        })}
                      />
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 mt-[2px] cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}>
                        <img src={eye} alt="toggle" />
                      </div>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1 ml-2">{errors.password.message}</p>}
                  </div>

                  {/* CV Upload */}
                  <div className="flex flex-col">
                    <p className="font-[600] mb-[8px]">Upload CV</p>
                    <label htmlFor="cv"
                      className={`flex flex-col justify-center items-center p-[24px] rounded-[12px] bg-[#0D0D0D0D] border-[1px] border-dashed transition duration-500 cursor-pointer ${errors.cvFile ? 'border-red-500' : 'border-[#0D0D0D14] hover:border-[#00694B]'}`}>
                      <img src={cv} alt="" className="mb-2" />
                      <p className="text-center text-sm px-2">
                        {watchCvFile && watchCvFile[0] ? (
                          <span className="text-[#00694B] font-bold break-all">{watchCvFile[0].name}</span>
                        ) : (
                          <>Drag & Drop your files or <span className="text-[#00694B] font-bold">Browse</span></>
                        )}
                      </p>
                      <input type="file" id="cv" className="hidden" accept=".pdf,.doc,.docx"
                        {...register("cvFile", {
                          required: "Please upload your CV",
                          validate: {
                            lessThan5MB: files => !files[0] || files[0]?.size < 5000000 || 'Max size is 5MB',
                            acceptedFormats: files => !files[0] || ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(files[0]?.type) || 'Only PDF or Word'
                          }
                        })}
                      />
                    </label>
                    {errors.cvFile && <p className="text-red-500 text-xs mt-1 ml-2">{errors.cvFile.message}</p>}
                  </div>

                  {/* Medical License */}
                  <div className="flex flex-col gap-[16px]">
                    <div className="flex gap-[8px] items-center">
                      <input type="checkbox" id="has_medical_license" className="w-5 h-5 accent-[#00694B] cursor-pointer"
                        {...register("has_medical_license")} />
                      <label htmlFor="has_medical_license" className="text-[#0D0D0D] font-[600] cursor-pointer select-none">
                        Do you hold a valid medical license?
                      </label>
                    </div>

                    {watch("has_medical_license") && (
                      <div className="space-y-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">

                        {/* license_country_id */}
                        <div className="flex flex-col">
                          <label className="font-[600] text-[#111827] mb-[4px]">License Country</label>
                          <div className="p-[16px] bg-white border-[1px] border-[#0D0D0D14] rounded-[999px] focus-within:border-[#00694B]">
                            <select className="w-full bg-transparent text-gray-500 outline-none"
                              {...register("license_country_id", { required: "License country is required" })}>
                              <option value="">Select Country</option>
                              {countries && countries.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                              ))}
                            </select>
                          </div>
                          {errors.license_country_id && <p className="text-red-500 text-xs mt-1 ml-2">{errors.license_country_id.message}</p>}
                        </div>

                        {/* license_title */}
                        <div className="flex flex-col">
                          <label className="font-[600] text-[#111827]">License Title</label>
                          <input type="text" placeholder="ex: MOH, DOH, CST"
                            className="p-[16px] bg-white focus:border-[#00694B] outline-none transition border-[1px] border-[#0D0D0D14] rounded-[999px] mt-[4px]"
                            {...register("license_title", { required: "License title is required" })} />
                          {errors.license_title && <p className="text-red-500 text-xs mt-1 ml-2">{errors.license_title.message}</p>}
                        </div>

                        {/* license_number */}
                        <div className="flex flex-col">
                          <label className="font-[600] text-[#111827]">License Number <span className="font-[400] text-[#0D0D0DA6] text-xs">"Optional"</span></label>
                          <input type="text" placeholder="ex: 23121212"
                            className="bg-white border-[1px] mt-[4px] p-[16px] rounded-full outline-none focus:border-[#00694B] border-[#0D0D0D14]"
                            {...register("license_number")} />
                        </div>

                        {/* license_image */}
                        <div className="flex flex-col">
                          <label className="font-[600] text-[#111827] mb-[4px]">
                            License Certificate <span className="font-[400] text-[#0D0D0DA6] text-xs">"Optional"</span>
                          </label>
                          <label htmlFor="license-file"
                            className="flex flex-col justify-center items-center p-[24px] rounded-[12px] bg-white border-[1px] border-dashed border-[#0D0D0D14] hover:border-[#00694B] cursor-pointer transition duration-500">
                            <img src={cv} alt="" className="mb-2" />
                            <p className="text-sm text-center px-2">
                              {watchLicenseFile && watchLicenseFile[0] ? (
                                <span className="text-[#00694B] font-bold break-all">{watchLicenseFile[0].name}</span>
                              ) : (
                                <>Drag & Drop or <span className="text-[#00694B] font-bold">Browse</span></>
                              )}
                            </p>
                            <input type="file" id="license-file" className="hidden" accept="image/*,.pdf"
                              {...register("licenseFile")} />
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="py-[16px] cursor-pointer px-[32px] w-full sm:w-[223px] flex items-center justify-center mt-[32px] mx-auto bg-[#00694B] hover:bg-black transition duration-500 rounded-full text-white font-bold disabled:bg-gray-400"
                  >
                    {loading ? "Registering..." : "Register"}
                  </button>

                  <div className="flex items-center justify-center my-[16px] gap-[13px] w-full">
                    <div className="border-[1px] flex-1 border-[#0D0D0D14]"></div>
                    <div className="text-gray-400 text-sm">Or</div>
                    <div className="border-[1px] flex-1 border-[#0D0D0D14]"></div>
                  </div>
                </form>
                {showVerification && (
  <EmailVerificationModal 
    email={registeredEmail} 
    onClose={() => setShowVerification(false)} 
  />
)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default JoinNow;