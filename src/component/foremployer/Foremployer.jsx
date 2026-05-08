import { motion } from "framer-motion";
import React from "react";
import arrow from "../../../public/imge/arrow-square-left.svg";
import star2 from "../../../public/imge/2.svg";
import { Links, NavLink } from "react-router-dom";
import img1 from "../../../public/imge/foremployer-img/4e33826997da0cd642df0d20f9a9a83b0c3382fd.png";
import img2 from "../../../public/imge/foremployer-img/e22192609e7726106f894feddd72d9c30e85fb54.png";
import img3 from "../../../public/imge/foremployer-img/0a18a42abadfef8e7dffba2b5029e6ab7ff3baa0.png";
import award from "../../../public/imge/foremployer-img/award.svg";
import doctor from "../../../public/imge/foremployer-img/doctor.png";
import home from "../../../public/imge/foremployer-img/home.gif";
import search from "../../../public/imge/foremployer-img/search.gif";
import man from "../../../public/imge/foremployer-img/man.gif";
import kicher from "../../../public/imge/foremployer-img/Kicker → Default.svg";
import kicher2 from "../../../public/imge/foremployer-img/Kicker → Default (1).svg";
import kicher3 from "../../../public/imge/foremployer-img/Kicker → Default (2).svg";
import faq from "../../../public/imge/foremployer-img/faq (1) 1.svg";
import frame2 from "../../../public/imge/Frame 2147227945.svg";
import frame3 from "../../../public/imge/Frame 2147227945 (1).svg";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { HiPlus, HiMinus } from "react-icons/hi";

import "./Foremployer.css";

