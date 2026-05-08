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
      const response = await fetch("https://admin.joocare.com/api/about", {
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
        <div className="section-about mt-22 ">
          <div className="fakenav bg-[#0D0D0D0D] py-5 ">
            <div className="container px-30 flex items-center justify-between">
              <h1 className="text-[18px] font-[600]">About</h1>
              <div className="flex items-center  text-[18px] font-[600]">
                <NavLink to="/" className="text-[18px] font-[600]">
                  home
                </NavLink>
                <img src={arrow} alt="" className="" />
                <span>About</span>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-30 bg-gray-50">
            <div className="top-section flex flex-col lg:flex-row items-start gap-10 pt-[80px]">
              <div className="content lg:w-1/2 w-full">
                <div className="title-1 flex items-center gap-2 mb-6 border border-[#2E90A61A] rounded-full py-2 px-4 w-fit bg-[#F2F7F8]">
                  <img src={star2} alt="" className="w-4 h-4" />
                  <p className="text-[#1C2628] text-[16px] font-[400]">
                    About JooCare
                  </p>
                </div>

                <h1 className="font-[700] text-[48px] leading-[1.1] text-[#1C2628] mb-6 tracking-tight">
                  {aboutdata?.data?.about_section?.title}
                </h1>

                <p className="text-[#4D4D4D] text-[18px] leading-[1.6] text-justify max-w-[613px] mb-10">
                  {aboutdata?.data?.about_section?.description}
                </p>
                <div className="details mb-[16px] space-y-6">
                  <div className="item-1 flex items-center justify-between gap-4 w-full">
                    <div className="bg-[white] w-[56px] p-[8px] rounded-[16px] shadow-[#0000001A] shadow-2xl">
                      <img
                        src={aboutdata?.data?.about_section?.items?.[0]?.icon}
                        alt=""
                        className=" w-[32px] h-[32px]  object-contain"
                      />
                    </div>
                    <div className="cont">
                      <p className="font-[600] text-[21px] text-[#1C2628]">
                        {aboutdata?.data?.about_section?.items?.[0]?.title}
                      </p>
                      <p className="pt-[4px] text-gray-500 text-[14px] leading-snug ">
                        {
                          aboutdata?.data?.about_section?.items?.[0]
                            ?.description
                        }
                      </p>
                    </div>
                  </div>

                  <div className="item-1 flex items-center gap-4 ">
                    <div className="bg-[white] w-[56px] p-[8px] rounded-[16px] shadow-[#0000001A] shadow-2xl">
                      <img
                        src={aboutdata?.data?.about_section?.items?.[1]?.icon}
                        alt=""
                        className=" w-[32px] h-[32px]  object-contain"
                      />
                    </div>{" "}
                    <div className="cont">
                      <p className="font-[600] text-[21px] text-[#1C2628]">
                        {aboutdata?.data?.about_section?.items?.[1]?.title}
                      </p>
                      <p className="pt-[4px] text-gray-500 text-[14px] leading-snug">
                        {
                          aboutdata?.data?.about_section?.items?.[1]
                            ?.description
                        }
                      </p>
                    </div>
                  </div>

                  <div className="item-1 flex items-center gap-4 w-full max-w-[600px]">
                    <div className="bg-[white] w-[56px] p-[8px] rounded-[16px] shadow-[#0000001A] shadow-2xl">
                      <img
                        src={aboutdata?.data?.about_section?.items?.[2]?.icon}
                        alt=""
                        className=" w-[32px] h-[32px]  object-contain"
                      />
                    </div>
                    <div className="cont">
                      <p className="font-[600] text-[21px] text-[#1C2628]">
                        {aboutdata?.data?.about_section?.items?.[2]?.title}
                      </p>
                      <p className="pt-[4px] text-gray-500 text-[14px] leading-snug">
                        {
                          aboutdata?.data?.about_section?.items?.[2]
                            ?.description
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="imges lg:w-1/2 relative  w-full mt-10 lg:mt-0">
                <div className="absolute right-0 top-0 w-[455px] rounded-[40px] overflow-hidden">
                  <img
                    src={aboutdata?.data?.about_section?.images?.[0]?.image}
                    alt=""
                    className=" h-full object-cover"
                  />
                </div>

                <div className="absolute left- top-50 w-[291px] h-[320px] rounded-[50px] overflow-hidden border-[20px]  border-white shadow-2xl z-10">
                  <img
                    src={aboutdata?.data?.about_section?.images?.[1]?.image}
                    alt=""
                    className=" h-full object-cover"
                  />
                </div>

                <div className="absolute left-50   top-100 rounded-full z-20 w-[145px]">
                  <img src={img3} alt="" className=" " />
                </div>
              </div>
            </div>

            <div className="cards grid grid-cols-4 mt-[16px] pb-[50px] ">
              <div className="card-1 text-center ">
                <h1 className="font-[700] text-[38px]">
                  <span className="text-[#00694B]">+</span>500
                </h1>
                <p className="text-[#0D0D0DA6]">
                  Healthcare Specializations Covered
                </p>
              </div>
              <div className="card-1 text-center">
                <h1 className="font-[700] text-[38px]">
                  <span className="text-[#00694B]">+</span>100,000
                </h1>
                <p className="text-[#0D0D0DA6]">
                  Verified Healthcare Professionals
                </p>
              </div>
              <div className="card-1 text-center">
                <h1 className="font-[700] text-[38px]">
                  <span className="text-[#00694B]">+</span>500,000
                </h1>
                <p className="text-[#0D0D0DA6]">Active Job opportunities</p>
              </div>
              <div className="card-1 text-center">
                <h1 className="font-[700] text-[38px]">
                  98<span className="text-[#00694B]">%</span>
                </h1>
                <p className="text-[#0D0D0DA6]">Hiring Success Rate</p>
              </div>
            </div>
          </div>

          {/* /////////////////////////////////////////////// */}

          <div className="features grid grid-cols-2 items-center justify-center gap-[50px]  px-30 mx-auto ">
            <div className="features-left relative w-[635px] h-[619px] mb-[58px] mt-[50px]">
              <div className="doctor absolute left-0 top-0 w-[321px] left-[7px] h-[213px] overflow-hidden rounded-[46px_0px_49px_0px]">
                <img
                  src={aboutdata?.data?.choose_us?.images?.[0]?.image}
                  className="w-full h-full object-cover"
                  alt="doctor"
                />
              </div>

              <div className="frame1 absolute left-[409px] top-[17px] z-0">
                <img
                  src={aboutdata?.data?.choose_us?.images?.[3]?.image}
                  alt="dots"
                />
              </div>

              <div className="search absolute left-[230px] top-[59px] z-20 w-[405px]">
                <img src={search} alt="search bar" className="drop-shadow-xl" />
              </div>

              <div className="girl absolute top-[229px] left-[7px] w-[195px] h-[180px] overflow-hidden rounded-[0px_49px_0px_49px]">
                <img
                  src={aboutdata?.data?.choose_us?.images?.[1]?.image}
                  className="w-full h-full object-cover"
                  alt="candidate"
                />
              </div>

              <div className="absolute top-[220px] left-[407px]   z-10 gap-2">
                <img
                  src={aboutdata?.data?.choose_us?.images?.[4]?.image}
                  alt=""
                  className=""
                />
              </div>
              <div className="team absolute top-[229px] left-[234px] w-[294px] h-[324px] overflow-hidden rounded-[80px_0px_49px_0px]">
                <img
                  src={aboutdata?.data?.choose_us?.images?.[2]?.image}
                  className="w-full h-full object-cover"
                  alt="team"
                />
              </div>

              <div className="frame2 absolute bottom-0 left-[7px] bg-white shadow-2xl w-[300px] py-6 px-4 rounded-[24px] z-30">
                <p className="text-center font-bold text-[#0D0D0D] mb-4">
                  12k+ Verified Doctors
                </p>
                <div className="flex items-center justify-center">
                  <img src={frame2} alt="avatars" />
                </div>
              </div>
            </div>
            <div className="features-right w-[635px] h-[619px] mb-[58px] mt-[50px]">
              <div className="title-right p-[16px]">
                <div className="title-1 flex items-center  gap-2 mb-[20px] border-[1px] border-[#2E90A61A] rounded-[12px] py-[8px] px-[16px] w-fit bg-[#12121205]">
                  <img src={star2} alt="" />
                  <p className="text-[#1C2628] text-[16px] font-[400]">
                    Why choose us?
                  </p>
                </div>
                <h1 className="font-[700] text-[48px] mb-[21px]">
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
              <div className="details">
                {aboutdata?.data?.choose_us?.items?.length > 0
                  ? aboutdata?.data?.choose_us?.items?.map((item, index) => (
                      <div
                        key={item.id}
                        className="border-b-1 border-[#2E90A61A]"
                      >
                        <div
                          onClick={() =>
                            setOpenIndex(openIndex === index ? null : index)
                          }
                          className="title flex items-center justify-between p-[16px] cursor-pointer"
                        >
                          <h2 className="text-[#00694B] font-[600] text-[24px]">
                            {item.title}
                          </h2>
                          <img
                            src={openIndex === index ? arrowup : arrowdowen}
                            alt=""
                          />
                        </div>

                        <div
                          className={`grid transition-all duration-500 ease-in-out ${openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                        >
                          <div className="overflow-hidden">
                            <p className="p-[16px] text-[18px]">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  : [
                      {
                        id: 1,
                        title: "Clinical Intelligence",
                        description:
                          "Precision beyond keywords. Unlike generic platforms, our AI is natively trained on medical taxonomies and clinical pathways. We decode the underlying logic of specialization to ensure every candidate is evaluated within the context of high-stakes healthcare delivery and specific clinical acuity.",
                      },
                      { id: 2, title: "Predictive Alignment", description: "" },
                      {
                        id: 3,
                        title: "Institutional Integrity",
                        description: "",
                      },
                    ].map((item, index) => (
                      <div
                        key={item.id}
                        className="border-b-1 border-[#2E90A61A]"
                      >
                        <div
                          onClick={() =>
                            setOpenIndex(openIndex === index ? null : index)
                          }
                          className="title flex items-center justify-between p-[16px] cursor-pointer"
                        >
                          <h2 className="text-[#00694B] font-[600] text-[24px]">
                            {item.title}
                          </h2>
                          <img
                            src={openIndex === index ? arrowup : arrowdowen}
                            alt=""
                          />
                        </div>

                        <div
                          className={`grid transition-all duration-500 ease-in-out ${openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                        >
                          <div className="overflow-hidden">
                            <p className="p-[16px] text-[18px]">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}

                <div className="button p-[16px] mt-[30px] mb-[50px]">
                  <NavLink
                    to="/login"
                    className="bg-[#00694B] text-white text-[14px] py-[16px] px-[32px] rounded-full cursor-pointer transition-all duration-500 hover:bg-black"
                  >
                    Get Started For Free
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          {/* //////////////////////////////////////////////////// */}

          <div className="OurVision bg-gray-50 mt-40 mb-[50px] py-[50px] ">
            <div className="container px-30 mx-auto">
              <div className="content flex items-center justify-between">
                <div className=" z-10 w-[613px]">
                  <div className="flex items-center gap-2 mb-6 border border-[#2E90A61A] rounded-full py-1 px-3 w-fit bg-[#F2F7F8]">
                    <span className="text-[#00694B]">✦</span>
                    <p className="text-[#1C2628] text-sm font-medium">
                      Our Vision
                    </p>
                  </div>

                  <h2 className="text-[48px] font-bold text-[#1C2628] mb-6">
                    {aboutdata?.data?.our_vision?.title}
                  </h2>

                  <p className="text-[#4D4D4D] text-[18px] text-justify ">
                    {aboutdata?.data?.our_vision?.description}
                  </p>
                </div>
                <div className="imges  relative">
                  <div className="img1 absolute top-[200px] right-[320px] w-[291px] h-[325px] border-[20px] border-white rounded-[50px] overflow-hidden">
                    <img
                      src={aboutdata?.data?.our_vision?.images?.[1]?.image}
                      alt=""
                      className="  h-full object-cover"
                    />
                  </div>

                  <div className="img2 w-[455px] h-[600px] rounded-[50px] overflow-hidden">
                    <img
                      src={aboutdata?.data?.our_vision?.images?.[0]?.image}
                      alt=""
                      className="w-full h-full object-cover  "
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
