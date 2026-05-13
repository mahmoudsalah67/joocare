import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
 import linkedin from "../../../public/imge/job-details/Social Media Icon (5).svg";
import face from "../../../public/imge/job-details/Social Media Icon (6).svg";
import insta from "../../../public/imge/job-details/Social Media Icon (7).svg";
import x from "../../../public/imge/job-details/Social Media Icon (8).svg";
import snapchat from "../../../public/imge/job-details/Social Media Icon (9).svg";
import copylink from "../../../public/imge/job-details/Copy Link Icon.svg";
import location from "../../../public/imge/job-details/Location Icon3.svg";
import pharamce from "../../../public/imge/job-details/Job Type Icon.svg";
import dollar from "../../../public/imge/job-details/currency-dollar.svg";
import save from "../../../public/imge/job-details/savee.svg";
import share from "../../../public/imge/job-details/sharee.svg";
import arrow from "../../../public/imge/img-jobs/arrow-square-left.svg";
import arrowright from "../../../public/imge/img-jobs/arrow-right.svg";
import axios from "axios";

function Sharedcompanyprofile() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyJobs, setCompanyJobs] = useState([]);
  const [jobDatacompany, setJobDatacompany] = useState(null);

  const fetchJobs = async (page = 1) => {
    try {
      const jobsRes = await axios.get(
        `https://admin.joocare.com/api/user/companies/${id}/jobs?pagination=on&limit_per_page=10&page=${page}`,
      );
      setCompanyJobs(jobsRes.data.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const companyRes = await axios.get(
        `https://admin.joocare.com/api/user/companies/${id}`,
      );
      setJobDatacompany(companyRes.data);
      await fetchJobs();
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) fetchAllData();
  }, [id]);

  if (loading)
    return (
      <div className="h-screen py-50 flex items-center justify-center">
        loading...
      </div>
    );
  if (error || !jobDatacompany)
    return (
      <div className="text-red-500 text-center py-50">{error || "no data"}</div>
    );

  return (
    <>
      <div className="sharedcompanyprofile mt-22">
        <div className="topp h-[200px] py-[40px] text-white bg-[#00694B]">
          <div className="container px-30 flex items-center justify-between">
            <h1 className="text-[18px] font-[600]">
              About {jobDatacompany?.data?.company?.name}
            </h1>
            <div className="flex items-center text-[18px] font-[600]">
              <Link to="/" className="cursor-pointer">
                Title
              </Link>
              <img src={arrow} alt="" className="text-white" />
              <p>About {jobDatacompany?.data?.company?.name}</p>
            </div>
          </div>
        </div>

        <div className="container w-[1000px] mx-auto mb-[95px]">
          <div className="big-card p-[24px] border-[1px] border-[#0D0D0D14] bg-white mt-[-80px] rounded-[16px] shadow-lg shadow-[#0000000D]">
            {/* Card 1 - Cover & Profile */}
            <div className="card1 w-full bg-white rounded-[24px] overflow-hidden shadow-sm">
              <div className="img-background h-[250px]">
                <img
                  src={jobDatacompany?.data?.company?.cover}
                  alt="cover"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="img-profile flex items-end gap-[16px] px-[24px] pb-[24px]">
                <div className="relative mt-[-75px] bg-white p-[4px] rounded-full border-white border-[4px] shadow-md">
                  <div className="w-[140px] h-[140px] rounded-full overflow-hidden flex items-center justify-center bg-[#F7FAF7]">
                    <img
                      src={jobDatacompany?.data?.company?.image}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="pb-[10px]">
                  <h1 className="text-[#0D0D0D] font-[600] text-[28px]">
                    {jobDatacompany?.data?.company?.name}
                  </h1>
                </div>
              </div>
            </div>

            {/* Card 2 - About */}
            <div className="card2 mt-[16px] p-[16px] border-[1px] border-[#0D0D0D14] rounded-[16px]">
              <div className="title">
                <h2 className="font-[600] text-[18px]">About</h2>
                <p className="text-justify text-[14px] font-[400] mt-[12px]">
                  {jobDatacompany?.data?.company?.bio}
                </p>
              </div>
              <div className="sochail mt-[12px] flex items-center justify-between">
                <div className="media flex gap-[8px] items-center">
                  <a href={jobDatacompany?.data?.company?.linkedin}>
                    <img src={linkedin} alt="" />
                  </a>
                  <a href={jobDatacompany?.data?.company?.facebook}>
                    <img src={face} alt="" />
                  </a>
                  <a href={jobDatacompany?.data?.company?.instagram}>
                    <img src={insta} alt="" />
                  </a>
                  <a href={jobDatacompany?.data?.company?.twitter}>
                    <img src={x} alt="" />
                  </a>
                  <a href={jobDatacompany?.data?.company?.snapchat}>
                    <img src={snapchat} alt="" />
                  </a>
                </div>
                <div className="share flex gap-[6px] items-center bg-[#00694B14] py-[8px] px-[16px] rounded-full cursor-pointer">
                  <img src={copylink} alt="" />
                  <p className="text-[18px] font-[400]">Share</p>
                </div>
              </div>
            </div>

            {/* Card 3 - More Jobs */}
            <div className="card3 mt-[16px] p-[16px] border-[1px] border-[#0D0D0D14] rounded-[16px]">
              <div className="title">
                <h2 className="text-[18px] font-[600] text-[#0D0D0D]">
                  More Jobs
                </h2>
              </div>

              <div className="cards grid grid-cols-2 gap-[12px] mt-[12px]">
                {companyJobs?.map((job) => (
                  <div
                    key={job.id}
                    className="crad border-[1px] border-[#0D0D0D14] p-[16px] rounded-2xl"
                  >
                    <div className="title-logo flex gap-[14px]">
                      <div className="logo">
                        <img
                          src={jobDatacompany?.data?.company?.image}
                          alt=""
                          className="w-[48px] h-[48px] rounded-full object-cover"
                        />
                      </div>

                      <div className="title">
                        <h2 className="font-[600] text-[18px]">
                          {job.title || job.job_title?.title}
                        </h2>

                        <p className="font-[400] text-[14px]">
                          {jobDatacompany?.data?.company?.name}
                        </p>

                        <p className="font-[400] text-[12px] text-[#F59E0B]">
                          {job.created_at}
                        </p>
                      </div>
                    </div>

                    <div className="person text-[14px] font-[400] mt-[16px] flex gap-[8px] items-center text-[#1C2628]">
                      <div className="location flex items-center gap-[4px]">
                        <img src={location} alt="" />
                        <p>
                          {job.city?.name}, {job.country?.name}
                        </p>
                      </div>
                      <div className="pharamce flex items-center gap-[4px]">
                        <img src={pharamce} alt="" />
                        <p>{job.specialty?.title}</p>
                      </div>
                      <div className="dollar flex items-center gap-[4px]">
                        <img src={dollar} alt="" />
                        <p>
                          {Number(job.min_salary) > 0 ||
                          Number(job.max_salary) > 0
                            ? `${job.min_salary}$ - ${job.max_salary}$`
                            : "Not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="tags flex flex-wrap gap-[4px] mt-[8px] mb-[8px]">
                      {job.experience?.title && (
                        <span className="rounded-[999px] py-[4px] px-[12px] bg-[#0D0D0D0D] text-[12px]">
                          {job.experience.title}
                        </span>
                      )}
                      {job.employment_type?.title && (
                        <span className="rounded-[999px] py-[4px] px-[12px] bg-[#0D0D0D0D] text-[12px]">
                          {job.employment_type.title}
                        </span>
                      )}
                      {job.category?.title && (
                        <span className="rounded-[999px] py-[4px] px-[12px] bg-[#0D0D0D0D] text-[12px]">
                          {job.category.title}
                        </span>
                      )}
                    </div>

                    <div className="desc mt-[8px] text-[14px] text-gray-600 line-clamp-2">
                      <p
                        dangerouslySetInnerHTML={{ __html: job.description }}
                      />
                    </div>

                    <div className="br border-[#0D0D0D14] border-[1px] mt-[16px]"></div>

                    <div className="buttom flex items-center justify-between mt-[16px] gap-[8px]">
                      <div className="flex items-center gap-[6px]">
                        <div className="save flex items-center gap-[4px] text-[#0D0D0DA6] bg-[#0D0D0D0D] rounded-full border-[1px] border-[#0D0D0D14] hover:text-[#000000] duration-500 cursor-pointer py-[8px] px-[16px]">
                          <img src={save} alt="" />
                          <p>save</p>
                        </div>
                        <div className="share flex items-center gap-[4px] bg-[#0D0D0D0D] text-[#0D0D0DA6] rounded-full border-[1px] hover:text-[#000000] duration-500 cursor-pointer border-[#0D0D0D14] py-[8px] px-[16px]">
                          <img src={share} alt="" />
                          <p>share</p>
                        </div>
                      </div>
                      <Link to={`/job/${job.id}`}>
                        <div className="view flex items-center gap-[4px] text-white py-[8px] px-[12px] rounded-full bg-[#00694B] hover:bg-black duration-500 cursor-pointer">
                          <button className="cursor-pointer">View Job</button>
                          <img src={arrowright} alt="" />
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sharedcompanyprofile;
