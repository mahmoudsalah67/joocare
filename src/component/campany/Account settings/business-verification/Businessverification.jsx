import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown, MdOutlineBrokenImage } from "react-icons/md";
import axios from "axios";
import { toast } from 'react-hot-toast';

// إعداد كائن Axios ثابت
const api = axios.create({
  baseURL: 'https://joocare.nami-tec.com/api',
  headers: {
    'Accept-Language': 'en',
    'Authorization': `Bearer ${localStorage.getItem('company_token')}` 
  }
});

function Businessverification() {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [organizationSizes, setOrganizationSizes] = useState([]);
  const [employerTypes, setEmployerTypes] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  // حالات لعرض الصور برابط المعاينة (Preview) فور رفعها بنجاح للسيرفر
  const [crPreview, setCrPreview] = useState("");
  const [mlPreview, setMlPreview] = useState("");

  // حالات لإظهار لودر أثناء رفع كل صورة بشكل منفصل
  const [uploadingCr, setUploadingCr] = useState(false);
  const [uploadingMl, setUploadingMl] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      commercial_registration_number: "",
      license_issue_country_id: "",
      organization_size_id: "",
      commercial_registration_issue_date: "",
      commercial_registration_expiry_date: "",
      employer_type_id: "",
      medical_facility_license_number: "",
      license_issuing_authority: "",
      specialty_id: "",
      medical_license_issue_date: "",
      medical_license_expiry_date: "",
      // حقول الصور التي ستحمل الـ Paths النصية الراجعة من السيرفر
      commercial_registration_image: "", 
      medical_license_image: ""
    }
  });

  // 1. جلب قوائم الاختيارات المنسدلة عند التحميل
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [countriesRes, sizesRes, employersRes, specialtiesRes] = await Promise.all([
          api.get('/countries?pagination=on&limit_per_page=10&page=1'),
          api.get('/organization-sizes?pagination=on&limit_per_page=10&page=1'),
          api.get('/employer-types?pagination=on&limit_per_page=10&page=1'),
          api.get('/specialties?pagination=on&limit_per_page=10&page=1')
        ]);

        setCountries(countriesRes.data?.data || []);
        setOrganizationSizes(sizesRes.data?.data || []);
        setEmployerTypes(employersRes.data?.data || []);
        setSpecialties(specialtiesRes.data?.data || []);
      } catch (error) {
        console.error("Error fetching lists:", error);
        toast.error("Failed to load form options");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // 2. معالجة رفع الصور الفوري للسيرفر وجلب الـ Path
  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const mediaData = new FormData();
    mediaData.append("image", file); // الـ Key الثابت المطلوب للسيرفر في الـ Upload

    if (type === "commercial_registration_image") setUploadingCr(true);
    if (type === "medical_license_image") setUploadingMl(true);

    try {
      const uploadRes = await api.post("/images", mediaData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      const uploadedImagePath = uploadRes.data?.data?.image;

      if (!uploadedImagePath) {
        toast.error("تم الرفع ولكن فشل قراءة مسار الصورة من الـ Response.");
        return;
      }

      // حفظ المسار النصي داخل حقول الـ UseForm ليتم إرسالها مع باقي الحقول العادية
      setValue(type, uploadedImagePath);

      // تعيين رابط المعاينة المحلي لعرض الصورة فوراً
      if (type === "commercial_registration_image") {
        setCrPreview(URL.createObjectURL(file));
        toast.success("CR Image uploaded successfully!");
      } else if (type === "medical_license_image") {
        setMlPreview(URL.createObjectURL(file));
        toast.success("Medical License uploaded successfully!");
      }

    } catch (err) {
      console.error("Image Upload Error:", err);
      toast.error(err.response?.data?.message || "فشل رفع الصورة.");
    } finally {
      setUploadingCr(false);
      setUploadingMl(false);
    }
  };

   const onSubmit = async (data) => {
     if (!data.commercial_registration_image || !data.medical_license_image) {
      toast.error("Please upload both required images before saving.");
      return;
    }

    try {
       const response = await api.post('/company/auth/update-profile', data);

      if (response.status === 200 || response.status === 201) {
        toast.success("Business verification submitted successfully!");
        navigate("/accountsettings/Changepassword");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.response?.data?.message || "Something went wrong during saving.");
    }
  };

  if (loading) {
    return <div className="text-center p-10 font-semibold text-gray-500">Loading verification options...</div>;
  }

  return (
    <>
      <div className="bg-white rounded-[28px] p-8 border border-[#F1F1F1] shadow-sm w-full">
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
                    {countries.map((country) => (
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
                    {organizationSizes.map((size) => (
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
                  onChange={(e) => handleImageUpload(e, "commercial_registration_image")} 
                />
                {crPreview ? (
                  <img 
                    src={crPreview} 
                    alt="Commercial Registration" 
                    className="w-full h-full object-cover absolute inset-0" 
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 bg-white/50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MdOutlineBrokenImage className="text-[#8F8F8F] text-[32px]" />
                    </div>
                    <p className="text-[14px] text-[#8F8F8F] font-medium">
                      {uploadingCr ? "Uploading to server..." : "Drag & Drop your Image or Browse"}
                    </p>
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
                  {employerTypes.map((employerType) => (
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
                  {specialties.map((specialty) => (
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
                  onChange={(e) => handleImageUpload(e, "medical_license_image")} 
                />
                {mlPreview ? (
                  <img 
                    src={mlPreview} 
                    alt="Medical License" 
                    className="w-full h-full object-cover absolute inset-0" 
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 bg-white/50 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MdOutlineBrokenImage className="text-[#8F8F8F] text-[32px]" />
                    </div>
                    <p className="text-[14px] text-[#8F8F8F] font-medium">
                      {uploadingMl ? "Uploading to server..." : "Drag & Drop your Image or Browse"}
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="flex justify-center pt-3">
            <button
              type="submit"
              className="w-[170px] h-[50px] cursor-pointer rounded-full bg-[#162329] text-white font-semibold text-[15px] hover:bg-[#23363F] transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Businessverification;