function Foremployer() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How can I subscribe to Joocare services?",
      answer:
        "This placeholder text is used to preview layout, text alignment, and the page's visual structure before adding real content.",
    },
    {
      question: "How can I subscribe to Joocare services?",
      answer:
        "This placeholder text is used to preview layout, text alignment, and the page's visual structure before adding real content.",
    },
    {
      question: "How can I subscribe to Joocare services?",
      answer:
        "This placeholder text is used to preview layout, text alignment, and the page's visual structure before adding real content.",
    },
    {
      question: "How can I subscribe to Joocare services?",
      answer:
        "This placeholder text is used to preview layout, text alignment, and the page's visual structure before adding real content.",
    },
    {
      question: "How can I subscribe to Joocare services?",
      answer:
        "This placeholder text is used to preview layout, text alignment, and the page's visual structure before adding real content.",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <>
        <div className="sectionForemployer mt-22">
          {/* Fake Nav */}
          <div className="fakenav bg-[#0D0D0D0D] py-5">
            <div className="container px-4 md:px-30 flex items-center justify-between">
              <h1 className="text-[18px] font-[600]">For Employers</h1>
              <div className="flex items-center text-[18px] font-[600]">
                <NavLink to={"/"}>home</NavLink>
                <img src={arrow} alt="" />
                <span>ForEmployers</span>
              </div>
            </div>
          </div>

          <div className="container px-4 md:px-30 mx-auto">
            {/* Hero Section */}
            <div className="content grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
              {/* Left */}
              <div className="leftt mt-[50px]">
                <div className="title-left">
                  <div className="title-1 flex items-center gap-2 mb-6 border-[1px] border-[#2E90A61A] rounded-[12px] py-[8px] px-[16px] w-fit bg-[#12121205]">
                    <img src={star2} alt="" />
                    <p className="text-[#1C2628] text-[16px] font-[400]">
                      Your Healthcare Recruitment, Simplified!
                    </p>
                  </div>
                  <h1 className="font-[700] text-[32px] md:text-[40px] lg:text-[48px] mb-[21px] text-[#1C2628]">
                    The Intelligence <br />
                    Ecosystem for Clinical <br />
                    Talent Acquisition!
                  </h1>
                  <p className="text-[16px]">
                    We go beyond resume matching to deliver audit-ready talent,
                    ensuring every placement meets the highest standards of
                    medical excellence and organizational fit
                  </p>
                </div>
              </div>

              {/* Right Images */}
              <div className="right flex items-center gap-[16px] my-[50px] justify-center overflow-hidden">
                <img
                  className="w-[30%] md:w-[202px] h-[300px] md:h-[460px] object-cover rounded-[24px] shadow-lg"
                  src={img1}
                  alt=""
                />
                <img
                  className="w-[30%] md:w-[202px] h-[300px] md:h-[460px] object-cover rounded-[24px] shadow-lg"
                  src={img2}
                  alt=""
                />
                <img
                  className="w-[30%] md:w-[202px] h-[300px] md:h-[460px] object-cover rounded-[24px] shadow-lg"
                  src={img3}
                  alt=""
                />
              </div>

              {/* Hire Banner */}
              <div className="hire col-span-1 lg:col-span-2 bg-[#00694B] mb-[30px] relative rounded-[32px] py-[30px] px-[24px] md:px-[80px] flex items-center w-full overflow-hidden min-h-[280px]">
                {/* اللون الفاتح تحت الصورة */}
                <div className="" />

                {/* Left Content */}
                <div className="content z-10 w-full lg:w-[55%]">
                  <h1 className="text-[24px] md:text-[32px] lg:text-[38px] font-bold text-white text-center mb-[16px] leading-tight">
                    Hire Medical Professionals with <br />
                    Seamless Talent Access
                  </h1>
                  <p className="text-white text-center text-sm mb-[24px]">
                    Selection made effortless. We replace the endless resume
                    scroll with a hand-selected shortlist of clinical experts.
                    Every profile is complete, compliant, and ready for your
                    final approval, ensuring your hiring process is as smooth as
                    it is effective
                  </p>
                  <div className="flex justify-center">
                    <NavLink
                      to={"/joinnow"}
                      className="border border-white/40 hover:bg-black hover:border-black transition duration-500 text-white px-6 py-3 rounded-full inline-flex items-center gap-2 text-sm font-medium"
                    >
                      Get Started Now →
                    </NavLink>
                  </div>
                </div>

                {/* Doctor Image */}
                <div className="hidden lg:block absolute right-[-80px] bottom-0  h-[100%]">
                  <img
                    src={doctor}
                    className="h-full w-auto object-cover "
                    alt="doctors"
                  />
                </div>
              </div>
            </div>

            {/* Why Joocare */}
            <div className="why-joocare grid grid-cols-1 lg:grid-cols-2 items-start mt-[80px]">
              {/* Left - Sticky على Desktop بس */}
              <div className="leftt lg:sticky lg:top-[80px] lg:self-start w-full lg:w-[568px] mb-8 lg:mb-0">
                <div className="title-left">
                  <div className="title-1 flex items-center gap-2 mb-6 border-[1px] border-[#2E90A61A] rounded-[12px] py-[8px] px-[16px] w-fit bg-[#12121205]">
                    <img src={star2} alt="" />
                    <p className="text-[#1C2628] text-[16px] font-[400]">
                      Talent at the Right Time
                    </p>
                  </div>
                  <h1 className="font-[700] text-[32px] md:text-[40px] lg:text-[48px] mb-[21px] text-[#1C2628]">
                    Why joocare?
                  </h1>
                  <p className="text-justify pb-[20px] text-[18px] lg:text-[21px] text-[#1C2628]">
                    Joocare provides a domain-oriented, business-focused
                    ecosystem designed to align elite medical talent with your
                    facility's specific operational demands. By leveraging
                    AI-automated smart filtration and intelligent support, we
                    transform the recruitment process into an effortless
                    selection experience that responds to your real-time
                    clinical needs. Our platform ensures seamless access to a
                    talent pipeline where every professional is pre-verified for
                    credentials and compliance, removing administrative friction
                    and allowing you to secure high-caliber specialists with
                    absolute confidence.
                  </p>
                  <NavLink
                    to={"/joinnow"}
                    className="bg-[#00694B] hover:bg-black transition duration-500 text-white px-[32px] py-[16px] rounded-full inline-flex items-center gap-2 text-sm font-medium"
                  >
                    Get Started Now →
                  </NavLink>
                </div>
              </div>

              {/* Right Cards */}
              <div className="right mb-[128px]">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="mb-[20px] border-[1px] border-[#0D0D0D14] rounded-[12px] flex items-center gap-[8px] p-[16px]"
                  >
                    <div className="icon shrink-0">
                      <img src={award} className="w-[48px]" alt="" />
                    </div>
                    <div>
                      <h2 className="font-[600] text-[18px] lg:text-[21px] text-[#0D0D0D]">
                        Smart Matching Engine
                      </h2>
                      <p className="text-[#0D0D0DA6] font-[400] text-[14px]">
                        Bypass the manual search. Our engine analyzes your
                        specific clinical requirements to present only the most
                        compatible specialists for your final review
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Medical Steps */}
          <div className="bg-[#00694B14] w-full">
            <div className="container px-4 md:px-30 mx-auto">
              <div className="title pt-[80px] pb-[16px]">
                <h1 className="font-[700] text-[28px] md:text-[40px] lg:text-[48px]">
                  Hire Top Medical Talent in 3{" "}
                  <br className="hidden md:block" />
                  Simple Steps
                </h1>
                <p className="font-[600] text-[#1C2628] mt-[8px]">
                  Building Your Medical Team is Easier Than You Think
                </p>
              </div>

              <div className="cards flex flex-col md:flex-row items-stretch gap-[24px] pb-[80px]">
                {/* Card 1 */}
                <div className="bg-white w-full md:w-[410px] pt-[12px] pr-[12px] pb-[20px] pl-[12px] rounded-[24px]">
                  <div className="img">
                    <img
                      src={home}
                      alt=""
                      className="w-full rounded-[16px] object-cover"
                    />
                  </div>
                  <div className="content mt-[24px]">
                    <div className="step-1">
                      <img src={kicher} alt="" />
                      <p className="font-[400] text-[18px] text-[#0D0D0D]">
                        Create Your Facility Profile
                      </p>
                    </div>
                    <div className="details mt-[8px]">
                      <p className="text-justify font-[400] text-[16px] text-[#0D0D0DA6]">
                        Establish your institutional presence within our
                        domain-oriented ecosystem. By defining your facility's
                        unique clinical environment and operational standards,
                        you allow our system to strategically align your brand
                        with the industry's most qualified specialists
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white w-full md:w-[410px] pt-[12px] pr-[12px] pb-[20px] pl-[12px] rounded-[24px]">
                  <div className="img">
                    <img
                      src={search}
                      alt=""
                      className="w-full rounded-[16px] object-cover"
                    />
                  </div>
                  <div className="content mt-[46.5%]">
                    <div className="step-1">
                      <img src={kicher2} alt="" />
                      <p className="font-[400] text-[18px] text-[#0D0D0D]">
                        Create Your Facility Profile
                      </p>
                    </div>
                    <div className="details mt-[8px]">
                      <p className="text-justify font-[400] text-[16px] text-[#0D0D0DA6]">
                        Establish your institutional presence within our
                        domain-oriented ecosystem. By defining your facility's
                        unique clinical environment and operational standards,
                        you allow our system to strategically align your brand
                        with the industry's most qualified specialists
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white w-full md:w-[410px] pt-[12px] pr-[12px] pb-[20px] pl-[12px] rounded-[24px]">
                  <div className="img">
                    <img
                      src={man}
                      alt=""
                      className="w-full rounded-[16px] object-cover"
                    />
                  </div>
                  <div className="content mt-[24px]">
                    <div className="step-1">
                      <img src={kicher3} alt="" />
                      <p className="font-[400] text-[18px] text-[#0D0D0D]">
                        Create Your Facility Profile
                      </p>
                    </div>
                    <div className="details mt-[8px]">
                      <p className="text-justify font-[400] text-[16px] text-[#0D0D0DA6]">
                        Establish your institutional presence within our
                        domain-oriented ecosystem. By defining your facility's
                        unique clinical environment and operational standards,
                        you allow our system to strategically align your brand
                        with the industry's most qualified specialists
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Frequently">
            <div className="content flex flex-col lg:flex-row gap-[24px] justify-between my-[80px] px-4 md:px-16 lg:px-30">
              {/* Left */}
              <div className="leftt shrink-0">
                <img src={faq} alt="" />
                <h1 className="font-[700] text-[32px] md:text-[48px]">
                  Frequently Asked
                  <br />
                  Questions
                </h1>
              </div>

              {/* Right */}
              <div className="right w-full lg:w-[820px]">
                <div className="flex flex-col gap-[24px]">
                  {faqs.map((item, i) => (
                    <div
                      key={i}
                      className="bg-[#0D0D0D0D] border-[1px] border-[#0D0D0D14] rounded-tl-[16px] rounded-tr-[16px] rounded-br-[20px] rounded-bl-[20px] overflow-hidden"
                    >
                      {/* Header */}
                      <button
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        className="w-full flex items-center justify-between p-4 cursor-pointer "
                      >
                        <p className="text-[18px] md:text-[21px] font-[600] text-left text-[#0D0D0D]">
                          {item.question}
                        </p>

                        <motion.div
                          animate={{ rotate: openIndex === i ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="shrink-0 ml-4 w-[32px] h-[32px] rounded-full bg-black flex items-center justify-center"
                        >
                          {openIndex === i ? (
                            <HiMinus className="text-white  text-[18px]" />
                          ) : (
                            <HiPlus className="text-white text-[18px]" />
                          )}
                        </motion.div>
                      </button>

                      {/* Content */}
                      <AnimatePresence initial={false}>
                        {openIndex === i && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                          >
                            <p className="px-4 pb-4 text-[16px] text-[#0D0D0DA6] font-[400] leading-relaxed bg-white">
                              {item.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </motion.div>
  );
}

export default Foremployer;
