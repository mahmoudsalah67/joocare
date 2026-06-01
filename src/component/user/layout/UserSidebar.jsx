    import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiUser, FiFileText, FiAward, FiSettings } from 'react-icons/fi';

function UserSidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/profile', name: 'My Profile', icon: <FiUser className="text-lg" /> },
    { path: '/applications', name: 'Applications', icon: <FiFileText className="text-lg" /> },
    { path: '/ProfessionalCredentials', name: 'Professional Credentials', icon: <FiAward className="text-lg" /> },
    { path: '/settings', name: 'Profile Settings', icon: <FiSettings className="text-lg" /> },
  ];

  return (
    <aside className="lg:col-span-3 flex flex-col gap-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-3 flex flex-col gap-1 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        {menuItems.map((item) => {
          // التحقق من نشاط الرابط الأساسي أو المسارات المتفرعة منه
          const isActive = location.pathname === item.path || 
                           (item.path !== '/profile' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3.5 font-medium rounded-xl w-full text-[15px] border transition ${
                isActive
                  ? 'bg-[#E6F0EC] text-[#00694B] border-[#D2E6DE]/40 font-semibold'
                  : 'text-gray-500 hover:bg-gray-50 border-transparent'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </div>

      <div className="bg-[#FFF5F5] border border-[#FED7D7] rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
        <h4 className="text-[#C53030] font-bold text-[16px] mb-1">Please complete your data.</h4>
        <p className="text-[#742A2A] text-xs leading-relaxed font-medium">
          So that we can recommend jobs that are more suitable for you.
        </p>
      </div>
    </aside>
  );
}

export default UserSidebar;