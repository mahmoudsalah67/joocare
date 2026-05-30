import React, { useState } from 'react';
import { 
  FiUser, 
  FiFileText, 
  FiAward, 
  FiSettings, 
  FiEdit2, 
  FiPlus, 
  FiTrash2, 
  FiChevronDown, 
  FiChevronUp, 
  FiDownload, 
  FiEye,
  FiCheckCircle
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

function Profile() {
  // للتحكم في فتح وقفل عناصر الـ Experience Accordion
  const [openExp, setOpenExp] = useState({ 0: true, 1: false });

  const toggleExperience = (id) => {
    setOpenExp(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-28 pb-16 text-[#0D0D0D] font-sans antialiased selection:bg-[#00694B]/10">
      
      {/* Breadcrumb السفلي الرفيع */}
      <div className="bg-[#0D0D0D0D] border-b border-gray-200/80 py-5 mt-[-50px] mb-8">
        <div className="max-w-[1320px] mx-auto px-6 flex justify-between items-center text-sm font-medium">
          <span className="text-[#0D0D0D] font-bold text-base">Overview</span>
          <div className="flex items-center gap-2  ">
            <Link to={'/'} className='text-[16px] font-[600]'>Home</Link>
            <span>&gt;</span>
            <span className="text-gray-900 font-semibold">Overview</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-6">
        {/* الـ Grid الرئيسي المتطابق */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ==================== 1. القائمة الجانبية اليسرى ==================== */}
          <aside className="lg:col-span-3 flex flex-col gap-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-3 flex flex-col gap-1 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <button className="flex items-center gap-3 px-4 py-3.5 bg-[#E6F0EC] text-[#00694B] font-semibold rounded-xl w-full text-left text-[15px] transition">
                <FiUser className="text-lg" />
                My Profile
              </button>
              <button className="flex items-center gap-3 px-4 py-3.5 text-gray-500 hover:bg-gray-50 font-medium rounded-xl w-full text-left text-[15px] transition">
                <FiFileText className="text-lg" />
                Applications
              </button>
              <button className="flex items-center gap-3 px-4 py-3.5 text-gray-500 hover:bg-gray-50 font-medium rounded-xl w-full text-left text-[15px] transition">
                <FiAward className="text-lg" />
                Professional Credentials
              </button>
              <button className="flex items-center gap-3 px-4 py-3.5 text-gray-500 hover:bg-gray-50 font-medium rounded-xl w-full text-left text-[15px] transition">
                <FiSettings className="text-lg" />
                Profile Settings
              </button>
            </div>

            {/* كارت تنبيه إكمال البيانات الإجباري المتناسق */}
            <div className="bg-[#FFF5F5] border border-[#FED7D7] rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
              <h4 className="text-[#C53030] font-bold text-[16px] mb-1">Please complete your data.</h4>
              <p className="text-[#742A2A] text-xs leading-relaxed font-medium">
                So that we can recommend jobs that are more suitable for you.
              </p>
            </div>
          </aside>

          {/* ==================== 2. القسم الأوسط (البيانات والخبرات) ==================== */}
          <main className="lg:col-span-6 flex flex-col gap-6">
            
            {/* قسم About */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6 relative shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[18px] font-bold text-[#0D0D0D]">About</h3>
                <button className="p-2 hover:bg-gray-50 rounded-full text-gray-700 border border-transparent hover:border-gray-200 transition">
                  <FiEdit2 size={16} />
                </button>
              </div>
              <p className="text-gray-500 text-[13.5px] leading-relaxed font-normal">
                Board-certified cardiologist with extensive experience in interventional procedures, cardiac imaging, and preventive cardiology. Passionate about patient-centered care and advancing cardiovascular health through innovative treatments.
              </p>
            </section>

            {/* قسم Education */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-bold text-[#0D0D0D]">Education</h3>
                <button className="p-2 hover:bg-gray-50 rounded-full text-[#00694B] border border-transparent hover:border-gray-100 transition">
                  <FiPlus size={18} />
                </button>
              </div>
              
              <div className="flex items-start justify-between border border-gray-100/70 rounded-xl p-4 bg-[#FAFAFA]/50">
                <div className="flex gap-4">
                  <div className="w-11 h-11 bg-[#E6F0EC] rounded-xl flex items-center justify-center text-lg shadow-sm">
                    🏢
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0D0D0D] text-[15px]">Tanta University</h4>
                    <p className="text-gray-500 text-xs mt-0.5 font-medium">Bachelor's degree, Medicine and Surgery</p>
                    <p className="text-gray-400 text-xs mt-1.5 font-normal">2017 - 2021</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 text-gray-500 hover:bg-white hover:shadow-sm rounded-lg border border-transparent hover:border-gray-200 transition"><FiEdit2 size={15} /></button>
                  <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"><FiTrash2 size={15} /></button>
                </div>
              </div>
            </section>

            {/* قسم Skills التاجات الخضراء الرائعة */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-bold text-[#0D0D0D]">Skills</h3>
                <div className="flex gap-1">
                  <button className="p-2 hover:bg-gray-50 rounded-full text-[#00694B] transition"><FiPlus size={18} /></button>
                  <button className="p-2 hover:bg-gray-50 rounded-full text-gray-600 transition"><FiEdit2 size={15} /></button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2.5">
                {[
                  'Clinical diagnosis', 'Medical', 'Emergency', 'Effective patient', 
                  'Empathy', 'Medical', 'Medical'
                ].map((skill, index) => (
                  <span key={index} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E6F0EC] text-[#00694B] text-xs font-bold rounded-full border border-[#D2E6DE]">
                    ★ {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* قسم Experience مع الـ Accordion كامل الحياكة */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-bold text-[#0D0D0D]">Experience</h3>
                <button className="p-2 hover:bg-gray-50 rounded-full text-[#00694B] transition"><FiPlus size={18} /></button>
              </div>

              {/* الخبرة الأولى - مفتوحة تلقائياً */}
              <div className="border border-gray-100 rounded-xl p-4 mb-4 bg-white shadow-sm">
                <div className="flex items-start justify-between cursor-pointer" onClick={() => toggleExperience(0)}>
                  <div>
                    <h4 className="font-bold text-[#00694B] text-[16px]">Consultant Interventional</h4>
                    <p className="text-[#0D0D0D] font-bold text-xs mt-1">Health care <span className="text-gray-400 font-normal ml-2">📅 Jan 2020 - Present</span></p>
                  </div>
                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button className="p-1.5 text-gray-500 hover:bg-gray-50 rounded-lg transition"><FiEdit2 size={15} /></button>
                    <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"><FiTrash2 size={15} /></button>
                    <button className="p-1.5 text-gray-400 hover:bg-gray-50 rounded-lg transition" onClick={() => toggleExperience(0)}>
                      {openExp[0] ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                    </button>
                  </div>
                </div>
                
                {openExp[0] && (
                  <div className="mt-4 pt-4 border-t border-gray-100/70 text-gray-500 text-xs space-y-2.5 pl-2 font-medium">
                    <p>• Supervise cardiology fellowship training program with 12 fellows.</p>
                    <p>• Chair of the Cardiac Catheterization Lab quality improvement committee.</p>
                  </div>
                )}
              </div>

              {/* الخبرة الثانية - مغلقة */}
              <div className="border border-gray-100 rounded-xl p-4 bg-[#FAFAFA]/30">
                <div className="flex items-start justify-between cursor-pointer" onClick={() => toggleExperience(1)}>
                  <div>
                    <h4 className="font-bold text-[#00694B] text-[16px]">Consultant Interventional</h4>
                    <p className="text-[#0D0D0D] font-bold text-xs mt-1">Health care <span className="text-gray-400 font-normal ml-2">📅 Jan 2020 - Present</span></p>
                  </div>
                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button className="p-1.5 text-gray-500 hover:bg-gray-50 rounded-lg transition"><FiEdit2 size={15} /></button>
                    <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"><FiTrash2 size={15} /></button>
                    <button className="p-1.5 text-gray-400 hover:bg-gray-50 rounded-lg transition" onClick={() => toggleExperience(1)}>
                      {openExp[1] ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* ==================== 3. الكارت الشخصي الثابت الأيمن ==================== */}
          <aside className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center sticky top-28">
            
            {/* الصورة الشخصية الاحترافية الدائرية مع تفاصيل الهوية */}
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-gray-100 shadow-inner bg-gray-50">
              <img 
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=256&q=80" 
                alt="Doctor Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <h2 className="text-lg font-extrabold text-[#0D0D0D] tracking-tight">Dr. Ahmed Al-Rashid</h2>
            <p className="text-[#00694B] font-bold text-xs bg-[#E6F0EC] px-3 py-1.5 rounded-full mt-1.5 border border-[#D2E6DE]">
              Consultant Cardiologist
            </p>

            {/* مؤشر جاهزية التوظيف الجميل */}
            <div className="w-full mt-6 border-t border-gray-100 pt-4">
              <div className="flex justify-between text-[11px] font-bold mb-1.5">
                <span className="text-gray-700 flex items-center gap-1">⚡ Hiring Readiness</span>
                <span className="text-[#00694B]">85%</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#00694B] h-full rounded-full transition-all duration-500" style={{ width: '85%' }}></div>
              </div>
            </div>

            {/* ملاحظة الـ ACLS الصغيرة */}
            <div className="flex items-start gap-1.5 bg-[#F4F9F6] p-2.5 rounded-lg border border-[#E1EFEA] mt-3 w-full text-left">
              <span className="text-[#00694B] text-xs mt-0.5">ℹ</span>
              <p className="text-gray-500 text-[10px] leading-normal font-medium">
                Add your ACLS certificate to unlock premium job matches.
              </p>
            </div>

            {/* تفاصيل البيانات الشخصية المنظمة جداً */}
            <div className="w-full mt-5 space-y-3.5 text-xs border-t pt-4 border-gray-100">
              <div className="flex justify-between items-center"><span className="text-gray-400 font-medium">Email</span><span className="font-bold text-gray-800 text-right truncate max-w-[150px]">saeed@gmail.com</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-400 font-medium">Location</span><span className="font-bold text-gray-800">Cairo, Egypt</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-400 font-medium">phone</span><span className="font-bold text-gray-800">+201050345200</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-400 font-medium">Experience</span><span className="font-bold text-gray-800">+12 year</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-400 font-medium">Age</span><span className="font-bold text-gray-800">32</span></div>
            </div>

            {/* ملف الـ CV المرفوع بتصميم النبضة الفنية */}
            <div className="w-full mt-6 bg-white p-2.5 rounded-xl border border-gray-200/70 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-red-500 font-black text-[10px] bg-red-50 border border-red-100 px-1.5 py-1 rounded">PDF</span>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-gray-700 truncate max-w-[95px]">saeedCv.pdf</span>
                  <span className="text-[10px] text-[#00694B] font-bold">2.4 MB</span>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="p-2 bg-[#0d0d0d] hover:bg-black text-white rounded-lg transition shadow-sm flex items-center justify-center"><FiDownload size={13} /></button>
                <button className="p-2 bg-white hover:bg-gray-50 text-gray-600 rounded-lg border border-gray-200 transition flex items-center justify-center"><FiEye size={13} /></button>
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}

export default Profile;