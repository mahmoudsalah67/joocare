import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiBriefcase, FiDollarSign, FiBookmark, FiShare2, FiArrowRight, FiUser, FiFileText, FiAward, FiSettings } from 'react-icons/fi';
import UserSidebar from '../layout/UserSidebar';

function Applications() {
  const appliedJobs = [
    {
      id: 1,
      title: 'Medical Approval',
      company: 'Health care',
      date: '21 December 2026 , 4:00AM',
      location: 'Cairo, Egypt',
      field: 'Pharmce',
      salary: '2000$ : 4000$',
      tags: ['+3 Exp', 'Full time', 'Pharmaceutical'],
    },
    {
      id: 2,
      title: 'Medical Approval',
      company: 'Health care',
      date: '21 December 2026 , 4:00AM',
      location: 'Cairo, Egypt',
      field: 'Pharmce',
      salary: '2000$ : 4000$',
      tags: ['+3 Exp', 'Full time', 'Pharmaceutical'],
    }
  ];

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
        
        {/* ==================== 1. القائمة الجانبية اليسرى (Sidebar) ==================== */}
        <UserSidebar />

        {/* ==================== 2. القسم الأيمن (كروت الوظائف المقدم عليها) ==================== */}
        <main className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
          {appliedJobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-white border border-gray-100 rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative flex flex-col justify-between"
            >
              {/* الجزء العلوي: اللوجو وعنوان الوظيفة */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {/* لوجو المستشفى الأخضر */}
                    <div className="w-12 h-12 bg-[#E6F0EC] border border-[#D2E6DE] rounded-2xl flex items-center justify-center text-[#00694B] text-xl font-bold shadow-sm">
                      ➕
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[#0D0D0D] text-base tracking-tight">{job.title}</h3>
                      <p className="text-gray-400 text-xs font-semibold mt-0.5">{job.company}</p>
                    </div>
                  </div>
                  {/* وسم مطابقة الـ CV إن وُجد في التصميم */}
                  <span className="text-[10px] text-gray-400 font-medium bg-gray-50 border border-gray-100 px-2 py-1 rounded-md">
                    Resume Match
                  </span>
                </div>

                {/* تاريخ التقدم */}
                <p className="text-gray-400 text-[11px] font-medium mb-4 pl-1">
                  {job.date}
                </p>

                {/* تفاصيل الوظيفة السريعة (الموقع، المجال، المرتب) */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-gray-500 mb-5 pl-1">
                  <span className="flex items-center gap-1"><FiMapPin className="text-sm text-gray-400" /> {job.location}</span>
                  <span className="flex items-center gap-1"><FiBriefcase className="text-sm text-gray-400" /> {job.field}</span>
                  <span className="flex items-center gap-1"><FiDollarSign className="text-sm text-gray-400" /> {job.salary}</span>
                </div>

                {/* التاجات والفلاتر الصغيرة للوظيفة */}
                <div className="flex flex-wrap gap-2 mb-6 pl-1">
                  {job.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="text-[11px] font-semibold text-gray-500 bg-[#F4F4F4] px-2.5 py-1 rounded-md border border-gray-200/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* وصف توضيحي خفيف (Lorem Ipsum) المكتوب تحت التاجات */}
                <p className="text-gray-400 text-xs leading-relaxed font-medium mb-6 pl-1 line-clamp-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                </p>
              </div>

              {/* الجزء السفلي: أزرار التفاعل وحالة الطلب */}
              <div>
                <div className="flex items-center justify-between border-t border-gray-100/80 pt-4 mb-4">
                  <div className="flex gap-2">
                    <button className="flex items-center justify-center p-2.5 bg-[#F8F9FA] hover:bg-gray-100 border border-gray-200/60 rounded-xl text-gray-500 transition shadow-sm">
                      <FiBookmark size={15} />
                      <span className="text-xs font-bold ml-1.5 hidden sm:inline">Save</span>
                    </button>
                    <button className="flex items-center justify-center p-2.5 bg-[#F8F9FA] hover:bg-gray-100 border border-gray-200/60 rounded-xl text-gray-500 transition shadow-sm">
                      <FiShare2 size={15} />
                      <span className="text-xs font-bold ml-1.5 hidden sm:inline">Share</span>
                    </button>
                  </div>

                  <button className="flex items-center gap-2 px-4 py-2.5 bg-[#00694B] hover:bg-[#00523A] text-white text-xs font-bold rounded-xl transition shadow-md shadow-[#00694B]/10">
                    View Job <FiArrowRight size={14} />
                  </button>
                </div>

                {/* شريط حالة الـ Applied الأخضر بالأسفل */}
                <div className="bg-[#E6F0EC] border border-[#D2E6DE]/60 rounded-xl px-4 py-2.5 flex justify-between items-center text-[11px] font-bold text-[#00694B]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-[#00694B] rounded-full animate-pulse"></span>
                    Applied
                  </span>
                  <span className="text-gray-400 font-semibold">{job.date}</span>
                </div>
              </div>

            </div>
          ))}
        </main>

      </div>
    </div>
  </div>
);
}

export default Applications;
