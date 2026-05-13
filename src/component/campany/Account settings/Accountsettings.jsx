import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdKeyboardArrowDown,
  MdPersonOutline,
  MdSettings,
  MdWorkOutline,
  MdUpload,
} from "react-icons/md";

function Details2() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const currentStep = 2;

  const [crImage, setCrImage] = useState(null);
  const [mlImage, setMlImage] = useState(null);

  const onSubmit = (data) => {
    console.log("Details2 Data:", data);
    navigate("/details3");
  };

  const UploadBox = ({ label, file, setFile, fieldName, registerProps }) => (
    <div className="flex flex-col">
      <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">
        {label}
      </label>
      <label className="w-full h-[120px] border-2 border-dashed border-[#CCCCCC] rounded-[16px] flex flex-col items-center justify-center cursor-pointer bg-[#FAFAFA] hover:bg-[#F0F9F4] hover:border-[#00694B] transition-all">
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {file ? (
          <p className="text-[13px] text-[#00694B] font-medium">{file.name}</p>
        ) : (
          <>
            <MdUpload className="text-[#AAAAAA] text-[32px] mb-1" />
            <p className="text-[13px] text-[#8F8F8F]">
              Drag & Drop your Image or{" "}
              <span className="text-[#00694B] font-semibold">Browse</span>
            </p>
          </>
        )}
      </label>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] ">
      <div className="flex grid grid-cols-12 px-20 w-[1100px]">
        {/* Sidebar */}
        <aside className="w-[300px] h-fit flex flex-col gap-4 col-span-4 bg-white pt-[120px] mt-[-80px] pb-8 px-[12px] rounded-b-[32px] shadow-sm">
          <div className="bg-white rounded-[24px] p-5 border border-[#F1F1F1] shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-[#2D3134] rounded-full flex items-center justify-center text-white font-bold text-xl">
                A
              </div>
              <div>
                <h3 className="font-bold text-[16px] text-[#0D0D0D]">
                  Saudi German Hospital
                </h3>
                <p className="text-[14px] text-[#4D4D4D]">Egypt</p>
              </div>
            </div>
            <p className="text-[12px] text-[#8F8F8F] leading-relaxed mb-4">
              Saudi German Hospitals is the leading healthcare provider and the
              number one healthcare brand in the MENA re...
            </p>
            <div className="bg-[#FFF9E6] text-[#FFB800] text-center py-2 rounded-full text-[13px] font-semibold border border-[#FFB800]/10">
              Account under review.
            </div>
          </div>

          <div className="bg-[#FFF5F5] rounded-[24px] p-6 border border-[#FFDADA]">
            <h4 className="text-[#FF4D4D] font-bold text-[18px] mb-2 leading-tight">
              Please complete your details.
            </h4>
            <p className="text-[13px] text-[#4D4D4D] mb-5">
              Please complete your account details so you can use the platform
              normally.
            </p>
            <button className="w-full bg-[#E32B2B] text-white font-bold py-3 rounded-full hover:bg-[#C22424] transition-all">
              Complete Now
            </button>
          </div>

          <div className="flex flex-col gap-1 px-2 mt-2">
            {/* Company Profile */}
            <NavLink
              to="/companyprofile"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${
                  isActive
                    ? "bg-[#E6F3EF] text-[#00694B] font-bold border border-[#00694B]/10"
                    : "text-[#8F8F8F]"
                }`
              }
            >
              <MdPersonOutline className="text-xl" /> Company Profile
            </NavLink>

            {/* Dashboard */}
            <NavLink
              to="/Dashboard"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${
                  isActive
                    ? "bg-[#E6F3EF] text-[#00694B] font-bold border border-[#00694B]/10"
                    : "text-[#8F8F8F]"
                }`
              }
            >
              <MdDashboard className="text-xl" /> Dashboard
            </NavLink>

            {/* Job Management */}
            <NavLink
              to="/JobManagement"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${
                  isActive
                    ? "bg-[#E6F3EF] text-[#00694B] font-bold border border-[#00694B]/10"
                    : "text-[#8F8F8F]"
                }`
              }
            >
              <MdWorkOutline className="text-xl" /> Job Management
            </NavLink>

            {/* Account settings */}
            <NavLink
              to="/Accountsettings"
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-full font-medium transition-all ${
                  isActive
                    ? "bg-[#E6F3EF] text-[#00694B] font-bold border border-[#00694B]/10"
                    : "text-[#8F8F8F]"
                }`
              }
            >
              <MdSettings className="text-xl" /> Account settings
            </NavLink>
          </div>

          <button className="mt-6 w-full bg-[#00694B] text-white font-bold py-4 rounded-full flex items-center justify-center gap-2">
            Post a Job
          </button>
        </aside>

        {/* Main */}
        <main className="flex-1 col-span-8 w-[1020px] py-[70px]">
          <div className="bg-white rounded-[24px] shadow-[0_4px_30px_rgba(0,0,0,0.06)] px-[40px] py-[32px] border border-[#F1F1F1]">
            {/* Steps */}
            <div className="flex items-center justify-between mb-[80px] relative max-w-[95%] mx-auto">
              <div
                className="absolute top-[16px] left-0 right-0 h-[4px] bg-[#E5E5E5] z-0"
                style={{ transform: "translateY(-50%)" }}
              ></div>

              <div
                className="absolute top-[16px] left-0 h-[4px] bg-[#00694B] z-0 transition-all duration-500 ease-in-out"
                style={{
                  transform: "translateY(-50%)",
                  width:
                    currentStep === 1
                      ? "0%"
                      : currentStep === 2
                        ? "50%"
                        : "100%",
                }}
              ></div>

              {/* Steps Wrapper */}
              {/* Step 1 */}
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[14px] font-bold transition-colors duration-300
      ${currentStep >= 1 ? "bg-[#00694B] text-white" : "bg-[#EAEAEA] text-[#9E9E9E]"}`}
                >
                  1
                </div>
                <p
                  className={`text-[14px] mt-4 absolute top-8 whitespace-nowrap ${currentStep >= 1 ? "font-bold text-[#0D0D0D]" : "font-medium text-[#A3A3A3]"}`}
                >
                  Account Setup
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[14px] font-bold transition-colors duration-300
      ${currentStep >= 2 ? "bg-[#00694B] text-white" : "bg-[#EAEAEA] text-[#9E9E9E]"}`}
                >
                  2
                </div>
                <p
                  className={`text-[14px] mt-4 absolute top-8 whitespace-nowrap ${currentStep >= 2 ? "font-bold text-[#0D0D0D]" : "font-medium text-[#A3A3A3]"}`}
                >
                  Business Verification
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center relative z-10">
                <div
                  className={`w-[32px] h-[32px] rounded-full flex items-center justify-center text-[14px] font-bold transition-colors duration-300
      ${currentStep >= 3 ? "bg-[#00694B] text-white" : "bg-[#EAEAEA] text-[#9E9E9E]"}`}
                >
                  3
                </div>
                <p
                  className={`text-[14px] mt-4 absolute top-8 whitespace-nowrap ${currentStep >= 3 ? "font-bold text-[#0D0D0D]" : "font-medium text-[#A3A3A3]"}`}
                >
                  Company Profile
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6  ">
              {/* Commercial Registration */}
              <div className="CommercialRegistration bg-[#0D0D0D0D] p-[12px] rounded-[16px]">
                <h3 className="text-[21px] font-bold text-[#0D0D0D73]  pb-3">
                  Commercial Registration
                </h3>

                <div className="flex flex-col">
                  <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">
                    Commercial Registration No
                  </label>
                  <input
                    type="text"
                    placeholder="ex: 23121212"
                    {...register("cr_number", { required: true })}
                    className="w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 outline-none focus:ring-2 focus:ring-[#00694B]/20 transition-all placeholder:text-[#8F8F8F]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 py-[15px]">
                  <div className="flex flex-col">
                    <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">
                      Issuing country of the licence
                    </label>
                    <div className="relative">
                      <select
                        {...register("issuing_country")}
                        className="w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 appearance-none outline-none cursor-pointer text-[#8F8F8F]"
                      >
                        <option value="">Select</option>
                        <option>Egypt</option>
                        <option>Saudi Arabia</option>
                        <option>UAE</option>
                      </select>
                      <MdKeyboardArrowDown
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-[#00694B] pointer-events-none"
                        size={22}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">
                      Organization Size
                    </label>
                    <div className="relative">
                      <select
                        {...register("org_size")}
                        className="w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 appearance-none outline-none cursor-pointer text-[#8F8F8F]"
                      >
                        <option value="">Select</option>
                        <option>1-50</option>
                        <option>51-200</option>
                        <option>200+</option>
                      </select>
                      <MdKeyboardArrowDown
                        className="absolute right-5 top-1/2 -translate-y-1/2 text-[#00694B] pointer-events-none"
                        size={22}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 py-[15px]">
                  <div className="flex flex-col ">
                    <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">
                      Commercial Registration Issue Date
                    </label>
                    <input
                      type="date"
                      {...register("cr_issue_date")}
                      className="w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 outline-none text-[#8F8F8F] cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">
                      Commercial Registration Expiry Date
                    </label>
                    <input
                      type="date"
                      {...register("cr_expiry_date")}
                      className="w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 outline-none text-[#8F8F8F] cursor-pointer"
                    />
                  </div>
                </div>

                <UploadBox
                  label="Commercial Registration Image"
                  file={crImage}
                  setFile={setCrImage}
                />
              </div>

              {/* Medical License */}
              <div className="Medical  License bg-[#0D0D0D0D] p-[12px] rounded-[16px]">
                <h3 className="text-[16px] font-bold text-[#0D0D0D] border-b border-[#F1F1F1] pb-3 pt-2">
                  Medical License
                </h3>

                <div className="flex flex-col py-[15px]">
                  <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">
                    Employer type
                  </label>
                  <div className="relative">
                    <select
                      {...register("employer_type")}
                      className="w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 appearance-none outline-none cursor-pointer text-[#8F8F8F]"
                    >
                      <option value="">ex: Full-time</option>
                      <option>Hospital</option>
                      <option>Clinic</option>
                      <option>Lab</option>
                    </select>
                    <MdKeyboardArrowDown
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-[#00694B] pointer-events-none"
                      size={22}
                    />
                  </div>
                </div>

                <div className="flex flex-col py-[15px]">
                  <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">
                    Medical Facility License Number
                  </label>
                  <input
                    type="text"
                    placeholder="ex: 23121212"
                    {...register("ml_number")}
                    className="w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 outline-none transition-all placeholder:text-[#8F8F8F]"
                  />
                </div>

                <div className="flex flex-col py-[15px]">
                  <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">
                    License Issuing Authority
                  </label>
                  <input
                    type="text"
                    placeholder="ex: Dubai Health Authority"
                    {...register("license_authority")}
                    className="w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 outline-none transition-all placeholder:text-[#8F8F8F]"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">
                    Specialty / Scope of Practice
                  </label>
                  <div className="relative">
                    <select
                      {...register("specialty")}
                      className="w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 appearance-none outline-none cursor-pointer text-[#8F8F8F]"
                    >
                      <option value="">ex: hospital</option>
                      <option>Cardiology</option>
                      <option>Neurology</option>
                      <option>Pediatrics</option>
                    </select>
                    <MdKeyboardArrowDown
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-[#00694B] pointer-events-none"
                      size={22}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">
                      Medical License Issue Date
                    </label>
                    <input
                      type="date"
                      {...register("ml_issue_date")}
                      className="w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 outline-none text-[#8F8F8F]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[15px] font-bold text-[#0D0D0D] mb-2">
                      Medical License Expiry Date
                    </label>
                    <input
                      type="date"
                      {...register("ml_expiry_date")}
                      className="w-full h-[56px] bg-[#EAEAEA] rounded-full px-6 outline-none text-[#8F8F8F]"
                    />
                  </div>
                </div>

                <UploadBox
                  label="Medical License Image"
                  file={mlImage}
                  setFile={setMlImage}
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-center gap-4 mt-10">
                <button
                  type="button"
                  onClick={() => navigate("/details")}
                  className="w-[160px] h-[56px] border border-[#CCCCCC] text-[#0D0D0D] rounded-full font-bold text-[16px] hover:bg-[#F5F5F5] transition-all"
                >
                  Prev
                </button>
                <button
                  type="submit"
                  className="w-[160px] h-[56px] bg-[#152126] hover:bg-black text-white rounded-full font-bold text-[16px] transition-all"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Details2;
