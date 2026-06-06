import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiMapPin, FiBriefcase, FiDollarSign, FiBookmark, FiShare2, FiArrowRight } from 'react-icons/fi';
import UserSidebar from '../layout/UserSidebar';
import defaultLogo from "../../../../public/imge/16 [Converted].svg";

function Applications() {
    const [appliedJobs, setAppliedJobs] = useState([]);
     const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   

  useEffect(() => {
      axios.get('https://joocare.nami-tec.com/api/user/applications', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('user_token')}`,  
          'Accept': 'application/json'
        }
      })
      .then((response) => {
        if (response.data && response.data.data) {
          setAppliedJobs(response.data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching applied jobs:", err);
        setError("Failed to load your applications. Please login again.");
        setLoading(false);
      });
    }, []);
    console.log(appliedJobs);

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-28 pb-16 text-[#0D0D0D] font-sans antialiased selection:bg-[#00694B]/10">
      
      {/* الـ Breadcrumb العلوي */}
      <div className="bg-[#0D0D0D0D] border-b border-gray-200/80 py-5 mt-[-50px] mb-8">
        <div className="max-w-[1320px] mx-auto px-6 flex justify-between items-center text-sm font-medium">
          <span className="text-[#0D0D0D] font-bold text-base">Jobs</span>
          <div className="flex items-center gap-2">
            <Link to={'/'} className='text-[16px] font-[600]'>Home</Link>
            <span>&gt;</span>
            <span className="text-gray-900 font-semibold">Jobs</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-6">
        {/* الـ Grid الرئيسي لتوزيع الـ Sidebar والكروت */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ==================== 1. (Sidebar) ==================== */}
          <UserSidebar />

          {/* ==================== 2. القسم الأيمن (كروت الوظائف المقدم عليها) ==================== */}
          <main className="lg:col-span-9">
            
            {/* حالة التحميل Loading */}
            {loading && (
              <div className="col-span-2 flex justify-center items-center py-20">
                <div className="w-10 h-10 border-4 border-[#00694B] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* حالة حدوث خطأ Error */}
            {error && (
              <div className="col-span-2 text-center text-red-500 font-semibold py-10 bg-red-50 rounded-2xl border border-red-100">
                {error}
              </div>
            )}

            {/* في حال كانت القائمة فارغة */}
            {!loading && !error && appliedJobs.length === 0 && (
              <div className="col-span-2 text-center text-gray-400 py-20 bg-white rounded-3xl border border-gray-100">
                No applications found.
              </div>
            )}

            {/* عرض الكروت بنظام الـ Grid */}
            {!loading && !error && appliedJobs.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {appliedJobs.map((application) => {
  // استخراج الوظيفة من كائن التقديم
  const job = application.job; 

   if (!job) return null;

  // هندلة اسم الوظيفة
  const displayTitle = job.job_title?.title || job.title || 'Medical Field Role';
  
  // هندلة اللوجو
  const companyLogo = job.company?.image || defaultLogo;

  return (
    <div 
      key={application.id} 
      className="bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative flex flex-col justify-between"
    >
      {/* الجزء العلوي: اللوجو وعنوان الوظيفة */}
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center bg-gray-50 border border-gray-100">
              <img 
                src={companyLogo} 
                alt={job.company?.name || 'Company'} 
                className="w-full h-full object-contain"
                onError={(e) => { e.target.src = defaultLogo; }}
              />
            </div>
            <div>
              <h3 className="font-extrabold text-[#0D0D0D] text-base tracking-tight line-clamp-1">{displayTitle}</h3>
              <p className="text-gray-400 text-xs font-semibold mt-0.5">{job.company?.name || 'JooCare Partner'}</p>
            </div>
          </div>
          <span className="text-[10px] text-gray-400 font-medium bg-gray-50 border border-gray-100 px-2 py-1 rounded-md whitespace-nowrap">
            Applied
          </span>
        </div>

        {/* تاريخ التقديم (موجود في كائن التقديم وليس الوظيفة) */}
        <p className="text-gray-400 text-[11px] font-medium mb-4 pl-1">
          Applied: {application.created_at}
        </p>

        {/* تفاصيل الوظيفة */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-gray-500 mb-5 pl-1">
          <span className="flex items-center gap-1">
            <FiMapPin className="text-sm text-gray-400" /> 
            {job.city?.name || 'N/A'}, {job.country?.name || 'N/A'}
          </span>
          <span className="flex items-center gap-1">
            <FiBriefcase className="text-sm text-gray-400" /> 
            {job.specialty_title || 'Healthcare'}
          </span>
          <span className="flex items-center gap-1">
            <FiDollarSign className="text-sm text-gray-400" /> 
            {job.min_salary ? `${job.min_salary} - ${job.max_salary}` : 'Confidential'}
          </span>
        </div>

        {/* وصف الوظيفة */}
        <p className="text-gray-400 text-xs leading-relaxed font-medium mb-6 pl-1 line-clamp-2">
          {job.description ? job.description.replace(/<[^>]*>/g, '') : 'No description available...'}
        </p>
      </div>

      {/* الجزء السفلي: حالة الطلب */}
      <div>
        <div className="flex items-center justify-between border-t border-gray-100/80 pt-4 mb-4">
  {/* هنا التصحيح: استبدل Job.id بـ job.id */}
  <Link to={`/job/${job.id}`} className="flex items-center gap-2 px-4 py-2.5 bg-[#00694B] hover:bg-[#00523A] text-white text-xs font-bold rounded-xl transition w-full justify-center">
    View Job <FiArrowRight size={14} />
  </Link>
</div>

        <div className="bg-[#E6F0EC] border border-[#D2E6DE]/60 rounded-xl px-4 py-2.5 flex justify-between items-center text-[11px] font-bold text-[#00694B]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-[#00694B] rounded-full animate-pulse"></span>
            {job.current_status?.status || 'Active'}
          </span>
          <span className="text-gray-400 font-semibold">{job.updated_at}</span>
        </div>
      </div>
    </div>
  );
})}
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}

export default Applications;