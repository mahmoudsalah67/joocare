import React, { useEffect, useRef, useState } from "react";
import "./Jobdetails.css";
import { motion } from "framer-motion";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import arrow from "../../../public/imge/img-jobs/arrow-square-left.svg";
import rating from "../../../public/imge/img-jobs/Job Rating.svg";
import save from "../../../public/imge/img-jobs/BookmarkSimple.svg";
import arrowright from "../../../public/imge/img-jobs/arrow-right.svg";
import logo from "../../../public/imge/16 [Converted].svg";
import dollar from "../../../public/imge/job-details/Location Icon (1).svg";
import map from "../../../public/imge/job-details/map-pin.svg";
import job from "../../../public/imge/job-details/Job Posted Icon.svg";
import frame from "../../../public/imge/job-details/Frame.svg";
import frame1 from "../../../public/imge/job-details/Frame (1).svg";
import frame2 from "../../../public/imge/job-details/Frame (2).svg";
import layer from "../../../public/imge/job-details/Layer_1.svg";
import frame3 from "../../../public/imge/job-details/briefcase.svg";
import CopyLinkIcon from "../../../public/imge/job-details/Copy Link Icon.svg";
import email from "../../../public/imge/job-details/Email Icon.svg";
import social1 from "../../../public/imge/job-details/Social icon.svg";
import social2 from "../../../public/imge/job-details/Social icon (1).svg";
import social3 from "../../../public/imge/job-details/Social icon (2).svg";
import star2 from "../../../public/imge/2.svg";
import currencydollar from "../../../public/imge/img-jobs/currency-dollar.svg";
import company from "../../../public/imge/Company Icon.svg";
import loction from "../../../public/imge/img-jobs/Location Icon.svg";
import clock from "../../../public/imge/clock.svg";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiX, FiUploadCloud, FiCheckCircle } from 'react-icons/fi'; // الأيكونات المطلوبة للموديلز

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";

