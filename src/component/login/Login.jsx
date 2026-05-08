import React from 'react'
 import { motion } from "framer-motion";
 import './login.css'
 import eye from '../../../public/imge//img-contact/eye.svg'
 import google from '../../../public/imge/img-contact/Icon - Google.svg'
 import group from '../../../public/imge/img-contact/Group.svg'
import { Link, NavLink } from 'react-router-dom';
function login() {
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
          
             
           <div className="left flex  items-center justify-between w-[715px] gap-[10px] px-[115px] py-[411px]">
            <div className="middle ">
              <div className="title">
                <h2 className='text-[48px]  mb-[24px] font-[600] '>Match Faster <br />work smarter</h2>
                <p className='text-[21px] font-[400]'>With smart tools and AI-powered insights, joocare <br />helps you find the right opportunity and land the job you deserve with confidence.</p>
              </div>
            </div>
           
          
          </div>

           <div className="right w-[715px] gap-[10px]  ">
               <div className="content w-[539px]">
                <div className="title">
                  <h2 className='text-[48px] font-[700] '>Welcome Back</h2>
                  <p className='text-[18px] font-[400]'>Find your next opportunity faster</p>
                </div>
                <div className="form mt-[24px]" >
                  <form className='w-[539px]'>
                    <div className="email flex flex-col">
                      <label htmlFor="email">email</label>
                      <input type="email" id='eamil' placeholder='ex:mail@mail.com' className='p-[16px] focus:border-[#00694B] outline-none transition duration-300 bg-[#0D0D0D0D] border-[1px] border-[#0D0D0D14] rounded-[999px] mt-[4px]'/>
                    </div>
                    <div className="password flex flex-col mt-[24px] relative">
                      <label htmlFor="email">Password</label>
                      <input type="password" id='password' placeholder='••••••••' className='p-[16px] bg-[#0D0D0D0D] focus:border-[#00694B] outline-none transition duration-300 border-[1px] border-[#0D0D0D14] rounded-[999px] mt-[4px]'/>
                      <div className="img absolute right-5 top-12 ">
                        <img src={eye} alt="" />
                      </div>
                      <div className="ph mt-[8px]">
                        <a className=' cursor-pointer'>Forget password?</a>
                      </div>
                    </div>
                    <Link to={'/'} className='py-[16px] px-[32px] w-[223px] flex items-center justify-center cursor-pointer mt-[24px]  mx-auto  bg-[#00694B] hover:bg-black transition duration-500 rounded-full text-white'>Login</Link>
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
                    <span  className='text-[16px] text-[#0D0D0DA6]'>New to JooCare ? <NavLink to={'/joinnow'} className='text-[#00694B] border-b-[1px] font-[600]'>join Now</NavLink></span>
                   </div>
                </div>
               </div>

           </div>
      </div>  

    </div>
      </motion.div>
    </>
  )
}

export default login