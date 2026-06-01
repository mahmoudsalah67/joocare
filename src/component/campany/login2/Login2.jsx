import React, { useState } from 'react';
import { motion } from "framer-motion";
  import google from '../../../../public//imge/img-contact/Icon - Google.svg';
import group from '../../../../public//imge/img-contact/Group.svg';
import { NavLink, useNavigate } from 'react-router-dom';  
import { useForm } from 'react-hook-form';
import axios from 'axios';  
import { toast } from 'react-hot-toast';  
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

function Login2() {  
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
     const loginPayload = {
      email: data.email,
      password: data.password
    };

 axios
  .post("https://joocare.nami-tec.com/api/user/auth/login", loginPayload)  
  .then((res) => {
  console.log("Full Login Response:", res.data);

 // 1. التشيك الذكي: لو الباكيند باعت كود إيرور (زي 422) جوه الـ 200 OK
    // أو لو الداتا راجعة بـ null
    if (res.data?.code === 422 || res.data?.data === null) {
      // ارمي إيرور فوراً بالرسالة العربي اللي جاية من السيرفر
      throw new Error(res.data?.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }

  toast.success("Login successful!", {
    position: "top-right",
    style: {
      background: "#E6F4EA",
      color: "#1E8E3E",
      borderRadius: "10px",
    },
  });

  const token = res.data?.token || 
                res.data?.data?.token || 
                res.data?.authorisation?.token || 
                res.data?.data?.access_token;

  // جلب اسم المستخدم من الريسبونص (عدل المسار حسب الـ API عندك بيرجعه فين بالظبط)
  const userName = res.data?.user?.name || res.data?.data?.user?.name || "User";

  if (token) {
    localStorage.setItem('user_token', token);
    localStorage.setItem('user_name', userName); // سطر التخزين الجديد
  } else {
    console.error("Token not found in response!");
  }

  navigate("/");
})
      .catch((err) => {
        console.error(err);
        toast.error(err.response?.data?.message || "Login failed. Please check your credentials.");
      });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="section-login">
          <div className="contentt flex items-center justify-between gap-20 ">
            
            <div className="left flex items-center justify-between w-[715px] gap-[10px] px-[115px] py-[411px]">
              <div className="middle ">
                <div className="title">
                  <h2 className='text-[48px] mb-[24px] font-[600] '>Match Faster <br />work smarter</h2>
                  <p className='text-[21px] font-[400]'>With smart tools and AI-powered insights, joocare <br />helps you find the right opportunity and land the job you deserve with confidence.</p>
                </div>
              </div>
            </div>

            <div className="right w-[715px] gap-[10px]">
              <div className="content w-[539px]">
                <div className="title">
                  <h2 className='text-[48px] font-[700] '>Welcome back</h2>
                  <p className='text-[18px] font-[400]'>Find your next opportunity faster</p>
                </div>
                <div className="form mt-[24px]" >
                  <form onSubmit={handleSubmit(onSubmit)}>

                    {/* EMAIL */}
                    <div className="email flex flex-col mt-[24px]">
                      <label htmlFor="email" className="text-[#0D0D0D] font-[600]">
                        User Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="ex:mail@mail.com"
                        className={`p-[16px] bg-[#0D0D0D0D] focus:border-[#00694B] outline-none transition duration-300 border rounded-[999px] mt-[4px] ${errors.email ? "border-red-500" : "border-[#0D0D0D14]"}`}
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Email is not valid",
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-[14px] mt-[6px]">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* PASSWORD */}
                    <div className="password flex flex-col mt-[24px] relative">
                      <label htmlFor="password" className="font-[600] text-[#111827]">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          placeholder="••••••••"
                          className={`p-[16px] w-full bg-[#0D0D0D0D] focus:border-[#00694B] outline-none transition duration-300 border rounded-[999px] mt-[4px] ${errors.password ? "border-red-500" : "border-[#0D0D0D14]"}`}
                          {...register("password", {
                            required: "Password is required",
                          })}
                        />
                        {showPassword ? (

                          <IoEye
                            className="absolute  right-5 top-1/2 -translate-y-1/2 mt-[2px] cursor-pointer"
                            onClick={() => setShowPassword(false)}  
                           size={'25px'}/>
                        ) : (
                          <IoEyeOff
                            className="absolute  right-5 top-1/2 -translate-y-1/2 mt-[2px] cursor-pointer"
                            onClick={() => setShowPassword(true)}  
                           size={'25px'}/>
                        )}
                      </div>
                      {errors.password && (
                        <p className="text-red-500 text-[14px] mt-[6px]">
                          {errors.password.message}
                        </p>
                      )}
                      <div className="forget-password">
                        <NavLink to={'/forgotpassword'} className='text-[#00694B] text-[14px] font-[600] mt-[6px]'>Forget Password?</NavLink>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="py-[16px] px-[32px] w-[223px] flex items-center justify-center mt-[32px] mx-auto bg-[#00694B] hover:bg-black transition duration-500 rounded-full text-white font-bold cursor-pointer"
                    >
                      Login
                    </button>
          
                  </form>
                </div>
                
                <div className="sochail mt-[24px]">
                  <div className="or flex items-center gap-[13px]">
                    <div className="br border-[1px] w-[247px] border-[#0D0D0D14]"></div>
                    <div className="p">Or</div>
                    <div className="br border-[1px] w-[247px] border-[#0D0D0D14]"></div>
                  </div>
                  <div className="soch flex items-center justify-center mt-[12px] gap-24">
                    <div className="linkedin flex justify-center gap-[12px] border-[1px] w-[263.5px] border-[#0D0D0D14] rounded-[12px] py-[11px] px-[12px]">
                      <p>Linkedin</p>
                      <img src={group} alt="" />
                    </div>
                    <div className="google flex items-center justify-center gap-[12px] border-[1px] w-[263.5px] border-[#0D0D0D14] rounded-[12px] py-[11px] px-[12px] ">
                      <p>Google</p>
                      <img src={google} alt="" />
                    </div>
                  </div>
                  <div className="footer text-center mt-[24px]">
                    <span className='text-[16px] text-[#0D0D0DA6]'>New to JooCare ? <NavLink to={'/joinnow'} className='text-[#00694B] border-b-[1px] font-[600]'>Join Now</NavLink></span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Login2;