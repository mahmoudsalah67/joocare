import React from 'react'
import log from '../../../public/imge/Frame 8.svg'
import icon from '../../../public/imge/Frame 2147228002.svg'
import star from '../../../public/imge/img-footer/Star 6.svg'
import line1 from '../../../public/imge/img-footer/Line 121.svg' 
import line2 from '../../../public/imge/img-footer/Line 119.svg'
import linkedin from '../../../public/imge/img-footer/Social Media Icon.svg'
import facebook from '../../../public/imge/img-footer/Social Media Icon (1).svg'
import insta from '../../../public/imge/img-footer/Social Media Icon (2).svg'
import x from '../../../public/imge/img-footer/Social Media Icon (3).svg'
import snapchat from '../../../public/imge/img-footer/Social Media Icon (4).svg'


import '../footer/Footer.css'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
   <div className="footer bg-[#1C2628]">
  <div className="container mx-auto px-4 md:px-16 lg:px-30">
    
    <div className="content grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
      
      {/* Logo */}
      <div className="joocar pt-[92px] mb-[46px] sm:col-span-2 lg:col-span-1">
        <img src={log} alt="" />
        <p className="text-white pt-[24px] text-[16px] font-[400]">
          An AI-powered healthcare <br />recruitment platform supporting <br />
          compliant, data-driven hiring <br />across medical and life sciences <br />sectors.
        </p>
      </div>

      {/* For Candidates */}
      <div className="item-1 flex justify-start lg:justify-center items-start mt-0 sm:mt-[92px]">
        <img src={icon} alt="" className="shrink-0" />
        <div className="flex flex-col ml-[24px]">
          <h1 className="text-[21px] font-[600] text-white">For Candidates</h1>
          <div className="ph pt-[24px] flex flex-col gap-3">
            <Link to={'/jobs'} className="text-white/65 hover:text-white transition cursor-pointer">Explore Jobs</Link>
            <Link to={'/joinnow'} className="text-white/65 hover:text-white transition cursor-pointer">Create Profile</Link>
             <Link to={'/faq'} className="text-white/65 hover:text-white transition cursor-pointer">FAQ</Link>
          </div>
        </div>
      </div>

      {/* For Employers */}
      <div className="item-1 flex justify-start lg:justify-center items-start mt-0 sm:mt-[92px]">
        <img src={icon} alt="" className="shrink-0" />
        <div className="flex flex-col ml-[24px]">
          <h1 className="text-[21px] font-[600] text-white">For Employers</h1>
          <div className="ph pt-[24px] flex flex-col gap-3">
            <Link to={'/foremployer'} className="text-white/65 hover:text-white transition cursor-pointer">For Employers</Link>
            <Link to={'/foremployer'} className="text-white/65 hover:text-white transition cursor-pointer">How It Works</Link>
          </div>
        </div>
      </div>

      {/* Company & Trust */}
      <div className="item-1 flex justify-start lg:justify-center items-start mt-0 sm:mt-[92px]">
        <img src={icon} alt="" className="shrink-0" />
        <div className="flex flex-col ml-[24px]">
          <h1 className="text-[21px] font-[600] text-white">Company & Trust</h1>
          <div className="ph pt-[24px] flex flex-col gap-3">
            <Link to={'/about'} className="text-white/65 hover:text-white transition cursor-pointer">About Joocare</Link>
            <p className="text-white/65 hover:text-white transition cursor-pointer">Data Privacy & Security</p>
            <p className="text-white/65 hover:text-white transition cursor-pointer">Terms & Conditions</p>
          </div>
        </div>
      </div>

      {/* Get in Touch */}
      <div className="item-1 flex justify-start lg:justify-center items-start mt-0 sm:mt-[92px]">
        <img src={icon} alt="" className="shrink-0" />
        <div className="flex flex-col ml-[24px]">
          <h1 className="text-[21px] font-[600] text-white">Get in Touch</h1>
          <div className="ph pt-[24px] flex flex-col gap-3">
            <Link to={'/contact'} className="text-white/65 hover:text-white transition cursor-pointer">Contact Us</Link>
          </div>
        </div>
      </div>

    </div>

    {/* Bottom Bar */}
    <div className="bor-star-sochial flex flex-col md:flex-row items-center justify-between mb-[40px] gap-6">
      
      {/* Socials */}
      <div className="sochial flex gap-[16px]">
        <img src={linkedin} alt="" className="cursor-pointer opacity-70 hover:opacity-100 transition" />
        <img src={facebook} alt="" className="cursor-pointer opacity-70 hover:opacity-100 transition" />
        <img src={insta} alt="" className="cursor-pointer opacity-70 hover:opacity-100 transition" />
        <img src={x} alt="" className="cursor-pointer opacity-70 hover:opacity-100 transition" />
        <img src={snapchat} alt="" className="cursor-pointer opacity-70 hover:opacity-100 transition" />
      </div>

      {/* Divider with star */}
      <div className="bor flex items-center gap-[11px] flex-1 md:ml-10">
        <div className="bor-1 border-[1px] border-[rgb(97,97,97)] flex-1"></div>
        <div className="bor-2 border-[1px] border-[rgb(97,97,97)] w-[60px]"></div>
        <div className="img"><img src={star} alt="" /></div>
        <div className="bor-3 border-[1px] border-[rgb(97,97,97)] w-[60px]"></div>
        <div className="bor-4 border-[1px] border-[rgb(97,97,97)] flex-1"></div>
      </div>

    </div>
  </div>

  <div className="bor-black w-full border-[1px] border-[#0D0D0D73]"></div>
  <div className="footer text-white text-center pt-[15px] pb-[32px] text-[18px]">
    <span>All rights reserved - JooCare © 2026</span>
  </div>
</div>
    </>
  )
}

export default Footer