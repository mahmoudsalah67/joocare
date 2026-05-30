import React, { useEffect } from "react";
import confetti from "canvas-confetti";

function SuccessModal({ isOpen, onClose }) {
  // أول ما الـ Modal يفتح، شغل تأثير الـ Confetti تلقائياً زى الصورة بالظبط
  useEffect(() => {
    if (isOpen) {
      // ضربة احتفال أولى
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
        
      });
      
      // ضربة خفيفة تانية تدي تأثير عشوائي جميل
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.6 },
          
        });
      }, 250);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* الخلفية المظلمة الشفافة (Overlay) */}
      <div 
        className="absolute inset-0 bg-[#152126]/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* جسم الـ Modal */}
      <div className="relative bg-white rounded-[32px] w-full max-w-[580px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col items-center text-center transform transition-all duration-300 scale-100 z-10 animate-fade-in-up">
        
        {/* زرار الإغلاق (X) */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* الأيقونة الخضراء (صح) */}
        <div className="w-[88px] h-[88px] bg-[#00694B] rounded-full flex items-center justify-center mb-8 shadow-md shadow-[#00694B]/20">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* النصوص */}
        <h2 className="text-[24px] md:text-[28px] font-black text-[#111111] leading-tight mb-4 max-w-[85%]">
          Your advertisement has been successfully published!
        </h2>
        
        <p className="text-[#555555] text-[15px] md:text-[16px] font-medium leading-relaxed max-w-[90%] mb-2">
          Your advertisement is now available to thousands of medical professionals on the platform. We will notify you as soon as any suitable candidates apply. You can track statistics and applicant interactions through the dashboard.
        </p>
      </div>
    </div>
  );
}

export default SuccessModal;