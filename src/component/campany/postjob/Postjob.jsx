import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { useState, useEffect } from "react"; 
import {
  MdDashboard,
  MdKeyboardArrowDown,
  MdPersonOutline,
  MdSettings,
  MdWorkOutline,
} from "react-icons/md";
import toast from "react-hot-toast";
import {   
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxChipsInput,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
} from "../../../components/ui/combobox";

function Postjob() {
  // State variables for fetched data
  const [availabilitiess, setavailabilitiess] = useState(null);
  const [categoriess, setcategoriess] = useState(null);
  const [experiencess, setexperiencess] = useState(null);
  const [rolecategories, setrolecategories] = useState(null);
  const [employertypes, setemployertypes] = useState(null);
  const [jobtitles, setjobtitles] = useState(null);
   const [salarytypes, setsalarytypes] = useState(null);
  const [currencies, setcurrencies] = useState(null);
  const [specialties, setspecialties] = useState(null);
  const [countries, setcountries] = useState(null);
  const [cities, setcities] = useState(null);
  const [educationlevels, seteducationlevels] = useState(null);
  const [mandatorycertifications, setmandatorycertifications] = useState(null);

  // api data fetching function
  async function fetchdata(url, res) {
    try {
      const response = await fetch(url, {
        headers: { "Accept-Language": "en" },
      });
      const data = await response.json();
      res(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  
  const selectedCountry = watch("country_id");
  const showSalary = watch("has_salary");
  const {
    register,
    handleSubmit,
    control,
    watch,  
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      education_ids: [],
      mandatory_certification_ids: [],
      has_salary: 1
    }
  });

  useEffect(() => {
    const baseurl = 'https://joocare.nami-tec.com/api';
    fetchdata(`${baseurl}/availabilities?pagination=off`, setavailabilitiess);
    fetchdata(`${baseurl}/categories?pagination=off`, setcategoriess);
    fetchdata(`${baseurl}/experiences?pagination=off`, setexperiencess);
    fetchdata(`${baseurl}/role-categories?pagination=off`, setrolecategories);
    fetchdata(`${baseurl}/employment-types?pagination=off`, setemployertypes);
    fetchdata(`${baseurl}/job-titles?pagination=off`, setjobtitles);
     fetchdata(`${baseurl}/salary-types?pagination=off`, setsalarytypes);
    fetchdata(`${baseurl}/currencies?pagination=off`, setcurrencies);
    fetchdata(`${baseurl}/specialties?pagination=off`, setspecialties);
    fetchdata(`${baseurl}/countries?`, setcountries);
    fetchdata(`${baseurl}/education-levels?pagination=off`, seteducationlevels);
    fetchdata(`${baseurl}/mandatory-certifications?pagination=off`, setmandatorycertifications);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const baseurl = 'https://joocare.nami-tec.com/api';
      fetchdata(`${baseurl}/cities?country_id=${selectedCountry}&pagination=off`, setcities);
    } else {
      setcities(null);  
    }
  }, [selectedCountry]);

  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const token = localStorage.getItem('company_token');
    
 
    const formData = new FormData();

     formData.append("job_title_id", data.job_title_id);
    formData.append("professional_license", data.professional_license);
    formData.append("has_salary", data.has_salary ? 1 : 0);
    
    if (Number(data.has_salary) === 1) {
      formData.append("min_salary", data.min_salary || "");
      formData.append("max_salary", data.max_salary || "");
      formData.append("salary_type_id", data.salary_type_id || "");
      formData.append("currency_id", data.currency_id || "");
    }

    formData.append("category_title", data.category_title);
    formData.append("specialty_title", data.specialty_title);
    formData.append("employment_type_id", data.employment_type_id);
    formData.append("role_category_id", data.role_category_id);
    formData.append("country_id", data.country_id);
    formData.append("city_id", data.city_id);
    formData.append("experience_title", data.experience_title);
    formData.append("availability_title", data.availability_title);
 
if (Array.isArray(data.education_ids)) {
  data.education_ids.forEach((id) => {
     formData.append("education_levels[]", id);
  });
}

 if (Array.isArray(data.mandatory_certification_ids)) {  
  data.mandatory_certification_ids.forEach((id) => {
     formData.append("mandatory_certifications[]", id);
  });
}

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'language': 'en',
        'Content-Type': 'multipart/form-data'   
      }
    };

    axios
      .post("https://joocare.nami-tec.com/api/company/jobs-step-one", formData, config,{
        headers:{
          'Accept-Language': 'en',
          'Accept': 'application/json',
        }
      })
      .then((res) => {
        toast.success("Job details saved successfully", {
          position: "top-right",
          style: { background: "#E6F4EA", color: "#1E8E3E", borderRadius: "10px" },
        });
        const createdJobId = res.data?.data?.job?.id;
      if (createdJobId) {
        localStorage.setItem('current_job_id', createdJobId);
      }
        navigate(`/JobDescriptionRequirements/${createdJobId}`);
      })
      .catch((err) => {
        console.error("API Error Details:", err.response?.data);
        toast.error(err.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <>
      <div className="Postjob px-50 p-[24px] mt-[50px]">
        <div className="bg-white rounded-[24px] shadow-[0_4px_30px_rgba(0,0,0,0.06)] px-[40px] py-[32px] border border-[#F1F1F1]">
          
          {/* Progress Steps Indicator */}
          <div className="flex items-center justify-between mb-[80px] relative max-w-[95%] mx-auto">
            <div className="absolute top-[16px] left-0 right-0 h-[4px] bg-[#E5E5E5] z-0" style={{ transform: "translateY(-50%)" }}></div>
            <div className="absolute top-[16px] left-0 h-[4px] bg-[#00694B] z-0 transition-all duration-500 ease-in-out"
              style={{ transform: "translateY(-50%)", width: currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%" }}
            ></div>

            <div className="flex flex-col items-center relative z-10">
              <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[14px] font-bold transition-colors duration-300 ${currentStep >= 1 ? "bg-[#00694B] text-white" : "bg-[#EAEAEA] text-[#9E9E9E]"}`}>1</div>
              <p className={`text-[14px] mt-4 absolute top-8 whitespace-nowrap ${currentStep >= 1 ? "font-bold text-[#0D0D0D]" : "font-medium text-[#A3A3A3]"}`}>Job Details</p>
            </div>
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[14px] font-bold transition-colors duration-300 ${currentStep >= 2 ? "bg-[#00694B] text-white" : "bg-[#EAEAEA] text-[#9E9E9E]"}`}>2</div>
              <p className={`text-[14px] mt-4 absolute top-8 whitespace-nowrap ${currentStep >= 2 ? "font-bold text-[#0D0D0D]" : "font-medium text-[#A3A3A3]"}`}>Job Description & Requirements</p>
            </div>
            <div className="flex flex-col items-center relative z-10">
              <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[14px] font-bold transition-colors duration-300 ${currentStep >= 3 ? "bg-[#00694B] text-white" : "bg-[#EAEAEA] text-[#9E9E9E]"}`}>3</div>
              <p className={`text-[14px] mt-4 absolute top-8 whitespace-nowrap ${currentStep >= 3 ? "font-bold text-[#0D0D0D]" : "font-medium text-[#A3A3A3]"}`}>Job Preview</p>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="px-[24px] py-8 max-w-[1028px] mx-auto flex flex-col gap-6 bg-white antialiased text-[#152126]">
              
            {/* Row 1: Job Title & Professional License */}
            
<div className="flex flex-col md:flex-row items-start w-full justify-between gap-6">
    <div className="flex flex-col flex-1 w-full">
      <label htmlFor="job_title_id" className="font-bold text-sm mb-2 text-[#152126]">Job Title</label>
      <div className="relative w-full">
        <select 
          id="job_title_id" 
          {...register("job_title_id", { required: "Job title is required" })}
          className={`w-full h-[56px] px-5 rounded-full bg-[#F4F4F4] border-[1px] ${errors.job_title_id ? "border-red-500" : "border-[#0D0D0D14]"} text-[#A3A3A3] font-medium outline-none appearance-none cursor-pointer pr-10`}
        >
          <option value="">ex: Cardiac surgeon</option>
          {jobtitles?.data?.map((title) => (
            <option key={title.id} value={title.id}>
              {title.title}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#A3A3A3]">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>
      {errors.job_title_id && <span className="text-red-500 text-xs mt-1 px-2">{errors.job_title_id.message}</span>}
    </div>
    
   <div className="flex flex-col flex-1 w-full">
  <label htmlFor="professional_license" className="font-bold text-sm mb-2 text-[#152126]">Professional License</label>
  <div className="relative w-full">
    <select 
  id="professional_license" 
  {...register("professional_license", { required: "Professional license is required" })}
  className={`w-full h-[56px] px-5 rounded-full bg-[#F4F4F4] border-[1px] ${errors.professional_license ? "border-red-500" : "border-[#0D0D0D14]"} text-[#A3A3A3] font-medium outline-none appearance-none cursor-pointer pr-10`}
>
  <option value="">ex: Without Medical license</option>
  <option value="with_medical_license">With Medical License</option>
  <option value="without_medical_license">Without Medical License</option>
</select>
    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#A3A3A3]">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
    </div>
  </div>
  {errors.professional_license && <span className="text-red-500 text-xs mt-1 px-2">{errors.professional_license.message}</span>}
</div>
  </div>

            {/* Section: Salary Container */}
            <div className="bg-[#F8F9FA] p-6 rounded-2xl flex flex-col gap-5 border border-[#F1F3F5]">
              <div className="flex items-center justify-between w-full">
                <span className="font-bold text-[15px] text-[#152126]">Do you want to add salary?</span>
                <Controller
                  control={control}
                  name="has_salary"
                  render={({ field: { onChange, value } }) => (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={Number(value) === 1} 
                        onChange={(e) => onChange(e.target.checked ? 1 : 0)} 
                        className="sr-only peer rounded-full" 
                      />
                      <div className="w-[44px] h-[24px] bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all duration-300 peer-checked:bg-[#037A4B]"></div>
                    </label>
                  )}
                />
              </div>

              <div className={`grid grid-cols-1 sm:grid-cols-4 gap-4 items-end transition-all duration-500 ease-in-out overflow-hidden ${Number(showSalary) === 1 ? "max-h-[200px] opacity-100 pointer-events-auto mt-0" : "max-h-0 opacity-0 pointer-events-none mt-0 select-none"}`}>
                <div className="flex flex-col">
                  <label className="text-xs font-bold mb-2 text-[#152126]">Salary Range</label>
                  <input type="text" placeholder="Min" {...register("min_salary")} className="h-[48px] px-4 bg-white border border-[#0D0D0D14] rounded-full outline-none placeholder-[#C2C2C2] text-sm text-[#152126]" />
                </div>
                <div className="flex flex-col">
                  <input type="text" placeholder="Max" {...register("max_salary")} className="h-[48px] px-4 bg-white border border-[#0D0D0D14] rounded-full outline-none placeholder-[#C2C2C2] text-sm text-[#152126]" />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold mb-2 text-[#152126]">Salary Type</label>
                  <div className="relative w-full">
                    <select {...register("salary_type_id")} className="w-full h-[48px] px-4 bg-white border border-[#0D0D0D14] rounded-full outline-none text-[#152126] text-sm appearance-none cursor-pointer pr-8">
                      <option value="">ex: Hourly</option>
                      {salarytypes?.data?.map((type) => (
                        <option key={type.id} value={type.id}>{type.title}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#A3A3A3]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-bold mb-2 text-[#152126]">Currency</label>
                  <div className="relative w-full">
                    <select {...register("currency_id")} className="w-full h-[48px] px-4 bg-white border border-[#0D0D0D14] rounded-full outline-none text-[#152126] text-sm appearance-none cursor-pointer pr-8">
                      <option value="">Choose</option>
                      {currencies?.data?.map((currency) => (
                        <option key={currency.id} value={currency.id}>{currency.title}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#A3A3A3]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Job Category & Specialty */}
            <div className="flex flex-col md:flex-row items-start w-full justify-between gap-6">
              <div className="flex flex-col flex-1 w-full">
                <label className="font-bold text-sm mb-2 text-[#152126]">Job Category</label>
                <div className="relative w-full">
                  <select 
                    {...register("category_title", { required: "Job category is required" })}
                    className={`w-full h-[56px] px-5 border-[1px] ${errors.category_title ? "border-red-500" : "border-[#0D0D0D14]"} rounded-full bg-[#F4F4F4] text-[#A3A3A3] font-medium outline-none appearance-none cursor-pointer pr-10`}
                  >
                    <option value="">ex: Cardiology</option>
                    {categoriess?.data?.map((category) => (
                      <option key={category.id} value={category.title}>{category.title}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#A3A3A3]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
                {errors.category_title && <span className="text-red-500 text-xs mt-1 px-2">{errors.category_title.message}</span>}
              </div>
              
              <div className="flex flex-col flex-1 w-full">
                <label className="font-bold text-sm mb-2 text-[#152126]">Specialty</label>
                <div className="relative w-full">
                  <select 
                    {...register("specialty_title", { required: "Specialty is required" })}
                    className={`w-full h-[56px] px-5 border-[1px] ${errors.specialty_title ? "border-red-500" : "border-[#0D0D0D14]"} rounded-full bg-[#F4F4F4] text-[#A3A3A3] font-medium outline-none appearance-none cursor-pointer pr-10`}
                  >
                    <option value="">ex: Cardiology</option>
                    {specialties?.data?.map((specialty) => (
                      <option key={specialty.id} value={specialty.title}>{specialty.title}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#A3A3A3]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
                {errors.specialty_title && <span className="text-red-500 text-xs mt-1 px-2">{errors.specialty_title.message}</span>}
              </div>
            </div>

            {/* Section: Employment Type Section */}
            <div className="bg-[#F8F9FA] p-6 rounded-2xl flex flex-col gap-4 border border-[#F1F3F5]">
              <h3 className="font-bold text-[16px] text-[#A3A3A3] tracking-wide mb-1">Employment Type Section</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs font-bold mb-2 text-[#152126]">Employment Type</label>
                  <div className="relative w-full">
                    <select {...register("employment_type_id", { required: "Required" })} className={`w-full h-[48px] px-4 bg-white border border-[1px] ${errors.employment_type_id ? "border-red-500" : "border-[#0D0D0D14]"} rounded-full outline-none text-[#A3A3A3] text-sm appearance-none cursor-pointer pr-8`}>
                      <option value="">ex:Full-time</option>
                      {employertypes?.data?.map((type) => (
                        <option key={type.id} value={type.id}>{type.title}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#A3A3A3]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                  {errors.employment_type_id && <span className="text-red-500 text-[10px] mt-1 px-1">{errors.employment_type_id.message}</span>}
                </div>

                <div className="flex flex-col">
                  <label className="text-xs font-bold mb-2 text-[#152126]">Role Category</label>
                  <div className="relative w-full">
                    <select {...register("role_category_id", { required: "Required" })} className={`w-full h-[48px] px-4 bg-white border border-[1px] ${errors.role_category_id ? "border-red-500" : "border-[#0D0D0D14]"} rounded-full outline-none text-[#A3A3A3] text-sm appearance-none cursor-pointer pr-8`}>
                      <option value="">ex:Clinical</option>
                      {rolecategories?.data?.map((role) => (
                        <option key={role.id} value={role.id}>{role.title}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#A3A3A3]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                  {errors.role_category_id && <span className="text-red-500 text-[10px] mt-1 px-1">{errors.role_category_id.message}</span>}
                </div>
              </div>
            </div>

            {/* Section: Job Location */}
            <div className="bg-[#F8F9FA] p-6 rounded-2xl flex flex-col gap-4 border border-[#F1F3F5]">
              <h3 className="font-bold text-[16px] text-[#A3A3A3] tracking-wide mb-1">Job Location</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-xs font-bold mb-2 text-[#152126]">Country</label>
                  <div className="relative w-full">
                    <select {...register("country_id", { required: "Country is required" })} className={`w-full h-[48px] px-4 bg-white border border-[1px] ${errors.country_id ? "border-red-500" : "border-[#0D0D0D14]"} rounded-full outline-none text-[#A3A3A3] text-sm appearance-none cursor-pointer pr-8`}>
                      <option value="">ex: United Arab Emirates (UAE)</option>
                      {countries?.data?.map((country) => (
                        <option key={country.id} value={country.id}>{country.name}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#A3A3A3]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                  {errors.country_id && <span className="text-red-500 text-xs mt-1 px-1">{errors.country_id.message}</span>}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="city_id" className="text-xs font-bold mb-2 text-[#152126]">City</label>
                  <div className="relative w-full">
                    <select id="city_id" {...register("city_id", { required: "City is required" })} className={`w-full h-[48px] px-4 bg-white border border-[1px] ${errors.city_id ? "border-red-500" : "border-[#0D0D0D14]"} rounded-full outline-none text-[#A3A3A3] text-sm appearance-none cursor-pointer pr-8`}>
                      <option value="">ex:Dubai</option>
                      {cities?.data?.map((city) => (
                        <option key={city.id} value={city.id}>{city.name}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#A3A3A3]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                  {errors.city_id && <span className="text-red-500 text-xs mt-1 px-1">{errors.city_id.message}</span>}
                </div>
              </div>
            </div>

            {/* Row: Years of Experience */}
            <div className="flex flex-col w-full">
              <label className="font-bold text-sm mb-2 text-[#152126]">Years of Experience</label>
              <div className="relative w-full">
                <select 
                  {...register("experience_title", { required: "Years of experience is required" })}
                  className={`w-full h-[56px] px-5 rounded-full bg-[#F4F4F4] border-[1px] ${errors.experience_title ? "border-red-500" : "border-[#0D0D0D14]"} text-[#A3A3A3] font-medium outline-none appearance-none cursor-pointer pr-10`}
                >
                  <option value="">Select</option>
                  {experiencess?.data?.map((experience) => (
                    <option key={experience.id} value={experience.title}>{experience.title}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#A3A3A3]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
              {errors.experience_title && <span className="text-red-500 text-xs mt-1 px-2">{errors.experience_title.message}</span>}
            </div>

            {/* Section: Education & Certifications section */}
            <div className="bg-[#F8F9FA] p-6 rounded-2xl flex flex-col gap-4 border border-[#F1F3F5]">
              <h3 className="font-bold text-[16px] text-[#A3A3A3] tracking-wide mb-1">Education & Certifications section</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 1. Education Level */}
                <div className="flex flex-col">
                  <label className="text-xs font-bold mb-2 text-[#152126]">Education Level</label>
                  <Controller
                    control={control}
                    name="education_ids"
                    rules={{ required: "Education level is required" }}
                    render={({ field: { onChange, value } }) => {
                      const currentValues = Array.isArray(value) ? value.map(String) : [];
                      return (
                        <Combobox multiple value={currentValues} onValueChange={(val) => onChange(val)}>
                          <div className="relative w-full min-h-[48px] bg-white border border-[#0D0D0D14] rounded-full flex items-center pr-10 pl-2 py-1">
                            <ComboboxChips className="flex flex-wrap gap-1 border-none bg-transparent p-0 shadow-none focus-within:ring-0 w-full">
                              {currentValues.map((v) => {
                                const level = educationlevels?.data?.find(l => String(l.id) === v);
                                return (
                                  <ComboboxChip key={v} value={v} className="flex items-center gap-1 bg-gray-100 text-gray-800 rounded-full px-2.5 py-0.5 text-xs font-medium border border-gray-200">
                                    {level?.title || v}
                                  </ComboboxChip>
                                );
                              })}
                              <ComboboxChipsInput placeholder={currentValues.length === 0 ? "Select" : ""} className="text-sm text-gray-700 placeholder-[#A3A3A3] ml-2 flex-1" />
                            </ComboboxChips>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                              <ComboboxTrigger className="border-none bg-transparent p-0 m-0 [&_svg]:text-[#A3A3A3]" />
                            </div>
                          </div>
                          <ComboboxContent className="z-50 bg-white border border-gray-100 rounded-2xl shadow-xl p-1 mt-1">
                            <ComboboxList>
                              {educationlevels?.data?.map((level) => (
                                <ComboboxItem key={level.id} value={String(level.id)} className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl cursor-pointer outline-none">
                                  {level.title}
                                </ComboboxItem>
                              ))}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      );
                    }}
                  />
                  {errors.education_ids && <span className="text-red-500 text-xs mt-1 px-1">{errors.education_ids.message}</span>}
                </div>

                {/* 2. Mandatory Certifications */}
                <div className="flex flex-col">
                  <label className="text-xs font-bold mb-2 text-[#152126]">Mandatory Certifications</label>
                  <Controller
                    control={control}
                    name="mandatory_certification_ids"
                    rules={{ required: "Mandatory certification is required" }}
                    render={({ field: { onChange, value } }) => {
                      const currentValues = Array.isArray(value) ? value.map(String) : [];
                      return (
                        <Combobox multiple value={currentValues} onValueChange={(val) => onChange(val)}>
                          <div className="relative w-full min-h-[48px] bg-white border border-[#0D0D0D14] rounded-full flex items-center pr-10 pl-2 py-1">
                            <ComboboxChips className="flex flex-wrap gap-1 border-none bg-transparent p-0 shadow-none focus-within:ring-0 w-full">
                              {currentValues.map((v) => {
                                const cert = mandatorycertifications?.data?.find(c => String(c.id) === v);
                                return (
                                  <ComboboxChip key={v} value={v} className="flex items-center gap-1 bg-gray-100 text-gray-800 rounded-full px-2.5 py-0.5 text-xs font-medium border border-gray-200">
                                    {cert?.title || v}
                                  </ComboboxChip>
                                );
                              })}
                              <ComboboxChipsInput placeholder={currentValues.length === 0 ? "Select" : ""} className="text-sm text-gray-700 placeholder-[#A3A3A3] ml-2 flex-1" />
                            </ComboboxChips>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                              <ComboboxTrigger className="border-none bg-transparent p-0 m-0 [&_svg]:text-[#A3A3A3]" />
                            </div>
                          </div>
                          <ComboboxContent className="z-50 bg-white border border-gray-100 rounded-2xl shadow-xl p-1 mt-1">
                            <ComboboxList>
                              {mandatorycertifications?.data?.map((certification) => (
                                <ComboboxItem key={certification.id} value={String(certification.id)} className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl cursor-pointer outline-none">
                                  {certification.title}
                                </ComboboxItem>
                              ))}
                            </ComboboxList>
                          </ComboboxContent>
                        </Combobox>
                      );
                    }}
                  />
                  {errors.mandatory_certification_ids && <span className="text-red-500 text-xs mt-1 px-1">{errors.mandatory_certification_ids.message}</span>}
                </div>

              </div>
            </div>

            {/* Section: Availability */}
            <div className="bg-[#F8F9FA] p-6 rounded-2xl flex flex-col gap-4 border border-[#F1F3F5]">
              <h3 className="font-bold text-[16px] text-[#A3A3A3] tracking-wide mb-1">Availability</h3>
              <div className="flex flex-col">
                <label className="text-xs font-bold mb-2 text-[#152126]">Availability</label>
                <div className="relative w-full">
                  <select {...register("availability_title", { required: "Availability is required" })} className={`w-full h-[48px] px-4 bg-white border border-[1px] ${errors.availability_id ? "border-red-500" : "border-[#0D0D0D14]"} rounded-full outline-none text-[#A3A3A3] text-sm appearance-none cursor-pointer pr-8`}>
                    <option value="">Select</option>
                    {availabilitiess?.data?.map((availability) => (
                      <option key={availability.id} value={availability.title}>{availability.title}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#A3A3A3]">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
                {errors.availability_title && <span className="text-red-500 text-xs mt-1 px-1">{errors.availability_title.message}</span>}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-[200px] h-[56px] bg-[#152126] cursor-pointer hover:bg-[#000] text-white rounded-full font-bold text-[16px] mx-auto flex items-center justify-center transition-all mt-6 shadow-sm"
            >
              Next
            </button>
          </form> 
        </div>
      </div>
    </>
  );
}

export default Postjob;