import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdKeyboardArrowDown,
  MdPersonOutline,
  MdSettings,
  MdUpload,
  MdOutlineBrokenImage
} from "react-icons/md";
import Icon from "../../../../public/imge/Icon.svg";
import Icon2 from "../../../../public/imge/Icon (1).svg";
import axios from "axios";
import { toast } from 'react-hot-toast';  
import { s } from "framer-motion/client";


function Details2() {
  
  // {api specialties list}
const [specialties, setSpecialties] = useState([]);

async function fetchSpecialties() {
  try{
    const response = await fetch("https://joocare.nami-tec.com/api/specialties?pagination=on&limit_per_page=10&page=1", {
      headers: { "Accept-Language": "en" },
    });
    const data = await response.json();
    setSpecialties(data);
  }catch(error){
    console.error("Error:", error);
  }
}

useEffect(()=>{
  fetchSpecialties();
},[]);
  // {api specialties list}

  // {api Employer type list}
const [employerTypes, setEmployerTypes] = useState([]);

async function fetchEmployerTypes() {
  try{
    const response = await fetch("https://joocare.nami-tec.com/api/employer-types?pagination=on&limit_per_page=10&page=1", {
      headers: { "Accept-Language": "en" },
    });
    const data = await response.json();
    setEmployerTypes(data);
  }catch(error){
    console.error("Error:", error);
  }
}

useEffect(()=>{
  fetchEmployerTypes();
},[]);
  // {api Employer type list}


  // {api Organization Size list}
const [organizationSizes, setOrganizationSizes] = useState([]);
async function fetchOrganizationSizes() {
  try{
    const response = await fetch("https://joocare.nami-tec.com/api/organization-sizes?pagination=on&limit_per_page=10&page=1", {
      headers: { "Accept-Language": "en" },
    });
    const data = await response.json();
    setOrganizationSizes(data);
  }catch(error){
    console.error("Error:", error);
  }
}

useEffect(()=>{
  fetchOrganizationSizes();
},[]);
  // {api Organization Size list}

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












  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const currentStep = 2;

   const [crImage, setCrImage] = useState(null);
  const [mlImage, setMlImage] = useState(null);

  const onSubmit = (data) => {
    const token = localStorage.getItem('company_token');

     const formData = new FormData();
    
     Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

     if (crImage) formData.append("commercial_registration_image", crImage);
    if (mlImage) formData.append("medical_license_image", mlImage);

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'  
      }
    };

    axios.post("https://joocare.nami-tec.com/api/company/auth/setup-business-verification", formData, config)
    .then((res) => {
        toast.success("Business Verification successful", {
          position: "top-right",
          style: {
            background: "#E6F4EA",
            color: "#1E8E3E",
            borderRadius: "10px",
          },
        });
         navigate("/details3");
    })
    .catch((err) => {
      console.error(err);
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
              <div className="w-12 h-12 bg-[#2D3134] rounded-full flex items-center justify-center text-white font-bold text-xl">
                A
              </div>
              <div>
                <h3 className="font-bold text-[16px] text-[#0D0D0D]">
                  Saudi German Hospital
                </h3>
                <p className="text-[14px] text-[#4D4D4D]">Egypt</p>
              </div>
            </div>
            <p className="text-[12px] text-[#8F8F8F] leading-relaxed mb-4">
              Saudi German Hospitals is the leading healthcare provider and the
              number one healthcare brand in the MENA re...
            </p>
            <div className="bg-[#FFF9E6] text-[#FFB800] text-center py-2 rounded-full text-[13px] font-semibold border border-[#FFB800]/10">
              Account under review.
            </div>
          </div>

          <div className="bg-[#FFF5F5] rounded-[24px] p-6 border border-[#FFDADA]">
            <h4 className="text-[#FF4D4D] font-bold text-[18px] mb-2 leading-tight">
              Please complete your details.
            </h4>
            <p className="text-[13px] text-[#4D4D4D] mb-5">
              Please complete your account details so you can use the platform normally.
            </p>
            <Link to={'/Details2'}>
              <button className="w-full cursor-pointer bg-[#E32B2B] text-white font-bold py-3 rounded-full hover:bg-[#C22424] transition-all">
                Complete Now
              </button>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-1 px-2 mt-2">
            <NavLink to="/companyprofile" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${isActive ? "bg-[#E6F3EF] text-[#00694B] font-bold" : "text-[#8F8F8F]"}`}>
              <MdPersonOutline className="text-xl" /> Company Profile
            </NavLink>
            <NavLink to="/Dashboard" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${isActive ? "bg-[#E6F3EF] text-[#00694B] font-bold" : "text-[#8F8F8F]"}`}>
              <img src={Icon} className="text-xl w-5 h-5 object-contain" alt="" /> Dashboard
            </NavLink>
            <NavLink to="/JobManagement" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${isActive ? "bg-[#E6F3EF] text-[#00694B] font-bold" : "text-[#8F8F8F]"}`}>
              <img src={Icon2} className="text-xl w-5 h-5 object-contain" alt="" /> Job Management
            </NavLink>
            <NavLink to="/Accountsettings" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${isActive ? "bg-[#E6F3EF] text-[#00694B] font-bold border border-[#00694B]/10" : "text-[#8F8F8F]"}`}>
              <MdSettings className="text-xl" /> Account settings
            </NavLink>
          </div>

          <Link to={'/postjob'}>
            <button className="mt-10 w-full cursor-pointer bg-[#00694B] text-white font-bold py-4 rounded-full flex items-center justify-center gap-2">
              Post a Job
            </button>
          </Link>
        </aside>

        {/* Main Form Content */}
        <main className="flex-1 col-span-8 w-[1020px] py-[70px]">
          <div className="bg-white rounded-[24px] shadow-[0_4px_30px_rgba(0,0,0,0.06)] px-[40px] py-[32px] border border-[#F1F1F1]">
            
            {/* Progress Steps Indicators */}
            <div className="flex items-center justify-between mb-[80px] relative max-w-[95%] mx-auto">
              <div className="absolute top-[16px] left-0 right-0 h-[4px] bg-[#E5E5E5] z-0" style={{ transform: "translateY(-50%)" }}></div>
              <div className="absolute top-[16px] left-0 h-[4px] bg-[#00694B] z-0 transition-all duration-500 ease-in-out" style={{ transform: "translateY(-50%)", width: currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%" }}></div>

              <div className="flex flex-col items-center relative z-10">
                <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[14px] font-bold transition-colors duration-300 ${currentStep >= 1 ? "bg-[#00694B] text-white" : "bg-[#EAEAEA] text-[#9E9E9E]"}`}>1</div>
                <p className={`text-[14px] mt-4 absolute top-8 whitespace-nowrap ${currentStep >= 1 ? "font-bold text-[#0D0D0D]" : "font-medium text-[#A3A3A3]"}`}>Account Setup</p>
              </div>

              <div className="flex flex-col items-center relative z-10">
                <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[14px] font-bold transition-colors duration-300 ${currentStep >= 2 ? "bg-[#00694B] text-white" : "bg-[#EAEAEA] text-[#9E9E9E]"}`}>2</div>
                <p className={`text-[14px] mt-4 absolute top-8 whitespace-nowrap ${currentStep >= 2 ? "font-bold text-[#0D0D0D]" : "font-medium text-[#A3A3A3]"}`}>Business Verification</p>
              </div>

              <div className="flex flex-col items-center relative z-10">
                <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[14px] font-bold transition-colors duration-300 ${currentStep >= 3 ? "bg-[#00694B] text-white" : "bg-[#EAEAEA] text-[#9E9E9E]"}`}>3</div>
                <p className={`text-[14px] mt-4 absolute top-8 whitespace-nowrap ${currentStep >= 3 ? "font-bold text-[#0D0D0D]" : "font-medium text-[#A3A3A3]"}`}>Company Profile</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Commercial Registration Section */}
              <div className="CommercialRegistration bg-[#0D0D0D0D] p-[12px] rounded-[16px]">
                <h3 className="text-[21px] font-bold text-[#0D0D0D73] pb-3">Commercial Registration</h3>

                <div className="flex flex-col">
                  <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">Commercial Registration No</label>
                  <input
                    type="text"
                    placeholder="ex: 23121212"
                    {...register("commercial_registration_number", { required: "Commercial registration number is required" })}
                    className="w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 outline-none focus:ring-2 focus:ring-[#00694B]/20 transition-all placeholder:text-[#8F8F8F]"
                  />
                  {errors.commercial_registration_number && <p className="text-red-500 text-[13px] mt-1 px-4">{errors.commercial_registration_number.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4 py-[15px]">
                  <div className="flex flex-col">
                    <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">Issuing country of the licence</label>
                    <div className="relative">
                      <select
                        {...register("license_issue_country_id", { required: "This field is required" })}
                        className="w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 appearance-none outline-none cursor-pointer text-[#8F8F8F]"
                      >
                        <option value="">Select Country</option>
                        {countries?.data?.map((country) => (
                          <option key={country.id} value={country.id}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                      <MdKeyboardArrowDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#00694B] pointer-events-none" size={22} />
                    </div>
                    {errors.license_issue_country_id && <p className="text-red-500 text-[13px] mt-1 px-4">{errors.license_issue_country_id.message}</p>}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">Organization Size</label>
                    <div className="relative">
                      <select
                        {...register("organization_size_id", { required: "This field is required" })}
                        className="w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 appearance-none outline-none cursor-pointer text-[#8F8F8F]"
                      >
                        <option value="">Select Organization Size</option>
                         {organizationSizes?.data?.map((size) => (
                          <option key={size.id} value={size.id}>
                            {size.title}
                          </option>
                        ))}
                      </select>
                      <MdKeyboardArrowDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#00694B] pointer-events-none" size={22} />
                    </div>
                    {errors.organization_size_id && <p className="text-red-500 text-[13px] mt-1 px-4">{errors.organization_size_id.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-[15px]">
                  <div className="flex flex-col">
                    <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">Registration Issue Date</label>
                    <input
                      type="date"
                      {...register("commercial_registration_issue_date", { required: "Issue date is required" })}
                      className="w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 outline-none text-[#8F8F8F] cursor-pointer"
                    />
                    {errors.commercial_registration_issue_date && <p className="text-red-500 text-[13px] mt-1 px-4">{errors.commercial_registration_issue_date.message}</p>}
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">Registration Expiry Date</label>
                    <input
                      type="date"
                      {...register("commercial_registration_expiry_date", { required: "Expiry date is required" })}
                      className="w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 outline-none text-[#8F8F8F] cursor-pointer"
                    />
                    {errors.commercial_registration_expiry_date && <p className="text-red-500 text-[13px] mt-1 px-4">{errors.commercial_registration_expiry_date.message}</p>}
                  </div>
                </div>

                {/* CR File Upload */}
                <div className="flex flex-col py-[15px]">
                  <label htmlFor="commercial_registration_image" className="w-full h-[220px] rounded-[32px] flex flex-col items-center justify-center cursor-pointer bg-[#EBEBEB] hover:bg-[#E2E2E2] transition-all relative overflow-hidden group">
                    <input 
                      type="file" 
                      id="commercial_registration_image"
                      className="hidden" 
                      accept="image/*" 
                      onChange={(e) => setCrImage(e.target.files[0])} 
                    />
                    {crImage ? (
                      <img 
                        src={URL.createObjectURL(crImage)} 
                        alt="Commercial Registration" 
                        className="w-full h-full object-cover absolute inset-0" 
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-14 h-14 bg-white/50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <MdOutlineBrokenImage className="text-[#8F8F8F] text-[32px]" />
                        </div>
                        <p className="text-[14px] text-[#8F8F8F] font-medium">Drag & Drop your Image or Browse </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Medical License Section */}
              <div className="Medical License bg-[#0D0D0D0D] p-[12px] rounded-[16px]">
                <h3 className="text-[16px] font-bold text-[#0D0D0D] border-b border-[#F1F1F1] pb-3 pt-2">Medical License</h3>

                <div className="flex flex-col py-[15px]">
                  <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">Employer type</label>
                  <div className="relative">
                    <select
                      {...register("employer_type_id", { required: "Employer type is required" })}
                      className="w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 appearance-none outline-none cursor-pointer text-[#8F8F8F]"
                    >
                      <option value="">ex: Hospital</option>
                       {employerTypes.data?.map((employerType)=>(
                        <option key={employerType.id} value={employerType.id}>  
                          {employerType.title}
                        </option>
                       ))}
                    </select>
                    <MdKeyboardArrowDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#00694B] pointer-events-none" size={22} />
                  </div>
                  {errors.employer_type_id && <p className="text-red-500 text-[13px] mt-1 px-4">{errors.employer_type_id.message}</p>}
                </div>

                <div className="flex flex-col py-[15px]">
                  <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">Medical Facility License Number</label>
                  <input
                    type="text"
                    placeholder="ex: 23121212"
                    {...register("medical_facility_license_number", { required: "License number is required" })}
                    className="w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 outline-none transition-all placeholder:text-[#8F8F8F]"
                  />
                  {errors.medical_facility_license_number && <p className="text-red-500 text-[13px] mt-1 px-4">{errors.medical_facility_license_number.message}</p>}
                </div>

                <div className="flex flex-col py-[15px]">
                  <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">License Issuing Authority</label>
                  <input
                    type="text"
                    placeholder="ex: Dubai Health Authority"
                    {...register("license_issuing_authority", { required: "Issuing authority is required" })}
                    className="w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 outline-none transition-all placeholder:text-[#8F8F8F]"
                  />
                  {errors.license_issuing_authority && <p className="text-red-500 text-[13px] mt-1 px-4">{errors.license_issuing_authority.message}</p>}
                </div>

                <div className="flex flex-col py-[15px]">
                  <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">Specialty / Scope of Practice</label>
                  <div className="relative">
                    <select
                      {...register("specialty_id", { required: "Specialty is required" })}
                      className="w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 appearance-none outline-none cursor-pointer text-[#8F8F8F]"
                    >
                      <option value="">ex: hospital</option>
                       {specialties.data?.map((specialty)=>(
                        <option key={specialty.id} value={specialty.id}>
                          {specialty.title}
                        </option>
                       ))}
                    </select>
                    <MdKeyboardArrowDown className="absolute right-5 top-1/2 -translate-y-1/2 text-[#00694B] pointer-events-none" size={22} />
                  </div>
                  {errors.specialty_id && <p className="text-red-500 text-[13px] mt-1 px-4">{errors.specialty_id.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4 py-[15px]">
                  <div className="flex flex-col">
                    <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">Medical License Issue Date</label>
                    <input
                      type="date"
                      {...register("medical_license_issue_date", { required: "Issue date is required" })}
                      className="w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 outline-none text-[#8F8F8F]"
                    />
                    {errors.medical_license_issue_date && <p className="text-red-500 text-[13px] mt-1 px-4">{errors.medical_license_issue_date.message}</p>}
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">Medical License Expiry Date</label>
                    <input
                      type="date"
                      {...register("medical_license_expiry_date", { required: "Expiry date is required" })}
                      className="w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 outline-none text-[#8F8F8F]"
                    />
                    {errors.medical_license_expiry_date && <p className="text-red-500 text-[13px] mt-1 px-4">{errors.medical_license_expiry_date.message}</p>}
                  </div>
                </div>

                {/* ML File Upload */}
                <div className="flex flex-col py-[15px]">
                  <label htmlFor="medical_license_image" className="w-full h-[220px] rounded-[32px] flex flex-col items-center justify-center cursor-pointer bg-[#EBEBEB] hover:bg-[#E2E2E2] transition-all relative overflow-hidden group">
                    <input 
                      type="file" 
                      id="medical_license_image"
                      className="hidden" 
                      accept="image/*" 
                      onChange={(e) => setMlImage(e.target.files[0])} 
                    />
                    {mlImage ? (
                      <img 
                        src={URL.createObjectURL(mlImage)} 
                        alt="Medical License" 
                        className="w-full h-full object-cover absolute inset-0" 
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-14 h-14 bg-white/50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <MdOutlineBrokenImage className="text-[#8F8F8F] text-[32px]" />
                        </div>
                        <p className="text-[14px] text-[#8F8F8F] font-medium">Drag & Drop your Image or Browse </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-4 mt-10">
                <button
                  type="button"
                  onClick={() => navigate("/details")}
                  className="w-[160px] h-[56px] border border-[#CCCCCC] text-[#0D0D0D] rounded-full font-bold text-[16px] hover:bg-[#F5F5F5] transition-all"
                >
                  Prev
                </button>
                <button
                  type="submit"
                  className="w-[160px] h-[56px] bg-[#152126] hover:bg-black text-white rounded-full font-bold text-[16px] transition-all"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Details2;