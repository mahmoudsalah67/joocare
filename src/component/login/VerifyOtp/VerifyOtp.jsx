import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function VerifyOtp() {
  const [otp, setOtp] = useState(['', '', '', '']); 
  const [timer, setTimer] = useState(166); // 02:46 دقيقة كما في الديزاين
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "your email";

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `Resend in ${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== "" && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleConfirm = async () => {
    const verificationCode = otp.join('');

    if (verificationCode.length < 4) {
      toast.error("Please enter the full 4-digit code");
      return;
    }

    try {
      const response = await axios.post('https://joocare.nami-tec.com/api/company/auth/verify-otp', {
        email: email,  
        otp: verificationCode
      });

      if (response.status === 200 || response.data?.message === "Success") {
        toast.success("OTP Verified Successfully!");
        navigate('/reset-password', { state: { email: email, otp: verificationCode } });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid verification code");
    }
  };

  const handleResend = async () => {
    if (timer === 0) {
      try {
        await axios.post('https://joocare.nami-tec.com/api/company/auth/forgot-password', { email: email });
        setTimer(166);  
        toast.success("Code resent to your email");
      } catch (error) {
        toast.error("Failed to resend code.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FA] px-4">
      <div className="bg-white p-10 rounded-[32px] max-w-[540px] w-full shadow-md text-center border border-gray-100">
        <h2 className="text-[#0D0D0D] text-[32px] font-bold mb-3">Email Verification</h2>
        <p className="text-[#8F8F8F] text-[15px] mb-10 leading-relaxed">
          We sent a code to <span className="font-bold text-[#0D0D0D]">{email}</span> <br />
          enter it below to confirm your email.
        </p>

        <div className="flex justify-center gap-4 mb-6">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              ref={(el) => (inputRefs.current[index] = el)}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-[80px] h-[90px] bg-[#F3F3F3] border-2 border-transparent rounded-[16px] text-center text-[36px] font-bold text-[#0D0D0D] focus:border-[#00694B] focus:bg-white outline-none transition-all"
            />
          ))}
        </div>

        <div className="mb-8">
          {timer === 0 ? (
            <button onClick={handleResend} className="text-[#00694B] text-[14px] font-semibold hover:underline">
              Resend the code
            </button>
          ) : (
            <span className="text-[#00694B] text-[14px] font-semibold">{formatTime(timer)}</span>
          )}
        </div>

        <button onClick={handleConfirm} className="w-full bg-[#1A2126] text-white py-4 rounded-full text-lg font-bold hover:bg-black transition-all shadow-md active:scale-[0.98]">
          Confirm
        </button>
      </div>
    </div>
  );
}

export default VerifyOtp;