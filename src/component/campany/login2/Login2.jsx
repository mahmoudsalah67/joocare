import React, { useState } from 'react';
import { motion } from "framer-motion";
import google from '../../../../public/imge/img-contact/Icon - Google.svg';
import group from '../../../../public/imge/img-contact/Group.svg';
import { NavLink, useNavigate } from 'react-router-dom';  
import { useForm } from 'react-hook-form';
import axios from 'axios';  
import { toast } from 'react-hot-toast';  
import { IoEye, IoEyeOff } from "react-icons/io5";

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
        if (res.data?.code === 422 || res.data?.data === null) {
          throw new Error(res.data?.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة");
        }

<<<<<<< HEAD
        toast.success("Login successful!", {
          position: "top-right",
          style: {
            background: "#E6F4EA",
            color: "#1E8E3E",
            borderRadius: "10px",
          },
        });
=======
  
    
    if (res.data?.code === 422 || res.data?.data === null) {
      
      throw new Error(res.data?.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
>>>>>>> bded9f5aa94b8159c89f7c445cb1841d10855818

        const token = res.data?.token || 
                      res.data?.data?.token || 
                      res.data?.authorisation?.token || 
                      res.data?.data?.access_token;

        const userName = res.data?.user?.name || res.data?.data?.user?.name || "User";

<<<<<<< HEAD
        if (token) {
          localStorage.setItem('user_token', token);
          localStorage.setItem('user_name', userName);  
        }

        navigate("/");
      })
=======
 
  const userName = res.data?.user?.name || res.data?.data?.user?.name || "User";

  if (token) {
    localStorage.setItem('user_token', token);
    localStorage.setItem('user_name', userName); 
  } else {
    console.error("Token not found in response!");
  }

  navigate("/");
})
>>>>>>> bded9f5aa94b8159c89f7c445cb1841d10855818
      .catch((err) => {
        toast.error(err.response?.data?.message || "Login failed. Please check your credentials.");
      });
  };

  return (
    <div className="min-h-screen bg-white overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
<<<<<<< HEAD
        <div className="flex flex-col lg:flex-row min-h-screen">
=======
        <div className="section-login mt-6">
          <div className="contentt flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20 ">
            
            <div className="left flex items-center justify-center lg:justify-between w-full lg:w-[715px] gap-[10px] px-[24px] sm:px-[60px] lg:px-[115px] py-[60px] sm:py-[100px] lg:py-[411px]">
              <div className="middle w-full max-w-[513px] ">
                <div className="title">
                  <h2 className='text-[28px] sm:text-[36px] lg:text-[48px] mb-[16px] lg:mb-[24px] font-[600] '>Match Faster <br className="hidden sm:block" />work smarter</h2>
                  <p className='text-[16px] sm:text-[18px] lg:text-[21px] font-[400]'>With smart tools and AI-powered insights, joocare <br className="hidden lg:block" />helps you find the right opportunity and land the job you deserve with confidence.</p>
                </div>
              </div>
            </div>

            <div className="right w-full lg:w-[715px] gap-[10px] px-[20px] sm:px-[32px] lg:px-0">
              <div className="content w-full max-w-[539px] mx-auto">
                <div className="title">
                  <h2 className='text-[32px] sm:text-[40px] lg:text-[48px] font-[700] '>Welcome back</h2>
                  <p className='text-[16px] sm:text-[18px] font-[400]'>Find your next opportunity faster</p>
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
                        className={`p-[16px] bg-[#0D0D0D0D] focus:border-[#00694B] outline-none transition duration-300 border rounded-[999px] mt-[4px] w-full ${errors.email ? "border-red-500" : "border-[#0D0D0D14]"}`}
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
                      className="py-[16px] px-[32px] w-full sm:w-[223px] flex items-center justify-center mt-[32px] mx-auto bg-[#00694B] hover:bg-black transition duration-500 rounded-full text-white font-bold cursor-pointer"
                    >
                      Login
                    </button>
>>>>>>> bded9f5aa94b8159c89f7c445cb1841d10855818
          
          {/* LEFT SIDE - The Green Section */}
          <div className="left w-full lg:w-[50%] bg-[#00694B] text-white flex items-center justify-center p-8 lg:p-20 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent opacity-50 pointer-events-none"></div>
            
            <div className="relative z-10 max-w-[500px] text-center lg:text-left py-12 lg:py-0">
              <h2 className='text-3xl md:text-4xl lg:text-[48px] mb-6 font-bold leading-tight'>
                Match Faster <br className="hidden md:block" />work smarter
              </h2>
              <p className='text-lg md:text-xl font-light opacity-90'>
                With smart tools and AI-powered insights, joocare helps you find the right opportunity and land the job you deserve with confidence.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - The Form Section */}
          <div className="right w-full lg:w-[50%] flex items-center justify-center p-6 md:p-12 lg:p-20 bg-white">
            <div className="w-full max-w-[500px]">
              <div className="title mb-8 text-center lg:text-left">
                <h2 className='text-3xl md:text-4xl lg:text-[48px] font-bold text-gray-900'>Welcome back</h2>
                <p className='text-base md:text-lg text-gray-500 mt-2'>Find your next opportunity faster</p>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* EMAIL */}
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-1 ml-1">
                    User Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="ex:mail@mail.com"
                    className={`w-full p-4 bg-gray-50 border rounded-full outline-none transition-all focus:ring-2 focus:ring-[#00694B]/20 focus:border-[#00694B] ${errors.email ? "border-red-500" : "border-gray-200"}`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Email is not valid",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 ml-4">{errors.email.message}</p>
                  )}
                </div>
