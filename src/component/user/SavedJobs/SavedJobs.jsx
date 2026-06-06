 


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiMapPin, FiBriefcase, FiDollarSign, FiArrowRight, FiBookmark } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import loction from "../../../../public/imge//img-jobs/Location Icon.svg";
import jobtype from "../../../../public/imge/img-jobs/Job Type Icon.svg";
import currencydollar from "../../../../public/imge/img-jobs/currency-dollar.svg";
import save from "../../../../public/imge/img-jobs/save.svg";
import arrowright from "../../../../public/imge/img-jobs/arrow-right.svg";

import share from "../../../../public/imge/img-jobs/share.svg";
import { NavLink } from 'react-router-dom';
const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

 const handleSave = async (jobId) => {
    try {
      const formData = new FormData();
      formData.append('_method', 'PUT');

      await axios.post(
        `https://joocare.nami-tec.com/api/user/jobs/${jobId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user_token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // حذف الوظيفة من الواجهة فوراً
      setSavedJobs((prev) => prev.filter((item) => item.id !== jobId));
    } catch (err) {
      console.error("Error toggling save:", err);
    }
  };

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const res = await axios.get('https://joocare.nami-tec.com/api/user/saved-jobs', {
          headers: { Authorization: `Bearer ${localStorage.getItem('user_token')}` }
        });
        setSavedJobs(res.data.data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedJobs();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <>
        <div className="bg-[#0D0D0D0D] border-b z-1000 border-gray-200/80 py-5 mt-[-50px] ">
                <div className="max-w-[1320px] mx-auto px-6 flex justify-between items-center text-sm font-medium">
                  <span className="text-[#0D0D0D] font-bold text-base">Saved Jobs</span>
                  <div className="flex items-center gap-2">
                    <Link to={'/'} className='text-[16px] font-[600]'>Home</Link>
                    <span>&gt;</span>
                    <span className="text-gray-900 font-semibold">Saved Jobs</span>
                  </div>
                </div>
              </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mt-20">

      {savedJobs.map((job) => (
                      <div key={job.id} className="card border-[2px] hover:border-[#047857] duration-500 cursor-pointer bg-white rounded-[16px] border-[1px] border-[#0D0D0D14] shadow-lg p-[16px] flex flex-col h-full">
                        <div className="title flex justify-between items-start mb-[16px]">
                          <div className="flex gap-[14px] flex-1 min-w-0">
                            <img src={job.company?.image} alt="logo" className="w-[48px] h-[48px] rounded-full object-cover shrink-0" />
                            <div className="min-w-0 flex-1">
                              <h3 className="font-[600] truncate text-[16px]">{job.title || job.job_title?.title}</h3>
                              <p className="text-gray-500 text-[14px] truncate">{job.company?.name}</p>
                              <p className="text-[#F59E0B] text-[12px]">{job.created_at}</p>
                            </div>
                          </div>
                        </div>
                        <div className="info flex flex-wrap items-center gap-[12px] text-[13px] mb-[16px]">
                          <div className="flex items-center gap-1 shrink-0">
                            <img src={loction} alt="" className="w-4 h-4" />
                            <span className="truncate max-w-[120px]">{job.city?.name}, {job.country?.name}</span>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <img src={jobtype} alt="" className="w-4 h-4" />
                            <span className="truncate max-w-[120px]">{job.specialty_title}</span>
                          </div>
                          <div className="flex items-center gap-1 shrink-0 font-bold text-[#047857]">
                            <img src={currencydollar} alt="" className="w-4 h-4" />
                            <span>  {job.min_salary} -{" "}
                                                  {job.max_salary}</span>
                          </div>
                        </div>
                        <div className="tags flex flex-wrap gap-[6px] mb-[16px]">
                          {job.experience?.title && <span className="rounded-[999px] py-[4px] px-[12px] bg-[#0D0D0D0D] text-[11px] font-medium">{job.experience.title}</span>}
                          {job.employment_type?.title && <span className="rounded-[999px] py-[4px] px-[12px] bg-[#0D0D0D0D] text-[11px] font-medium">{job.employment_type.title}</span>}
                          {job.category?.title && <span className="rounded-[999px] py-[4px] px-[12px] bg-[#0D0D0D0D] text-[11px] font-medium">{job.category.title}</span>}
                        </div>
                        <p className="text-gray-600 text-[14px] mb-[16px] line-clamp-2 break-words flex-grow" dangerouslySetInnerHTML={{ __html: job.description }} />
                        <div className="border-t border-[#0D0D0D14] pt-[16px] flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
                          <div className="flex gap-[8px] w-full sm:w-auto">
                            <NavLink to={'/Savedjobs'}>
                            <button 
                onClick={() => handleSave(job.id)}
                className="flex items-center gap-2 rounded-[999px] py-[8px] px-[16px] bg-[#00694B] hover:bg-[#0D0D0D] cursor-pointer duration-300 text-white text-[13px] font-semibold"
              >
                <FiBookmark /> Saved
              </button>

                            </NavLink>
                            <button className="flex-1 sm:flex-none flex items-center justify-center gap-1 rounded-[999px] py-[8px] px-[16px] bg-[#0D0D0D0D] border border-[#0D0D0D14] text-[13px] font-semibold">
                              <img src={share} alt="" className="w-4 h-4" /> Share
                            </button>
                          </div>
                          <NavLink to={`/job/${job.id}`} className="w-full sm:w-auto bg-[#047857] text-white rounded-[999px] flex items-center justify-center gap-2 py-[8px] px-[20px] hover:bg-black transition text-[14px] font-bold">
                            View <img src={arrowright} alt="" className="brightness-0 invert w-3 h-3" />
                          </NavLink>
                        </div>
                      </div>
                    ))}
    </div>
    </>
  );
};

export default SavedJobs;