import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast'; 
import { MdKeyboardArrowDown, MdCalendarToday, MdClose } from "react-icons/md";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'; 
import { s } from 'framer-motion/client';

function Basicinfo() {
  const navigate = useNavigate();
  
  // حقول الحالات (States) للقوائم
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [domains, setDomains] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // حالة التحكم في فتح وإغلاق مودال تعديل الإيميل
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [isEmailSubmitting, setIsEmailSubmitting] = useState(false);

  const { handleSubmit, register, formState: { errors }, control, reset,watch } = useForm();
  const token = localStorage.getItem('company_token') || localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  // 1. جلب البيانات الحالية للبروفايل
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const res = await axios.get("https://joocare.nami-tec.com/api/company/auth/profile", { headers });
        const company = res.data?.data?.company || res.data?.data;
        
        if (company) {
          const fullPersonPhone = company.person_phone_code ? `${company.person_phone_code}${company.person_phone}` : company.person_phone;
          const fullOfficialPhone = company.official_phone_code ? `${company.official_phone_code}${company.official_phone}` : company.official_phone;

          reset({
            companyName: company.name || "",
            email: company.email || "",
            domain: company.domain?.id || company.domain_id || "",
            fullName: company.person_name || "",
            person_phone: fullPersonPhone || "",
            official_phone: fullOfficialPhone || "",
            country: company.country?.id || company.country_id || "",
            city: company.city?.id || company.city_id || "",
            date: company.establishment_date || company.date || ""
          });
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error("Failed to load company profile.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [reset, token, navigate]);

  // 2. جلب قائمة الدول
  const selectedCountry = watch("country");
  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch("https://joocare.nami-tec.com/api/countries", {
          headers: { "Accept-Language": "en" },
        });
        const data = await response.json();
         setCountries(data?.data || data || []);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    }
    fetchCountries();
  }, []);

  // 3. جلب قائمة المدن
  useEffect(() => {
    async function fetchCities() {
      try {
        const response = await fetch(`https://joocare.nami-tec.com/api/cities?pagination=on&limit_per_page=10&page=1&country_id=${selectedCountry}`, {
          headers: { "Accept-Language": "en" },
        });
        const data = await response.json();
        setCities(data?.data || data || []);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    }
    fetchCities();
  }, [selectedCountry]);

  // 4. جلب قائمة الـ Domains
  useEffect(() => {
    async function fetchDomains() {
      try {
        const response = await fetch('https://joocare.nami-tec.com/api/domains?pagination=on&limit_per_page=10&page=1');
        const data = await response.json();
        setDomains(data?.data || data || []);
      } catch (error) {
        console.error("Error fetching domains:", error);
      }
    }
    fetchDomains();
  }, []);

  // 5. حفظ وتعديل البيانات الأساسية
  const onSubmit = async (data) => {
    let personPhoneCode = "";
    let personPhoneNum = data.person_phone || "";
    if (personPhoneNum.startsWith('+')) {
      personPhoneCode = personPhoneNum.substring(0, 4); 
      personPhoneNum = personPhoneNum.substring(4);
    }

    let officialPhoneCode = "";
    let officialPhoneNum = data.official_phone || "";
    if (officialPhoneNum.startsWith('+')) {
      officialPhoneCode = officialPhoneNum.substring(0, 4);
      officialPhoneNum = officialPhoneNum.substring(4);
    }

    const payload = {
      name: data.companyName,
      domain_id: data.domain,
      person_name: data.fullName,
      person_phone_code: personPhoneCode,
      person_phone: personPhoneNum,
      official_phone_code: officialPhoneCode,
      official_phone: officialPhoneNum,
      country_id: data.country,
      city_id: data.city,
      establishment_date: data.date
    };

    try {
      const res = await axios.post(
        "https://joocare.nami-tec.com/api/company/auth/update-basic-info",
        payload,
        { headers }
      );
      if (res.data) {
        toast.success(res.data.message || "Account settings updated successfully!");
      }
     } catch (err) {
      console.error("Update Error:", err);
      toast.error(err.response?.data?.message || "Failed to update basic info.");
    }
  };

  // 6. دالة تحديث الإيميل المنفصلة عند الضغط على حفظ داخل الـ Modal
  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    if (!newEmail) {
      toast.error("Please enter a valid email address");
      return;
    }
    try {
      setIsEmailSubmitting(true);
      const res = await axios.post(
        "https://joocare.nami-tec.com/api/company/auth/update-email", // الـ endpoint الخاصة بتعديل البريد
        { email: newEmail },
        { headers }
      );
      toast.success(res.data?.message || "Verification email sent or updated successfully!");
      setIsEmailModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update email.");
    } finally {
      setIsEmailSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="text-center py-10 text-gray-500 font-medium">Loading settings...</div>;
  }

  return (
    <div className="bg-white rounded-[28px] p-8 border border-[#F1F1F1] shadow-sm w-full relative">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        
        {/* Company Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#111]">Company name</label>
          <input
            {...register("companyName", { required: "Company name is required" })}
            placeholder="ex: Nami"
            className="w-full h-[54px] bg-[#F4F4F4] rounded-full px-6 text-[15px] outline-none border border-[#E9E9E9] focus:border-[#00694B] placeholder:text-[#A9A9A9]"
          />
          {errors.companyName && <p className="text-red-500 text-[12px] px-2">{errors.companyName.message}</p>}
        </div>

        {/* Official Email */}
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#111]">Official Email</label>
          <div className="flex items-center gap-4">
            <input
              {...register("email")}
              disabled
              placeholder="ex: mail@mail.com"
              className="flex-1 h-[54px] bg-[#F4F4F4] opacity-70 rounded-full px-6 text-[15px] outline-none border border-[#E9E9E9] placeholder:text-[#A9A9A9]"
            />
            {/* تشغيل زر الـ Edit ليفتح الـ Modal */}
            <button
              type="button"
              onClick={() => setIsEmailModalOpen(true)}
              className="min-w-[170px] h-[54px] rounded-full border border-[#2F3437] text-[#1B1B1B] font-semibold text-[14px] hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Domain */}
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#111]">Domain</label>
          <div className="relative">
            <select
              {...register("domain", { required: "Domain is required" })}
               className="w-full h-[54px] bg-[#F4F4F4] rounded-full px-6 appearance-none text-[15px] outline-none border border-[#E9E9E9] focus:border-[#00694B] text-gray-700"
            >
              <option value="">Select Domain</option>
              {domains.map((dom) => (
                <option key={dom.id} value={dom.id}>{dom.title}</option>
              ))}
            </select>
            <MdKeyboardArrowDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#666] text-[22px] pointer-events-none" />
          </div>
          {errors.domain && <p className="text-red-500 text-[12px] px-2">{errors.domain.message}</p>}
        </div>

        {/* Contact Person Full Name */}
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#111]">Contact person _ full name</label>
          <input
            {...register("fullName", { required: "Contact person name is required" })}
            placeholder="ex: Ahmed eltafawy"
            className="w-full h-[54px] bg-[#F4F4F4] rounded-full px-6 text-[15px] outline-none border border-[#E9E9E9] focus:border-[#00694B] placeholder:text-[#A9A9A9]"
          />
          {errors.fullName && <p className="text-red-500 text-[12px] px-2">{errors.fullName.message}</p>}
        </div>

        {/* Contact Person Phone */}
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#111]">
            Contact person _ Phone number <span className="text-red-500">*</span>
          </label>
          <div className={`phone-input-container flex items-center bg-[#F4F4F4] border rounded-full px-4 transition duration-300 ${errors.person_phone ? 'border-red-500' : 'border-[#E9E9E9] focus-within:border-[#00694B]'}`}>
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
                  className="w-full h-[54px]"
                />
              )}
            />
          </div>
          {errors.person_phone && <p className="text-red-500 text-[13px] mt-1 px-2 font-medium">{errors.person_phone.message}</p>}
        </div>

        {/* Organization Phone */}
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#111] flex items-center gap-2">
            Organization official phone number
            <span className="text-[12px] text-[#888] font-normal">(optional)</span>
          </label>
          <div className={`phone-input-container flex items-center bg-[#F4F4F4] border rounded-full px-4 transition duration-300 ${errors.official_phone ? 'border-red-500' : 'border-[#E9E9E9] focus-within:border-[#00694B]'}`}>
            <Controller
              name="official_phone"
              control={control}
              render={({ field: { onChange, value } }) => (
                <PhoneInput
                  international
                  defaultCountry="EG"
                  placeholder="Enter organization phone number"
                  value={value}
                  onChange={onChange}
                  className="w-full h-[54px]"
                />
              )}
            />
          </div>
        </div>

        {/* Country + City */}
        <div className="grid grid-cols-2 gap-4">
          {/* Country */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-[#111]">Country</label>
            <div className="relative">
             <select {...register("country", { required: "Country is required" })}
                           className="w-full h-[54px] bg-[#F4F4F4] rounded-full px-6 appearance-none text-[15px] outline-none border border-[#E9E9E9] focus:border-[#00694B] text-gray-700"
>
  <option value="">Select Country</option>
   {countries?.map((c) => (
    <option key={c.id} value={c.id}>{c.name || c.title}</option>
  ))}
</select>
              <MdKeyboardArrowDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#666] text-[22px] pointer-events-none" />
            </div>
            {errors.country && <p className="text-red-500 text-[12px] px-2">{errors.country.message}</p>}
          </div>

          {/* City */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-semibold text-[#111]">City</label>
            <div className="relative">
              <select
                {...register("city", { required: "City is required" })}
                className="w-full h-[54px] bg-[#F4F4F4] rounded-full px-6 appearance-none text-[15px] outline-none border border-[#E9E9E9] focus:border-[#00694B] text-gray-700"
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>{city.name || city.title}</option>
                ))}
              </select>
              <MdKeyboardArrowDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#666] text-[22px] pointer-events-none" />
            </div>
            {errors.city && <p className="text-red-500 text-[12px] px-2">{errors.city.message}</p>}
          </div>
        </div>

        {/* Date */}
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold text-[#111]">Date of Establishment</label>
          <div className="relative">
            <MdCalendarToday className="absolute left-5 top-1/2 -translate-y-1/2 text-[#00694B] text-[18px]" />
            <input
              {...register("date")}
              type="text"
              placeholder="ex: 2021"
              className="w-full h-[54px] bg-[#F4F4F4] rounded-full pl-12 pr-5 text-[15px] outline-none border border-[#E9E9E9] focus:border-[#00694B] placeholder:text-[#A9A9A9]"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center pt-3">
          <button
            type="submit"
            className="w-[170px] h-[50px] cursor-pointer rounded-full bg-[#162329] text-white font-semibold text-[15px] hover:bg-[#23353e] transition-colors shadow-md"
          >
            Save
          </button>
        </div>
      </form>

      {/* نافذة تعديل البريد الإلكتروني المنبثقة (Email Modal Popup) */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[99999] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
            <button 
              onClick={() => setIsEmailModalOpen(false)} 
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <MdClose className="text-2xl" />
            </button>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Update Official Email</h3>
            <p className="text-sm text-gray-500 mb-4">Enter your new official business email below.</p>
            
            <form onSubmit={handleEmailUpdate} className="flex flex-col gap-4">
              <input 
                type="email"
                required
                placeholder="ex: new-email@company.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full h-[50px] bg-[#F4F4F4] rounded-full px-5 text-[15px] outline-none border border-[#E9E9E9] focus:border-[#00694B]"
              />
              <button
                type="submit"
                disabled={isEmailSubmitting}
                className="w-full h-[50px] bg-[#00694B] text-white font-semibold rounded-full hover:bg-[#00523a] transition-colors shadow-md disabled:bg-gray-400"
              >
                {isEmailSubmitting ? "Updating..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Basicinfo;