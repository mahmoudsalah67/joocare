import React, { useEffect, useState } from "react";
import "./About.css";
import arrow from "../../../public/imge/arrow-square-left.svg";
import star2 from "../../../public/imge/2.svg";
import award from "../../../public/imge/award(1).svg";
import award2 from "../../../public/imge/award(2).svg";
import award3 from "../../../public/imge/award(3).svg";
import img1 from "../../../public/imge/imgs/Rectangle 5427.png";
import img2 from "../../../public/imge/imgs/img.jpg";
import img3 from "../../../public/imge/imgs/Frame 2147227963.svg";
import doctor from "../../../public/imge/img-about/doctor.jpg";
import girl from "../../../public/imge/img-about/girl.jpg";
import frame1 from "../../../public/imge/img-about/Frame 2147227956.svg";
import frame2 from "../../../public/imge/img-about/Frame 2147227959.svg";
import team from "../../../public/imge/img-about/team.jpg";
import arrowup from "../../../public/imge/img-about/Arrow Up Icon.svg";
import search from "../../../public/imge/img-about/search.svg";
import stars from "../../../public/imge/img-about/stars.svg";
import arrowdowen from "../../../public/imge/img-about/Arrow Down Icon.svg";
import imge1 from "../../../public/imge/img-about/2f7c90fc4f8d943d9874c17698bc354a6faeea36.jpg";
import imge2 from "../../../public/imge/img-about/f00fe44468f2656121d53545a6bf24d49c38ee4e.jpg";

