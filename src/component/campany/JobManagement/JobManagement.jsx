import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios"; // تأكد من عمل import لـ axios

import {
  MdMoreHoriz,
  MdKeyboardArrowDown,
  MdPersonOutline,
  MdSettings,
  MdWork,
  MdAttachMoney,
  MdClose,
  MdCheckCircle,
} from "react-icons/md";

import { HiLocationMarker } from "react-icons/hi";

import logo from "../../../../public/imge/16 [Converted].svg";
import Icon from "../../../../public/imge/Icon.svg";
import Icon2 from "../../../../public/imge/Icon (1).svg";
import alertGif from "../../../../public/imge/نت.gif"; 
import truee from "../../../../public/imge/true.gif";
import trash from "../../../../public/imge/trash.gif";

function JobManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false); // إضافة الـ state الناقص للتحميل
  const [error, setError] = useState(null);     // إضافة الـ state الناقص للأخطاء
  
  const [totalPages, setTotalPages] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [statusOpen, setStatusOpen] = useState(false);
  const [fetchjobss, setfetchjobs] = useState([]);
  const navigate = useNavigate();

  const [showCloseModal, setShowCloseModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false); 
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [isStatusSuccess, setIsStatusSuccess] = useState(false); 
  
  const [activeJobId, setActiveJobId] = useState(null);
  const [pendingStatus, setPendingStatus] = useState(""); 

  const statusMap = {
    Open: "open",
    Closed: "closed",
    Paused: "paused",
    Draft: "draft",
  };

  // 1. جلب بيانات الوظائف (Jobs API)
  async function fetchjobs(page = 1, status = "Status") {
    try {
      const token = localStorage.getItem("company_token");
      const response = await fetch(
        `https://joocare.nami-tec.com/api/company/jobs?pagination=on&limit_per_page=100&page=1`,
        {
          headers: {
            Accept: "application/json",
            language: "en",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data?.data) {
        let allJobs = data.data;

        if (status !== "Status") {
          const arabicMap = {
            Open: "مفتوح",
            Closed: "مغلق",
            Paused: "موقف",
            Draft: "مسودة",
          };

          allJobs = allJobs.filter((job) => {
            let raw = "";
            if (typeof job.status === "object" && job.status !== null) {
              raw = job.status?.status || job.status?.name || "";
            } else {
              raw = job.status || "";
            }
            raw = raw.toLowerCase().trim();

            if (status === "Draft" && (raw === "" || raw.includes("مسودة") || raw === "draft")) {
              return true;
            }

            return raw.includes(arabicMap[status] || status.toLowerCase());
          });
        }

        const itemsPerPage = 4;
        const totalPagesCalc = Math.ceil(allJobs.length / itemsPerPage);
        setTotalPages(totalPagesCalc || 1);

        const start = (page - 1) * itemsPerPage;
        const paginated = allJobs.slice(start, start + itemsPerPage);
        setfetchjobs(paginated);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }

  // 2. جلب بيانات ملف الشركة الشخصي (Profile API) لتشغيل السايدبار ديناميكياً
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const tokenn = localStorage.getItem("company_token");
        const headers = {
          Authorization: `Bearer ${tokenn}`,
          "Accept-Language": "en",
          Accept: "application/json",
        };

        const res = await axios.get("https://joocare.nami-tec.com/api/company/auth/profile", { headers });      
        const company = res.data?.data?.company || res.data?.data;
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

  useEffect(() => {
    fetchjobs(currentPage, selectedStatus);
  }, [currentPage, selectedStatus]);

  const onSubmit = () => {
    navigate("/ViewCandidates");
  };

  const statuses = ["Status", "Open", "Closed", "Paused", "Draft"];

  const statusStyle = {
    open: { dot: "bg-[#00694B]", text: "text-[#00694B]" },
    closed: { dot: "bg-gray-400", text: "text-gray-500" },
    draft: { dot: "bg-gray-400", text: "text-gray-400" },  
    paused: { dot: "bg-red-400", text: "text-red-400" },
  };

  const triggerStatusModal = (jobId, status) => {
    setActiveJobId(jobId);
    setPendingStatus(status);
    setIsStatusSuccess(false);
    setShowStatusModal(true);
  };

  const menuItems = {
    open: [
      {   label: "Edit", action: "edit" },
      {   label: "Closed", value: "Closed", action: "trigger-close-modal" }, 
      {   label: "Paused", value: "Paused", action: "trigger-status-modal" }, 
      {   label: "Delete", red: true, action: "trigger-delete-modal" },
    ],
    closed: [
      {   label: "Edit", action: "edit" },
      {   label: "Delete", red: true, action: "trigger-delete-modal" },
    ],
    draft: [
      {   label: "Complete Post", action: "edit" },
      {   label: "Delete", red: true, action: "trigger-delete-modal" },
    ],
    paused: [
      {  label: "Resume", value: "Open", action: "trigger-status-modal" }, 
      {   label: "Delete", red: true, action: "trigger-delete-modal" },
    ],
  };

  async function handleStatusChange(jobId, newStatus) {
    try {
      const token = localStorage.getItem("company_token");
      const response = await fetch(
        `https://joocare.nami-tec.com/api/company/jobs/${jobId}/status`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            language: "en",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus.toLowerCase() }),
        }
      );
      if (response.ok) {
        return true;
      } else {
        console.error("Failed to update status");
        return false;
      }
    } catch (error) {
      console.error("Error updating status:", error);
      return false;
    }
  }

  const confirmStatusUpdate = async () => {
    if (activeJobId && pendingStatus) {
      const success = await handleStatusChange(activeJobId, pendingStatus);
      if (success) {
        setIsStatusSuccess(true);
        setTimeout(() => {
          setShowStatusModal(false);
          fetchjobs(currentPage, selectedStatus);
          setActiveJobId(null);
          setPendingStatus("");
        }, 2000);
      } else {
        setShowStatusModal(false);
      }
    }
  };

  async function handleDeleteJob(jobId) {
    try {
      const token = localStorage.getItem("company_token");
      const response = await fetch(
        `https://joocare.nami-tec.com/api/company/jobs/${jobId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        return true;
      } else {
        console.error("Failed to delete job");
        return false;
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      return false;
    }
  }

  const confirmCloseJob = async () => {
    if (activeJobId) {
      await handleStatusChange(activeJobId, "closed");
      setShowCloseModal(false);
      setShowSuccessModal(true);
      
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate(`/veiwdetails/${activeJobId}`);
        setActiveJobId(null);
      }, 3000);
    }
  };

  const confirmDeleteJob = async () => {
    if (activeJobId) {
      const isDeleted = await handleDeleteJob(activeJobId);
      if (isDeleted) {
        setShowDeleteModal(false);
        setShowDeleteSuccessModal(true);
        
        setTimeout(() => {
          setShowDeleteSuccessModal(false);
          fetchjobs(currentPage, selectedStatus);
          setActiveJobId(null);
        }, 3000);
      }
    }
  };

  const JobCard = ({ job, handleStatusChange }) => {
    let rawStatus = "";

    if (typeof job.status === "object" && job.status !== null) {
      rawStatus = job.status?.status || job.status?.name || "";
    } else {
      rawStatus = job.status || "";
    }

    rawStatus = rawStatus.toLowerCase().trim();

    let currentStatus = "draft"; 
    
    if (rawStatus.includes("مفتوح") || rawStatus === "open") {
      currentStatus = "open";
    } else if (rawStatus.includes("مغلق") || rawStatus === "closed") {
      currentStatus = "closed";
    } else if (rawStatus.includes("موقف") || rawStatus.includes("موقوف") || rawStatus === "paused") {
      currentStatus = "paused";
    } else if (rawStatus.includes("مسودة") || rawStatus === "draft" || rawStatus === "") {
      currentStatus = "draft";
    }

    const s = statusStyle[currentStatus] || statusStyle.draft;
    const [menuOpen, setMenuOpen] = useState(false);
    const currentMenu = menuItems[currentStatus] || menuItems.draft;

    const statusLabel = {
      open: "Open",
      closed: "Closed",
      draft: "Draft",
      paused: "Paused",
    };

    return (
      <div
        className={`rounded-[16px] border flex flex-col min-h-[260px] p-[16px] gap-[10px] transition-all
          ${currentStatus === "paused" ? "border-red-200 bg-[#FFF5F5]" : ""}
          ${currentStatus === "draft" ? "border-gray-200 bg-[#F5F5F5]" : ""}
          ${currentStatus === "open" || currentStatus === "closed" ? "border-gray-100 bg-white" : ""}
        `}
      >
        {/* Header */}
        <div className="flex items-start justify-between relative">
          <div className="flex items-center gap-[10px]">
            <img
              src={job.company?.image || logo}
              alt="logo"
              className="w-[40px] h-[40px] rounded-[8px] object-cover"
            />
            <div>
              <h3 className="font-[700] text-[16px] text-[#0D0D0D]">
                {job.job_title?.title || job.title}
              </h3>
              <p className="text-[13px] text-[#8F8F8F]">{job.company?.name}</p>
              <p className="text-[12px] text-[#8F8F8F]">{job.created_at}</p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[#8F8F8F] hover:text-[#0D0D0D] transition cursor-pointer p-1"
            >
              <MdMoreHoriz size={22} />
            </button>

            {menuOpen && (
              <div className="absolute top-[110%] right-0 bg-white border border-gray-100 rounded-[16px] shadow-lg py-[8px] w-[170px] z-50">
                {currentMenu.map((item) => {
                  if (item.action === "edit") {
                    return (
                      <Link
                        key={item.label}
                        to={`/editjob/${job.id}`}
                        className="px-[16px] py-[10px] text-[14px] flex items-center gap-2 text-[#0D0D0D] hover:bg-[#F0F9F4] transition"
                      >
                        <span>{item.icon}</span>
                        <span>{item.label}</span>
                      </Link>
                    );
                  }
                  return (
                    <div
                      key={item.label}
                      onClick={() => {
                        setMenuOpen(false);
                        if (item.action === "trigger-close-modal") {
                          setActiveJobId(job.id);
                          setShowCloseModal(true);
                        } else if (item.action === "trigger-status-modal" && item.value) {
                          triggerStatusModal(job.id, item.value);
                        } else if (item.action === "trigger-delete-modal") {
                          setActiveJobId(job.id);
                          setShowDeleteModal(true);
                        }
                      }}
                      className={`px-[16px] py-[10px] text-[14px] flex items-center gap-2 cursor-pointer transition
                        ${item.red ? "text-red-500 hover:bg-red-50" : "text-[#0D0D0D] hover:bg-[#F0F9F4]"}`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-wrap items-center gap-[12px] text-[13px] text-[#4D4D4D]">
          <div className="flex items-center gap-1">
            <HiLocationMarker className="text-[#8F8F8F]" />
            <span>
              {job.city?.name}, {job.country?.name}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MdWork className="text-[#8F8F8F]" />
            <span>{job.category_title || "N/A"}</span>
          </div>
          {job.has_salary === 1 && (
            <div className="flex items-center gap-1">
              <MdAttachMoney className="text-[#8F8F8F]" />
              <span>
                {job.min_salary}$ : {job.max_salary}$
              </span>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-[6px]">
          {[job.experience_title, job.employment_type?.title, job.specialty_title]
            .filter(Boolean)
            .map((tag, index) => (
              <span
                key={index}
                className="bg-[#F3F4F6] text-[#4D4D4D] text-[12px] py-[3px] px-[10px] rounded-full"
              >
                {tag}
              </span>
            ))}
        </div>

        {/* Description */}
        <p className="text-[13px] text-[#8F8F8F] line-clamp-2">
          {job.description
            ? job.description.replace(/<[^>]*>/g, "")
            : "No description available"}
        </p>

         {currentStatus !== "draft" && (
          <div className="flex items-center gap-[8px] mt-auto">
            <button
              onClick={onSubmit}
              className="flex-1 bg-[#152126] hover:bg-black text-white text-[13px] font-[600] py-[10px] rounded-full transition cursor-pointer"
            >
              View Candidates
            </button>
            <Link to={`/veiwdetails/${job.id}`}>
              <button className="flex items-center gap-1 border border-[#00694B] text-[#00694B] hover:bg-[#00694B] hover:text-white text-[13px] font-[600] py-[10px] px-[16px] rounded-full transition cursor-pointer">
                View Details →
              </button>
            </Link>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-[8px] border-t border-gray-200 mt-auto">
          <div className="flex items-center gap-[6px]">
            <span className={`w-2 h-2 rounded-full ${s.dot}`}></span>
            <span className={`text-[13px] font-[500] ${s.text}`}>
              {statusLabel[currentStatus] || "Draft"}
            </span>
          </div>
          <span className="text-[12px] text-[#8F8F8F]">{job.updated_at}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] relative">
      
      {showCloseModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-[24px] p-[24px] w-[400px] shadow-2xl relative text-center flex flex-col items-center border border-[#F1F1F1]">
            <div className="w-[120px] h-[120px] flex items-center justify-center mb-2">
              <img src={alertGif} alt="Alert" className="w-full h-full object-contain" />
            </div>
            
            <h3 className="text-[18px] font-bold text-[#0D0D0D] mb-2">
              Are you sure you want to close this job?
            </h3>
            <p className="text-[14px] text-[#8F8F8F] mb-6 leading-relaxed">
              Closing this job means it will no longer accept new applicants and will be moved to the closed section.
            </p>

            <div className="flex items-center gap-3 w-full">
              <button
                onClick={() => {
                  setShowCloseModal(false);
                  setActiveJobId(null);
                }}
                className="flex-1 border border-gray-200 hover:bg-gray-50 text-[#0D0D0D] text-[14px] font-[600] py-[12px] rounded-full transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmCloseJob}
                className="flex-1 bg-[#00694B] hover:bg-[#00523A] text-white text-[14px] font-[600] py-[12px] rounded-full transition cursor-pointer"
              >
                Yes, Close it
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-[24px] p-[32px] w-[360px] shadow-2xl text-center flex flex-col items-center animate-scaleUp border border-[#F1F1F1]">
            <div className="w-[120px] h-[120px] flex items-center justify-center mb-2">
              <img src={truee} alt="Success" className="w-full h-full object-contain" />
            </div>
            
            <h3 className="text-[20px] font-bold text-[#0D0D0D] mb-2">
              Job Closed Successfully
            </h3>
            <p className="text-[14px] text-[#8F8F8F]">
              The job status has been changed to closed.
            </p>
          </div>
        </div>
      )}

      {showStatusModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-[24px] p-8 max-w-sm w-full text-center shadow-2xl mx-4 border border-[#F1F1F1] flex flex-col items-center">
            {!isStatusSuccess ? (
              <>
                <img src={alertGif} alt="Alert GIF" className="w-24 h-24 mx-auto mb-4 object-contain" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Change Job Status?</h3>
                <p className="text-gray-500 text-sm mb-6">Are you sure you want to change this job status to <span className="font-bold text-[#00694B]">{pendingStatus}</span>?</p>
                <div className="flex gap-3 justify-center w-full">
                  <button onClick={() => { setShowStatusModal(false); setActiveJobId(null); }} className="flex-1 px-6 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-all cursor-pointer">
                    Cancel
                  </button>
                  <button onClick={confirmStatusUpdate} className="flex-1 px-6 py-2.5 bg-[#00694B] text-white font-semibold rounded-full hover:bg-opacity-90 transition-all cursor-pointer">
                    Confirm
                  </button>
                </div>
              </>
            ) : (
              <>
                <img src={truee} alt="Success GIF" className="w-24 h-24 mx-auto mb-4 object-contain" />
                <h3 className="text-xl font-bold text-gray-900 mb-1">Updated Successfully!</h3>
                <p className="text-gray-500 text-sm">The job status has been switched to {pendingStatus}.</p>
              </>
            )}
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-[24px] p-[24px] w-[400px] shadow-2xl relative text-center flex flex-col items-center border border-[#F1F1F1]">
            <div className="w-[120px] h-[120px] flex items-center justify-center mb-2">
              <img src={trash} alt="Delete" className="w-full h-full object-contain" />
            </div>
            
            <h3 className="text-[18px] font-bold text-[#0D0D0D] mb-2">
              Are you sure you want to delete this job?
            </h3>
            <p className="text-[14px] text-[#8F8F8F] mb-6 leading-relaxed">
              Deleting this job means it will be permanently removed from your dashboard and cannot be recovered.
            </p>

            <div className="flex items-center gap-3 w-full">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setActiveJobId(null);
                }}
                className="flex-1 border border-gray-200 hover:bg-gray-50 text-[#0D0D0D] text-[14px] font-[600] py-[12px] rounded-full transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteJob}
                className="flex-1 bg-[#E32B2B] hover:bg-[#C22424] text-white text-[14px] font-[600] py-[12px] rounded-full transition cursor-pointer"
              >
                Yes, Delete it
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteSuccessModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-[24px] p-[32px] w-[360px] shadow-2xl text-center flex flex-col items-center animate-scaleUp border border-[#F1F1F1]">
            <div className="w-[120px] h-[120px] flex items-center justify-center mb-2">
              <img src={truee} alt="Success" className="w-full h-full object-contain" />
            </div>
            
            <h3 className="text-[20px] font-bold text-[#0D0D0D] mb-2">
              Job Deleted Successfully
            </h3>
            <p className="text-[14px] text-[#8F8F8F]">
              The job has been deleted from your listing.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-12 px-20 w-[1100px]">
        {/* Sidebar الديناميكي بالكامل */}
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

        {/* Main */}
        <main className="flex-1 col-span-8 w-[1020px] py-[70px]">
          <div className="profile-details px-[40px] py-[32px] bg-[#F7FAF7] min-h-screen">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="relative">
                <button
                  onClick={() => setStatusOpen(!statusOpen)}
                  className="flex items-center gap-2 bg-white border border-gray-200 text-[#0D0D0D] text-[14px] font-[500] py-[10px] px-[20px] rounded-full hover:border-[#00694B] transition cursor-pointer"
                >
                  {selectedStatus} <MdKeyboardArrowDown size={18} />
                </button>

                {statusOpen && (
                  <div className="absolute top-[110%] left-0 bg-white border border-gray-100 rounded-[16px] shadow-lg py-[8px] w-[160px] z-50">
                    {statuses.map((s) => (
                      <div
                        key={s}
                        onClick={() => {
                          setSelectedStatus(s);
                          setStatusOpen(false);
                          setCurrentPage(1);
                        }}
                        className="px-[16px] py-[10px] text-[14px] text-[#0D0D0D] hover:bg-[#F0F9F4] hover:text-[#00694B] cursor-pointer transition"
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link to={"/postjob"}>
                <button className="bg-[#00694B] hover:bg-black text-white font-[600] text-[14px] py-[12px] px-[28px] rounded-full transition cursor-pointer">
                  Post a Job
                </button>
              </Link>
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-2 gap-[16px]">
              {fetchjobss.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  handleStatusChange={handleStatusChange}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-8 text-[13px] text-[#4D4D4D]">
              <p>Show page {currentPage} of {totalPages}</p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition cursor-pointer disabled:opacity-40"
                >
                  ‹
                </button>

                {[...Array(Number(totalPages) > 0 ? Number(totalPages) : 1)].map((_, index) => {
                  const n = index + 1;
                  return (
                    <button
                      key={n}
                      onClick={() => setCurrentPage(n)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-[500] transition cursor-pointer
                        ${currentPage === n ? "bg-[#00694B] text-white" : "hover:bg-gray-100 text-[#4D4D4D]"}`}
                    >
                      {n}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition cursor-pointer disabled:opacity-40"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default JobManagement;