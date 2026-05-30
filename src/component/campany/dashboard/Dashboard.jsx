import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import axiosInstance from "axios"; // أو استخدام axios المباشر حسب مشروعك
import jobIcon from "../../../../public/imge/Layer_1 (1).svg";
import people from "../../../../public/imge/Frame (3).svg";
import acctive from "../../../../public/imge/acctive.svg";
import Correct from "../../../../public/imge/Correct.svg";
import Icon from "../../../../public/imge/Icon.svg";
import Icon2 from "../../../../public/imge/Icon (1).svg";
import {
  MdPersonOutline,
  MdRemoveRedEye,
  MdSettings,
  MdDownload
} from "react-icons/md";

function Dashboard() {
  const [profileData, setProfileData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dashboardData, setDashboardData] = useState(null);
  const [jobs, setJobs] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardAndJobs = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("company_token");
        
        const headers = {
          Authorization: `Bearer ${token}`,
          "Accept-Language": "en",
          Accept: "application/json",
        };

         const statsRes = await axiosInstance.get(
          "https://joocare.nami-tec.com/api/company/dashboard",
          { headers }
        );
        setDashboardData(statsRes.data.data);

         const jobsRes = await axiosInstance.get(
          `https://joocare.nami-tec.com/api/company/my-jobs?pagination=on&limit_per_page=10&page=${currentPage}`,
          { headers }
        );
        
        setJobs(jobsRes.data.data || []);
        setError(null);
      } catch (err) {
        console.error("Dashboard Error:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardAndJobs();
  }, [currentPage]);

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

   const handleDownloadCV = async (jobId, cvUrl) => {
    if (!cvUrl) {
      alert("No CV available for this applicant.");
      return;
    }
    
    try {
      const token = localStorage.getItem("company_token");
      
       await axiosInstance.post(
        `https://joocare.nami-tec.com/api/company/increment_downloads/${jobId}`,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

       const response = await fetch(cvUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `CV_Job_${jobId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Download handling fallback triggered:", error);
      window.open(cvUrl, "_blank");
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen text-[#00694B] font-bold">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500 font-bold">{error}</div>;

  return (
    <div className="Dashboard">
      <div className="min-h-screen">
        <div className="flex grid grid-cols-12 px-20 w-[1100px]">
          {/* Sidebar */}
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
                      {profileData?.name || "Company Name"}
                    </h3>
                    <p className="text-[14px] text-[#4D4D4D]">{profileData?.city?.title || "Egypt"}</p>
                  </div>
                </div>
                <p className="text-[12px] text-[#8F8F8F] leading-relaxed mb-4 line-clamp-3">
                  {profileData?.bio || "No description provided yet. Click edit to add an about section."}
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
              <p className="text-[13px] text-[#4D4D4D] mb-5">Please complete your account details so you can use the platform normally.</p>
              <Link to={"/Details2"}>
                <button className="w-full cursor-pointer bg-[#E32B2B] text-white font-bold py-3 rounded-full hover:bg-[#C22424] transition-all">Complete Now</button>
              </Link>
            </div>

            <div className="flex flex-col gap-1 px-2 mt-2">
              <NavLink to="/companyprofile" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${isActive ? "bg-[#E6F3EF] text-[#00694B] font-bold" : "text-[#8F8F8F]"}`}><MdPersonOutline className="text-xl" /> Company Profile</NavLink>
              <NavLink to="/Dashboard" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${isActive ? "bg-[#E6F3EF] text-[#00694B] font-bold" : "text-[#8F8F8F]"}`}><img src={Icon} className="text-xl" alt="" /> Dashboard</NavLink>
              <NavLink to="/JobManagement" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${isActive ? "bg-[#E6F3EF] text-[#00694B] font-bold" : "text-[#8F8F8F]"}`}><img src={Icon2} className="text-xl" alt="" /> Job Management</NavLink>
              <NavLink to="/Accountsettings" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${isActive ? "bg-[#E6F3EF] text-[#00694B] font-bold" : "text-[#8F8F8F]"}`}><MdSettings className="text-xl" /> Account settings</NavLink>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 col-span-8 w-[1020px] py-[70px]">
            <div className="profile-details px-[40px] py-[32px] bg-[#F7FAF7] min-h-screen">
              <h2 className="text-[20px] font-bold text-[#0D0D0D] mb-6">Active Jobs</h2>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50 relative overflow-hidden">
                  <p className="text-[14px] font-bold text-[#0D0D0D] mb-2">Active job postings</p>
                  <h3 className="text-[32px] font-bold text-[#00694B]">{dashboardData?.active_jobs || 0}</h3>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-20"><img src={jobIcon} className="w-12 h-12" alt="" /></div>
                </div>

                <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50">
                  <p className="text-[14px] font-bold text-[#0D0D0D] mb-2">Total Application Volume</p>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-[32px] font-bold text-[#00694B]">{dashboardData?.total_applications || 0}</h3>
                    <span className="text-[12px] font-bold text-[#0D0D0D]">+{dashboardData?.applications_this_week || 0} <span className="font-normal text-[#8F8F8F]">this week</span></span>
                    <img src={people} alt="" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50">
                  <p className="text-[14px] font-bold text-[#0D0D0D] mb-2">Latest Activity</p>
                  <div className="flex items-center justify-between">
                    <h3 className="text-[32px] font-bold text-[#00694B]">+{dashboardData?.applications_latest_activity || 0} <span className="text-[16px] font-bold">Application</span></h3>
                    <img src={acctive} alt="" />
                  </div>
                </div>
              </div>

              {/* Main Table & Chart Grid */}
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-4 space-y-6">
                  <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50">
                    <p className="text-[14px] font-bold text-[#0D0D0D] mb-2">Talent intake</p>
                    <div className="flex items-center justify-between">
                      <h3 className="text-[32px] font-bold text-[#00694B]">{dashboardData?.cvs_downloaded || 0}</h3>
                      <img src={Correct} alt="" />
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50">
                    <h4 className="text-[16px] font-bold text-[#0D0D0D] mb-6">Category Breakdown</h4>
                    <div className="flex items-center justify-between gap-4">
                      <div className="w-24 h-24 rounded-full border-[20px] border-l-[#00694B] border-b-[#FFB800] border-r-[#4A90E2] border-t-[#7ED321]"></div>
                      <div className="text-[12px] space-y-2">
                        <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#4A90E2] rounded-sm"></span> nursing</div>
                        <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#7ED321] rounded-sm"></span> Physicians</div>
                        <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#FFB800] rounded-sm"></span> Allied Health</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Dynamic Jobs Table */}
                <div className="col-span-8 bg-white p-6 rounded-[24px] shadow-sm border border-gray-50">
                  <h4 className="text-[18px] font-bold text-[#0D0D0D] mb-4">Active Jobs</h4>
                  <table className="w-full text-left">
                    <thead className="bg-[#F3F4F6] rounded-xl text-[#4D4D4D] text-[13px]">
                      <tr>
                        <th className="p-4 rounded-l-xl font-bold">Job Title</th>
                        <th className="p-4 font-bold text-center">Job Views</th>
                        <th className="p-4 font-bold text-center">Applicants</th>
                        <th className="p-4 font-bold">Posted Since</th>
                        <th className="p-4 rounded-r-xl font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-[14px] text-[#0D0D0D]">
                      {jobs.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="p-4 text-center text-gray-400">No active jobs found</td>
                        </tr>
                      ) : (
                        jobs.map((job) => (
                          <tr key={job.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                            <td className="p-4 font-medium text-[#4D4D4D]">
                              {job.job_title?.title || job.title || "Consultant"}
                            </td>
                            <td className="p-4 text-center">{job.views_num || 0}</td>
                            <td className="p-4 text-center">{job.applications_count || 0}</td>
                            <td className="p-4 text-[#4D4D4D]">
                              {job.created_at ? new Date(job.created_at).toLocaleDateString("en-GB", { day: 'numeric', month: 'long', year: 'numeric' }) : "Recent"}
                            </td>
                            <td className="p-4 flex gap-2">
                              <Link to={`/JobPreview/${job.id}`}>
                                <button className="bg-[#00694B] text-white text-[12px] px-3 py-1.5 rounded-full flex items-center gap-1 cursor-pointer">
                                  <MdRemoveRedEye /> View
                                </button>
                              </Link>
                              
                              <button 
                                onClick={() => handleDownloadCV(job.id, job.cv_url || job.job_title?.cv_url)}
                                className="bg-[#00694B]/10 hover:bg-[#00694B]/20 text-[#00694B] text-[12px] px-3 py-1.5 rounded-full flex items-center gap-1 cursor-pointer font-medium"
                              >
                                <MdDownload /> CV
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-[20px] ml-80 items-center mt-6 text-[12px] text-[#4D4D4D]">
                <div className="flex items-center gap-1">
                  <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition cursor-pointer">‹</button>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} onClick={() => setCurrentPage(n)} className={`w-8 h-8 rounded-full flex items-center justify-center font-[500] transition cursor-pointer ${currentPage === n ? "bg-[#00694B] text-white" : "hover:bg-gray-100 text-[#4D4D4D]"}`}>{n}</button>
                  ))}
                  <button onClick={() => setCurrentPage(prev => prev + 1)} className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition cursor-pointer">›</button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;