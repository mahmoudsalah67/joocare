import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, NavLink, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  MdDashboard,
  MdSettings,
  MdPersonOutline,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { FiEye, FiSearch } from "react-icons/fi";
import { AiOutlineDownload } from "react-icons/ai";
import Icon from "../../../../../public/imge/Icon.svg";
import Icon2 from "../../../../../public/imge/Icon (1).svg";
import logo from "../../../../../public/imge/16 [Converted].svg";

const BASE_URL = "https://joocare.nami-tec.com";

function ViewCandidates() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [countries, setCountries] = useState([]);
  const [jobData, setJobData] = useState(null);
  const { id: jobId } = useParams();

  // Filters State
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [medicalLicense, setMedicalLicense] = useState("");
  const [recent, setRecent] = useState("");

  const token = localStorage.getItem("company_token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Accept-Language": "en",
    Accept: "application/json",
  };

  // 1. Fetch Job Details
  useEffect(() => {
    const getDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/api/company/jobs/${jobId}`, { headers });
        setJobData(res.data.data.job);
        window.scrollTo(0, 0);
      } catch (err) {
        console.error("error:", err);
        setError("Error loading job details");
      } finally {
        setLoading(false);
      }
    };
    if (jobId) getDetails();
  }, [jobId]);

  // 2. Fetch Company Profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/company/auth/profile`, { headers });
        setProfileData(res.data.data.company);
      } catch (err) {
        console.error("Profile Fetch Error:", err);
      }
    };
    fetchProfile();
  }, []);

  // 3. Fetch Countries for Filter
  useEffect(() => {
    axios.get(`${BASE_URL}/api/countries`)
      .then(res => setCountries(res.data.data))
      .catch(err => console.error(err));
  }, []);

  // 4. Fetch Candidates
  const fetchCandidates = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        pagination: "on",
        limit_per_page: "10",
        page: "1",
        country: selectedCountry,
        medical_license: medicalLicense,
        recent: recent,
        search: search
      });
      const res = await axios.get(`${BASE_URL}/api/company/applications/${jobId}?${params.toString()}`, { headers });
      setCandidates(res.data.data || []);
    } catch (err) {
      console.error("Fetch Candidates Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobId) fetchCandidates();
  }, [jobId, selectedCountry, medicalLicense, recent]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCandidates();
  };

  const handleDownload = async (candidateId, cvUrl) => {
    try {
      await axios.post(`${BASE_URL}/api/company/jobs/increment_downloads/${candidateId}`, {}, { headers });
      if (cvUrl) window.open(cvUrl, '_blank');
    } catch (err) {
      console.error("Increment download error:", err);
      if (cvUrl) window.open(cvUrl, '_blank');
    }
  };

  return (
    <div className="Viewdetails grid grid-cols-12 gap-8 px-10 max-w-[1440px] mx-auto w-full bg-[#FAFAFA] min-h-screen">
      
      {/* Aside Sidebar */}
      <aside className="w-[300px] h-fit flex flex-col gap-4 col-span-3 bg-white pt-[120px] mt-[-80px] pb-8 px-4 rounded-b-[32px] shadow-sm z-10">
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

      {/* Main Content */}
      <div className="col-span-9 py-[32px]">
        <div className="job-review-details bg-white rounded-[24px] p-8">
          
          <div className="title flex flex-col gap-4 border-b border-[#F1F1F1] pb-6 mb-6">
            <div className="flex items-center justify-between w-full flex-wrap gap-4">
              <div className="flex items-center gap-[25px]">
                <div className="logo p-2 rounded-[16px]">
                  <img src={jobData?.company?.image || logo} alt="Healthcare logo" className="w-[90px] h-[80px] object-contain" />
                </div>
                <div className="titlee">
                  <h2 className="text-[#0D0D0D] text-[24px] font-bold">
                    {jobData?.job_title?.title || "Loading..."}
                  </h2>
                  <div className="flex gap-[8px] items-center mt-[4px]">
                    <p className="text-[#0D0D0DA6] text-[15px]">at {jobData?.company?.name || "..."}</p>
                    <span className="bg-[#00A854] rounded-[4px] py-[2px] px-[8px] text-white text-[12px] font-bold tracking-wide">
                      {jobData?.employment_type?.title || "FULL-TIME"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="mt-10 pt-4">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <form onSubmit={handleSearch} className="flex items-center gap-[12px] flex-wrap bg-[#FAFAFA] p-3 rounded-[20px] w-full">
                <div className="relative flex items-center">
                  <FiSearch className="absolute left-5 text-[#888888] text-[16px]" />
                  <input 
                    type="text" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="search name...." 
                    className="border border-[#EAEAEA] bg-white rounded-full pl-11 pr-5 py-[10px] text-[14px] text-[#0D0D0D] focus:outline-none focus:border-[#005F41] w-[260px] placeholder:text-[#A0A0A0] shadow-sm" 
                  />
                </div>

                <button type="submit" className="bg-[#005F41] text-white px-7 py-[10px] rounded-full text-[14px] font-medium hover:bg-[#004A32] transition-all cursor-pointer shadow-sm">
                  Search
                </button>

                <div className="relative min-w-[150px]">
                  <select 
                    value={recent}
                    onChange={(e) => setRecent(e.target.value)}
                    className="w-full border border-[#EAEAEA] rounded-full pl-5 pr-10 py-[10px] text-[14px] text-[#7E7E7E] bg-white cursor-pointer focus:outline-none appearance-none shadow-sm"
                  >
                    <option value="">recent applied</option>
                    <option value="1">Last 24 hours</option>
                    <option value="7">Last week</option>
                  </select>
                  <MdKeyboardArrowDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                <div className="relative min-w-[120px]">
                  <select 
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full border border-[#EAEAEA] rounded-full pl-5 pr-10 py-[10px] text-[14px] text-[#7E7E7E] bg-white cursor-pointer focus:outline-none appearance-none shadow-sm"
                  >
                    <option value="">Country</option>
                    {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <MdKeyboardArrowDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>

                <div className="relative min-w-[160px]">
                  <select 
                    value={medicalLicense}
                    onChange={(e) => setMedicalLicense(e.target.value)}
                    className="w-full border border-[#EAEAEA] rounded-full pl-5 pr-10 py-[10px] text-[14px] text-[#7E7E7E] bg-white cursor-pointer focus:outline-none appearance-none shadow-sm"
                  >
                    <option value="">Medical License</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                  <MdKeyboardArrowDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </form>
            </div>

            {/* Candidates Table */}
            <div className="overflow-x-auto">
              {loading ? (
                <div className="text-center py-10">Loading candidates...</div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-xs font-bold text-[#0D0D0D] border-b border-[#F1F1F1] bg-[#FAFAFA]">
                      <th className="py-3.5 px-4 w-[60px]">#</th>
                      <th className="py-3.5 px-4">Name</th>
                      <th className="py-3.5 px-4">Email</th>
                      <th className="py-3.5 px-4">Phone</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4 text-center w-[240px]">Cv</th>
                    </tr>
                  </thead>
                  <tbody className="text-[14px] text-[#4D4D4D]">
                    {candidates.length > 0 ? candidates.map((candidate, index) => (
                      <tr key={candidate.id} className="border-b border-[#F1F1F1] hover:bg-[#FAFAFA]/40 transition-all">
                        <td className="py-4 px-4 font-medium text-[#0D0D0D]">#{index + 1}</td>
                       <td className="py-4 px-4 font-bold">{candidate.name || candidate.user?.name}</td>
      <td className="py-4 px-4">{candidate.email || candidate.user?.email}</td>
      <td className="py-4 px-4">{candidate.phone || candidate.user?.phone}</td>
      <td className="py-4 px-4">{candidate.created_at}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center gap-2">
                            <button 
                              onClick={() => handleDownload(candidate.id, candidate.cv)}
                              className="flex items-center gap-1.5 bg-[#1C2434] text-white text-xs font-semibold py-2 px-4 rounded-lg hover:bg-black transition-all cursor-pointer"
                            >
                              <AiOutlineDownload className="text-sm" /> Download
                            </button>
                            <button 
                              onClick={() => candidate.cv && window.open(candidate.cv, '_blank')}
                              className="flex items-center gap-1.5 border border-[#D9D9D9] text-[#1C2434] text-xs font-semibold py-2 px-5 rounded-lg hover:bg-[#F5F5F5] transition-all cursor-pointer"
                            >
                              <FiEye className="text-sm" /> View
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="6" className="py-10 text-center text-gray-500">No candidates found for this job.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ViewCandidates;