<<<<<<< HEAD

                {/* PASSWORD */}
                <div className="flex flex-col relative">
                  <label htmlFor="password" className="text-sm font-semibold text-gray-700 mb-1 ml-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="••••••••"
                      className={`w-full p-4 bg-gray-50 border rounded-full outline-none transition-all focus:ring-2 focus:ring-[#00694B]/20 focus:border-[#00694B] ${errors.password ? "border-red-500" : "border-gray-200"}`}
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    <div 
                      className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <IoEye size={22} /> : <IoEyeOff size={22} />}
=======
                
                <div className="sochail mt-[24px]">
                  <div className="or flex items-center gap-[13px]">
                    <div className="br border-[1px] w-full border-[#0D0D0D14]"></div>
                    <div className="p">Or</div>
                    <div className="br border-[1px] w-full border-[#0D0D0D14]"></div>
                  </div>
                  <div className="soch flex flex-col sm:flex-row items-center justify-center mt-[12px] gap-4 sm:gap-24">
                    <div className="linkedin flex justify-center gap-[12px] border-[1px] w-full sm:w-[263.5px] border-[#0D0D0D14] rounded-[12px] py-[11px] px-[12px]">
                      <p>Linkedin</p>
                      <img src={group} alt="" />
                    </div>
                    <div className="google flex items-center justify-center gap-[12px] border-[1px] w-full sm:w-[263.5px] border-[#0D0D0D14] rounded-[12px] py-[11px] px-[12px] ">
                      <p>Google</p>
                      <img src={google} alt="" />
>>>>>>> bded9f5aa94b8159c89f7c445cb1841d10855818
                    </div>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1 ml-4">{errors.password.message}</p>
                  )}
                  <div className="mt-2 ml-1">
                    <NavLink to={'/forgotpassword'} className='text-[#00694B] text-sm font-semibold hover:underline'>
                      Forget Password?
                    </NavLink>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full md:w-[220px] py-4 bg-[#00694B] hover:bg-black text-white font-bold rounded-full transition-all duration-300 shadow-md active:scale-95 block mx-auto lg:mx-0"
                >
                  Login
                </button>
              </form>
              
              <div className="mt-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="flex-1 h-[1px] bg-gray-100"></div>
                  <span className="text-gray-400 text-sm">Or</span>
                  <div className="flex-1 h-[1px] bg-gray-100"></div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
                    <span className="text-sm font-medium">Linkedin</span>
                    <img src={group} alt="Linkedin" className="w-5 h-5" />
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-3 py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
                    <span className="text-sm font-medium">Google</span>
                    <img src={google} alt="Google" className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-center mt-10">
                  <p className='text-gray-500'>
                    New to JooCare ? <NavLink to={'/joinnow'} className='text-[#00694B] font-bold hover:underline ml-1'>Join Now</NavLink>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default Login2;
