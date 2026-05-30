import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios.post("https://joocare.nami-tec.com/api/company/auth/forgot-password", { email: data.email })
      .then((res) => {
        toast.success(res.data?.message || "OTP sent successfully!");
        navigate("/verifyotp", { state: { email: data.email } });
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Failed to send OTP.");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FA] px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-10 rounded-[32px] max-w-[540px] w-full shadow-md text-center border border-gray-100">
        <h2 className="text-[#0D0D0D] text-[32px] font-bold mb-3">Forgot Password</h2>
        <p className="text-[#8F8F8F] text-[15px] mb-8 leading-relaxed">
          Please enter your account email address and we will send a four-digit verification code to reset your password.
        </p>
        
        <div className="flex flex-col mb-6 text-left">
          <label className="font-semibold text-[15px] mb-2 ml-1">Email</label>
          <input 
            type="email" 
            placeholder="ex:mail@mail.com"
            className={`w-full h-[56px] bg-[#F3F3F3] border-2 border-transparent rounded-full px-6 text-sm outline-none transition-all focus:border-[#00694B] focus:bg-white ${errors.email ? "border-red-500" : ""}`}
            {...register("email", { required: "Email is required" })} 
          />
          {errors.email && <p className="text-red-500 text-xs mt-2 ml-2">{errors.email.message}</p>}
        </div>

        <button type="submit" className="w-full h-[56px] bg-[#1A2126] text-white font-bold rounded-full text-base hover:bg-black transition-all shadow-md">
          Send
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;