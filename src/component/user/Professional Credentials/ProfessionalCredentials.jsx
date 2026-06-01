import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiPlusCircle, FiEdit2, FiTrash2 } from 'react-icons/fi';
import UserSidebar from '../layout/UserSidebar'; 

function ProfessionalCredentials() {
  const location = useLocation();

  const qualificationsData = [
    {
      id: 1,
      title: "Bachelor's degree, Medicine and Surgery",
      country: "Egypt",
      university: "Tanta University",
      period: "21 December 2023 - 21 December 2026",
      image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=300&q=80"
    },
    {
      id: 2,
      title: "Bachelor's degree, Medicine and Surgery",
      country: "Egypt",
      university: "Tanta University",
      period: "21 December 2023 - 21 December 2026",
      image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=300&q=80"
    }
  ];

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-28 pb-16 text-[#0D0D0D] font-sans antialiased selection:bg-[#00694B]/10">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <UserSidebar />

          <main className="lg:col-span-9 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-transparent">
              {/* شريط التابات الموحد القائم على الروابط */}
              <div className="bg-white p-1.5 rounded-full border border-gray-200/60 flex items-center shadow-sm">
                <Link
                  to="/ProfessionalCredentials"
                  className={`px-6 py-2 rounded-full text-sm font-bold transition duration-200 ${
                    location.pathname === '/ProfessionalCredentials' || location.pathname === '/ProfessionalCredentials/'
                      ? 'bg-[#00694B] text-white shadow-sm'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  Qualifications
                </Link>
                <Link
                  to="/ProfessionalCredentials/Certificates"
                  className={`px-6 py-2 rounded-full text-sm font-bold transition duration-200 ${
                    location.pathname === '/ProfessionalCredentials/Certificates'
                      ? 'bg-[#00694B] text-white shadow-sm'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  Certificates
                </Link>
                <Link
                  to="/ProfessionalCredentials/Licenses"
                  className={`px-6 py-2 rounded-full text-sm font-bold transition duration-200 ${
                    location.pathname === '/ProfessionalCredentials/Licenses'
                      ? 'bg-[#00694B] text-white shadow-sm'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  Licenses
                </Link>
              </div>

              <button className="flex items-center gap-2 px-5 py-3 bg-[#1A252C] hover:bg-[#11191E] text-white text-xs font-bold rounded-full transition shadow-md">
                <FiPlusCircle size={15} />
                Add Qualifications
              </button>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              {qualificationsData.map((item) => (
                <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                  <div className="flex flex-col sm:flex-row items-start gap-4 w-full">
                    <div className="w-full sm:w-[150px] h-[95px] rounded-xl overflow-hidden border border-gray-200/70 bg-gray-50 flex-shrink-0 relative group shadow-inner">
                      <img src={item.image} alt="Credential" className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition duration-300" />
                      <div className="absolute inset-0 bg-blue-500/5 mix-blend-multiply"></div>
                    </div>
                    <div className="flex flex-col gap-1.5 pt-0.5">
                      <h3 className="font-extrabold text-[#0D0D0D] text-[15px] tracking-tight">{item.title}</h3>
                      <p className="text-gray-800 font-semibold text-xs">{item.country}</p>
                      <p className="text-gray-500 font-medium text-xs">{item.university}</p>
                      <p className="text-gray-400 font-medium text-[11px] mt-1">{item.period}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 sm:self-start pt-1 w-full sm:w-auto justify-end border-t sm:border-0 border-gray-50 mt-3 sm:mt-0">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg border border-transparent hover:border-gray-200/70 transition"><FiEdit2 size={15} /></button>
                    <button className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"><FiTrash2 size={15} /></button>
                  </div>
                </div>
              ))}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}

export default ProfessionalCredentials;