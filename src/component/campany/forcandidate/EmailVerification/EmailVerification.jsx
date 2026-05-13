import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const EmailVerificationModal = ({ email, onClose }) => {
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [timer, setTimer] = useState(60); 
  const inputRefs = useRef([]);
  const navigate = useNavigate();

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
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

   
    if (element.value !== "" && index < 4) {
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

    if (verificationCode.length < 5) {
      toast.error("Please enter the full code");
      return;
    }

    try {
       
      const response = await axios.post('https://joocare.nami-tec.com/api/company/auth/email/confirm', {
        email: email,  
        otp: verificationCode
      });

      if (response.status === 200) {
        toast.success("Email verified successfully!");
        onClose();
        navigate('/details')  
         
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Invalid verification code");
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(60);  
      toast.success("Code resent to your email");
      
    } else {
      toast.error(`Please wait ${timer}s before resending`);
    }
  };

  return (
     <div className="bg-white p-10 rounded-[32px] max-w-[540px] w-full shadow-2xl text-center relative border border-gray-100">
      
      {}
      <div 
        onClick={onClose} 
        className="absolute right-6 top-6 cursor-pointer text-gray-400 hover:text-black text-2xl transition-all"
      >
        ✕
      </div>

      <h2 className="text-[#1A1C1E] text-[36px] font-bold mb-3">Email Verification</h2>
      <p className="text-[#44474E] text-[18px] mb-10 leading-relaxed">
        Enter the code sent to <span className="font-bold text-[#1A1C1E]">{email}</span> <br />
        or click the verification link in your email.
      </p>

     
      <div className="flex justify-center gap-3 mb-8">
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            ref={(el) => (inputRefs.current[index] = el)}
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-[75px] h-[95px] bg-[#E1E3E1] border border-[#C4C7C5] rounded-[20px] text-center text-4xl font-bold text-[#1A1C1E] focus:border-[#00694B] focus:ring-2 focus:ring-[#00694B]/20 outline-none transition-all"
          />
        ))}
      </div>

       <div className="flex justify-between items-center text-[16px] mb-10 px-2 font-medium">
        <button 
          onClick={handleResend}
          className={`${timer === 0 ? "text-[#00694B] cursor-pointer hover:underline" : "text-gray-400 cursor-not-allowed"}`}
        >
          Resend the code
        </button>
        <span className="text-[#44474E] font-mono bg-gray-100 px-3 py-1 rounded-full">
          {formatTime(timer)}
        </span>
      </div>

      <button 
        onClick={handleConfirm}
        className="w-full bg-[#1A1C1E] text-white py-5 rounded-full text-xl font-bold hover:bg-black transition-all shadow-lg active:scale-[0.98]"
      >
        confirm
      </button>
    </div>
  );
};

export default EmailVerificationModal;