function Jobdetails() {
const { id } = useParams();
  const navigate = useNavigate();
  const swiperRef = useRef(null);

  // States الأساسية للداتا والتحميل
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States الخاصة بالـ Apply Flow والـ Modals
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // هذا الملف المختار من الـ input
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast.success("Job link copied successfully.", {
        duration: 5000,
        style: {
          background: "#E6F4EA",
          color: "#1E4620",
          width: "400px",
        },
      });
    });
  };



  
   
  useEffect(() => {
    const getDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://joocare.nami-tec.com/api/user/jobs/${id}`
        );
        setJobData(res.data);
        window.scrollTo(0, 0);
      } catch (err) {
        console.error("error:", err);
        setError("error");
      } finally {
        loading(false);
      }
    };

    getDetails();
  }, [id]);

  // دالة التعامل مع رفع الـ CV والتقديم على الوظيفة
  const handleApplySubmit = async () => {
    // التأكد من أن المستخدم قام باختيار ملف أولاً
    if (!selectedFile) {
      setUploadError("Please select a CV file first.");
      return;
    }

    try {
      setIsSubmitting(true);
      setUploadError(null);
      let uploadedCvPath = "";

      // 1. رفع ملف الـ CV أولاً إلى السيرفر للحصول على المسار النصي
      const cvFormData = new FormData();
      cvFormData.append("image", selectedFile); // نمرر الـ State مباشرة (الملف الثنائي)

      const cvRes = await axios.post(
        "https://joocare.nami-tec.com/api/images", 
        cvFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        }
      );
      
      // استخراج مسار الملف النصي من الـ Response
      uploadedCvPath = cvRes.data?.data?.image || ""; 

      if (!uploadedCvPath) {
        throw new Error("Failed to get CV uploaded path.");
      }

       const response = await axios.post(
        "https://joocare.nami-tec.com/api/user/jobs", 
        {
          job_id: id,          
          cv: uploadedCvPath,   
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("user_token")}`,
          },
        }
      );

      // 3. معالجة حالة النجاح
      if (response.status === 200 || response.status === 201 || response.data?.success) {
        setShowUploadModal(false);   // إغلاق مودال الرفع
        setShowSuccessModal(true);   // فتح مودال النجاح المشابه للصورة المرفقة
        setSelectedFile(null);       // تفريغ الملف المختار بعد النجاح
      }

    } catch (err) {
      console.error("Error during application submission:", err);
      // إظهار رسالة الخطأ للمستخدم داخل المودال
      setUploadError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

const handleSave = async (id) => {
  try {
    // 1. تجهيز الـ FormData كما يتطلب الـ Backend
    const formData = new FormData();
    formData.append('_method', 'PUT'); // هذا هو ما يتوقعه الـ API

    // 2. إرسال الطلب
    const response = await axios.post(
      `https://joocare.nami-tec.com/api/user/jobs/${id}`, 
      formData, 
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("user_token")}`,
          "Content-Type": "multipart/form-data", // ضروري جداً عند استخدام FormData
        },
      }
    );

    console.log("Success:", response.data);
    alert("تم حفظ الوظيفة بنجاح!");
  } catch (err) {
    console.error("Error saving:", err);
    alert("حدث خطأ أثناء الحفظ");
  }
};
 

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="job-details mt-18">
        <div className="topp h-[200px] py-[40px] text-white bg-[#00694B]">
          <div className="container px-30 flex items-center justify-between">
            <h1 className="text-[18px] font-[600]">jobs</h1>
            <div className="flex items-center text-[18px] font-[600]">
              <Link to="/" className="cursor-pointer">
                Title
              </Link>
              <img src={arrow} alt="" className="text-white" />
              <p>job details</p>
            </div>
          </div>
        </div>
        <div className="container px-30 mx-auto">
          <div className="top z-[40] flex justify-between items-center bg-white mt-[-60px] p-[16px] rounded-lg shadow-lg shadow-[#0000000D]">
            <div className="leftt flex gap-[25px]">
              <div className="imge">
                <img
                  src={jobData?.data?.job?.company?.image || logo}
                  alt=""
                  className="w-[94.9565200805664px] rounded-full object-cover"
                />
              </div>
              <div className="content">
                <h2 className="text-[24px] font-[600] text-[#0D0D0DA6]">
                  {jobData?.data?.job?.title ||
                    jobData?.data?.job?.job_title?.title}
                </h2>
                <p className="text-[18px] font-[400] text-[#0D0D0DA6]">
                  at {jobData?.data?.job?.company?.name}{" "}
                  <span className="text-[14px] font-[600] text-white bg-[#0BA02C] py-[4px] px-[12px] rounded-[3px]">
                    {jobData?.data?.job?.employment_type?.title}
                  </span>
                </p>
                <p>{jobData?.data?.job?.created_at}</p>
              </div>
            </div>
            <div className="right flex items-center justify-center gap-[10px]">

             <div 
  onClick={() => handleSave(id)} // هنا ID الوظيفة
  className="save bg-[#00694B14] w-[56px] p-[16px] cursor-pointer rounded-[4px] flex items-center justify-center transition hover:bg-[#00694B24]"
>
  <img src={save} alt="Save Job" />
</div>
              <div className="btn">
                 <button
                  onClick={() => setShowUploadModal(true)}
                  className="bg-[#047857] text-white rounded-[999px] flex items-center gap-2 py-[8px] px-[16px] hover:bg-black duration-500 cursor-pointer"
                >
                  Apply Now <img src={arrowright} alt="" />
                </button>
              </div>
            </div>
          </div>
          <div className="botom grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 bg-gray-50 my-[24px] shadow-[#0000000D]">
            <div className="parent-left lg:col-span-8">
              <div className="leftt p-[28px] bg-white shadow-lg rounded-[16px]">
                <div className="title text-[21px] font-[700] text-[#00694B]">
                  Job Description
                </div>

                <div className="details mt-[16px]">
                  <div className="w-full max-w-full">
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
                </div>
              </div>
              <div className="about border-[2px] border-[#0D0D0D14] mt-[20px] py-[32px] bg-white shadow-lg shadow-[#0000000D] rounded-[16px]">
                <div className="content px-[16px]">
                  <h2 className="title font-[600] text-[18px]">
                    About the employer
                  </h2>
                  <div className="details border-[1px] border-[#0D0D0D0D] rounded-[16px] p-[8px] mt-[12px] pl-[16px] flex">
                    <div className="imge flex bg-[#F7FAF7] w-fit rounded-[16px]">
                      <img
                        src={jobData?.data?.job?.company?.image}
                        alt=""
                        className="w-[60px] h-[60px] rounded-2xl object-cover"
                      />
                    </div>
                    <div className="flex-col items-center justify-center ml-[16px]">
                      <h2 className="font-[600] text-[18px]">
                        {jobData?.data?.job?.company?.name}
                      </h2>
                      <p className="font-[400] text-[16px] text-[#0D0D0DA6]">
                        {jobData?.data?.job?.company?.domain?.title}
                      </p>
                    </div>
                  </div>
                  <p className="mt-[12px] text-[#212529] text-[14px] text-justify font-[400] w-full break-words whitespace-pre-line prose max-w-none">
                    {jobData?.data?.job?.company?.bio}
                  </p>
                  <Link
                    to={`/shared-company-profile/${jobData?.data?.job?.company_id}`}
                  >
                    <div className="btn-view mt-[12px] flex items-center justify-center mb-[32px]">
                      <button className="rounded-full border-[#1C2628] hover:bg-[#00694B] duration-500 hover:text-white hover:border-transparent cursor-pointer border-[1px] px-[20px] py-[10px]">
                        View Profile
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <div className="right lg:col-span-4">
              <div className="card1 border border-[#0D0D0D14] bg-white p-8 rounded-2xl shadow-sm">
                <div className="content flex items-center justify-between">
                  <div className="leftt flex flex-col items-center text-center gap-2 w-full">
                    <img src={dollar} alt="" />
                    <p className="font-semibold text-[16px] text-gray-800">
                      Salary (USD)
                    </p>
                    <p className="font-semibold text-[14px] text-[#00694B]">
                      {jobData?.data?.job?.min_salary} -{" "}
                      {jobData?.data?.job?.max_salary}
                    </p>
                    <p className="text-[13px] text-gray-500">Yearly salary</p>
                  </div>

                  <div className="w-[5px] h-[90px] bg-[#0D0D0D14] mx-6"></div>

                  <div className="flex flex-col items-center text-center gap-2 w-full">
                    <img src={map} alt="" />
                    <p className="font-semibold text-[16px] text-gray-800">
                      Job Location
                    </p>
                    <p className="font-semibold text-[14px] text-[#00694B]">
                      {jobData?.data?.job?.country?.name}
                    </p>
                    <p className="text-[14px] text-gray-500">
                      {jobData?.data?.job?.city?.name}
                    </p>
                  </div>
                </div>
              </div>
              <div className="card2 border border-[#0D0D0D14] bg-white py-[32px] rounded-2xl shadow-sm mt-[32px]">
                <div className="content px-[16px] text-[#0D0D0D] font-[600]">
                  <h3 className="title">Job Overview</h3>
                  <div className="details">
                    <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                      <div className="col-span-2 mt-[12px]">
                        <div className="flex items-center pb-[8px] gap-2">
                          <img src={job} alt="" />
                          <span className="text-gray-500 text-sm">
                            Experience
                          </span>
                        </div>
                        <p className="font-bold text-lg">
                          {jobData?.data?.job?.experience?.title}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center pb-[8px] gap-2">
                          <img src={frame} alt="" />
                          <span className="text-gray-500 text-sm">
                            Job Category
                          </span>
                        </div>
                        <p className="font-bold text-lg">
                          {jobData?.data?.job?.category?.title}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center pb-[8px] gap-2">
                          <img src={frame1} alt="" />
                          <span className="text-gray-500 text-sm">
                            Specialty
                          </span>
                        </div>
                        <p className="font-bold text-lg">
                          {jobData?.data?.job?.specialty?.title ||
                            jobData?.data?.job?.specialty_title}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center pb-[8px] gap-2">
                          <img src={layer} alt="" />
                          <span className="text-gray-500 text-sm">
                            Role category
                          </span>
                        </div>
                        <p className="font-bold text-lg">
                          {jobData?.data?.job?.role_category?.title}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center pb-[8px] gap-2">
                          <img src={frame2} alt="" />
                          <span className="text-gray-500 text-sm">
                            Seniority Level
                          </span>
                        </div>
                        <p className="font-bold text-lg">
                          {jobData?.data?.job?.seniority_level?.title}
                        </p>
                      </div>
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
                        <p className="text-[16px] font-[400] text-[#0D0D0DA6]">
                          Education Level
                        </p>
                      </div>
                      {jobData?.data?.job?.education_levels?.map((edu) => (
                        <h2
                          key={edu.id}
                          className="font-[600] text-[18px] mt-[8px]"
                        >
                          {edu.title}
                        </h2>
                      ))}
                    </div>
                    <div className="middle mt-[24px]">
                      <div className="flex items-center gap-[8px]">
                        <img src={frame3} alt="" />
                        <p className="text-[16px] font-[400] text-[#0D0D0DA6]">
                          Mandatory Certifications
                        </p>
                      </div>
                      <div className="middle-2">
                        {jobData?.data?.job?.mandatory_certifications?.map(
                          (cert) => (
                            <p
                              key={cert.id}
                              className="bg-[#1C262814] w-fit text-[12px] py-[4px] px-[12px] font-[400] rounded-[3px] mt-[8px]"
                            >
                              {cert.mandatory_certification?.title}
                            </p>
                          )
                        )}
                      </div>
                      <div className="botom mt-[24px]">
                        <div className="flex items-center gap-[8px]">
                          <img src={frame3} alt="" />
                          <p className="text-[#0D0D0DA6] text-[16px] font-[400]">
                            Availability
                          </p>
                        </div>
                        <h2 className="text-[16px] text-[#0D0D0D] mt-[8px] font-[600]">
                          {jobData?.data?.job?.availability?.title}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card4 border border-[#0D0D0D14] bg-white py-[32px] rounded-2xl shadow-sm mt-[32px]">
                <div className="content px-[16px]">
                  <div className="title">
                    <h2 className="font-[600] text-[18px] text-[#0D0D0D]">
                      Share this job:
                    </h2>
                    <div className="details px-[16px] flex items-center justify-between mt-[12px]">
                      <div className="copy-link bg-[#00694B14] py-[8px] px-[12px] rounded-[4px]">
                        <div className="imge flex items-center gap-[6px]">
                          <img src={CopyLinkIcon} alt="" />
                          <p
                            onClick={handleCopyLink}
                            className="text-[#00694B] text-[18px] cursor-pointer"
                          >
                            Copy Link
                          </p>
                        </div>
                      </div>
                      <div className="linkedin cursor-pointer bg-[#00694B14] p-[10px] rounded-[4px]">
                        <div className="imge">
                          <a href={jobData?.data?.job?.company?.linkedin}>
                            <img src={social1} alt="" />
                          </a>
                        </div>
                      </div>
                      <div className="facebook bg-[#00694B14] p-[10px] rounded-[4px]">
                        <div className="imge">
                          <a href={jobData?.data?.job?.company?.facebook}>
                            <img src={social2} alt="" />
                          </a>
                        </div>
                      </div>
                      <div className="tewater bg-[#00694B14] p-[10px] rounded-[4px]">
                        <div className="imge">
                          <a href={jobData?.data?.job?.company?.twitter}>
                            <img src={social3} alt="" />
                          </a>
                        </div>
                      </div>
                      <div className="email bg-[#00694B14] p-[10px] rounded-[4px]">
                        <div className="img">
                          <a href={jobData?.data?.job?.company?.email}>
                            <img src={email} alt="" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="similarjobs">
            <div className="title flex justify-between items-center pt-[132px] mb-[50px]">
              <div className="title-left">
                <div className="title-1 flex items-center gap-2 mb-6 border-[1px] border-[#2E90A61A] rounded-[12px] py-[8px] px-[16px] w-fit bg-[#12121205]">
                  <img src={star2} alt="" />
                  <p className="text-[#1C2628] text-[16px] font-[400]">
                    similar jobs
                  </p>
                </div>
                <div className="font-[600] text-[28px] w-[526px] mb-[21px]">
                  <h2>Handpicked for your profile</h2>
                </div>
              </div>
              <div className="right">
                <div className="flex gap-[8px]">
                  <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="w-[48px] h-[48px] text-[24px] text-2xl cursor-pointer rounded-full border border-[#0D0D0DA6] hover:bg-gray-100 transition"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="w-[48px] h-[48px] text-[24px] text-2xl cursor-pointer rounded-full border border-[#0D0D0DA6] hover:bg-gray-100 transition"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              slidesPerView={1}
              spaceBetween={30}
              breakpoints={{
                1024: { slidesPerView: 3 },
                768: { slidesPerView: 2 },
              }}
            >
              {jobData?.data?.similar_jobs?.map((jobItem) => (
                <SwiperSlide key={jobItem.id}>
                  <Link to={`/job/${jobItem.id}`}>
                    <div className="border-[2px] mb-[20px] border-white hover:border-[#00694B] transition duration-300 rounded-[16px] p-[16px] cursor-pointer shadow-md">
                      <div className="flex items-start justify-between mb-[12px]">
                        <div className="flex items-center gap-[12px]">
                          <img
                            src={jobItem.company?.image}
                            alt="logo"
                            className="w-[48px] h-[48px] rounded-[8px] object-cover"
                          />
                          <div>
                            <h3 className="font-[600] text-[16px]">
                              {jobItem.title || jobItem.job_title?.title}
                            </h3>
                            <p className="text-gray-400 text-[13px]">
                              {jobItem.company?.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-[#00694B] font-[600] text-[14px]">
                          <span>
                            <img src={rating} alt="" />
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-[6px] mb-[12px]">
                        {jobItem.experience?.title && (
                          <span className="bg-[#0D0D0D0D] text-gray-500 text-[12px] py-[4px] px-[10px] rounded-full">
                            {jobItem.experience.title}
                          </span>
                        )}
                        {jobItem.employment_type?.title && (
                          <span className="bg-[#0D0D0D0D] text-gray-500 text-[12px] py-[4px] px-[10px] rounded-full">
                            {jobItem.employment_type.title}
                          </span>
                        )}
                        {jobItem.specialty?.title && (
                          <span className="bg-[#0D0D0D0D] text-gray-500 text-[12px] py-[4px] px-[10px] rounded-full">
                            {jobItem.specialty.title}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-[12px] text-[13px] text-gray-500 mb-[10px]">
                        <div className="flex items-center gap-1">
                          <img src={loction} alt="" />
                          <span>
                            {jobItem.city?.name}, {jobItem.country?.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <img src={company} alt="" />
                          <span>{jobItem.specialty?.title}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <img src={currencydollar} alt="" />
                          <span>
                            {Number(jobItem.min_salary) > 0 ||
                            Number(jobItem.max_salary) > 0
                              ? `${jobItem.min_salary} : ${jobItem.max_salary}$`
                              : "Not specified"}
                          </span>
                        </div>
                      </div>

                      <p
                        className="text-gray-500 text-[13px] line-clamp-1 mb-[12px]"
                        dangerouslySetInnerHTML={{ __html: jobItem.description }}
                      />

                      <div className="flex items-center gap-1 text-gray-400 text-[12px]">
                        <img src={clock} alt="" />
                        <span>{jobItem.created_at}</span>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* ==================== MODAL 1: UPLOAD CV ==================== */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] max-w-[600px] w-full p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowUploadModal(false)} 
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition cursor-pointer"
            >
              <FiX size={22} />
            </button>

            <h3 className="text-xl font-extrabold text-[#0D0D0D] mb-2 text-left">CV submission required</h3>
            <p className="text-gray-500 text-xs leading-relaxed mb-6 text-left">
              To complete your application for this position, the medical entity needs to review your CV. 
              You can upload the file now in (PDF) or (Word) format and apply immediately.
            </p>

            <div className="border-2 border-dashed border-gray-200 hover:border-[#00694B]/50 rounded-2xl p-6 bg-[#F8F9FA] text-center relative transition cursor-pointer">
              <input 
                type="file" 
                accept=".pdf,.doc,.docx"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  if(e.target.files[0]) setSelectedFile(e.target.files[0]);
                }}
              />
              <FiUploadCloud className="text-3xl text-[#00694B] mx-auto mb-2" />
              <p className="text-xs font-bold text-gray-700">Drag & Drop your files or <span className="text-[#00694B] underline">Browse</span></p>
              <p className="text-[10px] text-gray-400 mt-1">Supported formats: PDF, DOC, DOCX (Max 10MB)</p>
            </div>

            {selectedFile && (
              <div className="mt-4 bg-[#E6F0EC] border border-[#D2E6DE] rounded-xl p-3 flex items-center justify-between text-xs text-[#00694B] font-bold">
                <span className="truncate">{selectedFile.name}</span>
                <button onClick={() => setSelectedFile(null)} className="text-gray-500 hover:text-red-500 cursor-pointer">
                  <FiX size={16} />
                </button>
              </div>
            )}

            {uploadError && (
              <p className="text-red-500 text-xs font-semibold mt-3 text-center">{uploadError}</p>
            )}

            <button 
              onClick={handleApplySubmit}
              disabled={isSubmitting}
              className="w-full mt-6 bg-[#00694B] hover:bg-[#00523A] disabled:bg-gray-300 text-white font-bold py-3.5 rounded-full transition shadow-lg shadow-[#00694B]/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : "Apply Now"}
            </button>
          </div>
        </div>
      )}

      {/* ==================== MODAL 2: SUCCESS ==================== */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] max-w-[550px] w-full p-8 text-center relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowSuccessModal(false)} 
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition cursor-pointer"
            >
              <FiX size={22} />
            </button>

            <div className="w-20 h-20 bg-[#E6F0EC] text-[#00694B] rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheckCircle size={40} />
            </div>

            <h3 className="text-xl font-black text-[#0D0D0D] mb-3">Your request has been successfully submitted!</h3>
            <p className="text-gray-400 text-xs font-semibold leading-relaxed max-w-[400px] mx-auto mb-8">
              Congratulations! Your CV is now in the hands of the recruitment team. 
              The team will review your file and contact you via email if you are selected for an interview.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate('/applications'); // التوجيه لصفحة الـ Applications الحالية
                }}
                className="w-full sm:w-auto px-6 py-3 bg-[#00694B] hover:bg-[#00523A] text-white font-bold rounded-full transition text-sm whitespace-nowrap cursor-pointer"
              >
                Go to Applications
              </button>
              <button 
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate('/jobs'); // إرجاعه لصفحة تصفح الوظائف
                }}
                className="w-full sm:w-auto px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-full transition text-sm whitespace-nowrap cursor-pointer"
              >
                Explore more jobs
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Jobdetails;