import React, { useEffect, useRef, useState } from "react";
import "./Jobdetails.css";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import arrow from "../../../public/imge/img-jobs/arrow-square-left.svg";
import logo from "../../../public/imge/16 [Converted].svg";
import rating from "../../../public/imge/img-jobs/Job Rating.svg";
import save from "../../../public/imge/img-jobs/BookmarkSimple.svg";
import arrowright from "../../../public//imge/img-jobs/arrow-right.svg";
import rr from "../../../public//imge/img-jobs/Rectangle 5439.svg";
import dollar from "../../../public//imge/job-details/Location Icon (1).svg";
import map from "../../../public//imge/job-details/map-pin.svg";
import job from "../../../public//imge/job-details/Job Posted Icon.svg";
import frame from "../../../public//imge/job-details/Frame.svg";
import frame1 from "../../../public//imge/job-details/Frame (1).svg";
import frame2 from "../../../public//imge/job-details/Frame (2).svg";
import layer from "../../../public//imge/job-details/Layer_1.svg";
import frame3 from "../../../public//imge/job-details/briefcase.svg";
import CopyLinkIcon from "../../../public//imge/job-details/Copy Link Icon.svg";
import email from "../../../public//imge/job-details/Email Icon.svg";
import social1 from "../../../public//imge/job-details/Social icon.svg";
import social2 from "../../../public//imge/job-details/Social icon (1).svg";
import social3 from "../../../public//imge/job-details/Social icon (2).svg";
import star2 from "../../../public/imge/2.svg";
import currencydollar from "../../../public/imge/img-jobs/currency-dollar.svg";
import company from "../../../public/imge/Company Icon.svg";
import loction from "../../../public/imge//img-jobs/Location Icon.svg";
import clock from "../../../public/imge/clock.svg";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Mousewheel, Keyboard } from "swiper/modules";
import axios from "axios";

