import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import SuccessModal from "../../SuccessModal.jsx/SuccessModal.jsx";  
import notdata from "../../../../../public/imge/notdata.gif";  
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Mousewheel, Keyboard } from "swiper/modules";
import axios from "axios";
import {
  MdDashboard,
  MdKeyboardArrowDown,
  MdPersonOutline,
  MdSettings,
  MdWorkOutline,
} from "react-icons/md";

function JobPreview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(3);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const swiperRef = useRef(null);

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast.success("Job link copied successfully.", {
        duration: 5000,
        style: {
          background: "#E6F4EA",
          color: "#1E4620",
          width: "800px",
        },
      });
    });
  };

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

    if (id) getDetails();
  }, [id]);

  const onSubmit = async () => {
  try {
    const token = localStorage.getItem('company_token');
    const jobId = id;

    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Accept-Language': 'en',
        'Content-Type': 'application/json',
      }
    };

     await axios.post(
      `https://joocare.nami-tec.com/api/company/jobs-step-three/${jobId}`,
      { status: "open" },  
      config
    );

    toast.success("Job posted successfully!", {
      position: "top-right",
      style: { background: "#E6F4EA", color: "#1E8E3E", borderRadius: "10px" },
    });

    setIsSuccessOpen(true);
    setTimeout(() => {
      navigate("/jobManagement");
    }, 2500);

  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Something went wrong");
  }
};

  if (loading) {
    return (
      <div className="h-screen py-50 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error || !jobData) {
    return (
      <div className="text-red-500 text-center py-50">
        {error || <img src={notdata} alt="No Data"></img>}
      </div>
    );
  }

  return (
    <>
      <div className="Postjob px-50 p-[24px] mt-[50px]">
        <div className="bg-white rounded-[24px] shadow-[0_4px_30px_rgba(0,0,0,0.06)] px-[40px] py-[32px] border border-[#F1F1F1]">
          {/* Progress Steps Indicator */}
          <div className="flex items-start justify-between mb-[80px] w-full bg-white gap-6">
            <div className="flex items-center justify-between relative flex-1 bg-white">
              <div
                className="absolute top-[16px] left-[20px] right-[20px] h-[5px] bg-[#EAEAEA] rounded-full z-0"
                style={{ transform: "translateY(-50%)" }}
              ></div>

              <div
                className="absolute top-[16px] h-[5px] bg-[#00694B] rounded-full z-0 transition-all duration-500 ease-in-out"
                style={{
                  transform: "translateY(-50%)",
                  width:
                    currentStep === 1
                      ? "0%"
                      : currentStep === 2
                        ? "50%"
                        : "100%",
                }}
              ></div>

              {/* Step 1 */}
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-[34px] h-[34px] rounded-full flex items-center justify-center text-[13px] font-bold border-[4px] border-white transition-colors duration-300 shadow-sm
            ${currentStep >= 1 ? "bg-[#00694B] text-white" : "bg-[#EAEAEA] text-[#9E9E9E]"}`}
                >
                  1
                </div>
                <p
                  className={`text-[13px] mt-4 absolute top-8 whitespace-nowrap tracking-wide transition-all duration-300 
            ${currentStep >= 1 ? "font-semibold text-[#111111]" : "font-medium text-[#B0B0B0]"}`}
                >
                  Basic Details
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-[34px] h-[34px] rounded-full flex items-center justify-center text-[13px] font-bold border-[4px] border-white transition-colors duration-300 shadow-sm
            ${currentStep >= 2 ? "bg-[#00694B] text-white" : "bg-[#EAEAEA] text-[#9E9E9E]"}`}
                >
                  2
                </div>
                <p
                  className={`text-[13px] mt-4 absolute top-8 whitespace-nowrap tracking-wide transition-all duration-300 
            ${currentStep >= 2 ? "font-semibold text-[#111111]" : "font-medium text-[#B0B0B0]"}`}
                >
                  Requirements & Content
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-[34px] h-[34px] rounded-full flex items-center justify-center text-[13px] font-bold border-[4px] border-white transition-colors duration-300 shadow-sm
            ${currentStep >= 3 ? "bg-[#00694B] text-white" : "bg-[#EAEAEA] text-[#9E9E9E]"}`}
                >
                  3
                </div>
                <p
                  className={`text-[13px] mt-4 absolute top-8 whitespace-nowrap tracking-wide transition-all duration-300 
            ${currentStep >= 3 ? "font-semibold text-[#111111]" : "font-medium text-[#B0B0B0]"}`}
                >
                  Preview
                </p>
              </div>
            </div>

            <button
              type="button"
              className="h-[44px] px-6 rounded-full border cursor-pointer border-[#152126] text-[#152126] text-[13px] font-semibold bg-white hover:bg-gray-50 transition-all whitespace-nowrap shadow-sm"
            >
              Save as draft
            </button>
          </div>
          
          <div className="job-review-details mt-[20px] px-[24px]">
            <div className="title flex items-center gap-[25px]">
              <div className="logo">
                <img src={jobData?.data?.job?.company?.image || logo} alt="" className="w-[94px] rounded-full object-cover" />
              </div>
              <div className="titlee">
                <h2 className="text-[#0D0D0D] text-[24px] font-[600]">
                  {jobData?.data?.job?.title || jobData?.data?.job?.job_title?.title}
                </h2>
                <div className="flex gap-[8px] items-center mt-[8px]">
                  <p className="text-[#0D0D0DA6] text-[18px]">at {jobData?.data?.job?.company?.name}</p>
                  <span className="bg-[#0BA02C] rounded-[3px] py-[4px] px-[12px] text-white text-[14px]">
                    {jobData?.data?.job?.employment_type?.title}
                  </span>
                </div>
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
                        {Number(jobData?.data?.job?.min_salary) > 0 || Number(jobData?.data?.job?.max_salary) > 0 ? `${jobData?.data?.job?.min_salary} - ${jobData?.data?.job?.max_salary}` : "Not specified"}
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
                          <p className="text-[16px] font-[400] text-[#0D0D0DA6]">Education Level</p>
                        </div>
                        {jobData?.data?.job?.education_levels?.map((edu) => (
                          <h2 key={edu.id} className="font-[600] text-[18px] mt-[8px]">{edu.title}</h2>
                        ))}
                      </div>

                      <div className="middle mt-[24px]">
                        <div className="flex items-center gap-[8px]">
                          <img src={frame3} alt="" />
                          <p className="text-[16px] font-[400] text-[#0D0D0DA6]">Mandatory Certifications</p>
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
                            <p className="text-[#0D0D0DA6] text-[16px] font-[400]">Availability</p>
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

          {/* Bottom Action Buttons */}
          <div className="flex items-center justify-center gap-4 mt-[40px]">
           <Link to={'/JobDescriptionRequirements/' + id}>
            <button
              type="button"
               className="w-[180px] h-[50px] rounded-full border cursor-pointer border-[#EAEAEA] bg-white text-[#152126] text-[15px] font-bold hover:bg-gray-50 transition-all shadow-sm"
            >
              Prev
            </button>
           </Link>
            <button
              type="button"
              onClick={onSubmit}
              className="w-[180px] h-[50px] rounded-full cursor-pointer bg-[#1C2427] text-white text-[15px] font-bold hover:bg-[#253034] transition-all shadow-sm"
            >
              Confirm & Post Job
            </button>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />
    </>
  );
}

export default JobPreview;