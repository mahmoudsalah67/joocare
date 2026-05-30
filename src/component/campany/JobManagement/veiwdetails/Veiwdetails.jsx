import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { FaChevronDown } from "react-icons/fa";
import logo from "../../../../../public/imge/16 [Converted].svg";
import dollar from "../../../../../public/imge/job-details/Location Icon (1).svg";
import map from "../../../../../public/imge/job-details/map-pin.svg";
import job from "../../../../../public/imge/job-details/Job Posted Icon.svg";
import frame from "../../../../../public/imge/job-details/Frame.svg";
import frame1 from "../../../../../public/imge/job-details/Frame (1).svg";
import frame2 from "../../../../../public/imge/job-details/Frame (2).svg";
import layer from "../../../../../public/imge/job-details/Layer_1.svg";
import frame3 from "../../../../../public/imge/job-details/briefcase.svg";
import { IoCheckmarkCircleOutline } from "react-icons/io5";  
import { RiDeleteBin6Line } from "react-icons/ri";
import jobIcon from "../../../../../public/imge/Layer_1 (1).svg";
import people from "../../../../../public/imge/Frame (3).svg";
import acctive from "../../../../../public/imge/acctive.svg";
import Correct from "../../../../../public/imge/Correct.svg";
import Icon from "../../../../../public/imge/Icon.svg";
import Icon2 from "../../../../../public/imge/Icon (1).svg";
import { MdDeleteOutline, MdEdit, MdPersonOutline, MdDashboard } from "react-icons/md"; 
import { FaRegEyeSlash } from "react-icons/fa"; 
import { BsCheckCircle } from "react-icons/bs";
import axios from "axios";

// الـ Imports الجديدة الخاصة بالـ GIFs
import alertGif from "../../../../../public//imge/نت.gif"; 
import truee from "../../../../../public/imge/true.gif";
import trash from "../../../../../public/imge/trash.gif";

