import React from 'react';
import { FiPlus } from 'react-icons/fi';
 import UserSidebar from '../../layout/UserSidebar'; 
import ChangePasswordForm from '../changepassord/ChangePasswordForm';
function BasicInfoForm({ formData, handleChange, fileInputRef, handleFileChange, cvFile, handleRemoveFile }) {
  return (
    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Saved Successfully!'); }}>
      {/* Profile Picture */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">Profile Picture</label>
        <div className="relative w-24 h-24 mx-auto md:mx-0">
          <div className="w-full h-full rounded-full bg-gray-50 border border-gray-200 overflow-hidden shadow-inner">
            <img 
              src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=300&q=80" 
              alt="Avatar" 
              className="w-full h-full object-cover grayscale-[10%]" 
            />
          </div>
          <button type="button" className="absolute bottom-1 right-1 bg-[#00694B] text-white p-1.5 rounded-full shadow-md hover:bg-[#00543D] transition-colors flex items-center justify-center">
            <FiPlus size={14} />
          </button>
        </div>
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-[#F1F3F5] border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-[#00694B] transition-all text-gray-800 font-medium"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          disabled
          className="w-full px-4 py-3 bg-[#E2E8F0] border border-transparent rounded-xl text-gray-500 cursor-not-allowed font-medium"
        />
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Phone Number</label>
        <div className="flex gap-2">
          <div className="relative flex items-center bg-[#F1F3F5] rounded-xl px-3 border border-transparent focus-within:border-[#00694B] focus-within:bg-white transition-all">
            <span className="mr-1 text-sm">🇸🇦</span>
            <select 
              name="countryCode" 
              value={formData.countryCode} 
              onChange={handleChange} 
              className="bg-transparent focus:outline-none text-gray-800 text-sm font-semibold appearance-none pr-4 cursor-pointer"
            >
              <option value="+966">+966</option>
              <option value="+20">+20</option>
              <option value="+971">+971</option>
            </select>
          </div>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="flex-1 px-4 py-3 bg-[#F1F3F5] border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-[#00694B] transition-all text-gray-800 font-medium"
          />
        </div>
      </div>

      {/* Job Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Job Title</label>
          <select 
            name="jobTitle" 
            value={formData.jobTitle} 
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#F1F3F5] border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-[#00694B] text-gray-800 font-medium transition-all"
          >
            <option value="Consultant Internist">Consultant Internist</option>
            <option value="General Practitioner">General Practitioner</option>
            <option value="Surgeon">Surgeon</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Specialty</label>
          <select 
            name="specialty" 
            value={formData.specialty} 
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-[#F1F3F5] border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-[#00694B] font-medium transition-all ${!formData.specialty ? 'text-gray-400' : 'text-gray-800'}`}
          >
            <option value="">ex: Cardiology</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Pediatrics">Pediatrics</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Years of Experience</label>
          <select 
            name="experience" 
            value={formData.experience} 
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-[#F1F3F5] border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-[#00694B] font-medium transition-all ${!formData.experience ? 'text-gray-400' : 'text-gray-800'}`}
          >
            <option value="">ex:3-5 years</option>
            <option value="1-3">1-3 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5+">More than 5 years</option>
          </select>
        </div>
      </div>

      {/* Location Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Current Location</label>
          <select 
            name="country" 
            value={formData.country} 
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-[#F1F3F5] border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-[#00694B] font-medium transition-all ${!formData.country ? 'text-gray-400' : 'text-gray-800'}`}
          >
            <option value="">country</option>
            <option value="Egypt">Egypt</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">City</label>
          <select 
            name="city" 
            value={formData.city} 
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-[#F1F3F5] border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-[#00694B] font-medium transition-all ${!formData.city ? 'text-gray-400' : 'text-gray-800'}`}
          >
            <option value="">City</option>
            <option value="Cairo">Cairo</option>
            <option value="Riyadh">Riyadh</option>
          </select>
        </div>
      </div>

      {/* Date of Birth */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Date of birth</label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-[#F1F3F5] border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-[#00694B] transition-all text-gray-800 font-medium"
        />
      </div>

      {/* CV Upload */}
      <div>
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Upload CV</label>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept=".pdf,.doc,.docx"
        />
        <div 
          onClick={() => fileInputRef.current.click()}
          className="border-2 border-dashed border-gray-200 rounded-2xl p-6 bg-[#F8F9FA] flex flex-col items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <p className="text-xs text-gray-400 font-semibold">
            Drag & Drop your files or <span className="text-[#00694B] underline">Browse</span>
          </p>
          
          {cvFile && (
            <div className="w-full mt-4 bg-[#4A5568] text-white p-3.5 rounded-xl flex items-center justify-between text-xs font-medium shadow-sm">
              <div className="flex items-center gap-2">
                <span className="truncate max-w-[200px]">{cvFile.name}</span>
                <span className="text-gray-300 text-[10px] bg-black/20 px-1.5 py-0.5 rounded">{cvFile.size}</span>
              </div>
              <button type="button" onClick={handleRemoveFile} className="text-gray-300 hover:text-white transition-colors p-1">
                ✕
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4 flex justify-center">
        <button
          type="submit"
          className="w-full md:w-auto px-20 py-3.5 bg-[#1E293B] text-white font-bold text-sm rounded-full hover:bg-[#0F172A] transition shadow-md"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default BasicInfoForm;