import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import background from "../../../../public/imge/a6680f4f77b6b9212dae35d94f66c6ab33d89f64 (1).png";
import cam from "../../../../public/imge/cam.svg";
import smallimg from "../../../../public/imge/smallimg.png";
import linkedin from "../../../../public/imge/linkedin.svg";
import facebook from "../../../../public/imge/facebook.svg";
import insta from "../../../../public/imge/insta-2.svg";
import twitter from "../../../../public/imge/twitter.svg";
import snap from "../../../../public/imge/snap.svg";
import Icon from "../../../../public/imge/Icon.svg";
import Icon2 from "../../../../public/imge/Icon (1).svg";
import {
  MdPersonOutline,
  MdSettings,
} from "react-icons/md";

function Companyprofile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const token = localStorage.getItem("company_token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Accept-Language": "en",
    Accept: "application/json",
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://joocare.nami-tec.com/api/company/auth/profile", { headers });      
        const company = res.data.data.company;
        setProfileData(company);
        setError(null);
      } catch (err) {
        console.error("Profile Fetch Error:", err);
        setError("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // 2. تحديث الـ Bio / About
  const handleUpdateAbout = async (e) => {
    e.preventDefault();
    const bioText = e.target.bio.value;
    try {
      const res = await axios.post(
        "https://joocare.nami-tec.com/api/company/auth/update-bio",
        { bio: bioText },
        { headers }
      );
      setProfileData(res.data.data.company);
      setIsAboutModalOpen(false);
    } catch (err) {
      console.error("About Update Error:", err);
      alert("Failed to update About details.");
    }
  };

  // 3. تحديث روابط السوشيال ميديا
  const onSocialSubmit = async (formData) => {
    try {
      const res = await axios.post(
        "https://joocare.nami-tec.com/api/company/auth/update-social",
        formData,
        { headers }
      );
      setProfileData(res.data.data.company);
      setIsSocialModalOpen(false);
    } catch (err) {
      console.error("Social Updates Error:", err);
      alert("Failed to update social profiles.");
    }
  };

 







  // 4. رفع وتحديث الصور (Cover & Logo)
  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const mediaData = new FormData();
    mediaData.append("image", file);

    try {
      const uploadRes = await axios.post(
        "https://joocare.nami-tec.com/api/images", 
        mediaData,
        {
          headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const uploadedImagePath = uploadRes.data?.data?.image;

      if (!uploadedImagePath) {
        alert("تم الرفع ولكن فشل قراءة مسار الصورة من الـ Response.");
        return;
      }

      const payload = {};
      payload[type] = uploadedImagePath;

      const res = await axios.post(
        "https://joocare.nami-tec.com/api/company/auth/update-images",
        payload,
        {
          headers: {
            ...headers,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data?.data?.company) {
        setProfileData(res.data.data.company);
        alert("تم تحديث الصورة بنجاح!");
      }
    } catch (err) {
      console.error("Image Upload Error:", err);
      alert(err.response?.data?.message || "فشل رفع الصورة.");
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen text-[#00694B] font-bold">Loading Profile...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500 font-bold">{error}</div>;

  return (
    <>
      <div className="comapny-profile">
        <div className="min-h-screen">
          <div className="flex grid grid-cols-12 px-20 w-[1100px]">
             <aside className="w-[300px] h-fit flex flex-col gap-4 col-span-4 bg-white pt-[120px] mt-[-80px] pb-8 px-[12px] rounded-b-[32px] shadow-sm">
                     <div className="bg-[#F7FAF7] rounded-[24px] p-5 border border-[#F1F1F1] shadow-sm">
                       <div className="flex items-center gap-3 mb-3">
                         <div className="w-12 h-12 bg-[#2D3134] rounded-full flex items-center justify-center text-white font-bold text-xl overflow-hidden">
                           {profileData?.image ? (
                             <img src={profileData.image} alt="Logo" className="w-full h-full object-cover" />
                           ) : (
                             profileData?.name?.charAt(0).toUpperCase() || "C"
                           )}
                         </div>
                         <div>
                           <h3 className="font-bold text-[16px] text-[#0D0D0D]">
                             {profileData?.name || "Loading..."}
                           </h3>
                           <p className="text-[14px] text-[#4D4D4D]">{profileData?.city?.title || "Egypt"}</p>
                         </div>
                       </div>
                       <p className="text-[12px] text-[#8F8F8F] leading-relaxed mb-4 line-clamp-3">
                         {profileData?.bio || "No description provided yet."}
                       </p>
                       <div className={`text-center py-2 rounded-full text-[13px] font-semibold border ${
                         profileData?.status === "Approved" 
                           ? "bg-[#E6F3EF] text-[#00694B] border-[#00694B]/10" 
                           : "bg-[#FFF9E6] text-[#FFB800] border-[#FFB800]/10"
                       }`}>
                         Account status: {profileData?.status || "Under review"}
                       </div>
                     </div>
                     
                     <div className="bg-[#FFF5F5] rounded-[24px] p-6 border border-[#FFDADA]">
                       <h4 className="text-[#FF4D4D] font-bold text-[18px] mb-2 leading-tight">Please complete your details.</h4>
                       <p className="text-[13px] text-[#4D4D4D] mb-5">
                         Please complete your account details so you can use the platform normally and benefit from all its features.
                       </p>
                       <Link to={'/Details2'}>
                         <button className="w-full cursor-pointer bg-[#E32B2B] text-white font-bold py-3 rounded-full hover:bg-[#C22424] transition-all">
                           Complete Now
                         </button>
                       </Link>
                     </div>
           
                     <div className="flex flex-col gap-1 px-2 mt-2">
                       {[
                         { to: "/companyprofile", icon: <MdPersonOutline className="text-xl" />, label: "Company Profile" },
                         { to: "/Dashboard", icon: <img src={Icon} className="text-xl" alt="" />, label: "Dashboard" },
                         { to: "/JobManagement", icon: <img src={Icon2} className="text-xl" alt="" />, label: "Job Management" },
                         { to: "/Accountsettings", icon: <MdSettings className="text-xl" />, label: "Account settings" },
                       ].map(({ to, icon, label }) => (
                         <NavLink
                           key={to}
                           to={to}
                           className={({ isActive }) =>
                             `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${
                               isActive
                                 ? "bg-[#E6F3EF] text-[#00694B] font-bold border border-[#00694B]/10"
                                 : "text-[#8F8F8F]"
                             }`
                           }
                         >
                           {icon} {label}
                         </NavLink>
                       ))}
                     </div>
           
                     <Link to={"/postjob"}>
                       <button className="mt-10 w-full cursor-pointer bg-[#00694B] text-white font-bold py-4 rounded-full flex items-center justify-center gap-2">
                         Post a Job
                       </button>
                     </Link>
                   </aside>

            <main className="flex-1 col-span-8 w-[1020px] py-[70px]">
              <div className="profile-details px-[40px] py-[32px]">
                {/* قسم الغلاف واللوجو */}
                <div className="imgs relative group max-w-[1020px]">
                  <div className="background relative overflow-hidden rounded-[50px] h-[300px] bg-gray-100">
                    <label htmlFor="img_cover">
                      <img
                        src={profileData?.cover || background}
                        alt="cover"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute cursor-pointer top-9 right-8 bg-black/30 p-2 rounded-full hover:bg-black/50 transition">
                        <img src={cam} alt="change cover" className="w-6 h-6" />
                      </div>
                    </label>
                    <input
                      type="file"
                      id="img_cover"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "cover")}
                    />
                  </div>
                  
                  <div className="absolute -bottom-16 left-12">
                    <div className="relative group">
                      <label htmlFor="img_logo">
                        <div className="rounded-full border-4 border-white overflow-hidden bg-white shadow-lg w-[140px] h-[140px]">
                          <img
                            src={profileData?.image || smallimg}
                            alt="logo"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="absolute bottom-2 right-2 bg-[#1F2937] p-2 cursor-pointer rounded-full border-2 border-white shadow-md">
                          <img src={cam} alt="change logo" className="w-4 h-4 invert" />
                        </div>
                      </label>
                      <input
                        type="file"
                        id="img_logo"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "image")}
                      />
                    </div>
                  </div>
                </div>

                {/* قسم About الديناميكي */}
                <div className="bg-white mt-[100px] border border-[#E5E7EB] rounded-2xl p-6 relative shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-[20px] font-bold text-[#0D0D0D]">About</h2>
                    <button
                      onClick={() => setIsAboutModalOpen(true)}
                      className="text-gray-400 hover:text-[#00694B] transition-colors"
                    >
                      <svg className="cursor-pointer" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" /></svg>
                    </button>
                  </div>
                  <p className="text-[#666666] text-[15px] whitespace-pre-line break-words">
                    {profileData?.bio || "No description set yet."}
                  </p>
                </div>

                {/* مودال تعديل الـ About عبر الـ API */}
                {isAboutModalOpen && (
                  <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsAboutModalOpen(false)}></div>
                    <form onSubmit={handleUpdateAbout} className="bg-white rounded-[32px] w-full max-w-[620px] p-8 relative z-10 shadow-2xl">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-[24px] font-bold text-[#0D0D0D]">Edit About</h2>
                        <button type="button" onClick={() => setIsAboutModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                          <svg className="cursor-pointer" width="24" height="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                      </div>
                      <div className="bg-[#F9FAFB] border border-[#F3F4F6] rounded-2xl p-5 mb-8">
                        <textarea
                          name="bio"
                          className="w-full h-[220px] bg-transparent border-none focus:ring-0 text-[#4B5563] text-[15px] leading-relaxed resize-none focus:outline-none"
                          placeholder="Describe your company..."
                          defaultValue={profileData?.bio || ""}
                        ></textarea>
                      </div>
                      <div className="flex justify-center">
                        <button type="submit" className="bg-[#00694B] cursor-pointer text-white px-20 py-3.5 rounded-full font-bold text-[18px] hover:bg-[#00523B] transition-all shadow-md">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* قسم السوشيال والمعلومات الأساسية */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  {/* كارد السوشيال ميديا الديناميكي */}
                  <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-[#0D0D0D]">Social Media</h2>
                      <button onClick={() => setIsSocialModalOpen(true)} className="text-gray-400 hover:text-black">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {[
                        { name: 'LinkedIn', iconImg: linkedin, value: profileData?.linkedin }, 
                        { name: 'Facebook', iconImg: facebook, value: profileData?.facebook },
                        { name: 'X/Twitter', iconImg: twitter, value: profileData?.twitter },
                        { name: 'Instagram', iconImg: insta, value: profileData?.instagram },
                        { name: 'Snapchat', iconImg: snap, value: profileData?.snapchat },
                      ].map((social, index) => (
                        <div key={index} className="flex items-center justify-between group">
                          <div className="flex items-center gap-3 w-full">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm border border-gray-50 overflow-hidden shrink-0">
                              <img src={social.iconImg} alt={social.name} className="w-full h-full object-contain" />
                            </div>
                            <div className="overflow-hidden w-full">
                              <p className="text-sm font-semibold text-gray-700">{social.name}</p>
                              <p className="text-[11px] text-[#00694B] truncate max-w-[220px]">
                                {social.value || "Not linked"}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* كارد معلومات الشركة الأساسية الديناميكي */}
                  <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                    <h2 className="text-xl font-bold text-[#0D0D0D] mb-8">Base Info</h2>
                    <div className="space-y-6">
                      {[
                        { label: 'Official Email', value: profileData?.email },
                        { label: 'Location', value: profileData?.city?.title || profileData?.country || "Not specified" },
                        { label: 'Official phone number', value: profileData?.phone ? `${profileData.phone_code || ""} ${profileData.phone}` : "Not provided" },
                        { label: 'Founded', value: profileData?.established_date || "Not provided" },
                        { label: 'Contact Person', value: profileData?.person_name || "Not provided" },
                      ].map((info, idx) => (
                        <div key={idx} className="flex justify-between items-center border-b border-gray-50 pb-4 last:border-0">
                          <span className="text-gray-500 text-sm">{info.label}</span>
                          <span className="font-bold text-sm text-[#0D0D0D]">{info.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* مودال تعديل روابط السوشيال ميديا وربطها بالـ react-hook-form والـ API */}
                {isSocialModalOpen && (
                  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsSocialModalOpen(false)}></div>
                    
                    <form onSubmit={handleSubmit(onSocialSubmit)} className="bg-white rounded-[40px] w-full max-w-[550px] p-10 relative z-10 shadow-2xl">
                      <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-[#0D0D0D]">Edit Online profile</h2>
                        <button type="button" onClick={() => setIsSocialModalOpen(false)} className="text-gray-400 hover:text-black">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                        </button>
                      </div>

                      <div className="space-y-5">
                        {[
                          { name: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/company/username', iconImg: linkedin }, 
                          { name: 'facebook', label: 'Facebook', placeholder: 'facebook.com/username', iconImg: facebook },
                          { name: 'twitter', label: 'X/Twitter', placeholder: 'x.com/username', iconImg: twitter },
                          { name: 'instagram', label: 'Instagram', placeholder: 'instagram.com/username', iconImg: insta },
                          { name: 'snapchat', label: 'Snapchat', placeholder: 'snapchat.com/add/username', iconImg: snap },
                        ].map((field, i) => (
                          <div key={i}>
                            <label className="block text-[15px] font-bold mb-2 text-[#0D0D0D] ml-1">
                              {field.label}
                            </label>
                            <div className="relative group">
                              <input 
                                type="text" 
                                placeholder={field.placeholder}
                                {...register(field.name)}
                                className="w-full bg-[#F3F4F6] border border-transparent rounded-full py-3.5 px-6 text-[14px] transition-all placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#00694B]"
                              />
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-gray-100 overflow-hidden">
                                <img src={field.iconImg} alt={`${field.label} icon`} className="w-5 h-5 object-contain" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-10 flex justify-center">
                        <button type="submit" className="bg-[#00694B] text-white px-20 py-3 rounded-full font-bold text-lg hover:bg-[#00523B] transition-all">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                )}

              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Companyprofile;