function Veiwdetails() {
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // حالات الـ Modals المخصصة
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [pendingStatus, setPendingStatus] = useState("");

  useEffect(() => {
    const getDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("company_token"); 
        const res = await axios.get(
          `https://joocare.nami-tec.com/api/company/jobs/${id}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Accept-Language": "en",
              Accept: "application/json",
              },
            }
          );
          setJobData(res.data);
          window.scrollTo(0, 0);
        } catch (err) {
          console.error("error:", err);
          setError("error");
        } finally {
          setLoading(false);
        }
      };

      if (id) {
        getDetails();
      }
    }, [id]);

  const getComputedStatus = () => {
    if (!jobData || !jobData?.data?.job) return null;

    const statusField = jobData.data.job.status;
    let rawStatus = "";

    if (typeof statusField === "object" && statusField !== null) {
      rawStatus = statusField.status || statusField.name || "";
    } else {
      rawStatus = statusField || "";
    }

    rawStatus = String(rawStatus).toLowerCase().trim();

    if (rawStatus === "open" || rawStatus.includes("مفتوح")) return "open";
    if (rawStatus === "closed" || rawStatus.includes("مغلق")) return "closed";
    if (rawStatus === "paused" || rawStatus.includes("موقف مؤقت") || rawStatus.includes("موقف موقت")) return "paused";
    if (rawStatus === "draft" || rawStatus.includes("مسودة")) return "draft";
    
    return null; 
  };

  const currentStatus = getComputedStatus();
  const formattedDate = jobData?.data?.job?.created_at || "21 December 2026, 4:00AM";

   const triggerStatusUpdate = (status) => {
    setPendingStatus(status);
    setIsSuccess(false);
    setShowStatusModal(true);
  };

   const handleStatusUpdate = async () => {
    try {
      const token = localStorage.getItem("company_token");
      await axios.post(
        `https://joocare.nami-tec.com/api/company/jobs/${id}/status`,
        { status: pendingStatus.toLowerCase() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      
      const res = await axios.get(`https://joocare.nami-tec.com/api/company/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
      });
      setJobData(res.data);
      setIsSuccess(true);
      setTimeout(() => {
        setShowStatusModal(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to update status:", err);
      setShowStatusModal(false);
    }
  };

   const handleDeleteJob = async () => {
    try {
      const token = localStorage.getItem("company_token");
      await axios.delete(
        `https://joocare.nami-tec.com/api/company/jobs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      setIsSuccess(true);
      setTimeout(() => {
        setShowDeleteModal(false);
        navigate("/JobManagement");
      }, 2000);
    } catch (err) {
      console.error("Error deleting job:", err);
      setShowDeleteModal(false);
    }
  };

  const renderActions = () => {
    if (!currentStatus) return null;

    switch (currentStatus) {
      case "open":
        return (
          <>
            <Link to={`/postjob/${id}`} className="flex items-center gap-1.5 text-[14px] font-medium bg-[#1F2937] text-white px-5 py-2.5 rounded-full hover:bg-opacity-90 transition-all">
              <MdEdit className="text-[16px]" /> Edit
            </Link>
            <button onClick={() => triggerStatusUpdate("closed")} className="flex items-center gap-1.5 text-[14px] font-medium bg-[#00694B] text-white px-5 py-2.5 rounded-full hover:bg-opacity-90 transition-all cursor-pointer">
              <BsCheckCircle className="text-[16px]" /> Closed
            </button>
            <button onClick={() => triggerStatusUpdate("paused")} className="flex items-center gap-1.5 text-[14px] font-medium bg-[#0D0D0D] text-white px-5 py-2.5 rounded-full hover:bg-opacity-90 transition-all cursor-pointer">
              <FaRegEyeSlash className="text-[16px]" /> Paused
            </button>
            <button onClick={() => { setIsSuccess(false); setShowDeleteModal(true); }} className="flex items-center gap-1.5 text-[14px] font-medium bg-[#DC2626] text-white px-5 py-2.5 rounded-full hover:bg-opacity-90 transition-all cursor-pointer">
              <MdDeleteOutline className="text-[18px]" /> Delete
            </button>
          </>
        );

      case "paused":
        return (
          <>
            <button onClick={() => triggerStatusUpdate("open")} className="flex items-center justify-center text-[15px] font-medium bg-[#00694B] text-white px-10 py-2.5 rounded-full hover:bg-opacity-90 transition-all min-w-[120px] cursor-pointer">
              Resume
            </button>
            <button onClick={() => { setIsSuccess(false); setShowDeleteModal(true); }} className="flex items-center justify-center gap-1.5 text-[15px] font-medium bg-[#DC2626] text-white px-8 py-2.5 rounded-full hover:bg-opacity-90 transition-all cursor-pointer">
              <MdDeleteOutline className="text-[18px]" /> Delete
            </button>
          </>
        );

      case "draft":
        return (
          <div className="flex items-center gap-3">
            <Link to={`/editjob/${id}`} className="flex items-center justify-center gap-1.5 text-[15px] font-medium bg-[#00694B] text-white px-14 py-2.5 rounded-full hover:bg-opacity-90 transition-all min-w-[220px]">
              Complete Post →
            </Link>
            <button onClick={() => { setIsSuccess(false); setShowDeleteModal(true); }} className="flex items-center gap-1.5 text-[14px] font-medium bg-[#DC2626] text-white px-5 py-2.5 rounded-full hover:bg-opacity-90 transition-all cursor-pointer">
              <MdDeleteOutline className="text-[18px]" /> Delete
            </button>
          </div>
        );

      case "closed":
        return (
          <div className="flex items-center gap-3">
            <button onClick={() => triggerStatusUpdate("open")} className="flex items-center justify-center text-[15px] font-medium bg-[#00694B] text-white px-10 py-2.5 rounded-full hover:bg-opacity-90 transition-all min-w-[120px] cursor-pointer">
              Reopen Job
            </button>
            <button onClick={() => { setIsSuccess(false); setShowDeleteModal(true); }} className="flex items-center justify-center gap-1.5 text-[15px] font-medium bg-[#DC2626] text-white px-8 py-2.5 rounded-full hover:bg-opacity-90 transition-all cursor-pointer">
              <MdDeleteOutline className="text-[18px]" /> Delete
            </button>
          </div>
        );

      default:
        return (
          <button onClick={() => { setIsSuccess(false); setShowDeleteModal(true); }} className="flex items-center justify-center gap-1.5 text-[15px] font-medium bg-[#DC2626] text-white px-14 py-2.5 rounded-full hover:bg-opacity-90 transition-all min-w-[220px] cursor-pointer">
            <MdDeleteOutline className="text-[18px]" /> Delete
          </button>
        );
    }
  };

  const renderStatusBadge = () => {
    if (!currentStatus) return null;

    switch (currentStatus) {
      case "open":
        return (
          <div className="flex items-center justify-between w-full bg-[#E6F3EE] rounded-full px-4 py-2">
            <div className="flex items-center gap-2 text-[#00694B] text-[14px] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#00694B]"></span>
              Open
            </div>
            <span className="text-[#666666] text-[12px]">{formattedDate}</span>
          </div>
        );

      case "paused":
        return (
          <div className="flex items-center justify-between w-full bg-[#FCE8E6] rounded-full px-4 py-2">
            <div className="flex items-center gap-2 text-[#DC2626] text-[14px] font-medium capitalize">
              <span className="w-2 h-2 rounded-full bg-[#DC2626]"></span>
              Paused
            </div>
            <span className="text-[#666666] text-[12px]">{formattedDate}</span>
          </div>
        );

      case "draft":
        return (
          <div className="flex items-center justify-between w-full bg-[#EAEAEA] rounded-full px-4 py-2">
            <div className="flex items-center gap-2 text-[#4D4D4D] text-[14px] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#8F8F8F]"></span>
              Draft
            </div>
            <span className="text-[#666666] text-[12px]">{formattedDate}</span>
          </div>
        );

      case "closed":
      default:
        return (
          <div className="flex items-center justify-between w-full bg-[#EAEAEA] rounded-full px-4 py-2">
            <div className="flex items-center gap-2 text-[#1F2937] text-[14px] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#1F2937]"></span>
              Closed
            </div>
            <span className="text-[#666666] text-[12px]">{formattedDate}</span>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FAFAFA]">
        <div className="text-center py-20 font-bold text-[#00694B] text-xl animate-pulse">
          Loading Job Details...
        </div>
      </div>
    );
  }

  return (
    <div className="Veiwdetails grid grid-cols-12 gap-6 px-10 max-w-[1440px] mx-auto w-full bg-[#FAFAFA] relative">
      <aside className="w-[300px] h-fit flex flex-col gap-4 col-span-3 bg-white pt-[120px] mt-[-80px] pb-8 px-4 rounded-b-[32px] shadow-sm">
        <div className="bg-[#F7FAF7] rounded-[24px] p-5 border border-[#F1F1F1] shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-[#2D3134] rounded-full flex items-center justify-center text-white font-bold text-xl">
              A
            </div>
            <div>
              <h3 className="font-bold text-[16px] text-[#0D0D0D]">Saudi German Hospital</h3>
              <p className="text-[14px] text-[#4D4D4D]">Egypt</p>
            </div>
          </div>
          <p className="text-[12px] text-[#8F8F8F] leading-relaxed mb-4">
            Saudi German Hospitals is the leading healthcare provider and the number one healthcare brand in the MENA re..
          </p>
          <div className="bg-[#FFF9E6] text-[#FFB800] text-center py-2 rounded-full text-[13px] font-semibold border border-[#FFB800]/10">
            Account under review.
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
          <NavLink to="/companyprofile" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${isActive ? "bg-[#E6F3EF] text-[#00694B] font-bold" : "text-[#8F8F8F]"}`}>
            <MdPersonOutline className="text-xl" /> Company Profile
          </NavLink>
          <NavLink to="/Dashboard" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${isActive ? "bg-[#E6F3EF] text-[#00694B] font-bold" : "text-[#8F8F8F]"}`}>
            <img src={Icon} className="text-xl" alt="" /> Dashboard
          </NavLink>
          <NavLink to="/JobManagement" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${isActive ? "bg-[#E6F3EF] text-[#00694B] font-bold" : "text-[#8F8F8F]"}`}>
            <img src={Icon2} className="text-xl" alt="" /> Job Management
          </NavLink>
          <NavLink to="/Accountsettings" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${isActive ? "bg-[#E6F3EF] text-[#00694B] font-bold" : "text-[#8F8F8F]"}`}>
            <BsCheckCircle className="text-xl" /> Account settings
          </NavLink>
        </div>

        <Link to={'/postjob'}>
          <button className="mt-10 w-full cursor-pointer bg-[#00694B] text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-[#00523A] transition-all">
            Post a Job
          </button>
        </Link>
      </aside>

      <div className="bg-white rounded-[24px] col-span-9 shadow-[0_4px_30px_rgba(0,0,0,0.03)] py-[32px] px-8 border border-[#F1F1F1]">
        <div className="job-review-details">
          <div className="title flex flex-col gap-4 border-b border-[#F1F1F1] pb-6">
            <div className="flex items-center justify-between w-full flex-wrap gap-4">
              <div className="flex items-center gap-[25px]">
                <div className="logo border border-[#F1F1F1] p-2 rounded-xl flex-shrink-0">
                  <img src={jobData?.data?.job?.company?.image || logo} alt="" className="w-[60px] h-[60px] object-contain" />
                </div>
                <div className="titlee">
                  <h2 className="text-[#0D0D0D] text-[24px] font-bold ">{jobData?.data?.job?.title || jobData?.data?.job?.job_title?.title}</h2>
                  <div className="flex gap-[8px] items-center mt-[4px]">
                    <p className="text-[#0D0D0DA6] text-[15px]">at {jobData?.data?.job?.company?.name}</p>
                    <span className="bg-[#00A854] rounded-[4px] py-[2px] px-[8px] text-white text-[12px] font-bold tracking-wide">
                      {jobData?.data?.job?.employment_type?.title}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                {renderActions()}
              </div>
            </div>

            <div className="w-full mt-2">
              {renderStatusBadge()}
            </div>
          </div>

          <div className="details grid grid-cols-2 gap-[20px] mt-[12px]">
            <div className="leftt p-[28px] rounded-[16px] w-full max-w-full">
              <h1 className="text-[#00694B] text-[21px] font-[700]">Job Description</h1>
              <div
                className="text-[#212529] text-[14px] text-justify font-[400] mt-[8px] w-full break-words whitespace-pre-line prose max-w-none"
                dangerouslySetInnerHTML={{ __html: jobData?.data?.job?.description }}
              />
     
              {jobData?.data?.job?.skills?.length > 0 && (
                <div className="mt-[24px]">
                  <h2 className="text-[#00694B] text-[21px] font-[700]">Skills:</h2>
                  <ul className="list-none pl-4 mt-[12px] flex flex-col gap-2">
                    {jobData?.data?.job?.skills?.map((skill) => (
                      <li key={skill.id} className="text-[#212529] text-[14px] font-[400] relative before:content-['-'] before:absolute before:-left-4">
                        {skill.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
     
            <div className="rightt p-[28px] rounded-[16px]">
              <div className="card1 border border-[#0D0D0D14] bg-white p-8 rounded-2xl shadow-sm">
                <div className="content flex items-center justify-between">
                  <div className="leftt flex flex-col items-center text-center gap-2 w-full">
                    <img src={dollar} alt="" />
                    <p className="font-semibold text-[16px] text-gray-800">
                      Salary ({jobData?.data?.job?.currency?.code || "USD"})
                    </p>
                    <p className="font-semibold text-[14px] text-[#00694B]">
                      {/* {Number(jobData?.data?.job?.min_salary) > 0 || Number(jobData?.data?.job?.max_salary) > 0 ? `${jobData?.data?.job?.min_salary} - ${jobData?.data?.job?.max_salary}` : "Not specified"} */}
                   
                   { `${jobData?.data?.job?.min_salary && jobData?.data?.job?.min_salary} - ${jobData?.data?.job?.max_salary && jobData?.data?.job?.max_salary}`  || "Not specified"}
                   
                    </p>
                    <p className="text-[13px] text-gray-500">
                      {jobData?.data?.job?.salary_type?.title || "Yearly salary"}
                    </p>
                  </div>
     
                  <div className="w-[5px] h-[90px] bg-[#0D0D0D14] mx-6"></div>
     
                  <div className="flex flex-col items-center text-center gap-2 w-full">
                    <img src={map} alt="" />
                    <p className="font-semibold text-[16px] text-gray-800">Job Location</p>
                    <p className="font-semibold text-[14px] text-[#00694B]">
                      {jobData?.data?.job?.city?.name}
                    </p>
                    <p className="text-[13px] text-gray-500">
                      {jobData?.data?.job?.country?.name}
                    </p>
                  </div>
                </div>
              </div>
     
              <div className="card2 border border-[#0D0D0D14] bg-white py-[32px] rounded-2xl shadow-sm mt-[32px]">
                <div className="content px-[16px] text-[#0D0D0D] font-[600]">
                  <h3 className="title text-[18px]">Job Overview</h3>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-4 mt-[12px]">
                    <div className="col-span-2">
                      <div className="flex items-center pb-[8px] gap-2">
                        <img src={job} alt="" />
                        <span className="text-gray-500 text-sm">Experience</span>
                      </div>
                      <p className="font-bold text-lg">
                        {jobData?.data?.job?.experience?.title || jobData?.data?.job?.experience_title}
                      </p>
                    </div>
     
                    <div>
                      <div className="flex items-center pb-[8px] gap-2">
                        <img src={frame} alt="" />
                        <span className="text-gray-500 text-sm">Job Category</span>
                      </div>
                      <p className="font-bold text-lg">
                        {jobData?.data?.job?.category?.title || jobData?.data?.job?.category_title}
                      </p>
                    </div>
     
                    <div>
                      <div className="flex items-center pb-[8px] gap-2">
                        <img src={frame1} alt="" />
                        <span className="text-gray-500 text-sm">Specialty</span>
                      </div>
                      <p className="font-bold text-lg">
                        {jobData?.data?.job?.specialty?.title || jobData?.data?.job?.specialty_title}
                      </p>
                    </div>
     
                    <div>
                      <div className="flex items-center pb-[8px] gap-2">
                        <img src={layer} alt="" />
                        <span className="text-gray-500 text-sm">Role category</span>
                      </div>
                      <p className="font-bold text-lg">
                        {jobData?.data?.job?.role_category?.title}
                      </p>
                    </div>
     
                    <div>
                      <div className="flex items-center pb-[8px] gap-2">
                        <img src={frame2} alt="" />
                        <span className="text-gray-500 text-sm">Seniority Level</span>
                      </div>
                      <p className="font-bold text-lg">
                        {jobData?.data?.job?.seniority_level?.title || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
     
              <div className="card3 border border-[#0D0D0D14] bg-white py-[32px] rounded-2xl shadow-sm mt-[32px]">
                <div className="content px-[16px]">
                  <div className="title font-[600] text-[18px] text-[#0D0D0D]">
                    Education & Certifications
                  </div>
                  <div className="details mt-[12px] px-[16px]">
                    <div className="top">
                      <div className="flex items-center gap-[8px]">
                        <img src={job} alt="" />
                        <span className="text-[16px] font-[400] text-[#0D0D0DA6]">Education Level</span>
                      </div>
                      {jobData?.data?.job?.education_levels?.map((edu) => (
                        <h2 key={edu.id} className="font-[600] text-[18px] mt-[8px]">{edu.title}</h2>
                      ))}
                    </div>
     
                    <div className="middle mt-[24px]">
                      <div className="flex items-center gap-[8px]">
                        <img src={frame3} alt="" />
                        <span className="text-[16px] font-[400] text-[#0D0D0DA6]">Mandatory Certifications</span>
                      </div>
                      <div className="middle-2">
                        {jobData?.data?.job?.mandatory_certifications?.map((cert) => (
                          <p key={cert.id} className="bg-[#1C262814] w-fit text-[12px] py-[4px] px-[12px] font-[400] rounded-[3px] mt-[8px]">
                            {cert.mandatory_certification?.title}
                          </p>
                        ))}
                      </div>
     
                      <div className="botom mt-[24px]">
                        <div className="flex items-center gap-[8px]">
                          <img src={frame3} alt="" />
                          <span className="text-[#0D0D0DA6] text-[16px] font-[400]">Availability</span>
                        </div>
                        <h2 className="text-[16px] text-[#0D0D0D] mt-[8px] font-[600]">
                          {jobData?.data?.job?.availability?.title || jobData?.data?.job?.availability_title || "Not specified"}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== مودال تأكيد الحذف المخصص (Delete Modal) ==================== */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-[24px] p-8 max-w-sm w-full text-center shadow-lg mx-4">
            {!isSuccess ? (
              <>
                <img src={trash} alt="Trash GIF" className="w-24 h-24 mx-auto mb-4 object-contain" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Are you sure?</h3>
                <p className="text-gray-500 text-sm mb-6">Do you really want to delete this job post? This action cannot be undone.</p>
                <div className="flex gap-3 justify-center">
                  <button onClick={() => setShowDeleteModal(false)} className="px-6 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-all cursor-pointer">
                    Cancel
                  </button>
                  <button onClick={handleDeleteJob} className="px-6 py-2.5 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-all cursor-pointer">
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <>
                <img src={truee} alt="Success GIF" className="w-24 h-24 mx-auto mb-4 object-contain" />
                <h3 className="text-xl font-bold text-gray-900 mb-1">Deleted Successfully!</h3>
                <p className="text-gray-500 text-sm">The job post has been permanently removed.</p>
              </>
            )}
          </div>
        </div>
      )}

      {/* ==================== مودال تغيير وقفل الحالة المخصص (Status/Close Modal) ==================== */}
      {showStatusModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-[24px] p-8 max-w-sm w-full text-center shadow-lg mx-4">
            {!isSuccess ? (
              <>
                <img src={alertGif} alt="Alert GIF" className="w-24 h-24 mx-auto mb-4 object-contain" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Change Job Status?</h3>
                <p className="text-gray-500 text-sm mb-6">Are you sure you want to change this job status to <span className="font-bold text-[#00694B]">{pendingStatus}</span>?</p>
                <div className="flex gap-3 justify-center">
                  <button onClick={() => setShowStatusModal(false)} className="px-6 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-full hover:bg-gray-200 transition-all cursor-pointer">
                    Cancel
                  </button>
                  <button onClick={handleStatusUpdate} className="px-6 py-2.5 bg-[#00694B] text-white font-semibold rounded-full hover:bg-opacity-90 transition-all cursor-pointer">
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

    </div>
  );
}

export default Veiwdetails;