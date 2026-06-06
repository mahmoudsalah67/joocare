import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiPlus, FiTrash2, FiChevronDown, FiChevronUp, FiDownload, FiEye } from 'react-icons/fi';import UserSidebar from '../layout/UserSidebar';
import axios from 'axios';
import contaneir from '../../../../public/imge/Containerقق.svg';
import sparkles from '../../../../public/imge/sparkles.svg';
import { useForm } from 'react-hook-form';

function Profile() {
  // =========================================================
  // 1. All States
  // =========================================================
  const [openExp, setOpenExp] = useState({});
  const [profileData, setProfileData] = useState(null);
  const [countries, setcountries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modals States
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [iseducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);
  const [isExpModalOpen, setIsExpModalOpen] = useState(false);
  const [isEditingExp, setIsEditingExp] = useState(false);
  const [currentExpId, setCurrentExpId] = useState(null);

  // Skills States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [suggestedSkills, setSuggestedSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedToAdd, setSelectedToAdd] = useState([]);
  const [selectedToKeep, setSelectedToKeep] = useState([]);

  // Experiences List State
  const [experiencesList, setExperiencesList] = useState([]);

  // Form State For Experience
  const [expFormData, setExpFormData] = useState({
    title: '',
    company: '',
    start_date: '',
    end_date: '',
    is_current: 0,
    responsibilities: [''] // مصفوفة افتراضية جاهزة
  });

  const { register, handleSubmit, reset } = useForm({ defaultValues: { bio: "" } });

  // Headers Setting
  const token = localStorage.getItem('token') || localStorage.getItem('user_token');
  const headers = {
    Authorization: `Bearer ${token}`,
    'Accept-Language': 'en',
    Accept: 'application/json',
  };

  // Helper Functions
  const toggleExperience = (id) => setOpenExp(prev => ({ ...prev, [id]: !prev[id] }));

  const closeEducationModal = () => {
    setIsEducationModalOpen(false);
    setEditingEducation(null);
    reset({ degree: "", university: "", gpa: "4.0", country_id: "", start_date: "", end_date: "" });
  };

  // =========================================================
  // 2. All useEffects
  // =========================================================

  // جلب الـ Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('https://joocare.nami-tec.com/api/user/auth/profile', { headers });
        setProfileData(res.data?.data);
        if (res.data?.data?.bio) reset({ bio: res.data.data.bio });
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // جلب الدول
  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch("https://joocare.nami-tec.com/api/countries", { headers: { "Accept-Language": "en" } });
        const data = await response.json();
        setcountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    }
    fetchCountries();
  }, []);

  // جلب الخبرات
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get("https://joocare.nami-tec.com/api/user/user-experiences", { headers });
        if (res.data?.data) {
          setExperiencesList(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching experiences:", err);
      }
    };
    fetchExperiences();
  }, []);

  // جلب الـ Suggested Skills
  useEffect(() => {
    const fetchSuggested = async () => {
      try {
        const res = await axios.get(
          `https://joocare.nami-tec.com/api/user/suggested/user-skills${searchTerm ? `?search=${searchTerm}` : ''}`,
          { headers }
        );
        const skillsArray = res.data?.data?.suggested || [];
        setSuggestedSkills(skillsArray);
      } catch (err) {
        console.error("Error fetching suggested skills:", err);
        setSuggestedSkills([]); 
      }
    };
    fetchSuggested();
  }, [searchTerm]);

  // =========================================================
  // 3. Experience Functions
  // =========================================================
  
  const addResponsibility = () => {
    setExpFormData({
      ...expFormData,
      responsibilities: [...(expFormData.responsibilities || []), '']
    });
  };

  const removeResponsibility = (index) => {
    if (expFormData.responsibilities.length > 1) {
      const updatedResps = expFormData.responsibilities.filter((_, idx) => idx !== index);
      setExpFormData({ ...expFormData, responsibilities: updatedResps });
    }
  };

  const handleRespChange = (index, value) => {
    const updatedResps = [...expFormData.responsibilities];
    if (typeof updatedResps[index] === 'object' && updatedResps[index] !== null) {
      updatedResps[index] = { ...updatedResps[index], description: value };
    } else {
      updatedResps[index] = value;
    }
    setExpFormData({ ...expFormData, responsibilities: updatedResps });
  };

  const handleSaveExperience = async () => {
    try {
      const url = isEditingExp 
        ? `https://joocare.nami-tec.com/api/user/user-experiences/${currentExpId}`
        : `https://joocare.nami-tec.com/api/user/user-experiences`;

      // تجهيز الداتا للإرسال بالشكل اللي بيفهمه الـ API (نصوص فقط وليس Objects)
      const formattedResponsibilities = expFormData.responsibilities.map(r => 
        typeof r === 'object' && r !== null ? (r.description || '') : r
      );

      const payload = { 
        ...expFormData,
        responsibilities: formattedResponsibilities
      };

      if (isEditingExp) {
        payload._method = 'PUT';
      }

      const res = await axios.post(url, payload, { headers });
      
      if (res.status === 200 || res.status === 201) {
        const updatedRes = await axios.get("https://joocare.nami-tec.com/api/user/user-experiences", { headers });
        setExperiencesList(updatedRes.data.data);
        setIsExpModalOpen(false);
        alert("Experience saved successfully!");
      }
    } catch (err) {
      console.error("Error saving experience:", err);
    }
  };

  const handleDeleteExperience = async (id) => {
    if (!window.confirm("Are you sure you want to delete this experience?")) return;
    try {
      await axios.delete(`https://joocare.nami-tec.com/api/user/user-experiences/${id}`, { headers });
      setExperiencesList(prev => prev.filter(exp => exp.id !== id));
      alert("Experience deleted successfully!");
    } catch (err) {
      console.error("Error deleting experience:", err);
    }
  };

  const handleEditExperienceClick = (exp) => {
    setIsEditingExp(true);
    setCurrentExpId(exp.id);
    
    let resps = [''];
    if (exp.responsibilities && Array.isArray(exp.responsibilities)) {
      resps = exp.responsibilities.length > 0 ? exp.responsibilities : [''];
    } else if (exp.responsibilities && typeof exp.responsibilities === 'string') {
      resps = [exp.responsibilities];
    }

    setExpFormData({
      title: exp.title || exp.job_title || '',
      company: exp.company_name || exp.company || '',
      start_date: exp.start_date || '',
      end_date: exp.end_date || '',
      is_current: exp.is_current ? 1 : 0,
      responsibilities: resps
    });
    
    setIsExpModalOpen(true);
  };

  // =========================================================
  // 4. Skills Handlers
  // =========================================================
  const openAddModal = () => {
    setSelectedToAdd([]);
    setSearchTerm("");
    setIsAddModalOpen(true);
  };

  const openEditModal = () => {
    if (profileData?.skills) {
      setSelectedToKeep(profileData.skills.map(s => s.id));
    }
    setIsEditModalOpen(true);
  };

  const toggleAddSkill = (skillId) => {
    setSelectedToAdd(prev => prev.includes(skillId) ? prev.filter(id => id !== skillId) : [...prev, skillId]);
  };

  const toggleKeepSkill = (skillId) => {
    setSelectedToKeep(prev => prev.includes(skillId) ? prev.filter(id => id !== skillId) : [...prev, skillId]);
  };

  const handleAddSkills = async () => {
    try {
      const currentSkillIds = profileData?.skills?.map(s => s.id) || [];
      const uniqueIds = [...new Set([...currentSkillIds, ...selectedToAdd])];
      const formData = new FormData();
      uniqueIds.forEach(id => formData.append('skills[]', id));

      await axios.post("https://joocare.nami-tec.com/api/user/user-skills", formData, {
        headers: { ...headers, 'Content-Type': 'multipart/form-data' }
      });

      const profileRes = await axios.get('https://joocare.nami-tec.com/api/user/auth/profile', { headers });
      setProfileData(profileRes.data?.data);
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("Error adding skills:", err);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const formData = new FormData();
      selectedToKeep.forEach(id => formData.append('skills[]', id));
      formData.append('_method', 'put');

      await axios.post("https://joocare.nami-tec.com/api/user/user-skills", formData, {
        headers: { ...headers, 'Content-Type': 'multipart/form-data' }
      });

      const profileRes = await axios.get('https://joocare.nami-tec.com/api/user/auth/profile', { headers });
      setProfileData(profileRes.data?.data);
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Error editing skills:", err);
    }
  };

  // =========================================================
  // 5. About & Education Handlers
  // =========================================================
  const handleUpdateAbout = async (data) => {
    try {
      const res = await axios.post("https://joocare.nami-tec.com/api/user/user-bio", { bio: data.bio }, { headers });
      if (res.data?.data) setProfileData(res.data.data);
      setIsAboutModalOpen(false);
      alert("About updated successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update About.");
    }
  };

  const handleEditClick = (edu) => {
    setEditingEducation(edu);
    setIsEducationModalOpen(true);
    reset({
      degree: edu.degree,
      university: edu.university || edu.institution || edu.school,
      gpa: edu.gpa || "4.0",
      country_id: edu.country_id || edu.country?.id || "",
      start_date: edu.start_date,
      end_date: edu.end_date
    });
  };

  const handleSaveEducation = async (data) => {
    try {
      const payload = { degree: data.degree, university: data.university, gpa: data.gpa, country_id: data.country_id, start_date: data.start_date, end_date: data.end_date };
      if (editingEducation) {
        payload._method = "PUT";
        const res = await axios.post(`https://joocare.nami-tec.com/api/user/user-educations/${editingEducation.id}`, payload, { headers });
        if (res.data?.data) {
          const updated = res.data.data.education || res.data.data;
          setProfileData(prev => ({ ...prev, educations: prev.educations.map(e => e.id === editingEducation.id ? updated : e) }));
          alert("Education updated successfully!");
        }
      } else {
        const res = await axios.post("https://joocare.nami-tec.com/api/user/user-educations", payload, { headers });
        if (res.data?.data) {
          setProfileData(prev => ({ ...prev, educations: [...(prev.educations || []), res.data.data] }));
          alert("Education added successfully!");
        }
      }
      closeEducationModal();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  const handleDeleteEducation = async (id) => {
    if (!window.confirm("Are you sure you want to delete this education?")) return;
    try {
      await axios.delete(`https://joocare.nami-tec.com/api/user/user-educations/${id}`, { headers });
      setProfileData(prev => ({ ...prev, educations: prev.educations.filter(e => e.id !== id) }));
      alert("Education deleted successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete education.");
    }
  };

  // Early Return Loading Guard
  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-[#00694B] font-bold animate-pulse">Loading...</p>
    </div>
  );

  const user = profileData;

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-28 pb-16 text-[#0D0D0D] font-sans antialiased selection:bg-[#00694B]/10">
      <div className="bg-[#0D0D0D0D] border-b border-gray-200/80 py-5 mt-[-50px] mb-8">
        <div className="max-w-[1320px] mx-auto px-6 flex justify-between items-center text-sm font-medium">
          <span className="text-[#0D0D0D] font-bold text-base">Overview</span>
          <div className="flex items-center gap-2">
            <Link to={'/'} className='text-[16px] font-[600]'>Home</Link>
            <span>&gt;</span>
            <span className="text-gray-900 font-semibold">Overview</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          <UserSidebar />

          <main className="lg:col-span-6 flex flex-col gap-6">

            {/* ===== About ===== */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6 relative shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[18px] font-bold text-[#0D0D0D]">About</h3>
                <button onClick={() => setIsAboutModalOpen(true)} className="p-2 hover:bg-gray-50 rounded-full text-gray-700 transition"><FiEdit2 size={16} /></button>
              </div>
              <p className="text-gray-500 text-[13.5px] leading-relaxed font-normal break-words whitespace-pre-wrap w-full">
                {user?.bio || 'No bio added yet.'}
              </p>
            </section>

            {isAboutModalOpen && (
              <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsAboutModalOpen(false)} />
                <form onSubmit={handleSubmit(handleUpdateAbout)} className="bg-white rounded-[32px] w-full max-w-[620px] p-8 relative z-10 shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-[24px] font-bold text-[#0D0D0D]">Edit About</h2>
                    <button type="button" onClick={() => setIsAboutModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <svg className="cursor-pointer" width="24" height="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>
                  <div className="bg-[#F9FAFB] border border-[#F3F4F6] rounded-2xl p-5 mb-8">
                    <textarea className="w-full h-[220px] bg-transparent border-none focus:ring-0 text-[#4B5563] text-[15px] leading-relaxed resize-none focus:outline-none" placeholder="Describe yourself..." {...register("bio")} />
                  </div>
                  <div className="flex justify-center">
                    <button type="submit" className="bg-[#00694B] cursor-pointer text-white px-20 py-3.5 rounded-full font-bold text-[18px] hover:bg-[#00523B] transition-all shadow-md">Save</button>
                  </div>
                </form>
              </div>
            )}

            {/* ===== Education ===== */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-bold text-[#0D0D0D]">Education</h3>
                <button onClick={() => { setEditingEducation(null); setIsEducationModalOpen(true); }} className="p-2 hover:bg-gray-50 rounded-full text-[#00694B] transition"><FiPlus size={18} /></button>
              </div>
              {user?.educations?.length > 0 ? (
                user.educations.map((edu) => (
                  <div key={edu.id} className="flex items-start justify-between border border-gray-100/70 rounded-xl p-4 bg-[#FAFAFA]/50 mb-3">
                    <div className="flex gap-4">
                      <div><img src={contaneir} alt="" /></div>
                      <div>
                        <h4 className="font-bold text-[#0D0D0D] text-[15px]">{edu.university || edu.institution || edu.school}</h4>
                        <p className="text-gray-500 text-xs mt-0.5 font-medium">{edu.degree} {edu.gpa && `• GPA: ${edu.gpa}`}</p>
                        <p className="text-gray-400 text-xs mt-1 font-normal">{edu.start_date} - {edu.end_date || 'Present'} {edu.country?.name && `• ${edu.country.name}`}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => handleEditClick(edu)} className="p-1.5 text-gray-500 hover:bg-white rounded-lg transition"><FiEdit2 size={15} /></button>
                      <button onClick={() => handleDeleteEducation(edu.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"><FiTrash2 size={15} /></button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No education added yet.</p>
              )}
            </section>

            {iseducationModalOpen && (
              <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeEducationModal} />
                <form onSubmit={handleSubmit(handleSaveEducation)} className="bg-white rounded-[32px] w-full max-w-[620px] p-8 relative z-10 shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-[24px] font-bold text-[#0D0D0D]">{(editingEducation ? "Edit Education" : "Add Education")}</h2>
                    <button type="button" onClick={closeEducationModal} className="text-gray-400 hover:text-red-500 transition-colors">
                      <svg className="cursor-pointer" width="24" height="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                  </div>
                  <div className="bg-[#F9FAFB] border border-[#F3F4F6] rounded-2xl p-5 mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Education Details</label>
                    <div className="flex my-2 items-center p-[16px] bg-[#0D0D0D0D] border-[1px] border-[#0D0D0D14] rounded-[999px] focus-within:border-[#00694B] transition duration-300">
                      <input type="text" className="w-full bg-transparent border-none focus:ring-0 text-[#4B5563] text-[15px] focus:outline-none" placeholder="Describe your education..." {...register("degree", { required: true })} />
                    </div>
                    <label className="block text-sm font-medium text-gray-700 my-2">University</label>
                    <div className="flex items-center my-2 p-[16px] bg-[#0D0D0D0D] border-[1px] border-[#0D0D0D14] rounded-[999px] focus-within:border-[#00694B] transition duration-300">
                      <input type="text" className="w-full bg-transparent border-none focus:ring-0 text-[#4B5563] text-[15px] focus:outline-none" placeholder="Enter your university..." {...register("university", { required: true })} />
                    </div>
                    <label className="block text-sm font-medium text-gray-700 my-2">GPA</label>
                    <div className="flex items-center my-2 p-[16px] bg-[#0D0D0D0D] border-[1px] border-[#0D0D0D14] rounded-[999px] focus-within:border-[#00694B] transition duration-300">
                      <select className="w-full bg-transparent outline-none cursor-pointer text-gray-500" {...register("gpa")}>
                        <option value="4.0">4.0</option>
                        <option value="3.5">3.5</option>
                        <option value="3.0">3.0</option>
                      </select>
                    </div>
                    <label className="block text-sm font-medium text-gray-700 my-2">Country</label>
                    <div className="flex w-full p-[16px] my-2 bg-[#0D0D0D0D] border-[1px] border-[#0D0D0D14] rounded-[999px] focus-within:border-[#00694B]">
                      <select className="w-full bg-transparent outline-none text-gray-500" {...register("country_id", { required: true })}>
                        <option value="">Select Country</option>
                        {countries?.data?.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex justify-between gap-4 w-full mt-4">
                      <div className="flex flex-col flex-1">
                        <label className="text-[#0D0D0D] font-bold text-[14px] mb-2">Start year</label>
                        <div className="flex items-center p-[16px] bg-[#0D0D0D0D] border-[1px] border-[#0D0D0D14] rounded-[999px] focus-within:border-[#00694B]">
                          <input type="date" className="w-full bg-transparent border-none focus:ring-0 text-[#4B5563]" {...register("start_date", { required: true })} />
                        </div>
                      </div>
                      <div className="flex flex-col flex-1">
                        <label className="text-[#0D0D0D] font-bold text-[14px] mb-2">End year</label>
                        <div className="flex items-center p-[16px] bg-[#0D0D0D0D] border-[1px] border-[#0D0D0D14] rounded-[999px] focus-within:border-[#00694B]">
                          <input type="date" className="w-full bg-transparent border-none focus:ring-0 text-[#4B5563]" {...register("end_date", { required: true })} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button type="submit" className="bg-[#00694B] cursor-pointer text-white px-20 py-3.5 rounded-full font-bold text-[18px] hover:bg-[#00523B] transition-all shadow-md">Save</button>
                  </div>
                </form>
              </div>
            )}

            {/* ===== Skills ===== */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-bold text-[#0D0D0D]">Skills</h3>
                <div className="flex items-center gap-1">
                  <button onClick={openAddModal} className="p-2 hover:bg-gray-50 rounded-full text-[#00694B] transition">
                    <FiPlus size={18} />
                  </button>
                  {user?.skills?.length > 0 && (
                    <button onClick={openEditModal} className="p-2 hover:bg-gray-50 rounded-full text-gray-500 transition">
                      <FiEdit2 size={16} />
                    </button>
                  )}
                </div>
              </div>
       
              {user?.skills?.length > 0 ? (
                <div className="flex flex-wrap gap-2.5">
                  {user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E6F0EC] text-[#00694B] text-xs font-bold rounded-full border border-[#D2E6DE]"
                    >
                      ★ {skill.title || skill.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No skills added yet.</p>
              )}
            </section>

            {/* ===== Experience Section ===== */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100/50 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[20px] font-bold text-[#0D0D0D]">Experience</h2>
                <button 
                  onClick={() => {
                    setIsEditingExp(false);
                    setExpFormData({ title: '', company: '', start_date: '', end_date: '', is_current: 0, responsibilities: [''] });
                    setIsExpModalOpen(true);
                  }} 
                  className="text-gray-700 hover:text-[#00694B] text-2xl transition-all p-1 font-semibold"
                >
                  ＋
                </button>
              </div>

              <div className="space-y-4">
                {experiencesList && experiencesList.length > 0 ? (
                  experiencesList.map((exp, index) => {
                    const isOpen = !!openExp[exp.id];

                    return (
                      <div key={exp.id || index} className="relative pb-4 last:pb-0 border-b border-gray-100 last:border-none">
                        <div className="flex items-start justify-between bg-white">
                          <div className="flex gap-4 w-full">
                            <div>
                              <h3 className="text-[18px] font-bold text-[#00694B] leading-snug">
                                {exp.title || exp.job_title || "No Title"}
                              </h3>
                              <div className="flex items-center gap-2 mt-1 flex-wrap">
                                <span className="text-[14px] font-bold text-[#0D0D0D]">
                                  {exp.company || exp.company_name || "Company Name"}
                                </span>
                                <span className="text-gray-500 text-[13px] font-medium ml-2">
                                  ({exp.start_date} - {exp.is_current ? 'Present' : exp.end_date})
                                </span>
                              </div>
                              
                              {/* عرض الـ Responsibilities جوه الـ Accordion */}
                              {isOpen && exp.responsibilities && (
                                <ul className="mt-3 list-disc list-inside space-y-1 text-gray-600 text-sm pl-2">
                                  {exp.responsibilities.map((r, i) => (
                                    <li key={i}>{typeof r === 'object' ? r.description : r}</li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => toggleExperience(exp.id)} 
                              className="p-1.5 text-gray-400 hover:bg-gray-50 rounded-lg transition"
                            >
                              {isOpen ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                            </button>
                            <button 
                              onClick={() => handleEditExperienceClick(exp)} 
                              className="p-1.5 text-gray-500 hover:bg-gray-50 rounded-lg transition"
                            >
                              <FiEdit2 size={15} />
                            </button>
                            <button 
                              onClick={() => handleDeleteExperience(exp.id)} 
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                            >
                              <FiTrash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-400 text-sm">No experiences added yet.</p>
                )}
              </div>
            </div>

          </main>

          {/* ===== Right Sidebar ===== */}
          <aside className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center sticky top-28">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-gray-100 shadow-inner bg-gray-50 flex items-center justify-center">
              {user?.image ? (
                <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
              ) : user?.licenses?.length > 0 && user.licenses[0].image ? (
                <img src={user.licenses[0].image} alt="License" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#00694B] flex items-center justify-center text-white text-3xl font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
              )}
            </div>

            <h2 className="text-lg font-extrabold text-[#0D0D0D] tracking-tight text-center">{user?.name}</h2>
            <p className="text-[#00694B] font-bold text-xs bg-[#E6F0EC] px-3 py-1.5 rounded-full mt-1.5 border border-[#D2E6DE] text-center">
              {user?.job_title?.title || 'Healthcare Professional'}
            </p>

            <div className="w-full mt-6 border-t border-gray-100 pt-4">
              <div className="flex justify-between text-[11px] font-bold mb-1.5">
                <span className="text-gray-700 flex items-center gap-2"><img src={sparkles} alt="Sparkles" /> Hiring Readiness</span>
                <span className="text-[#00694B]">{user?.hiring_readiness_score || 0}%</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#00694B] h-full rounded-full transition-all duration-500" style={{ width: `${user?.hiring_readiness_score || 0}%` }} />
              </div>
            </div>

            <div className="w-full mt-5 space-y-3.5 text-xs border-t pt-4 border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-medium">Email</span>
                <span className="font-bold text-gray-800 truncate max-w-[140px]">{user?.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-medium">Location</span>
                <span className="font-bold text-gray-800">{user?.city?.name}, {user?.country?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-medium">Phone</span>
                <span className="font-bold text-gray-800">{user?.phone_code}{user?.phone}</span>
              </div>
            </div>

            {user?.cv && (
              <div className="w-full mt-6 bg-white p-2.5 rounded-xl border border-gray-200/70 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="text-red-500 font-black text-[10px] bg-red-50 px-1.5 py-1 rounded">PDF</span>
                  <span className="text-xs font-bold text-gray-700 truncate max-w-[80px]">CV.pdf</span>
                </div>
                <div className="flex gap-1">
                  <a href={user.cv} download className="p-2 bg-[#0d0d0d] text-white rounded-lg hover:bg-black transition"><FiDownload size={13} /></a>
                  <a href={user.cv} target="_blank" rel="noreferrer" className="p-2 bg-white text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-50 transition"><FiEye size={13} /></a>
                </div>
              </div>
            )}

            {user?.missing_score_items?.length > 0 && (
              <div className="w-full mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3">
                <p className="text-amber-700 text-[11px] font-bold mb-1">Complete your profile:</p>
                <div className="flex flex-wrap gap-1">
                  {user.missing_score_items.map((item) => (
                    <span key={item} className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full capitalize">{item}</span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* ==================== Experience Modal (Add / Edit) ==================== */}
      {isExpModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsExpModalOpen(false)} />
          <div className="bg-white rounded-[32px] w-full max-w-[620px] p-8 relative z-10 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[24px] font-bold text-[#0D0D0D]">{isEditingExp ? "Edit Experience" : "Add Experience"}</h2>
              <button type="button" onClick={() => setIsExpModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#0D0D0D] mb-1">Job Title</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none focus:border-[#00694B]" 
                  value={expFormData.title} 
                  onChange={(e) => setExpFormData({...expFormData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#0D0D0D] mb-1">Company</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none focus:border-[#00694B]" 
                  value={expFormData.company} 
                  onChange={(e) => setExpFormData({...expFormData, company: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#0D0D0D] mb-1">Start Date</label>
                  <input 
                    type="date" 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none" 
                    value={expFormData.start_date} 
                    onChange={(e) => setExpFormData({...expFormData, start_date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#0D0D0D] mb-1">End Date</label>
                  <input 
                    type="date" 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-full text-sm outline-none" 
                     
                    value={expFormData.is_current === 1 ? '' : expFormData.end_date} 
                    onChange={(e) => setExpFormData({...expFormData, end_date: e.target.value})}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 py-2">
                <input 
                  type="checkbox" 
                  id="is_current"
                  checked={expFormData.is_current === 1} 
                  onChange={(e) => setExpFormData({...expFormData, is_current: e.target.checked ? 1 : 0})}
                />
                <label htmlFor="is_current" className="text-sm font-medium text-gray-700 cursor-pointer">I am currently working here</label>
              </div>

              {/* Responsibilities Dynamic Fields */}
              <div>
                <label className="block text-sm font-bold text-[#0D0D0D] mb-2">Responsibilities</label>
                {expFormData?.responsibilities?.map((resp, idx) => {
                  const inputValue = typeof resp === 'object' && resp !== null ? (resp.description || '') : (resp || '');
                  return (
                    <div key={idx} className="flex items-center gap-2 mb-2">
                      <input 
                        type="text" 
                        className="flex-1 bg-[#F5F5F5] border border-gray-200 rounded-[15px] p-3 text-sm outline-none"
                        placeholder="Describe your responsibility"
                        value={inputValue}
                        onChange={(e) => handleRespChange(idx, e.target.value)}
                      />
                      <button 
                        type="button" 
                        onClick={() => idx === 0 && expFormData.responsibilities.length === 1 ? null : removeResponsibility(idx)}
                        className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:bg-red-50 hover:text-red-500 transition"
                      >
                        －
                      </button>
                    </div>
                  );
                })}
                <button 
                  type="button" 
                  onClick={addResponsibility}
                  className="mt-2 w-10 h-10 flex items-center justify-center bg-[#1A1A1A] text-white rounded-full hover:bg-black transition"
                >
                  ＋
                </button>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button 
                type="button" 
                onClick={handleSaveExperience} 
                className="bg-[#00694B] text-white px-20 py-3.5 rounded-full font-bold text-[18px] hover:bg-[#00523B] transition-all shadow-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

       

    </div>
  );
}

export default Profile;