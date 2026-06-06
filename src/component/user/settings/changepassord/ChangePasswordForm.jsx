import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineVisibilityOff, MdOutlineVisibility } from "react-icons/md";
import axios from "axios";
import { toast } from "react-hot-toast";

// إعداد كائن Axios الثابت للـ API
const api = axios.create({
  baseURL: "https://joocare.nami-tec.com/api",
  headers: {
    "Accept-Language": "en",
    Authorization: `Bearer ${localStorage.getItem("company_token")}`,
  },
});

function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({ current: false, new: false, confirm: false });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      old_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  // مراقبة قيمة كلمة المرور الجديدة لمطابقتها مع حقل التأكيد
  const newPassword = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await api.post("/user/auth/change-password", {
        old_password: data.old_password,
        password: data.password,
        password_confirmation: data.password_confirmation,
      });

      if (response.status === 200 || response.data?.status === true) {
        toast.success("Password changed successfully!");
        reset(); // تفريغ الحقول بعد النجاح
      }
    } catch (error) {
      console.error("Change password error:", error);
      toast.error(error.response?.data?.message || "Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        
        {/* Current password */}
        <div className="flex flex-col gap-2.5">
          <label className="text-[15px] font-bold text-[#0D0D0D] ml-1">
            Current password
          </label>
          <div className="relative">
            <input
              {...register("old_password", { required: "Current password is required" })}
              type={showPassword.current ? "text" : "password"}
              placeholder="******"
              className="w-full h-[52px] bg-[#F3F3F3] rounded-full px-6 text-[14px] outline-none border-none focus:ring-2 focus:ring-[#00694B]/10 transition-all placeholder:text-[#AAAAAA]"
            />
            <button
              type="button"
              onClick={() => toggleVisibility("current")}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-[#8F8F8F] text-xl cursor-pointer"
            >
              {showPassword.current ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
            </button>
          </div>
          {errors.old_password && <p className="text-red-500 text-[13px] mt-1 px-4">{errors.old_password.message}</p>}
        </div>

        {/* New password */}
        <div className="flex flex-col gap-2.5">
          <label className="text-[15px] font-bold text-[#0D0D0D] ml-1">
            New password
          </label>
          <div className="relative">
            <input
              {...register("password", { 
                required: "New password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" }
              })}
              type={showPassword.new ? "text" : "password"}
              placeholder="******"
              className="w-full h-[52px] bg-[#F3F3F3] rounded-full px-6 text-[14px] outline-none border-none focus:ring-2 focus:ring-[#00694B]/10 transition-all placeholder:text-[#AAAAAA]"
            />
            <button
              type="button"
              onClick={() => toggleVisibility("new")}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-[#8F8F8F] text-xl cursor-pointer"
            >
              {showPassword.new ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-[13px] mt-1 px-4">{errors.password.message}</p>}
        </div>

        {/* Confirm new password */}
        <div className="flex flex-col gap-2.5">
          <label className="text-[15px] font-bold text-[#0D0D0D] ml-1">
            Confirm new password
          </label>
          <div className="relative">
            <input
              {...register("password_confirmation", { 
                required: "Please confirm your password",
                validate: value => value === newPassword || "The passwords do not match"
              })}
              type={showPassword.confirm ? "text" : "password"}
              placeholder="******"
              className="w-full h-[52px] bg-[#F3F3F3] rounded-full px-6 text-[14px] outline-none border-none focus:ring-2 focus:ring-[#00694B]/10 transition-all placeholder:text-[#AAAAAA]"
            />
            <button
              type="button"
              onClick={() => toggleVisibility("confirm")}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-[#8F8F8F] text-xl cursor-pointer"
            >
              {showPassword.confirm ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
            </button>
          </div>
          {errors.password_confirmation && <p className="text-red-500 text-[13px] mt-1 px-4">{errors.password_confirmation.message}</p>}
        </div>

        {/* Save Button */}
        <div className="flex justify-center pt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-[220px] h-[54px] cursor-pointer rounded-full bg-[#1A2126] text-white font-bold text-[16px] shadow-lg hover:bg-black transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;