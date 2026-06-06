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

        const userName = res.data?.user?.name || res.data?.data?.user?.name || "User";

        if (token) {
          localStorage.setItem('user_token', token);
          localStorage.setItem('user_name', userName);  
        }

        navigate("/");
      })
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
        <div className="flex flex-col lg:flex-row min-h-screen">
          
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
