import React, { useEffect, useState } from 'react';
import { useForm ,Controller } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { MdDashboard, MdKeyboardArrowDown, MdPersonOutline, MdSettings, MdWorkOutline, MdUpload, MdOutlineBrokenImage, MdOutlineImage } from 'react-icons/md';
import { FaLinkedin, FaFacebook, FaInstagram, FaSnapchat } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Icon from "../../../../public/imge/Icon.svg";
import Icon2 from "../../../../public/imge/Icon (1).svg";
 import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import toast from 'react-hot-toast';
import axios from 'axios';
import { tr } from 'framer-motion/client';
function Details3() {
  
  // {api city list}
const [cities, setCities] = useState([]);
  async function fetchCities() {
      try {
        const response = await fetch(
          "https://joocare.nami-tec.com/api/cities?pagination=on&limit_per_page=10&page=1",
          {
            headers: { "Accept-Language": "en" },
          },
        );
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    useEffect(() => {
      fetchCities();
    }, []);
  // {api city list}
// {api country list}
const [countries, setCountries] = useState([]);

  async function fetchCountries() {
      try {
        const response = await fetch(
          "https://joocare.nami-tec.com/api/countries?pagination=on&limit_per_page=10&page=1",
          {
            headers: { "Accept-Language": "en" },
          },
        );
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    useEffect(() => {
      fetchCountries();
    }, []);
// {api country list}


  const { handleSubmit, register, control, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const currentStep = 3;

  const [coverImage, setCoverImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const onSubmit = (data) => {
  console.log("Details3 Raw Data:", data);
  
  const token = localStorage.getItem('company_token');
  const formData = new FormData();
 
  let phoneCode = "";
  let phoneNumber = data.person_phone || "";

  if (phoneNumber.startsWith('+')) {
    // ريجكس متطور لفصل كود الدولة عن باقي الرقم
    const match = phoneNumber.match(/^(\+\d{1,2})(\d+)$/);
    if (match) {
      phoneCode = match[1]; // سياخذ مثلا +966 أو +20
      phoneNumber = match[2]; // سيأخذ باقي الرقم
    }
  }

  // إضافة الحقول النصية الأساسية للـ FormData
  if (data.country_id) formData.append("country_id", data.country_id);
  if (data.city_id) formData.append("city_id", data.city_id);
  if (data.established_date) formData.append("established_date", data.established_date);
  if (data.bio) formData.append("bio", data.bio);
  
  // إضافة حقول الهاتف بالأسماء المتوقعة للـ API
  formData.append("phone", phoneNumber);
  formData.append("phone_code", phoneCode);

  // إضافة روابط الحسابات الاجتماعية إذا وُجدت
  const socialFields = ["website", "linkedin", "facebook", "twitter", "instagram", "snapchat"];
  socialFields.forEach(field => {
    if (data[field]) {
      formData.append(field, data[field]);
    }
  });

  // إضافة الملفات والصور المرفقة من الـ state يدوياً
  if (profileImage) formData.append("image", profileImage);  
  if (coverImage) formData.append("cover", coverImage);

  // إعدادات الهيدر المتوافقة مع رفع الملفات FormData
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data' // تحويلها لـ multipart لرفع الصور بنجاح
    }
  };

  // إرسال الـ formData بالكامل عبر الـ API
  axios
    .post("https://joocare.nami-tec.com/api/company/auth/setup-company-profile", formData, config)
    .then((res) => {
      toast.success("Company profile updated successfully", {
        position: "top-right",
        style: {
          background: "#E6F4EA", 
          color: "#1E8E3E",
          borderRadius: "10px",
        },
      });
      // الانتقال للـ dashboard فقط عند نجاح الإرسال
      navigate("/dashboard");
    })
    .catch((err) => {
      console.error("API Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Something went wrong");
    });
};

  return (
    <div className="min-h-screen bg-[#F8F9FA] ">
      <div className="flex grid grid-cols-12 px-20 w-[1100px]">

        {/* Sidebar */}
        <aside className="w-[300px] h-fit flex flex-col gap-4 col-span-4 bg-white pt-[120px] mt-[-80px] pb-8 px-[12px] rounded-b-[32px] shadow-sm">
          <div className="bg-white rounded-[24px] p-5 border border-[#F1F1F1] shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-[#2D3134] rounded-full flex items-center justify-center text-white font-bold text-xl">A</div>
              <div>
                <h3 className="font-bold text-[16px] text-[#0D0D0D]">Saudi German Hospital</h3>
                <p className="text-[14px] text-[#4D4D4D]">Egypt</p>
              </div>
            </div>
            <p className="text-[12px] text-[#8F8F8F] leading-relaxed mb-4">Saudi German Hospitals is the leading healthcare provider and the number one healthcare brand in the MENA re...</p>
            <div className="bg-[#FFF9E6] text-[#FFB800] text-center py-2 rounded-full text-[13px] font-semibold border border-[#FFB800]/10">
              Account under review.
            </div>
          </div>

          <div className="bg-[#FFF5F5] rounded-[24px] p-6 border border-[#FFDADA]">
            <h4 className="text-[#FF4D4D] font-bold text-[18px] mb-2 leading-tight">Please complete your details.</h4>
            <p className="text-[13px] text-[#4D4D4D] mb-5">Please complete your account details so you can use the platform normally.</p>
            <button className="w-full bg-[#E32B2B] text-white font-bold py-3 rounded-full hover:bg-[#C22424] transition-all">Complete Now</button>
          </div>

 {/* قائمة الروابط */}
          <div className="flex flex-col gap-1 px-2 mt-2">
            {/* Company Profile */}
           <NavLink to="/companyprofile" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${isActive ? "bg-[#E6F3EF] text-[#00694B] font-bold" : "text-[#8F8F8F]"}`}>
            <MdPersonOutline className="text-xl" /> Company Profile
          </NavLink>

            {/* Dashboard */}
             <NavLink to="/Dashboard" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${isActive ? "bg-[#E6F3EF] text-[#00694B] font-bold" : "text-[#8F8F8F]"}`}>
                        <img src={Icon} className="text-xl w-5 h-5 object-contain" alt="" /> Dashboard
                      </NavLink>

            {/* Job Management */}
         <NavLink to="/JobManagement" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${isActive ? "bg-[#E6F3EF] text-[#00694B] font-bold" : "text-[#8F8F8F]"}`}>
                     <img src={Icon2} className="text-xl w-5 h-5 object-contain" alt="" /> Job Management
                   </NavLink>

            {/* Account settings */}
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

          <button className="mt-6 w-full bg-[#00694B] text-white font-bold py-4 rounded-full flex items-center justify-center gap-2">Post a Job</button>
        </aside>

        {/* Main */}
        <main className="flex-1 col-span-8 w-[1020px] py-[70px]">
          <div className="bg-white rounded-[24px] shadow-[0_4px_30px_rgba(0,0,0,0.06)] px-[40px] py-[32px] border border-[#F1F1F1]">

            {/* Steps */}
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

            {/* Form */}
<form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-[850px] mx-auto">

  <div className="flex flex-col gap-4">
    {/* Container for Cover and Profile */}
    <div className="relative mb-16">
      {/* Cover Image Section */}
      <div className="flex flex-col">
        <label htmlFor='cover' className="w-full h-[220px] rounded-[32px] flex flex-col items-center justify-center cursor-pointer bg-[#EBEBEB] hover:bg-[#E2E2E2] transition-all relative overflow-hidden group">
          <input 
            type="file" 
            className="hidden" 
            id='cover'
            accept="image/*" 
            onChange={(e) => setCoverImage(e.target.files[0])} 
          />
          {coverImage ? (
            <img 
              src={URL.createObjectURL(coverImage)} 
              alt="cover" 
              className="w-full h-full object-cover absolute inset-0" 
            />
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-white/50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                 <MdOutlineBrokenImage className="text-[#8F8F8F] text-[32px]" />
              </div>
              <p className="text-[14px] text-[#8F8F8F] font-medium">upload a cover image</p>
            </div>
          )}
        </label>
      </div>

      {/* Profile Image (Logo) Section */}
      <div className="absolute -bottom-14 left-8">
        <label htmlFor='image' className="w-[120px] h-[120px] rounded-full border-[6px] border-white bg-[#EBEBEB] flex flex-col items-center justify-center cursor-pointer shadow-sm hover:bg-[#E2E2E2] transition-all relative overflow-hidden group">
          <input 
            type="file" 
            id='image'
            className="hidden" 
            accept="image/*" 
            onChange={(e) => setProfileImage(e.target.files[0])} 
          />
          {profileImage ? (
            <img 
              src={URL.createObjectURL(profileImage)} 
              alt="profile" 
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="flex flex-col items-center text-center p-2">
              <MdOutlineImage className="text-[#8F8F8F] text-[24px] mb-1 group-hover:scale-110 transition-transform" />
              <p className="text-[10px] text-[#8F8F8F] leading-tight font-medium">Organization<br />Logo</p>
            </div>
          )}
        </label>
      </div>
    </div>
  </div>

  {/* Phone */}
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

  {/* Country & City */}
  <div className="grid grid-cols-2 gap-4">
    {/* Country */}
    <div className="flex flex-col">
      <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">Country <span className="text-red-500">*</span></label>
      <div className="relative">
        <select 
          {...register("country_id", { required: "Country is required" })} 
          className={`w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 appearance-none outline-none cursor-pointer text-[#8F8F8F] border transition-all ${errors.country_id ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-[#00694B]'}`}
        >
          <option value="">ex: Country</option>
           {countries?.data?.map((country) => (
            <option key={country.id} value={country.id}>{country.name}</option>
          ))}
        </select>
        <MdKeyboardArrowDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#00694B] pointer-events-none" size={22} />
      </div>
      {errors.country_id && <p className="text-red-500 text-[13px] mt-1 px-4 font-medium">{errors.country_id.message}</p>}
    </div>

    {/* City */}
    <div className="flex flex-col">
      <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">City <span className="text-red-500">*</span></label>
      <div className="relative">
        <select 
          {...register("city_id", { required: "City is required" })} 
          className={`w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 appearance-none outline-none cursor-pointer text-[#8F8F8F] border transition-all ${errors.city_id ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-[#00694B]'}`}
        >
          <option value="">ex: City</option>
          {cities?.data?.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
              </option>
          ))}
        </select>
        <MdKeyboardArrowDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#00694B] pointer-events-none" size={22} />
      </div>
      {errors.city_id && <p className="text-red-500 text-[13px] mt-1 px-4 font-medium">{errors.city_id.message}</p>}
    </div>
  </div>

  {/* Date of Establishment */}
  <div className="flex flex-col">
    <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">Date of Establishment <span className="text-red-500">*</span></label>
    <input 
      type="date" 
      {...register("established_date", { required: "Establishment date is required" })}
      className={`w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 outline-none text-[#8F8F8F] border transition-all ${errors.established_date ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-[#00694B]'}`} 
    />
    {errors.established_date && <p className="text-red-500 text-[13px] mt-1 px-4 font-medium">{errors.established_date.message}</p>}
  </div>

  {/* About */}
  <div className="flex flex-col">
    <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">About the Organization <span className="text-red-500">*</span></label>
    <textarea 
      placeholder="ex: About the Organization ..." 
      {...register("bio", { 
        required: "Bio is required",
        minLength: { value: 20, message: "Bio must be at least 20 characters long" }
      })} 
      rows={4}
      className={`w-full bg-[#EAEAEA] rounded-[20px] px-6 py-4 outline-none resize-none placeholder:text-[#8F8F8F] border transition-all focus:ring-2 focus:ring-[#00694B]/10 ${errors.bio ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-[#00694B]'}`} 
    />
    {errors.bio && <p className="text-red-500 text-[13px] mt-1 px-4 font-medium">{errors.bio.message}</p>}
  </div>

  {/* Online Profile */}
  <div className="flex flex-col gap-4">
    <h3 className="text-[16px] font-bold text-[#0D0D0D] border-b border-[#F1F1F1] pb-3">Online profile</h3>

    {[
      { name: "website",  placeholder: "ex: www.joocare.com", icon: "🌐", required: true },
      { name: "linkedin", placeholder: "ex: linkedin.com/in/username", icon: <FaLinkedin className="text-[#0077B5]" />, required: true },
      { name: "facebook", placeholder: "ex: facebook.com/username", icon: <FaFacebook className="text-[#1877F2]" />, required: true },
      { name: "twitter", placeholder: "ex: x.com/username", icon: <FaXTwitter className="text-black" />, required: true },
      { name: "instagram", placeholder: "ex: instagram.com/username", icon: <FaInstagram className="text-[#E4405F]" />, required: true },
      { name: "snapchat", placeholder: "ex: snapchat.com/add/username", icon: <FaSnapchat className="text-[#FFFC00]" />, required: true },
    ].map(({ name, placeholder, icon, required }) => (
      <div key={name} className="flex flex-col gap-1">
        <div className="relative flex items-center">
          <input 
            type="text" 
            placeholder={placeholder} 
            {...register(name, { required: required ? `${name} is required` : false })}
            className={`w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 pr-14 outline-none placeholder:text-[#8F8F8F] border transition-all focus:ring-2 focus:ring-[#00694B]/10 ${errors[name] ? 'border-red-500 focus:border-red-500' : 'border-transparent focus:border-[#00694B]'}`} 
          />
          <div className="absolute right-5 text-[20px]">{icon}</div>
        </div>
        {errors[name] && <p className="text-red-500 text-[13px] mt-1 px-4 font-medium">{errors[name].message}</p>}
      </div>
    ))}
  </div>

  {/* Buttons */}
  <div className="flex items-center justify-center gap-4 mt-10">
    <button 
      type="button" 
      onClick={() => navigate("/details2")}
      className="w-[160px] h-[56px] border border-[#CCCCCC] text-[#0D0D0D] rounded-full font-bold text-[16px] hover:bg-[#F5F5F5] transition-all"
    >
      Prev
    </button>
    <button 
      type="submit"
      className="w-[160px] h-[56px] bg-[#152126] hover:bg-black text-white rounded-full font-bold text-[16px] transition-all shadow-md active:scale-95"
    >
      Send
    </button>
  </div>
</form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Details3;