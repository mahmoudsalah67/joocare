import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function ResetPassword() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  
  const email = location.state?.email;
  const otp = location.state?.otp;

  const onSubmit = (data) => {
    const payload = {
      email: email,
      otp: otp,
      password: data.password,
      password_confirmation: data.password_confirmation
    };

    axios.post("https://joocare.nami-tec.com/api/company/auth/reset-password", payload)
      .then((res) => {
        toast.success("Password reset successfully! Please login.");
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Failed to reset password.");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FA] px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-10 rounded-[32px] max-w-[540px] w-full shadow-md text-center border border-gray-100">
        <h2 className="text-[#0D0D0D] text-[32px] font-bold mb-3">New Password</h2>
        <p className="text-[#8F8F8F] text-[15px] mb-8 leading-relaxed">
          Enter a strong password that you'll easy to remember.
        </p>
        
        {/* New Password */}
        <div className="flex flex-col mb-4 text-left">
          <label className="font-semibold text-[15px] mb-2 ml-1">New password</label>
          <input 
            type="password" 
            placeholder="••••••••"
            className="w-full h-[56px] bg-[#F3F3F3] border-2 border-transparent rounded-full px-6 text-sm outline-none transition-all focus:border-[#00694B] focus:bg-white"
            {...register("password", { required: "Password is required" })} 
          />
          {errors.password && <p className="text-red-500 text-xs mt-2 ml-2">{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col mb-8 text-left">
          <label className="font-semibold text-[15px] mb-2 ml-1">Confirm new password</label>
          <input 
            type="password" 
            placeholder="••••••••"
            className="w-full h-[56px] bg-[#F3F3F3] border-2 border-transparent rounded-full px-6 text-sm outline-none transition-all focus:border-[#00694B] focus:bg-white"
            {...register("password_confirmation", { 
              required: "Please confirm your password",
              validate: (value) => value === watch('password') || "Passwords do not match"
            })} 
          />
          {errors.password_confirmation && <p className="text-red-500 text-xs mt-2 ml-2">{errors.password_confirmation.message}</p>}
        </div>

        <button type="submit" className="w-full h-[56px] bg-[#1A2126] text-white font-bold rounded-full text-base hover:bg-black transition-all shadow-md">
          Confirm
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;