import { motion } from "framer-motion";
import Footer from "../footer/Footer";
import { NavLink } from "react-router-dom";
import { a } from "framer-motion/client";
function About() {
  const [aboutdata, setaboutdata] = useState(null);

  async function fetchaboutdata() {
    try {
      const response = await fetch("https://joocare.nami-tec.com/api/about", {
        headers: {
          "Accept-Language": "en",
        },
      });

      const data = await response.json();
      setaboutdata(data);
    } catch (error) {
      console.log("error fetching how it works data:", error);
    }
  }
  useEffect(() => {
    fetchaboutdata();
  }, []);

  const [openIndex, setOpenIndex] = useState(0);
  return (
    <>
      <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
>
  <div className="section-about mt-20">
    {/* Breadcrumb / FakeNav */}
    <div className="fakenav bg-[#0D0D0D0D] py-5">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between">
        <h1 className="text-[16px] md:text-[18px] font-[600]">About</h1>
        <div className="flex items-center gap-1 text-[14px] md:text-[18px] font-[600]">
          <NavLink to="/" className="hover:text-[#00694B] transition-colors">
            home
          </NavLink>
          <img src={arrow} alt="" className="w-4 h-4 md:w-auto md:h-auto" />
          <span className="text-gray-500">About</span>
        </div>
      </div>
    </div>

    {/* Top About Section */}
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Content */}
          <div className="content w-full">
            <div className="title-1 flex items-center gap-2 mb-6 border border-[#2E90A61A] rounded-full py-2 px-4 w-fit bg-[#F2F7F8]">
              <img src={star2} alt="" className="w-4 h-4" />
              <p className="text-[#1C2628] text-[14px] md:text-[16px] font-[400]">
                About JooCare
              </p>
            </div>

            <h1 className="font-[700] text-[32px] md:text-[40px] lg:text-[48px] leading-[1.1] text-[#1C2628] mb-6 tracking-tight">
              {aboutdata?.data?.about_section?.title}
            </h1>

            <p className="text-[#4D4D4D] text-[16px] md:text-[18px] leading-[1.6] text-justify max-w-[613px] mb-8 md:mb-10">
              {aboutdata?.data?.about_section?.description}
            </p>

            {/* List Details Items */}
            <div className="details mb-6 space-y-6">
              {[0, 1, 2].map((idx) => (
                <div key={idx} className="flex items-start gap-4 w-full max-w-[600px]">
                  <div className="bg-white w-[56px] h-[56px] p-2 rounded-[16px] shadow-lg flex items-center justify-center shrink-0">
                    <img
                      src={aboutdata?.data?.about_section?.items?.[idx]?.icon}
                      alt=""
                      className="w-[32px] h-[32px] object-contain"
                    />
                  </div>
                  <div className="cont flex-1">
                    <p className="font-[600] text-[18px] md:text-[21px] text-[#1C2628]">
                      {aboutdata?.data?.about_section?.items?.[idx]?.title}
                    </p>
                    <p className="pt-1 text-gray-500 text-[13px] md:text-[14px] leading-snug">
                      {aboutdata?.data?.about_section?.items?.[idx]?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Images (تظبيط الـ Absolute هنا عشان يظبط في الشاشات الصغيرة) */}
          <div className="imges relative w-full h-[380px] sm:h-[500px] lg:h-[550px] mt-10 lg:mt-0">
            <div className="absolute right-0 top-0 w-[65%] sm:w-[455px] h-[85%] rounded-[30px] md:rounded-[40px] overflow-hidden shadow-md">
              <img
                src={aboutdata?.data?.about_section?.images?.[0]?.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute left-0 bottom-4 w-[45%] sm:w-[291px] h-[60%] sm:h-[320px] rounded-[30px] sm:rounded-[50px] overflow-hidden border-[10px] sm:border-[20px] border-white shadow-2xl z-10">
              <img
                src={aboutdata?.data?.about_section?.images?.[1]?.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute left-[35%] bottom-0 rounded-full z-20 w-[20%] sm:w-[145px]">
              <img src={img3} alt="" className="w-full h-auto" />
            </div>
          </div>

        </div>
      </div>
    </div>

    {/* Counter Cards Grid */}
    <div className="container mx-auto px-4 md:px-8 lg:px-16">
      <div className="cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-12 border-b border-gray-100">
        {[
          { count: "+500", text: "Healthcare Specializations Covered" },
          { count: "+100,000", text: "Verified Healthcare Professionals" },
          { count: "+500,000", text: "Active Job opportunities" },
          { count: "98%", text: "Hiring Success Rate", isPercent: true }
        ].map((card, i) => (
          <div key={i} className="card-1 text-center bg-white p-6 rounded-2xl shadow-sm lg:shadow-none lg:p-0">
            <h1 className="font-[700] text-[32px] md:text-[38px] text-[#1A1A1A]">
              {!card.isPercent && <span className="text-[#00694B]">+</span>}
              {card.count.replace('+', '').replace('%', '')}
              {card.isPercent && <span className="text-[#00694B]">%</span>}
            </h1>
            <p className="text-[#0D0D0DA6] text-sm md:text-base mt-1">
              {card.text}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Features / Why Choose Us Section */}
    <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Interactive Images Block */}
        <div className="features-left relative w-full max-w-[635px] h-[400px] sm:h-[550px] lg:h-[619px] mx-auto">
          <div className="absolute left-[2%] top-0 w-[50%] h-[35%] overflow-hidden rounded-[30px_0px_35px_0px] sm:rounded-[46px_0px_49px_0px] shadow-sm">
            <img
              src={aboutdata?.data?.choose_us?.images?.[0]?.image}
              className="w-full h-full object-cover"
              alt="doctor"
            />
          </div>

          <div className="absolute right-[5%] top-[2%] z-0 w-[15%] sm:w-auto">
            <img
              src={aboutdata?.data?.choose_us?.images?.[3]?.image}
              alt="dots"
              className="w-full h-auto"
            />
          </div>

          <div className="absolute left-[35%] top-[10%] z-20 w-[60%] sm:w-[405px]">
            <img src={search} alt="search bar" className="drop-shadow-xl w-full h-auto" />
          </div>

          <div className="absolute top-[38%] left-[2%] w-[30%] h-[30%] overflow-hidden rounded-[0px_30px_0px_30px] sm:rounded-[0px_49px_0px_49px] shadow-sm">
            <img
              src={aboutdata?.data?.choose_us?.images?.[1]?.image}
              className="w-full h-full object-cover"
              alt="candidate"
            />
          </div>

          <div className="absolute top-[36%] right-[5%] z-10 w-[15%] sm:w-auto">
            <img
              src={aboutdata?.data?.choose_us?.images?.[4]?.image}
              alt=""
              className="w-full h-auto"
            />
          </div>
          
          <div className="absolute top-[38%] left-[36%] w-[46%] h-[52%] overflow-hidden rounded-[40px_0px_35px_0px] sm:rounded-[80px_0px_49px_0px] shadow-md">
            <img
              src={aboutdata?.data?.choose_us?.images?.[2]?.image}
              className="w-full h-full object-cover"
              alt="team"
            />
          </div>

          <div className="absolute bottom-0 left-[2%] bg-white shadow-2xl w-[50%] sm:w-[300px] py-3 px-2 sm:py-6 sm:px-4 rounded-[16px] sm:rounded-[24px] z-30">
            <p className="text-center font-bold text-[#0D0D0D] text-[11px] sm:text-base mb-2 sm:mb-4">
              12k+ Verified Doctors
            </p>
            <div className="flex items-center justify-center">
              <img src={frame2} alt="avatars" className="w-[80%] sm:w-auto" />
            </div>
          </div>
        </div>

        {/* Right Accordion Content */}
        <div className="features-right w-full lg:max-w-[635px]">
          <div className="title-right mb-4">
            <div className="title-1 flex items-center gap-2 mb-[20px] border border-[#2E90A61A] rounded-[12px] py-[8px] px-[16px] w-fit bg-[#12121205]">
              <img src={star2} alt="" />
              <p className="text-[#1C2628] text-[16px] font-[400]">
                Why choose us?
              </p>
            </div>
            <h1 className="font-[700] text-[32px] md:text-[40px] lg:text-[48px] leading-[1.1]">
              {(() => {
                const title = aboutdata?.data?.choose_us?.title || "";
                const words = title.split(" ");
                return words.map((word, i) => (
                  <span key={i}>
                    {i === 4 ? (
                      <span className="text-[#00694B]">{word}</span>
                    ) : (
                      word
                    )}{" "}
                  </span>
                ));
              })()}
            </h1>
          </div>

          {/* Accordion List */}
          <div className="details">
            {(aboutdata?.data?.choose_us?.items?.length > 0
              ? aboutdata?.data?.choose_us?.items
              : [
                  {
                    id: 1,
                    title: "Clinical Intelligence",
                    description: "Precision beyond keywords. Unlike generic platforms, our AI is natively trained on medical taxonomies and clinical pathways.",
                  },
                  { id: 2, title: "Predictive Alignment", description: "" },
                  { id: 3, title: "Institutional Integrity", description: "" },
                ]
            ).map((item, index) => (
              <div key={item.id} className="border-b border-[#2E90A61A]">
                <div
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="title flex items-center justify-between py-4 px-2 cursor-pointer group"
                >
                  <h2 className="text-[#00694B] group-hover:text-black transition-colors font-[600] text-[18px] md:text-[24px]">
                    {item.title}
                  </h2>
                  <img
                    src={openIndex === index ? arrowup : arrowdowen}
                    alt=""
                    className="w-5 h-5 md:w-auto md:h-auto"
                  />
                </div>

                <div className={`grid transition-all duration-500 ease-in-out ${openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="pb-4 px-2 text-gray-600 text-[15px] md:text-[18px] text-justify leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="button pt-8 pb-4">
              <NavLink
                to="/login"
                className="inline-block bg-[#00694B] text-white text-[14px] py-[16px] px-[32px] rounded-full font-medium text-center shadow-md hover:bg-black transition-all duration-500 w-full sm:w-auto"
              >
                Get Started For Free
              </NavLink>
            </div>
          </div>
        </div>

      </div>
    </div>

    {/* Our Vision Section */}
    <div className="OurVision bg-gray-50 py-12 lg:py-20">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Content Left */}
          <div className="w-full max-w-[613px]">
            <div className="flex items-center gap-2 mb-6 border border-[#2E90A61A] rounded-full py-1 px-3 w-fit bg-[#F2F7F8]">
              <span className="text-[#00694B]">✦</span>
              <p className="text-[#1C2628] text-sm font-medium">
                Our Vision
              </p>
            </div>

            <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold text-[#1C2628] mb-6 leading-tight">
              {aboutdata?.data?.our_vision?.title}
            </h2>

            <p className="text-[#4D4D4D] text-[16px] md:text-[18px] text-justify leading-relaxed">
              {aboutdata?.data?.our_vision?.description}
            </p>
          </div>

          {/* Images Right */}
          <div className="imges relative w-full h-[400px] sm:h-[550px] lg:h-[600px] mt-10 lg:mt-0">
            <div className="absolute right-0 top-0 w-[70%] sm:w-[455px] h-[90%] sm:h-[600px] rounded-[30px] sm:rounded-[50px] overflow-hidden shadow-md">
              <img
                src={aboutdata?.data?.our_vision?.images?.[0]?.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute left-0 bottom-0 w-[50%] sm:w-[291px] h-[60%] sm:h-[325px] border-[10px] sm:border-[20px] border-white rounded-[30px] sm:rounded-[50px] overflow-hidden shadow-2xl z-10">
              <img
                src={aboutdata?.data?.our_vision?.images?.[1]?.image}
                alt=""
                className="w-full h-full object-cover"
              />
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

export default About;
