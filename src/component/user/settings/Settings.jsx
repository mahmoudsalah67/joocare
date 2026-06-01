import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import UserSidebar from '../layout/UserSidebar'; 
import BasicInfoForm from './bassicinfo/BasicInfoForm'; // تتبع مسار الفولدر الحالي بدقة
import ChangePasswordForm from './changepassord/ChangePasswordForm';

function Settings() {
  const [activeTab, setActiveTab] = useState('basic'); // جعلناها password افتراضياً لتطابق الصورة المعروضة

  // إدارة الـ State للبيانات الشخصية هنا لتمريرها للـ BasicInfoForm عند الحاجة
  const [formData, setFormData] = useState({
    fullName: 'Ahmed Eltatawy',
    email: 'mail@mail.com',
    countryCode: '+966',
    phoneNumber: '52 987 6543',
    jobTitle: 'Consultant Internist',
    specialty: '',
    experience: '',
    country: '',
    city: '',
    birthDate: '1989-06-22'
  });

  const [cvFile, setCvFile] = useState({
    name: 'jooCare CV.pdf',
    size: '8.8MB'
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(1);
      setCvFile({
        name: file.name,
        size: `${sizeInMB}MB`
      });
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setCvFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-28 pb-16 text-[#0D0D0D] font-sans antialiased selection:bg-[#00694B]/10">
      
      {/* شريط العناوين العلوي (Breadcrumbs) المتطابق مع أعلى صورة image_889442.png */}
      <div className="bg-[#0D0D0D0D] border-b border-gray-200/80 py-5 mt-[-50px] mb-8">
        <div className="max-w-[1320px] mx-auto px-6 flex justify-between items-center text-sm font-medium">
          <span className="text-[#0D0D0D] font-bold text-base">Jobs</span>
          <div className="flex items-center gap-2">
            <Link to={'/'} className='text-[16px] font-[600]'>Home</Link>
            <span className="text-gray-400">&gt;</span>
            <span className="text-gray-900 font-semibold">Jobs</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* الـ Sidebar الأيسر */}
          <UserSidebar />

          {/* المحتوى الرئيسي */}
          <main className="lg:col-span-9 flex flex-col gap-6">
            
            {/* أزرار التابات العلوية المتطابقة مع التصميم */}
            <div className="bg-white p-1.5 rounded-full border border-gray-200/40 flex items-center shadow-sm w-fit">
              <button
                onClick={() => setActiveTab('basic')}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition duration-200 ${
                  activeTab === 'basic' ? 'bg-[#00694B] text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Basic Info
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition duration-200 ${
                  activeTab === 'password' ? 'bg-[#00694B] text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Change password
              </button>
            </div>

            {/* الحاوية البيضاء الرئيسية */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              
              {/* استدعاء الكومبوننتس المنفصلة بشكل ذكي */}
              {activeTab === 'basic' && (
                <BasicInfoForm 
                  formData={formData} 
                  handleChange={handleChange} 
                  fileInputRef={fileInputRef} 
                  handleFileChange={handleFileChange} 
                  cvFile={cvFile} 
                  handleRemoveFile={handleRemoveFile} 
                />
              )}

              {activeTab === 'password' && <ChangePasswordForm />}

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Settings;