function Jobdetails() {
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
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const getDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://admin.joocare.com/api/user/jobs/${id}`,
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

    getDetails();
  }, [id]);

  if (loading)
    return (
      <div className="h-screen py-50 flex items-center justify-center">
        loding...
      </div>
    );

  if (error || !jobData)
    return (
      <div className="text-red-500 text-center py-50">
        {error || "not data"}
      </div>
    );
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="job-details mt-22">
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
          <div className="top z-1000 flex justify-between items-center bg-white mt-[-60px] p-[16px] rounded-lg shadow-lg shadow-[#0000000D]">
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
              <div className="save bg-[#00694B14] w-[56px] p-[16px] cursor-pointer rounded-[4px] flex items-center justify-center">
                <img src={save} alt="" />
              </div>
              <div className="btn">
                <NavLink
                  to={"/jobdetails"}
                  className="bg-[#047857] text-white rounded-[999px] flex items-center gap-2 py-[8px] px-[16px] hover:bg-black duration-500"
                >
                  Apply Now <img src={arrowright} alt="" />
                </NavLink>
              </div>
            </div>
          </div>
          <div className="botom grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 bg-gray-50 bg-white   my-[24px] shadow-[#0000000D]">
            <div className="parent-left lg:col-span-8  ">
              <div className="leftt p-[28px]  bg-white shadow-lg rounded-[16px] ">
                <div className="title text-[21px] font-[700] text-[#00694B]">
                  Job Description
                </div>

                <div className="details mt-[16px]">
                  <div className="details-1">
                    Qualifications
                    <div className="p text-[14px] font-[400] mt-[12px]">
                      <p>
                        <div
                          className="details mt-[16px] text-[14px] font-[400]"
                          dangerouslySetInnerHTML={{
                            __html: jobData?.data?.job?.description,
                          }}
                        />
                      </p>
                    </div>
                    <div className="pt-[16px] pb-[28px]">
                      <p className="text-[#00694B] font-[700] text-[21px]">
                        Skills:
                      </p>
                      <ul className="text-[#212529] pl-4 pt-[8px] text-[16px] font-[400]">
                        {jobData?.data?.job?.skills?.map((skill) => (
                          <li key={skill.id}>- {skill.title}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about border-[2px] border-[#0D0D0D14] mt-[20px] py-[32px] bg-white shadow-lg shadow-[#0000000D] rounded-[16px]">
                <div className="content px-[16px]">
                  <h2 className="title font-[600] text-[18px]">
                    About the employer
                  </h2>
                  <div className="details border-[1px] border-[#0D0D0D0D] rounded-[16px] p-[8px] mt-[12px]  pl-[16px] flex">
                    <div className="imge flex bg-[#F7FAF7] w-fit rounded-[16px]">
                      <img
                        src={jobData?.data?.job?.company?.image}
                        alt=""
                        className="w-[60px] h-[60px] rounded-2xl  object-cover"
                      />
                    </div>
                    <div className="flex-col items-center justify-center ml-[16px]">
                      <h2 className="font-[600] text-[18px] ">
                        {jobData?.data?.job?.company?.name}
                      </h2>
                      <p className="font-[400] text-[16px] text-[#0D0D0DA6]">
                        {jobData?.data?.job?.company?.domain?.title}
                      </p>
                    </div>
                  </div>
                  <p className="mt-[12px] text-justify    text-[400] text-[14px]  text-[#0D0D0DA6]">
                    {jobData?.data?.job?.company?.bio}
                  </p>
                  <Link
                    to={`/shared-company-profile/${jobData?.data?.job?.company_id}`}
                  >
                    <div className="btn-view flex items-center justify-center mb-[32px]">
                      <button className=" rounded-full border-[#1C2628] hover:bg-[#00694B] duration-500 hover:text-white hover:border-transparent cursor-pointer  border-[1px] rounded- px-[20px] py-[10px]">
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
                  {/* LEFT */}
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

                  {/* LINE */}
                  <div className="w-[5px] h-[90px] bg-[#0D0D0D14] mx-6"></div>

                  {/* RIGHT */}
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
                          ),
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
                    <div className="details px-[16px] flex items-center justify-between mt-[12px] ">
                      <div className="copy-link bg-[#00694B14] py-[8px] px-[12px]  rounded-[4px]">
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
                      <div className="linkedin cursor-pointer bg-[#00694B14]  p-[10px]  rounded-[4px]">
                        <div className="imge ">
                          <a href={jobData?.data?.job?.company?.linkedin}>
                            <img src={social1} alt="" />
                          </a>
                        </div>
                      </div>
                      <div className="facebook bg-[#00694B14]  p-[10px]  rounded-[4px]">
                        <div className="imge">
                          <a href={jobData?.data?.job?.company?.facebook}>
                            <img src={social2} alt="" />
                          </a>
                        </div>
                      </div>
                      <div className="tewater bg-[#00694B14]  p-[10px]  rounded-[4px]">
                        <div className="imge">
                          <a href={jobData?.data?.job?.company?.twitter}>
                            <img src={social3} alt="" />
                          </a>
                        </div>
                      </div>
                      <div className="email bg-[#00694B14]  p-[10px]  rounded-[4px]">
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
          <div className="similarjobs ">
            <div className="title flex justify-between items-center pt-[132px] mb-[50px]">
              <div className="title-left">
                <div className="title-1 flex items-center  gap-2 mb-6 border-[1px] border-[#2E90A61A] rounded-[12px] py-[8px] px-[16px] w-fit bg-[#12121205]">
                  <img src={star2} alt="" />
                  <p className="text-[#1C2628] text-[16px] font-[400]">
                    similar jobs
                  </p>
                </div>
                <h1 className="font-[600] text-[28px] w-[526px] mb-[21px]">
                  <h2>Handpicked for your profile</h2>
                </h1>
              </div>
              <div className="right ">
                <div className="flex  gap-[8px]  ">
                  <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="w-[48px] h-[48px] text-[24px] text-2xl cursor-pointer rounded-full border border-[#0D0D0DA6]  hover:bg-gray-100 transition"
                  >
                    ‹
                  </button>
                  <button
                    onClick={() => swiperRef.current?.slideNext()}
                    className="w-[48px] h-[48px] text-[24px] text-2xl cursor-pointer rounded-full border border-[#0D0D0DA6]  hover:bg-gray-100 transition"
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
              {jobData?.data?.similar_jobs?.map((job) => (
                <SwiperSlide key={job.id}>
                  <Link to={`/job/${job.id}`}>
                    <div className="border-[2px] mb-[20px] border-white  hover:border-[#00694B] transition duration-300 rounded-[16px] p-[16px] cursor-pointer shadow-md">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-[12px]">
                        <div className="flex items-center gap-[12px]">
                          <img
                            src={job.company?.image}
                            alt="logo"
                            className="w-[48px] h-[48px] rounded-[8px] object-cover"
                          />
                          <div>
                            <h3 className="font-[600] text-[16px]">
                              {job.title || job.job_title?.title}
                            </h3>
                            <p className="text-gray-400 text-[13px]">
                              {job.company?.name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-[#00694B] font-[600] text-[14px]">
                          <span>
                            <img src={rating} alt="" />
                          </span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-[6px] mb-[12px]">
                        {job.experience?.title && (
                          <span className="bg-[#0D0D0D0D] text-gray-500 text-[12px] py-[4px] px-[10px] rounded-full">
                            {job.experience.title}
                          </span>
                        )}
                        {job.employment_type?.title && (
                          <span className="bg-[#0D0D0D0D] text-gray-500 text-[12px] py-[4px] px-[10px] rounded-full">
                            {job.employment_type.title}
                          </span>
                        )}
                        {job.specialty?.title && (
                          <span className="bg-[#0D0D0D0D] text-gray-500 text-[12px] py-[4px] px-[10px] rounded-full">
                            {job.specialty.title}
                          </span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex flex-wrap items-center gap-[12px] text-[13px] text-gray-500 mb-[10px]">
                        <div className="flex items-center gap-1">
                          <img src={loction} alt="" />
                          <span>
                            {job.city?.name}, {job.country?.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <img src={company} alt="" />
                          <span>{job.specialty?.title}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <img src={currencydollar} alt="" />
                          <span>
                            {Number(job.min_salary) > 0 ||
                            Number(job.max_salary) > 0
                              ? `${job.min_salary} : ${job.max_salary}$`
                              : "Not specified"}
                          </span>
                        </div>
                      </div>

                      {/* Description */}
                      <p
                        className="text-gray-500 text-[13px] line-clamp-1 mb-[12px]"
                        dangerouslySetInnerHTML={{ __html: job.description }}
                      />

                      {/* Time */}
                      <div className="flex items-center gap-1 text-gray-400 text-[12px]">
                        <img src={clock} alt="" />
                        <span>{job.created_at}</span>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Jobdetails;
