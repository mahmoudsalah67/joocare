import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-hot-toast';
import { MdKeyboardArrowDown, MdClose } from "react-icons/md";
import { FiPlus } from 'react-icons/fi';
import { HiOutlineUpload } from "react-icons/hi";
import PhoneInput, { parsePhoneNumber } from "react-phone-number-input";
import 'react-phone-number-input/style.css';

const BASE_URL = "https://joocare.nami-tec.com";
const IMAGE_BASE_URL = "https://joocare.nami-tec.com/storage/";
 
const getRelativePath = (url) => {
    if (!url || typeof url !== 'string') return "";
    if (url.includes('/storage/')) {
        return url.split('/storage/')[1];
    }
    return url;
};

 
const getFullImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith('http')) return path;
    return `${IMAGE_BASE_URL}${path}`;
};

function BasicInfoForm({ cvFile: initialCvFile, handleRemoveFile, fileInputRef, handleFileChange }) {
    const { handleSubmit, register, formState: { errors }, control, reset, watch } = useForm();

    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);

    const [jobTitles, setJobTitles] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [experiences, setExperiences] = useState([]);

    // Image states
    const [newProfileImageFile, setNewProfileImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [phoneCountry, setPhoneCountry] = useState("EG");

    const token = localStorage.getItem('user_token');
    const headers = {
        Authorization: `Bearer ${token}`,
        'Accept': 'application/json'
    };

    const selectedCountryId = watch("country_id");

    // 1. Load Initial Profile Data and Lookup Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileRes, countriesRes, jobsRes, specsRes, expRes] = await Promise.all([
                    axios.get(`${BASE_URL}/api/user/auth/profile`, { headers }),
                    axios.get(`${BASE_URL}/api/countries`),
                    axios.get(`${BASE_URL}/api/job-titles`),
                    axios.get(`${BASE_URL}/api/specialties`),
                    axios.get(`${BASE_URL}/api/experiences`)
                ]);

                const user = profileRes.data.data;
                setProfileData(user);
                
                // Set initial preview from existing image
                if (user.image) {
                    setPreviewImage(getFullImageUrl(user.image));
                }

                // Populate form
                reset({
                    name: user.name || "",
                    email: user.email || "",
                    phone: user.phone_code ? (user.phone_code + user.phone) : user.phone,
                    job_title_id: user.job_title_id || "",
                    specialty_id: user.specialty_id || "",
                    experience_id: user.experience_id || "",
                    country_id: user.country_id || "",
                    city_id: user.city_id || "",
                    birth_date: user.birth_date || "",
                    title: user.title || "",
                    specialty_title: user.specialty_title || "",
                    experience_title: user.experience_title || ""
                });

                setCountries(countriesRes.data.data);
                setJobTitles(jobsRes.data.data);
                setSpecialties(specsRes.data.data);
                setExperiences(expRes.data.data);

            } catch (err) {
                console.error("Initialization error:", err);
                toast.error("Failed to load profile data");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [reset]);

    // 2. Fetch Cities when Country changes
    useEffect(() => {
        if (selectedCountryId) {
            axios.get(`${BASE_URL}/api/cities?country_id=${selectedCountryId}`)
                .then(res => setCities(res.data.data))
                .catch(err => console.error(err));
            
            // Sync PhoneInput country
            const country = countries.find(c => String(c.id) === String(selectedCountryId));
            if (country && country.code) {
                setPhoneCountry(country.code.toUpperCase());
            }
        }
    }, [selectedCountryId, countries]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewProfileImageFile(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    // 3. Submit Function
    const onSubmit = async (data) => {
        const loadingToast = toast.loading("Updating profile...");
        try {
            let finalImagePath = getRelativePath(profileData?.image);
            let finalCvPath = getRelativePath(profileData?.cv);

            // A. Upload New Profile Image if selected
            if (newProfileImageFile) {
                const imgFormData = new FormData();
                imgFormData.append("image", newProfileImageFile);
                const imgRes = await axios.post(`${BASE_URL}/api/images`, imgFormData, { headers });
                finalImagePath = imgRes.data?.data?.image || ""; 
            }

            // B. Upload New CV if selected (checking if it's a File object)
            if (initialCvFile && typeof initialCvFile !== 'string') {
                const cvFormData = new FormData();
                cvFormData.append("image", initialCvFile); // API uses 'image' key for all uploads
                const cvRes = await axios.post(`${BASE_URL}/api/images`, cvFormData, { headers });
                finalCvPath = cvRes.data?.data?.image || "";
            }

             const payload = new FormData();
            payload.append("name", data.name);
            payload.append("job_title_id", data.job_title_id || "");
            payload.append("specialty_id", data.specialty_id || "");
            payload.append("experience_id", data.experience_id || "");
            payload.append("country_id", data.country_id || "");
            payload.append("city_id", data.city_id || "");
            payload.append("birth_date", data.birth_date || "");
            payload.append("title", data.title || "");
            payload.append("specialty_title", data.specialty_title || "");
            payload.append("experience_title", data.experience_title || "");
            
            // String paths from upload or existing data
            payload.append("image", finalImagePath || "");
            payload.append("cv", finalCvPath || "");

            // Handle Phone split
            if (data.phone) {
                try {
                    const parsed = parsePhoneNumber(data.phone);
                    if (parsed) {
                        payload.append("phone_code", `+${parsed.countryCallingCode}`);
                        payload.append("phone", parsed.nationalNumber);
                    } else {
                        payload.append("phone", data.phone);
                    }
                } catch (e) {
                    payload.append("phone", data.phone);
                }
            }

            // D. Send Update Request
            const response = await axios.post(`${BASE_URL}/api/user/auth/update-profile`, payload, {
                headers: { ...headers, 'Content-Type': 'multipart/form-data' }
            });

            // Update local state with new data
            setProfileData(response.data.data);
            toast.success("Profile updated successfully!");
        } catch (err) {
            console.error("Update error:", err);
            toast.error(err.response?.data?.message || "Update failed");
        } finally {
            toast.dismiss(loadingToast);
        }
    };

    if (isLoading) return <div className="text-center py-10 font-semibold">Loading Profile...</div>;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 bg-white p-4 rounded-xl shadow-sm">
            {/* Profile Picture */}
            <div className="flex flex-col items-center md:items-start">
                <label className="block text-[14px] font-bold text-gray-900 mb-3">Profile Picture</label>
                <div className="relative w-28 h-28 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shadow-inner">
                    {previewImage ? (
                        <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-[#00694B] flex items-center justify-center text-white text-3xl font-bold">
                            {profileData?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                    )}
                    <input type="file" id="profile-img-input" className="hidden" onChange={handleImageChange} accept="image/*" />
                    <label htmlFor="profile-img-input" className="absolute bottom-1 right-1 bg-[#00694B] text-white p-1.5 rounded-full cursor-pointer border-2 border-white hover:scale-110 transition-transform">
                        <FiPlus size={16} />
                    </label>
                </div>
            </div>

            {/* Full Name */}
            <div>
                <label className="text-[14px] font-semibold block mb-1">Full Name</label>
                <input 
                    {...register("name", { required: "Name is required" })} 
                    placeholder="Enter your name"
                    className="w-full h-[52px] bg-[#F3F4F6] rounded-full px-6 border-none outline-none focus:ring-2 focus:ring-[#00694B]/20 transition-all" 
                />
                {errors.name && <p className="text-red-500 text-xs mt-1 px-4">{errors.name.message}</p>}
            </div>

            {/* Email (Read Only) */}
            <div>
                <label className="text-[14px] font-semibold block mb-1">Email</label>
                <input 
                    {...register("email")} 
                    disabled
                    className="w-full h-[52px] bg-[#E5E7EB] text-gray-500 rounded-full px-6 border-none outline-none cursor-not-allowed" 
                />
            </div>

            {/* Phone Number */}
            <div>
                <label className="text-[14px] font-semibold block mb-1">Phone Number</label>
                <Controller
                    name="phone"
                    control={control}
                    rules={{ required: "Phone number is required" }}
                    render={({ field }) => (
                        <PhoneInput
                            {...field}
                            international
                            country={phoneCountry}
                            onCountryChange={setPhoneCountry}
                            className="w-full h-[52px] bg-[#F3F4F6] rounded-full px-6 border-none outline-none phone-input-custom"
                        />
                    )}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1 px-4">{errors.phone.message}</p>}
            </div>

            {/* Job Title */}
            <div className="relative">
                <label className="text-[14px] font-semibold block mb-1">Job Title</label>
                <select {...register('job_title_id')} className="w-full h-[52px] bg-[#F3F4F6] rounded-full px-6 appearance-none border-none outline-none">
                    <option value="">Select Job Title</option>
                    {jobTitles.map((j) => <option key={j.id} value={j.id}>{j.title || j.name}</option>)}
                </select>
                <MdKeyboardArrowDown className="absolute right-5 top-[42px] text-xl text-gray-500 pointer-events-none" />
            </div>

            {/* Specialty & Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                    <label className="text-[14px] font-semibold block mb-1">Specialty</label>
                    <select {...register('specialty_id')} className="w-full h-[52px] bg-[#F3F4F6] rounded-full px-6 appearance-none border-none outline-none">
                        <option value="">ex: Cardiology</option>
                        {specialties.map((s) => <option key={s.id} value={s.id}>{s.title || s.name}</option>)}
                    </select>
                    <MdKeyboardArrowDown className="absolute right-5 top-[42px] text-xl text-gray-500 pointer-events-none" />
                </div>
                <div className="relative">
                    <label className="text-[14px] font-semibold block mb-1">Years of Experience</label>
                    <select {...register('experience_id')} className="w-full h-[52px] bg-[#F3F4F6] rounded-full px-6 appearance-none border-none outline-none">
                        <option value="">ex: 3-5 years</option>
                        {experiences.map((e) => <option key={e.id} value={e.id}>{e.title || e.name}</option>)}
                    </select>
                    <MdKeyboardArrowDown className="absolute right-5 top-[42px] text-xl text-gray-500 pointer-events-none" />
                </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                    <label className="text-[14px] font-semibold block mb-1">Current Location</label>
                    <select {...register("country_id")} className="w-full h-[52px] bg-[#F3F4F6] rounded-full px-6 appearance-none border-none outline-none">
                        <option value="">Country</option>
                        {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <MdKeyboardArrowDown className="absolute right-5 top-[42px] text-xl text-gray-500 pointer-events-none" />
                </div>
                <div className="relative">
                    <label className="text-transparent hidden md:block mb-1">City</label>
                    <select {...register("city_id")} className="w-full h-[52px] bg-[#F3F4F6] rounded-full px-6 appearance-none border-none outline-none">
                        <option value="">City</option>
                        {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    <MdKeyboardArrowDown className="absolute right-5 top-[42px] text-xl text-gray-500 pointer-events-none" />
                </div>
            </div>

            {/* Birth Date */}
            <div>
                <label className="text-[14px] font-semibold block mb-1">Date of birth</label>
                <input 
                    type="date" 
                    {...register("birth_date")} 
                    className="w-full h-[52px] bg-[#F3F4F6] rounded-full px-6 border-none outline-none" 
                />
            </div>

            {/* CV Upload */}
            <div>
                <label className="text-[14px] font-semibold block mb-1">Upload CV</label>
                <div 
                    className="border-2 border-dashed border-gray-200 rounded-xl p-8 bg-[#F9FAFB] cursor-pointer text-center hover:bg-gray-50 transition-all" 
                    onClick={() => fileInputRef.current.click()}
                >
                    <div className="flex flex-col items-center gap-2">
                        <HiOutlineUpload className="text-[#00694B] text-2xl" />
                        <p className="text-[13px] text-gray-500">Drag & Drop your files or <span className="text-[#00694B] font-medium underline">Browse</span></p>
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.doc,.docx" />
                </div>
                
                {initialCvFile && (
                    <div className="mt-3 bg-[#4B5563] text-white p-4 rounded-lg flex justify-between items-center shadow-md">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium truncate max-w-[200px]">
                                {typeof initialCvFile === 'string' ? getRelativePath(initialCvFile) : initialCvFile.name}
                            </span>
                        </div>
                        <button 
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleRemoveFile(); }}
                            className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center hover:bg-red-500 transition-colors"
                        >
                            <MdClose size={14} />
                        </button>
                    </div>
                )}
            </div>

            {/* Hidden Fields */}
            <input type="hidden" {...register("title")} />
            <input type="hidden" {...register("specialty_title")} />
            <input type="hidden" {...register("experience_title")} />

            {/* Save Button */}
            <div className="pt-4">
                <button 
                    type="submit" 
                    className="w-full h-[52px] bg-[#1F2937] text-white font-bold rounded-full hover:bg-black transition-all shadow-lg active:scale-[0.98]"
                >
                    Save Changes
                </button>
            </div>
        </form>
    );
}

export default BasicInfoForm;
