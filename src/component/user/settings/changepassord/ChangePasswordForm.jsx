import React from 'react';

function ChangePasswordForm() {
  return (
    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Password Changed Successfully!'); }}>
      
      {/* Current Password */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Current Password</label>
        <input
          type="password"
          name="currentPassword"
          placeholder="••••••••"
          className="w-full px-4 py-3 bg-[#F1F3F5] border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-[#00694B] transition-all text-gray-800 font-medium"
        />
      </div>

      {/* New Password */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">New Password</label>
        <input
          type="password"
          name="newPassword"
          placeholder="••••••••"
          className="w-full px-4 py-3 bg-[#F1F3F5] border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-[#00694B] transition-all text-gray-800 font-medium"
        />
      </div>

      {/* Confirm New Password */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Confirm New Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="••••••••"
          className="w-full px-4 py-3 bg-[#F1F3F5] border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-[#00694B] transition-all text-gray-800 font-medium"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-4 flex justify-center">
        <button
          type="submit"
          className="w-full md:w-auto px-20 py-3.5 bg-[#1E293B] text-white font-bold text-sm rounded-full hover:bg-[#0F172A] transition shadow-md"
        >
          Update Password
        </button>
      </div>
    </form>
  );
}

export default ChangePasswordForm;