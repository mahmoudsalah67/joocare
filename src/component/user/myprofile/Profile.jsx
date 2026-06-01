import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiPlus, FiTrash2, FiChevronDown, FiChevronUp, FiDownload, FiEye } from 'react-icons/fi';
import UserSidebar from '../layout/UserSidebar';
import axios from 'axios';

function Profile() {
  const [openExp, setOpenExp] = useState({});
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const toggleExperience = (id) => {
    setOpenExp(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token') || localStorage.getItem('user_token');
        const res = await axios.get('https://joocare.nami-tec.com/api/user/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Accept-Language': 'en',
            Accept: 'application/json',
          },
        });
        setProfileData(res.data?.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen"><p className="text-[#00694B] font-bold animate-pulse">Loading...</p></div>;

  const user = profileData;

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-28 pb-16 text-[#0D0D0D] font-sans antialiased selection:bg-[#00694B]/10">
      <div className="bg-[#0D0D0D0D] border-b border-gray-200/80 py-5 mt-[-50px] mb-8">
        <div className="max-w-[1320px] mx-auto px-6 flex justify-between items-center text-sm font-medium">
          <span className="text-[#0D0D0D] font-bold text-base">Overview</span>
          <div className="flex items-center gap-2">
            <Link to={'/'} className='text-[16px] font-[600]'>Home</Link>
            <span>&gt;</span>
            <span className="text-gray-900 font-semibold">Overview</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          <UserSidebar />

          <main className="lg:col-span-6 flex flex-col gap-6">

            {/* About / Bio */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6 relative shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[18px] font-bold text-[#0D0D0D]">About</h3>
                <button className="p-2 hover:bg-gray-50 rounded-full text-gray-700 transition"><FiEdit2 size={16} /></button>
              </div>
              <p className="text-gray-500 text-[13.5px] leading-relaxed font-normal">
                {user?.bio || 'No bio added yet.'}
              </p>
            </section>

            {/* Education */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-bold text-[#0D0D0D]">Education</h3>
                <button className="p-2 hover:bg-gray-50 rounded-full text-[#00694B] transition"><FiPlus size={18} /></button>
              </div>
              {user?.educations?.length > 0 ? (
                user.educations.map((edu) => (
                  <div key={edu.id} className="flex items-start justify-between border border-gray-100/70 rounded-xl p-4 bg-[#FAFAFA]/50 mb-3">
                    <div className="flex gap-4">
                      <div className="w-11 h-11 bg-[#E6F0EC] rounded-xl flex items-center justify-center text-lg shadow-sm">🏢</div>
                      <div>
                        <h4 className="font-bold text-[#0D0D0D] text-[15px]">{edu.institution || edu.school}</h4>
                        <p className="text-gray-500 text-xs mt-0.5 font-medium">{edu.degree}</p>
                        <p className="text-gray-400 text-xs mt-1.5 font-normal">{edu.start_year} - {edu.end_year || 'Present'}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button className="p-1.5 text-gray-500 hover:bg-white rounded-lg transition"><FiEdit2 size={15} /></button>
                      <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"><FiTrash2 size={15} /></button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No education added yet.</p>
              )}
            </section>

            {/* Skills */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-bold text-[#0D0D0D]">Skills</h3>
                <button className="p-2 hover:bg-gray-50 rounded-full text-[#00694B] transition"><FiPlus size={18} /></button>
              </div>
              {user?.skills?.length > 0 ? (
                <div className="flex flex-wrap gap-2.5">
                  {user.skills.map((skill, index) => (
                    <span key={index} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E6F0EC] text-[#00694B] text-xs font-bold rounded-full border border-[#D2E6DE]">
                      ★ {skill.title || skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">No skills added yet.</p>
              )}
            </section>

            {/* Experience */}
            <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-bold text-[#0D0D0D]">Experience</h3>
                <button className="p-2 hover:bg-gray-50 rounded-full text-[#00694B] transition"><FiPlus size={18} /></button>
              </div>
              {user?.experiences?.length > 0 ? (
                user.experiences.map((exp) => (
                  <div key={exp.id} className="border border-gray-100 rounded-xl p-4 mb-4 bg-white shadow-sm">
                    <div className="flex items-start justify-between cursor-pointer" onClick={() => toggleExperience(exp.id)}>
                      <div>
                        <h4 className="font-bold text-[#00694B] text-[16px]">{exp.title}</h4>
                        <p className="text-[#0D0D0D] font-bold text-xs mt-1">
                          {exp.company} <span className="text-gray-400 font-normal ml-2">{exp.start_date} - {exp.end_date || 'Present'}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <button className="p-1.5 text-gray-500 hover:bg-gray-50 rounded-lg transition"><FiEdit2 size={15} /></button>
                        <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"><FiTrash2 size={15} /></button>
                        <button className="p-1.5 text-gray-400 rounded-lg transition" onClick={() => toggleExperience(exp.id)}>
                          {openExp[exp.id] ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                        </button>
                      </div>
                    </div>
                    {openExp[exp.id] && (
                      <div className="mt-4 pt-4 border-t border-gray-100/70 text-gray-500 text-xs space-y-2.5 pl-2 font-medium">
                        <p>{exp.description}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm">No experience added yet.</p>
              )}
            </section>

            {/* Licenses */}
            {user?.licenses?.length > 0 && (
              <section className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[18px] font-bold text-[#0D0D0D]">Licenses</h3>
                  <button className="p-2 hover:bg-gray-50 rounded-full text-[#00694B] transition"><FiPlus size={18} /></button>
                </div>
                {user.licenses.map((license) => (
                  <div key={license.id} className="flex items-start justify-between border border-gray-100/70 rounded-xl p-4 bg-[#FAFAFA]/50 mb-3">
                    <div className="flex gap-4">
                      <div className="w-11 h-11 bg-[#E6F0EC] rounded-xl flex items-center justify-center text-lg">📋</div>
                      <div>
                        <h4 className="font-bold text-[#0D0D0D] text-[15px]">{license.title}</h4>
                        <p className="text-gray-500 text-xs mt-0.5">{license.country?.name}</p>
                        {license.number && <p className="text-gray-400 text-xs mt-1">#{license.number}</p>}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button className="p-1.5 text-gray-500 hover:bg-white rounded-lg transition"><FiEdit2 size={15} /></button>
                      <button className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"><FiTrash2 size={15} /></button>
                    </div>
                  </div>
                ))}
              </section>
            )}
          </main>

          {/* Right Sidebar */}
          <aside className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col items-center sticky top-28">
            
            {/* Profile Image */}
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-gray-100 shadow-inner bg-gray-50">
              {user?.image ? (
                <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-[#00694B] flex items-center justify-center text-white text-3xl font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Name & Job Title */}
            <h2 className="text-lg font-extrabold text-[#0D0D0D] tracking-tight text-center">{user?.name}</h2>
            <p className="text-[#00694B] font-bold text-xs bg-[#E6F0EC] px-3 py-1.5 rounded-full mt-1.5 border border-[#D2E6DE] text-center">
              {user?.job_title?.title || 'Healthcare Professional'}
            </p>

            {/* Hiring Readiness */}
            <div className="w-full mt-6 border-t border-gray-100 pt-4">
              <div className="flex justify-between text-[11px] font-bold mb-1.5">
                <span className="text-gray-700 flex items-center gap-1">⚡ Hiring Readiness</span>
                <span className="text-[#00694B]">{user?.hiring_readiness_score || 0}%</span>
              </div>
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#00694B] h-full rounded-full transition-all duration-500" style={{ width: `${user?.hiring_readiness_score || 0}%` }}></div>
              </div>
            </div>

            {/* Info */}
            <div className="w-full mt-5 space-y-3.5 text-xs border-t pt-4 border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-medium">Email</span>
                <span className="font-bold text-gray-800 truncate max-w-[140px]">{user?.email}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-medium">Location</span>
                <span className="font-bold text-gray-800">{user?.city?.name}, {user?.country?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-medium">Phone</span>
                <span className="font-bold text-gray-800">{user?.phone_code}{user?.phone}</span>
              </div>
            </div>

            {/* CV */}
            {user?.cv && (
              <div className="w-full mt-6 bg-white p-2.5 rounded-xl border border-gray-200/70 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="text-red-500 font-black text-[10px] bg-red-50 px-1.5 py-1 rounded">PDF</span>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-gray-700 truncate max-w-[80px]">CV.pdf</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <a href={user.cv} download className="p-2 bg-[#0d0d0d] text-white rounded-lg hover:bg-black transition">
                    <FiDownload size={13} />
                  </a>
                  <a href={user.cv} target="_blank" rel="noreferrer" className="p-2 bg-white text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
                    <FiEye size={13} />
                  </a>
                </div>
              </div>
            )}

            {/* Missing Items Warning */}
            {user?.missing_score_items?.length > 0 && (
              <div className="w-full mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3">
                <p className="text-amber-700 text-[11px] font-bold mb-1">Complete your profile:</p>
                <div className="flex flex-wrap gap-1">
                  {user.missing_score_items.map((item) => (
                    <span key={item} className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full capitalize">{item}</span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Profile;